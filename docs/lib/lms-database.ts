// LMS Database Service - Unified interface for Moodle API and Custom Database
import { dbCustom } from './db-custom';
import { moodleApi } from './moodle-api';
import type {
  Employee,
  MoodleCourse,
  MoodleUser,
  EnrollmentTracking,
  CourseProgress,
  Certificate,
  LearningPath,
  CourseSchedule,
  Notification,
  SyncStatus,
} from '../../types';

export class LMSDatabaseService {
  /**
   * Sync user from Moodle to custom database
   */
  async syncUserFromMoodle(moodleUserId: number, employeeData: {
    employeeId: string;
    positionId?: number;
    levelId?: number;
    departmentId?: number;
    divisionId?: number;
    companyId?: number;
  }): Promise<Employee> {
    // Check if employee already exists
    let employee = await dbCustom.getEmployeeByMoodleUserId(moodleUserId);
    
    if (employee) {
      // Update existing employee
      await dbCustom.updateEmployee(employee.id, {
        ...employeeData,
        moodleUserId,
      });
      employee = await dbCustom.getEmployeeById(employee.id);
    } else {
      // Create new employee
      const employeeId = await dbCustom.createEmployee({
        moodleUserId,
        ...employeeData,
      });
      employee = await dbCustom.getEmployeeById(employeeId);
    }
    
    return employee!;
  }

  /**
   * Get user with combined Moodle and custom data
   */
  async getUserComplete(employeeId: number): Promise<{
    employee: Employee | null;
    moodleUser: MoodleUser | null;
  }> {
    const employee = await dbCustom.getEmployeeById(employeeId);
    let moodleUser = null;
    
    if (employee?.moodleUserId) {
      try {
        const result = await moodleApi.getUserById(employee.moodleUserId);
        moodleUser = result[0] || null;
      } catch (error) {
        console.error('Error fetching Moodle user:', error);
      }
    }
    
    return { employee, moodleUser };
  }

  /**
   * Get course with combined Moodle and custom metadata
   */
  async getCourseComplete(moodleCourseId: number): Promise<{
    moodleCourse: MoodleCourse | null;
    metadata: any;
  }> {
    let moodleCourse = null;
    try {
      moodleCourse = await moodleApi.getCourseById(moodleCourseId);
    } catch (error) {
      console.error('Error fetching Moodle course:', error);
    }
    
    const metadata = await dbCustom.getCourseMetadata(moodleCourseId);
    
    return { moodleCourse, metadata };
  }

  /**
   * Enroll employee in course (both Moodle and custom DB)
   */
  async enrollEmployee(
    employeeId: number,
    moodleCourseId: number,
    options?: {
      expectedCompletionDate?: Date;
      roleId?: number;
    }
  ): Promise<void> {
    const employee = await dbCustom.getEmployeeById(employeeId);
    if (!employee?.moodleUserId) {
      throw new Error('Employee does not have a Moodle user ID');
    }

    // Enroll in Moodle
    const moodleEnrollment = await moodleApi.enrollUser(
      employee.moodleUserId,
      moodleCourseId,
      options?.roleId
    );

    // Track enrollment in custom database
    await this.trackEnrollment(employeeId, moodleCourseId, {
      moodleEnrollmentId: moodleEnrollment?.id,
      expectedCompletionDate: options?.expectedCompletionDate,
    });
  }

  /**
   * Track enrollment in custom database
   */
  async trackEnrollment(
    employeeId: number,
    moodleCourseId: number,
    options?: {
      moodleEnrollmentId?: number;
      expectedCompletionDate?: Date;
    }
  ): Promise<number> {
    const sql = `
      INSERT INTO enrollment_tracking 
        (employee_id, moodle_course_id, moodle_enrollment_id, expected_completion_date, status)
      VALUES (?, ?, ?, ?, 'enrolled')
      ON DUPLICATE KEY UPDATE
        moodle_enrollment_id = VALUES(moodle_enrollment_id),
        expected_completion_date = VALUES(expected_completion_date),
        updated_at = CURRENT_TIMESTAMP
    `;
    
    const [result] = await dbCustom.query(sql, [
      employeeId,
      moodleCourseId,
      options?.moodleEnrollmentId || null,
      options?.expectedCompletionDate || null,
    ]);
    
    return (result as any).insertId;
  }

  /**
   * Get employee enrollments with progress
   */
  async getEmployeeEnrollments(employeeId: number): Promise<any[]> {
    const sql = `
      SELECT 
        et.*,
        cm.course_type_id,
        cm.learning_method_id,
        ct.type_name as course_type_name,
        lm.method_name as learning_method_name
      FROM enrollment_tracking et
      LEFT JOIN course_metadata cm ON et.moodle_course_id = cm.moodle_course_id
      LEFT JOIN course_types ct ON cm.course_type_id = ct.id
      LEFT JOIN learning_methods lm ON cm.learning_method_id = lm.id
      WHERE et.employee_id = ?
      ORDER BY et.enrollment_date DESC
    `;
    
    const enrollments = await dbCustom.query(sql, [employeeId]);
    
    // Fetch Moodle course details for each enrollment
    const enrichedEnrollments = await Promise.all(
      enrollments.map(async (enrollment: any) => {
        try {
          const moodleCourse = await moodleApi.getCourseById(enrollment.moodle_course_id);
          return {
            ...enrollment,
            courseName: moodleCourse?.fullname,
            courseShortName: moodleCourse?.shortname,
            courseSummary: moodleCourse?.summary,
          };
        } catch (error) {
          return enrollment;
        }
      })
    );
    
    return enrichedEnrollments;
  }

  /**
   * Update course progress
   */
  async updateCourseProgress(
    enrollmentTrackingId: number,
    activityData: {
      activityType: 'quiz' | 'assignment' | 'lesson' | 'forum' | 'resource';
      activityId: number;
      activityName: string;
      status: 'not_started' | 'in_progress' | 'completed';
      score?: number;
      maxScore?: number;
      attempts?: number;
      timeSpent?: number;
    }
  ): Promise<void> {
    const sql = `
      INSERT INTO course_progress 
        (enrollment_tracking_id, activity_type, activity_id, activity_name, 
         status, score, max_score, attempts, time_spent, completed_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        status = VALUES(status),
        score = VALUES(score),
        max_score = VALUES(max_score),
        attempts = VALUES(attempts),
        time_spent = VALUES(time_spent),
        completed_at = VALUES(completed_at),
        updated_at = CURRENT_TIMESTAMP
    `;
    
    await dbCustom.query(sql, [
      enrollmentTrackingId,
      activityData.activityType,
      activityData.activityId,
      activityData.activityName,
      activityData.status,
      activityData.score || null,
      activityData.maxScore || null,
      activityData.attempts || 0,
      activityData.timeSpent || null,
      activityData.status === 'completed' ? new Date() : null,
    ]);

    // Update overall enrollment progress
    await this.updateEnrollmentProgress(enrollmentTrackingId);
  }

  /**
   * Update overall enrollment progress percentage
   */
  async updateEnrollmentProgress(enrollmentTrackingId: number): Promise<void> {
    const sql = `
      UPDATE enrollment_tracking et
      SET progress_percentage = (
        SELECT COALESCE(
          (COUNT(CASE WHEN cp.status = 'completed' THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0)),
          0
        )
        FROM course_progress cp
        WHERE cp.enrollment_tracking_id = et.id
      ),
      status = CASE
        WHEN progress_percentage >= 100 THEN 'completed'
        WHEN progress_percentage > 0 THEN 'in_progress'
        ELSE 'enrolled'
      END,
      actual_completion_date = CASE
        WHEN progress_percentage >= 100 THEN CURRENT_DATE
        ELSE actual_completion_date
      END
      WHERE et.id = ?
    `;
    
    await dbCustom.query(sql, [enrollmentTrackingId]);
  }

  /**
   * Issue certificate
   */
  async issueCertificate(
    employeeId: number,
    moodleCourseId: number,
    certificateData: {
      certificateNumber: string;
      issueDate: Date;
      expiryDate?: Date;
      certificateUrl?: string;
    }
  ): Promise<number> {
    const sql = `
      INSERT INTO certificates 
        (employee_id, moodle_course_id, certificate_number, issue_date, 
         expiry_date, certificate_url, is_valid)
      VALUES (?, ?, ?, ?, ?, ?, TRUE)
    `;
    
    const [result] = await dbCustom.query(sql, [
      employeeId,
      moodleCourseId,
      certificateData.certificateNumber,
      certificateData.issueDate,
      certificateData.expiryDate || null,
      certificateData.certificateUrl || null,
    ]);

    // Update enrollment tracking
    const updateSql = `
      UPDATE enrollment_tracking
      SET certificate_issued = TRUE,
          certificate_issued_date = ?
      WHERE employee_id = ? AND moodle_course_id = ?
    `;
    
    await dbCustom.query(updateSql, [
      certificateData.issueDate,
      employeeId,
      moodleCourseId,
    ]);
    
    return (result as any).insertId;
  }

  /**
   * Get employee certificates
   */
  async getEmployeeCertificates(employeeId: number): Promise<any[]> {
    const sql = `
      SELECT c.*, cm.course_type_id, ct.type_name as course_type_name
      FROM certificates c
      LEFT JOIN course_metadata cm ON c.moodle_course_id = cm.moodle_course_id
      LEFT JOIN course_types ct ON cm.course_type_id = ct.id
      WHERE c.employee_id = ? AND c.is_valid = TRUE
      ORDER BY c.issue_date DESC
    `;
    
    const certificates = await dbCustom.query(sql, [employeeId]);
    
    // Enrich with Moodle course data
    const enrichedCertificates = await Promise.all(
      certificates.map(async (cert: any) => {
        try {
          const moodleCourse = await moodleApi.getCourseById(cert.moodle_course_id);
          return {
            ...cert,
            courseName: moodleCourse?.fullname,
          };
        } catch (error) {
          return cert;
        }
      })
    );
    
    return enrichedCertificates;
  }

  /**
   * Create learning path
   */
  async createLearningPath(pathData: {
    name: string;
    description?: string;
    targetPositionId?: number;
    targetLevelId?: number;
    isRequired: boolean;
    courses: Array<{
      moodleCourseId: number;
      sequenceOrder: number;
      isRequired: boolean;
      prerequisiteCourseId?: number;
    }>;
  }): Promise<number> {
    // Insert learning path
    const pathSql = `
      INSERT INTO learning_paths 
        (name, description, target_position_id, target_level_id, is_required)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const [pathResult] = await dbCustom.query(pathSql, [
      pathData.name,
      pathData.description || null,
      pathData.targetPositionId || null,
      pathData.targetLevelId || null,
      pathData.isRequired,
    ]);
    
    const learningPathId = (pathResult as any).insertId;
    
    // Insert courses
    for (const course of pathData.courses) {
      const courseSql = `
        INSERT INTO learning_path_courses 
          (learning_path_id, moodle_course_id, sequence_order, is_required, prerequisite_course_id)
        VALUES (?, ?, ?, ?, ?)
      `;
      
      await dbCustom.query(courseSql, [
        learningPathId,
        course.moodleCourseId,
        course.sequenceOrder,
        course.isRequired,
        course.prerequisiteCourseId || null,
      ]);
    }
    
    return learningPathId;
  }

  /**
   * Assign learning path to employee
   */
  async assignLearningPath(
    employeeId: number,
    learningPathId: number,
    expectedCompletionDate?: Date
  ): Promise<void> {
    const sql = `
      INSERT INTO employee_learning_paths 
        (employee_id, learning_path_id, expected_completion_date, status)
      VALUES (?, ?, ?, 'assigned')
      ON DUPLICATE KEY UPDATE
        expected_completion_date = VALUES(expected_completion_date),
        updated_at = CURRENT_TIMESTAMP
    `;
    
    await dbCustom.query(sql, [
      employeeId,
      learningPathId,
      expectedCompletionDate || null,
    ]);
  }

  /**
   * Get employee learning paths with progress
   */
  async getEmployeeLearningPaths(employeeId: number): Promise<any[]> {
    const sql = `
      SELECT 
        elp.*,
        lp.name as path_name,
        lp.description as path_description,
        lp.is_required as path_is_required,
        p.name as target_position_name,
        l.level_name as target_level_name
      FROM employee_learning_paths elp
      JOIN learning_paths lp ON elp.learning_path_id = lp.id
      LEFT JOIN positions p ON lp.target_position_id = p.id
      LEFT JOIN levels l ON lp.target_level_id = l.id
      WHERE elp.employee_id = ?
      ORDER BY elp.assigned_date DESC
    `;
    
    const paths = await dbCustom.query(sql, [employeeId]);
    
    // Get courses for each path
    for (const path of paths) {
      const coursesSql = `
        SELECT 
          lpc.*,
          et.status as enrollment_status,
          et.progress_percentage
        FROM learning_path_courses lpc
        LEFT JOIN enrollment_tracking et 
          ON lpc.moodle_course_id = et.moodle_course_id 
          AND et.employee_id = ?
        WHERE lpc.learning_path_id = ?
        ORDER BY lpc.sequence_order
      `;
      
      const courses = await dbCustom.query(coursesSql, [
        employeeId,
        path.learning_path_id,
      ]);
      
      // Enrich with Moodle course data
      path.courses = await Promise.all(
        courses.map(async (course: any) => {
          try {
            const moodleCourse = await moodleApi.getCourseById(course.moodle_course_id);
            return {
              ...course,
              courseName: moodleCourse?.fullname,
              courseShortName: moodleCourse?.shortname,
            };
          } catch (error) {
            return course;
          }
        })
      );
    }
    
    return paths;
  }

  /**
   * Create notification
   */
  async createNotification(notificationData: {
    employeeId: number;
    type: 'enrollment' | 'deadline' | 'completion' | 'certificate' | 'reminder' | 'announcement';
    title: string;
    message: string;
    relatedCourseId?: number;
    relatedScheduleId?: number;
  }): Promise<number> {
    const sql = `
      INSERT INTO notifications 
        (employee_id, type, title, message, related_course_id, related_schedule_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await dbCustom.query(sql, [
      notificationData.employeeId,
      notificationData.type,
      notificationData.title,
      notificationData.message,
      notificationData.relatedCourseId || null,
      notificationData.relatedScheduleId || null,
    ]);
    
    return (result as any).insertId;
  }

  /**
   * Get employee notifications
   */
  async getEmployeeNotifications(
    employeeId: number,
    options?: { unreadOnly?: boolean; limit?: number }
  ): Promise<any[]> {
    let sql = `
      SELECT n.*
      FROM notifications n
      WHERE n.employee_id = ?
    `;
    
    if (options?.unreadOnly) {
      sql += ' AND n.is_read = FALSE';
    }
    
    sql += ' ORDER BY n.sent_at DESC';
    
    if (options?.limit) {
      sql += ` LIMIT ${options.limit}`;
    }
    
    return dbCustom.query(sql, [employeeId]);
  }

  /**
   * Mark notification as read
   */
  async markNotificationAsRead(notificationId: number): Promise<void> {
    const sql = `
      UPDATE notifications
      SET is_read = TRUE, read_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    await dbCustom.query(sql, [notificationId]);
  }

  /**
   * Sync data from Moodle
   */
  async syncFromMoodle(syncType: 'users' | 'courses' | 'enrollments' | 'grades' | 'full'): Promise<SyncStatus> {
    const startTime = new Date();
    let recordsSynced = 0;
    const errors: string[] = [];

    try {
      // Log sync start
      const logSql = `
        INSERT INTO sync_logs (sync_type, status, started_at)
        VALUES (?, 'running', ?)
      `;
      const [logResult] = await dbCustom.query(logSql, [syncType, startTime]);
      const syncLogId = (logResult as any).insertId;

      // Perform sync based on type
      if (syncType === 'users' || syncType === 'full') {
        // Sync users logic here
        recordsSynced += 0; // Placeholder
      }

      if (syncType === 'courses' || syncType === 'full') {
        // Sync courses logic here
        recordsSynced += 0; // Placeholder
      }

      if (syncType === 'enrollments' || syncType === 'full') {
        // Sync enrollments logic here
        recordsSynced += 0; // Placeholder
      }

      if (syncType === 'grades' || syncType === 'full') {
        // Sync grades logic here
        recordsSynced += 0; // Placeholder
      }

      // Update sync log
      const updateLogSql = `
        UPDATE sync_logs
        SET status = 'completed', 
            completed_at = CURRENT_TIMESTAMP,
            records_synced = ?
        WHERE id = ?
      `;
      await dbCustom.query(updateLogSql, [recordsSynced, syncLogId]);

      return {
        lastSyncAt: new Date(),
        status: 'completed',
        recordsSynced,
        errors: errors.length > 0 ? errors : undefined,
      };
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Unknown error');
      
      return {
        lastSyncAt: startTime,
        status: 'failed',
        recordsSynced,
        errors,
      };
    }
  }
}

// Export singleton instance
export const lmsDatabase = new LMSDatabaseService();
export default lmsDatabase;
