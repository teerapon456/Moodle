// Moodle Web Services API Client
import axios, { AxiosInstance, AxiosError } from 'axios';
import type { MoodleWebServiceResponse, MoodleFunctionCall } from '../../types';

class MoodleApiClient {
  private client: AxiosInstance;
  private wsUrl: string;
  private wsToken: string;

  constructor() {
    this.wsUrl = process.env.MOODLE_WS_URL || 'http://moodle:80/webservice/rest/server.php';
    this.wsToken = process.env.MOODLE_WS_TOKEN || '';

    this.client = axios.create({
      baseURL: this.wsUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * Call Moodle Web Service function
   */
  private async callFunction(
    wsfunction: string,
    params: Record<string, any> = {}
  ): Promise<any> {
    try {
      const data: MoodleFunctionCall = {
        wsfunction,
        wstoken: this.wsToken,
        moodlewsrestformat: 'json',
        ...params,
      };

      const response = await this.client.post('', new URLSearchParams(data as any));

      if (response.data.exception) {
        throw new Error(
          `Moodle API Error: ${response.data.message || response.data.errorcode}`
        );
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<MoodleWebServiceResponse>;
        if (axiosError.response?.data?.exception) {
          throw new Error(
            `Moodle API Error: ${axiosError.response.data.message || axiosError.response.data.errorcode}`
          );
        }
      }
      throw error;
    }
  }

  // User Functions
  async getUserById(userId: number) {
    return this.callFunction('core_user_get_users_by_id', { userids: [userId] });
  }

  async createUser(user: {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
  }) {
    return this.callFunction('core_user_create_users', {
      users: [user],
    });
  }

  async updateUser(userId: number, user: Partial<{
    firstname: string;
    lastname: string;
    email: string;
  }>) {
    return this.callFunction('core_user_update_users', {
      users: [{ id: userId, ...user }],
    });
  }

  // Course Functions
  async getCourses(options?: {
    ids?: number[];
    categoryid?: number;
    search?: string;
  }) {
    const params: any = {};
    if (options?.ids) params.courseids = options.ids;
    if (options?.categoryid) params.categoryid = options.categoryid;
    return this.callFunction('core_course_get_courses', params);
  }

  async getCourseById(courseId: number) {
    const result = await this.callFunction('core_course_get_courses', {
      courseids: [courseId],
    });
    return result.courses?.[0];
  }

  async createCourse(course: {
    fullname: string;
    shortname: string;
    categoryid: number;
    summary?: string;
    visible?: number;
  }) {
    return this.callFunction('core_course_create_courses', {
      courses: [course],
    });
  }

  async updateCourse(courseId: number, course: Partial<{
    fullname: string;
    shortname: string;
    summary: string;
    visible: number;
  }>) {
    return this.callFunction('core_course_update_courses', {
      courses: [{ id: courseId, ...course }],
    });
  }

  async deleteCourse(courseId: number) {
    return this.callFunction('core_course_delete_courses', {
      courseids: [courseId],
    });
  }

  // Enrollment Functions
  async enrollUser(userId: number, courseId: number, roleId: number = 5) {
    return this.callFunction('enrol_manual_enrol_users', {
      enrolments: [{
        roleid: roleId,
        userid: userId,
        courseid: courseId,
      }],
    });
  }

  async unenrollUser(userId: number, courseId: number) {
    return this.callFunction('enrol_manual_unenrol_users', {
      enrolments: [{
        userid: userId,
        courseid: courseId,
      }],
    });
  }

  async getUserEnrollments(userId: number) {
    return this.callFunction('core_enrol_get_users_courses', {
      userid: userId,
    });
  }

  async getCourseEnrollments(courseId: number) {
    return this.callFunction('core_enrol_get_enrolled_users', {
      courseid: courseId,
    });
  }

  // Grade Functions
  async getGrades(options: {
    courseid?: number;
    userid?: number;
    component?: string;
    activityid?: number;
  }) {
    return this.callFunction('gradereport_user_get_grades_table', options);
  }

  async updateGrade(itemId: number, userId: number, grade: number, feedback?: string) {
    return this.callFunction('core_grades_update_grades', {
      source: 'manual',
      courseid: 0, // Will be determined by item
      component: 'mod_assign',
      activityid: 0,
      itemnumber: 0,
      grades: [{
        studentid: userId,
        grade: grade,
        feedback: feedback || '',
      }],
    });
  }

  // Quiz Functions
  async getQuizzesByCourse(courseId: number) {
    return this.callFunction('mod_quiz_get_quizzes_by_courses', {
      courseids: [courseId],
    });
  }

  async getQuizAttempts(quizId: number, userId?: number) {
    const params: any = { quizid: quizId };
    if (userId) params.userid = userId;
    return this.callFunction('mod_quiz_get_user_attempts', params);
  }

  async getQuizAttemptReview(attemptId: number) {
    return this.callFunction('mod_quiz_get_attempt_review', {
      attemptid: attemptId,
    });
  }

  // Assignment Functions
  async getAssignmentsByCourse(courseId: number) {
    return this.callFunction('mod_assign_get_assignments', {
      courseids: [courseId],
    });
  }

  async getAssignmentSubmissions(assignmentId: number) {
    return this.callFunction('mod_assign_get_submissions', {
      assignmentids: [assignmentId],
    });
  }

  async submitAssignment(assignmentId: number, userId: number, files: string[]) {
    return this.callFunction('mod_assign_save_submission', {
      assignmentid: assignmentId,
      userid: userId,
      plugindata: {
        files_filemanager: files,
      },
    });
  }

  // Forum/Discussion Functions
  async getForumsByCourse(courseId: number) {
    return this.callFunction('mod_forum_get_forums_by_courses', {
      courseids: [courseId],
    });
  }

  async getForumDiscussions(forumId: number) {
    return this.callFunction('mod_forum_get_forum_discussions', {
      forumid: forumId,
    });
  }

  async addDiscussionPost(forumId: number, discussionId: number, subject: string, message: string) {
    return this.callFunction('mod_forum_add_discussion_post', {
      postid: 0,
      subject: subject,
      message: message,
      options: [],
    });
  }

  // Certificate Functions
  async getCertificates(userId: number, courseId?: number) {
    // Note: This requires a custom Moodle plugin
    // For now, we'll use a generic approach
    return this.callFunction('tool_certificate_issue_certificate', {
      templateid: 0,
      userid: userId,
      courseid: courseId || 0,
    });
  }

  // Notification Functions
  async getNotifications(userId: number) {
    return this.callFunction('message_popup_get_popup_notifications', {
      useridto: userId,
    });
  }

  // Site Info Functions
  async getSiteInfo() {
    return this.callFunction('core_webservice_get_site_info');
  }

  // Authentication Functions
  async authenticateUser(username: string, password: string) {
    return this.callFunction('core_auth_request_password_reset', {
      username: username,
    });
  }

  // Search Functions
  async searchCourses(query: string) {
    return this.callFunction('core_course_search_courses', {
      criterianame: 'search',
      criteriavalue: query,
    });
  }
}

// Export singleton instance
export const moodleApi = new MoodleApiClient();
export default moodleApi;
