// ========================================
// MOODLE API CLIENT
// Toggle ระหว่าง Mock Data และ Real Moodle API
// ========================================

import {
  MoodleUser,
  MoodleCourse,
  MoodleEnrolledCourse,
  MoodleQuiz,
  MoodleAssignment,
  MoodleGradeItem,
  MoodleCourseSection,
  MoodleCalendarEvent,
  MoodleNotification,
  MoodleMessage,
  MoodleBadge,
  MoodleIssuedCertificate,
  MoodleSiteInfo,
  MoodleAPIResponse,
  MoodleCategory,
  MoodleQuizAttempt,
  MoodleSubmission,
} from './moodle-types';

// ========================================
// CONFIGURATION
// ========================================

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API !== 'false';
const MOODLE_URL = process.env.NEXT_PUBLIC_MOODLE_URL || 'http://localhost:8080';
const MOODLE_TOKEN = process.env.NEXT_PUBLIC_MOODLE_TOKEN || '';

// ========================================
// MOCK DATA IMPORTS
// ========================================

import { mockUsers, mockCourses, mockEnrollments } from '../mock/users.mock';
import { mockQuizzes, mockQuizAttempts } from '../mock/quizzes.mock';
import { mockAssignments, mockSubmissions } from '../mock/assignments.mock';
import { mockGrades } from '../mock/grades.mock';
import { mockCourseSections } from '../mock/course-content.mock';
import { mockCalendarEvents } from '../mock/calendar.mock';
import { mockNotifications } from '../mock/notifications.mock';
import { mockMessages } from '../mock/messages.mock';
import { mockBadges, mockCertificates } from '../mock/achievements.mock';
import { mockCategories } from '../mock/categories.mock';

// ========================================
// API CLIENT CLASS
// ========================================

class MoodleAPIClient {
  private baseUrl: string;
  private token: string;
  private useMock: boolean;

  constructor() {
    this.baseUrl = MOODLE_URL;
    this.token = MOODLE_TOKEN;
    this.useMock = USE_MOCK;
  }

  // Generic API call method
  private async callAPI<T>(
    wsfunction: string,
    params: Record<string, any> = {}
  ): Promise<MoodleAPIResponse<T>> {
    if (this.useMock) {
      return this.handleMockRequest<T>(wsfunction, params);
    }

    try {
      const urlParams = new URLSearchParams({
        wstoken: this.token,
        wsfunction: wsfunction,
        moodlewsrestformat: 'json',
        ...params,
      });

      const response = await fetch(
        `${this.baseUrl}/webservice/rest/server.php?${urlParams}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const data = await response.json();

      // Check for Moodle error response
      if (data.exception) {
        return {
          data: null as any,
          exception: data.exception,
          errorcode: data.errorcode,
          message: data.message,
          debuginfo: data.debuginfo,
        };
      }

      return { data };
    } catch (error) {
      console.error(`API Error [${wsfunction}]:`, error);
      throw error;
    }
  }

  // Mock request handler
  private async handleMockRequest<T>(
    wsfunction: string,
    params: Record<string, any>
  ): Promise<MoodleAPIResponse<T>> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 200));

    const mockHandlers: Record<string, () => any> = {
      // User functions
      'core_user_get_users_by_field': () => {
        const { field, values } = params;
        if (field === 'id') {
          return mockUsers.filter((u) => values.includes(u.id));
        }
        if (field === 'username') {
          return mockUsers.filter((u) => values.includes(u.username));
        }
        return mockUsers;
      },
      'core_user_get_users': () => mockUsers,

      // Course functions
      'core_course_get_courses': () => {
        if (params.options?.ids) {
          return mockCourses.filter((c) => params.options.ids.includes(c.id));
        }
        return mockCourses;
      },
      'core_course_get_courses_by_field': () => {
        const { field, value } = params;
        if (field === 'id') {
          return { courses: mockCourses.filter((c) => c.id === parseInt(value)) };
        }
        if (field === 'category') {
          return { courses: mockCourses.filter((c) => c.categoryid === parseInt(value)) };
        }
        return { courses: mockCourses };
      },
      'core_course_get_contents': () => {
        const { courseid } = params;
        return mockCourseSections.filter((s) => s.courseid === courseid).map((s) => s.section);
      },
      'core_course_get_categories': () => mockCategories,

      // Enrollment functions
      'core_enrol_get_users_courses': () => {
        const { userid } = params;
        const userEnrollments = mockEnrollments.filter((e) => e.userid === userid);
        return userEnrollments.map((e) => {
          const course = mockCourses.find((c) => c.id === e.courseid);
          return {
            ...course,
            progress: e.progress,
            completed: e.completed,
          };
        });
      },

      // Quiz functions
      'mod_quiz_get_quizzes_by_courses': () => {
        const { courseids } = params;
        if (courseids) {
          return { quizzes: mockQuizzes.filter((q) => courseids.includes(q.course)) };
        }
        return { quizzes: mockQuizzes };
      },
      'mod_quiz_get_user_attempts': () => {
        const { quizid, userid } = params;
        return {
          attempts: mockQuizAttempts.filter(
            (a) => a.quiz === quizid && a.userid === userid
          ),
        };
      },

      // Assignment functions
      'mod_assign_get_assignments': () => {
        const { courseids } = params;
        if (courseids) {
          const courses = courseids.map((id: number) => ({
            id,
            assignments: mockAssignments.filter((a) => a.course === id),
          }));
          return { courses };
        }
        return { courses: [{ id: 0, assignments: mockAssignments }] };
      },
      'mod_assign_get_submissions': () => {
        const { assignmentids } = params;
        return {
          assignments: assignmentids.map((id: number) => ({
            assignmentid: id,
            submissions: mockSubmissions.filter((s) => s.assignment === id),
          })),
        };
      },

      // Grade functions
      'gradereport_user_get_grade_items': () => {
        const { courseid, userid } = params;
        const grades = mockGrades.filter(
          (g) => g.courseid === courseid && g.userid === userid
        );
        return {
          usergrades: [
            {
              courseid,
              userid,
              gradeitems: grades[0]?.gradeitems || [],
            },
          ],
        };
      },

      // Calendar functions
      'core_calendar_get_calendar_events': () => {
        const { events } = params;
        let filtered = [...mockCalendarEvents];
        if (events?.courseids) {
          filtered = filtered.filter((e) =>
            e.course ? events.courseids.includes(e.course.id) : false
          );
        }
        return { events: filtered };
      },

      // Notification functions
      'message_popup_get_popup_notifications': () => {
        const { useridto } = params;
        return {
          notifications: mockNotifications.filter((n) => n.useridto === useridto),
        };
      },

      // Message functions
      'core_message_get_messages': () => {
        const { useridto, useridfrom } = params;
        let filtered = [...mockMessages];
        if (useridto) {
          filtered = filtered.filter((m) => m.useridto === useridto);
        }
        if (useridfrom) {
          filtered = filtered.filter((m) => m.useridfrom === useridfrom);
        }
        return { messages: filtered };
      },

      // Badge functions
      'core_badges_get_user_badges': () => {
        const { userid } = params;
        return {
          badges: mockBadges.filter((b) => b.userid === userid),
        };
      },

      // Certificate functions (custom plugin)
      'mod_customcert_get_issued_certificates': () => {
        const { userid } = params;
        return mockCertificates.filter((c) => c.userid === userid);
      },

      // Site info
      'core_webservice_get_site_info': () => ({
        sitename: 'LMS Development',
        username: 'admin',
        firstname: 'Admin',
        lastname: 'User',
        fullname: 'Admin User',
        lang: 'th',
        userid: 1,
        siteurl: this.baseUrl,
        userpictureurl: '',
        release: 'Moodle 4.3',
        version: '2023112300',
        userissiteadmin: true,
      }),
    };

    const handler = mockHandlers[wsfunction];
    if (handler) {
      return { data: handler() };
    }

    console.warn(`Mock handler not found for: ${wsfunction}`);
    return { data: null as any, warnings: [{ item: wsfunction, itemid: 0, warningcode: 'mock_not_found', message: 'Mock handler not implemented' }] };
  }

  // ========================================
  // PUBLIC API METHODS
  // ========================================

  // User methods
  async getUsers(): Promise<MoodleUser[]> {
    const response = await this.callAPI<MoodleUser[]>('core_user_get_users');
    return response.data || [];
  }

  async getUserById(id: number): Promise<MoodleUser | null> {
    const response = await this.callAPI<MoodleUser[]>('core_user_get_users_by_field', {
      field: 'id',
      values: [id],
    });
    return response.data?.[0] || null;
  }

  async getUserByUsername(username: string): Promise<MoodleUser | null> {
    const response = await this.callAPI<MoodleUser[]>('core_user_get_users_by_field', {
      field: 'username',
      values: [username],
    });
    return response.data?.[0] || null;
  }

  // Course methods
  async getCourses(ids?: number[]): Promise<MoodleCourse[]> {
    const response = await this.callAPI<MoodleCourse[]>('core_course_get_courses', {
      options: ids ? { ids } : undefined,
    });
    return response.data || [];
  }

  async getCourseById(id: number): Promise<MoodleCourse | null> {
    const response = await this.callAPI<{ courses: MoodleCourse[] }>(
      'core_course_get_courses_by_field',
      { field: 'id', value: id }
    );
    return response.data?.courses?.[0] || null;
  }

  async getCourseContents(courseid: number): Promise<MoodleCourseSection[]> {
    const response = await this.callAPI<MoodleCourseSection[]>(
      'core_course_get_contents',
      { courseid }
    );
    return response.data || [];
  }

  async getCategories(): Promise<MoodleCategory[]> {
    const response = await this.callAPI<MoodleCategory[]>('core_course_get_categories');
    return response.data || [];
  }

  // Enrollment methods
  async getUserCourses(userid: number): Promise<MoodleEnrolledCourse[]> {
    const response = await this.callAPI<MoodleEnrolledCourse[]>(
      'core_enrol_get_users_courses',
      { userid }
    );
    return response.data || [];
  }

  // Quiz methods
  async getQuizzesByCourses(courseids: number[]): Promise<MoodleQuiz[]> {
    const response = await this.callAPI<{ quizzes: MoodleQuiz[] }>(
      'mod_quiz_get_quizzes_by_courses',
      { courseids }
    );
    return response.data?.quizzes || [];
  }

  async getQuizAttempts(quizid: number, userid: number): Promise<MoodleQuizAttempt[]> {
    const response = await this.callAPI<{ attempts: MoodleQuizAttempt[] }>(
      'mod_quiz_get_user_attempts',
      { quizid, userid }
    );
    return response.data?.attempts || [];
  }

  // Assignment methods
  async getAssignmentsByCourses(
    courseids: number[]
  ): Promise<{ id: number; assignments: MoodleAssignment[] }[]> {
    const response = await this.callAPI<{
      courses: { id: number; assignments: MoodleAssignment[] }[];
    }>('mod_assign_get_assignments', { courseids });
    return response.data?.courses || [];
  }

  async getSubmissions(
    assignmentids: number[]
  ): Promise<{ assignmentid: number; submissions: MoodleSubmission[] }[]> {
    const response = await this.callAPI<{
      assignments: { assignmentid: number; submissions: MoodleSubmission[] }[];
    }>('mod_assign_get_submissions', { assignmentids });
    return response.data?.assignments || [];
  }

  // Grade methods
  async getUserGrades(
    courseid: number,
    userid: number
  ): Promise<{ gradeitems: MoodleGradeItem[] }> {
    const response = await this.callAPI<{
      usergrades: { courseid: number; userid: number; gradeitems: MoodleGradeItem[] }[];
    }>('gradereport_user_get_grade_items', { courseid, userid });
    return response.data?.usergrades?.[0] || { gradeitems: [] };
  }

  // Calendar methods
  async getCalendarEvents(courseids?: number[]): Promise<MoodleCalendarEvent[]> {
    const response = await this.callAPI<{ events: MoodleCalendarEvent[] }>(
      'core_calendar_get_calendar_events',
      { events: courseids ? { courseids } : {} }
    );
    return response.data?.events || [];
  }

  // Notification methods
  async getNotifications(userid: number): Promise<MoodleNotification[]> {
    const response = await this.callAPI<{ notifications: MoodleNotification[] }>(
      'message_popup_get_popup_notifications',
      { useridto: userid }
    );
    return response.data?.notifications || [];
  }

  // Message methods
  async getMessages(userid: number): Promise<MoodleMessage[]> {
    const response = await this.callAPI<{ messages: MoodleMessage[] }>(
      'core_message_get_messages',
      { useridto: userid }
    );
    return response.data?.messages || [];
  }

  // Badge methods
  async getUserBadges(userid: number): Promise<MoodleBadge[]> {
    const response = await this.callAPI<{ badges: MoodleBadge[] }>(
      'core_badges_get_user_badges',
      { userid }
    );
    return response.data?.badges || [];
  }

  // Certificate methods
  async getUserCertificates(userid: number): Promise<MoodleIssuedCertificate[]> {
    const response = await this.callAPI<MoodleIssuedCertificate[]>(
      'mod_customcert_get_issued_certificates',
      { userid }
    );
    return response.data || [];
  }

  // Site info
  async getSiteInfo(): Promise<MoodleSiteInfo | null> {
    const response = await this.callAPI<MoodleSiteInfo>('core_webservice_get_site_info');
    return response.data || null;
  }
}

// ========================================
// SINGLETON EXPORT
// ========================================

export const moodleAPI = new MoodleAPIClient();

// ========================================
// HELPER FUNCTIONS
// ========================================

export function formatMoodleDate(timestamp: number): string {
  if (!timestamp) return '';
  return new Date(timestamp * 1000).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatMoodleDateTime(timestamp: number): string {
  if (!timestamp) return '';
  return new Date(timestamp * 1000).toLocaleString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getMoodleTimestamp(date: Date = new Date()): number {
  return Math.floor(date.getTime() / 1000);
}
