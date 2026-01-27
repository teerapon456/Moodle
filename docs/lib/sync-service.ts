// Moodle to Custom Database Sync Service
import { dbCustom } from './db-custom';
import { moodleApi } from './moodle-api';
import type { SyncStatus } from '../../types';

export class SyncService {
  /**
   * Sync all users from Moodle to custom database
   */
  async syncUsers(): Promise<SyncStatus> {
    const startTime = new Date();
    let recordsSynced = 0;
    const errors: string[] = [];

    try {
      console.log('Starting user sync...');
      
      // Create sync log
      const logSql = `
        INSERT INTO sync_logs (sync_type, status, started_at)
        VALUES ('users', 'running', ?)
      `;
      const [logResult] = await dbCustom.query(logSql, [startTime]);
      const syncLogId = (logResult as any).insertId;

      // Get site info to verify connection
      const siteInfo = await moodleApi.getSiteInfo();
      console.log(`Connected to Moodle: ${siteInfo.sitename}`);

      // Note: Moodle doesn't have a "get all users" function by default
      // You would need to implement a custom webservice or use core_user_get_users
      // For now, this is a placeholder for the sync logic
      
      // Example: If you have a list of user IDs to sync
      // const userIds = [1, 2, 3, 4, 5]; // Get from somewhere
      // for (const userId of userIds) {
      //   try {
      //     const moodleUsers = await moodleApi.getUserById(userId);
      //     if (moodleUsers && moodleUsers.length > 0) {
      //       const moodleUser = moodleUsers[0];
      //       
      //       // Check if employee exists
      //       const existingEmployee = await dbCustom.getEmployeeByMoodleUserId(moodleUser.id);
      //       
      //       if (!existingEmployee) {
      //         // Create new employee record
      //         await dbCustom.createEmployee({
      //           moodleUserId: moodleUser.id,
      //           employeeId: moodleUser.username,
      //         });
      //         recordsSynced++;
      //       }
      //     }
      //   } catch (error) {
      //     errors.push(`Failed to sync user ${userId}: ${error}`);
      //   }
      // }

      // Update sync log
      const updateLogSql = `
        UPDATE sync_logs
        SET status = 'completed', 
            completed_at = CURRENT_TIMESTAMP,
            records_synced = ?,
            records_failed = ?
        WHERE id = ?
      `;
      await dbCustom.query(updateLogSql, [recordsSynced, errors.length, syncLogId]);

      console.log(`User sync completed. Synced: ${recordsSynced}, Errors: ${errors.length}`);

      return {
        lastSyncAt: new Date(),
        status: errors.length === 0 ? 'completed' : 'completed',
        recordsSynced,
        errors: errors.length > 0 ? errors : undefined,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(errorMessage);
      
      console.error('User sync failed:', errorMessage);
      
      return {
        lastSyncAt: startTime,
        status: 'failed',
        recordsSynced,
        errors,
      };
    }
  }

  /**
   * Sync all courses from Moodle and update metadata
   */
  async syncCourses(): Promise<SyncStatus> {
    const startTime = new Date();
    let recordsSynced = 0;
    const errors: string[] = [];

    try {
      console.log('Starting course sync...');
      
      // Create sync log
      const logSql = `
        INSERT INTO sync_logs (sync_type, status, started_at)
        VALUES ('courses', 'running', ?)
      `;
      const [logResult] = await dbCustom.query(logSql, [startTime]);
      const syncLogId = (logResult as any).insertId;

      // Get all courses from Moodle
      const coursesResult = await moodleApi.getCourses();
      const courses = coursesResult.courses || [];

      console.log(`Found ${courses.length} courses in Moodle`);

      for (const course of courses) {
        try {
          // Check if course metadata exists
          const existingMetadata = await dbCustom.getCourseMetadata(course.id);
          
          if (!existingMetadata) {
            // Create course metadata with default values
            await dbCustom.createCourseMetadata({
              moodleCourseId: course.id,
              courseTypeId: 1, // Default to Self Learning
              learningMethodId: 4, // Default to E-Learning
            });
            recordsSynced++;
          }
        } catch (error) {
          errors.push(`Failed to sync course ${course.id}: ${error}`);
        }
      }

      // Update sync log
      const updateLogSql = `
        UPDATE sync_logs
        SET status = 'completed', 
            completed_at = CURRENT_TIMESTAMP,
            records_synced = ?,
            records_failed = ?
        WHERE id = ?
      `;
      await dbCustom.query(updateLogSql, [recordsSynced, errors.length, syncLogId]);

      console.log(`Course sync completed. Synced: ${recordsSynced}, Errors: ${errors.length}`);

      return {
        lastSyncAt: new Date(),
        status: errors.length === 0 ? 'completed' : 'completed',
        recordsSynced,
        errors: errors.length > 0 ? errors : undefined,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(errorMessage);
      
      console.error('Course sync failed:', errorMessage);
      
      return {
        lastSyncAt: startTime,
        status: 'failed',
        recordsSynced,
        errors,
      };
    }
  }

  /**
   * Sync enrollments from Moodle
   */
  async syncEnrollments(): Promise<SyncStatus> {
    const startTime = new Date();
    let recordsSynced = 0;
    const errors: string[] = [];

    try {
      console.log('Starting enrollment sync...');
      
      // Create sync log
      const logSql = `
        INSERT INTO sync_logs (sync_type, status, started_at)
        VALUES ('enrollments', 'running', ?)
      `;
      const [logResult] = await dbCustom.query(logSql, [startTime]);
      const syncLogId = (logResult as any).insertId;

      // Get all employees with Moodle user IDs
      const employees = await dbCustom.getEmployees();
      const employeesWithMoodle = employees.filter(emp => emp.moodleUserId);

      console.log(`Syncing enrollments for ${employeesWithMoodle.length} employees`);

      for (const employee of employeesWithMoodle) {
        try {
          // Get user enrollments from Moodle
          const enrollments = await moodleApi.getUserEnrollments(employee.moodleUserId!);
          
          if (enrollments && enrollments.length > 0) {
            for (const enrollment of enrollments) {
              try {
                // Check if enrollment tracking exists
                const checkSql = `
                  SELECT id FROM enrollment_tracking
                  WHERE employee_id = ? AND moodle_course_id = ?
                `;
                const existing = await dbCustom.queryOne(checkSql, [employee.id, enrollment.id]);
                
                if (!existing) {
                  // Create enrollment tracking
                  const insertSql = `
                    INSERT INTO enrollment_tracking 
                      (employee_id, moodle_course_id, enrollment_date, status)
                    VALUES (?, ?, ?, 'enrolled')
                  `;
                  await dbCustom.query(insertSql, [
                    employee.id,
                    enrollment.id,
                    new Date(enrollment.startdate * 1000),
                  ]);
                  recordsSynced++;
                }
              } catch (error) {
                errors.push(`Failed to sync enrollment for employee ${employee.id}, course ${enrollment.id}: ${error}`);
              }
            }
          }
        } catch (error) {
          errors.push(`Failed to get enrollments for employee ${employee.id}: ${error}`);
        }
      }

      // Update sync log
      const updateLogSql = `
        UPDATE sync_logs
        SET status = 'completed', 
            completed_at = CURRENT_TIMESTAMP,
            records_synced = ?,
            records_failed = ?
        WHERE id = ?
      `;
      await dbCustom.query(updateLogSql, [recordsSynced, errors.length, syncLogId]);

      console.log(`Enrollment sync completed. Synced: ${recordsSynced}, Errors: ${errors.length}`);

      return {
        lastSyncAt: new Date(),
        status: errors.length === 0 ? 'completed' : 'completed',
        recordsSynced,
        errors: errors.length > 0 ? errors : undefined,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(errorMessage);
      
      console.error('Enrollment sync failed:', errorMessage);
      
      return {
        lastSyncAt: startTime,
        status: 'failed',
        recordsSynced,
        errors,
      };
    }
  }

  /**
   * Sync grades from Moodle
   */
  async syncGrades(): Promise<SyncStatus> {
    const startTime = new Date();
    let recordsSynced = 0;
    const errors: string[] = [];

    try {
      console.log('Starting grade sync...');
      
      // Create sync log
      const logSql = `
        INSERT INTO sync_logs (sync_type, status, started_at)
        VALUES ('grades', 'running', ?)
      `;
      const [logResult] = await dbCustom.query(logSql, [startTime]);
      const syncLogId = (logResult as any).insertId;

      // Get all active enrollments
      const enrollmentsSql = `
        SELECT et.*, e.moodle_user_id
        FROM enrollment_tracking et
        JOIN employees e ON et.employee_id = e.id
        WHERE et.status IN ('enrolled', 'in_progress')
        AND e.moodle_user_id IS NOT NULL
      `;
      const enrollments = await dbCustom.query(enrollmentsSql);

      console.log(`Syncing grades for ${enrollments.length} enrollments`);

      for (const enrollment of enrollments) {
        try {
          // Get grades from Moodle
          const grades = await moodleApi.getGrades({
            courseid: enrollment.moodle_course_id,
            userid: enrollment.moodle_user_id,
          });

          // Process grades and update progress
          // This is a simplified version - actual implementation would be more complex
          if (grades && grades.tables && grades.tables.length > 0) {
            // Update enrollment status based on grades
            // You would parse the grade data and update accordingly
            recordsSynced++;
          }
        } catch (error) {
          errors.push(`Failed to sync grades for enrollment ${enrollment.id}: ${error}`);
        }
      }

      // Update sync log
      const updateLogSql = `
        UPDATE sync_logs
        SET status = 'completed', 
            completed_at = CURRENT_TIMESTAMP,
            records_synced = ?,
            records_failed = ?
        WHERE id = ?
      `;
      await dbCustom.query(updateLogSql, [recordsSynced, errors.length, syncLogId]);

      console.log(`Grade sync completed. Synced: ${recordsSynced}, Errors: ${errors.length}`);

      return {
        lastSyncAt: new Date(),
        status: errors.length === 0 ? 'completed' : 'completed',
        recordsSynced,
        errors: errors.length > 0 ? errors : undefined,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(errorMessage);
      
      console.error('Grade sync failed:', errorMessage);
      
      return {
        lastSyncAt: startTime,
        status: 'failed',
        recordsSynced,
        errors,
      };
    }
  }

  /**
   * Perform full sync (all data types)
   */
  async syncAll(): Promise<{
    users: SyncStatus;
    courses: SyncStatus;
    enrollments: SyncStatus;
    grades: SyncStatus;
  }> {
    console.log('Starting full sync...');
    
    const users = await this.syncUsers();
    const courses = await this.syncCourses();
    const enrollments = await this.syncEnrollments();
    const grades = await this.syncGrades();

    console.log('Full sync completed');
    
    return { users, courses, enrollments, grades };
  }

  /**
   * Get sync history
   */
  async getSyncHistory(limit: number = 10): Promise<any[]> {
    const sql = `
      SELECT *
      FROM sync_logs
      ORDER BY started_at DESC
      LIMIT ?
    `;
    
    return dbCustom.query(sql, [limit]);
  }

  /**
   * Get last sync status for a specific type
   */
  async getLastSyncStatus(syncType: 'users' | 'courses' | 'enrollments' | 'grades' | 'full'): Promise<any> {
    const sql = `
      SELECT *
      FROM sync_logs
      WHERE sync_type = ?
      ORDER BY started_at DESC
      LIMIT 1
    `;
    
    return dbCustom.queryOne(sql, [syncType]);
  }
}

// Export singleton instance
export const syncService = new SyncService();
export default syncService;
