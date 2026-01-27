// ========================================
// MOODLE WEB SERVICES API TYPES
// Types ที่ตรงกับ Moodle REST API response format
// Reference: https://docs.moodle.org/dev/Web_service_API_functions
// ========================================

// ========================================
// CORE USER TYPES
// API: core_user_get_users, core_user_get_users_by_field
// ========================================

export interface MoodleCustomField {
  type: string;
  value: string;
  name: string;
  shortname: string;
}

export interface MoodleUserPreference {
  name: string;
  value: string;
}

export interface MoodleRole {
  roleid: number;
  name: string;
  shortname: string;
  sortorder: number;
}

export interface MoodleUser {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  department: string;
  institution: string;
  idnumber: string; // Employee ID in corporate context
  phone1: string;
  phone2: string;
  city: string;
  country: string;
  timezone: string;
  firstaccess: number; // Unix timestamp
  lastaccess: number; // Unix timestamp
  lastlogin: number; // Unix timestamp
  description: string;
  descriptionformat: number;
  profileimageurlsmall: string;
  profileimageurl: string;
  lang: string;
  theme: string;
  mailformat: number;
  suspended: number;
  confirmed: number;
  auth: string;
  customfields?: MoodleCustomField[];
  preferences?: MoodleUserPreference[];
  roles?: MoodleRole[];
}

// ========================================
// COURSE TYPES
// API: core_course_get_courses, core_course_get_courses_by_field
// ========================================

export interface MoodleCourseFormatOption {
  name: string;
  value: string | number;
}

export interface MoodleCourse {
  id: number;
  shortname: string;
  fullname: string;
  displayname: string;
  summary: string;
  summaryformat: number;
  format: string; // topics, weeks, social, etc.
  showgrades: number;
  newsitems: number;
  startdate: number; // Unix timestamp
  enddate: number;
  numsections: number;
  maxbytes: number;
  showreports: number;
  visible: number;
  groupmode: number;
  groupmodeforce: number;
  defaultgroupingid: number;
  timecreated: number;
  timemodified: number;
  enablecompletion: number;
  completionnotify: number;
  lang: string;
  forcetheme: string;
  courseformatoptions?: MoodleCourseFormatOption[];
  // Extended fields
  categoryid: number;
  categoryname: string;
  sortorder: number;
  idnumber: string;
  courseimage?: string;
  // Progress tracking (from core_completion)
  progress?: number;
  completed?: boolean;
  completionhascriteria?: boolean;
  enrolledusercount?: number;
}

// ========================================
// CATEGORY TYPES
// API: core_course_get_categories
// ========================================

export interface MoodleCategory {
  id: number;
  name: string;
  idnumber: string;
  description: string;
  descriptionformat: number;
  parent: number;
  sortorder: number;
  coursecount: number;
  visible: number;
  visibleold: number;
  timemodified: number;
  depth: number;
  path: string;
  theme: string;
}

// ========================================
// ENROLLMENT TYPES
// API: core_enrol_get_users_courses, core_enrol_get_enrolled_users
// ========================================

export interface MoodleEnrolledCourse {
  id: number;
  shortname: string;
  fullname: string;
  displayname: string;
  enrolledusercount: number;
  idnumber: string;
  visible: number;
  summary: string;
  summaryformat: number;
  format: string;
  showgrades: number;
  lang: string;
  enablecompletion: number;
  completionhascriteria: number;
  completionusertracked: number;
  category: number;
  progress: number;
  completed: boolean;
  startdate: number;
  enddate: number;
  marker: number;
  lastaccess: number;
  isfavourite: boolean;
  hidden: boolean;
  overviewfiles: MoodleFile[];
}

export interface MoodleEnrollment {
  id: number;
  courseid: number;
  userid: number;
  enrolid: number;
  timestart: number;
  timeend: number;
  modifierid: number;
  timecreated: number;
  timemodified: number;
  status: number; // 0 = active, 1 = suspended
}

// ========================================
// COURSE CONTENT TYPES
// API: core_course_get_contents
// ========================================

export interface MoodleFile {
  filename: string;
  filepath: string;
  filesize: number;
  fileurl: string;
  timemodified: number;
  mimetype: string;
  isexternalfile: boolean;
}

export interface MoodleCompletionData {
  state: number; // 0 = incomplete, 1 = complete, 2 = complete_pass, 3 = complete_fail
  timecompleted: number;
  overrideby: number | null;
  valueused: boolean;
}

export interface MoodleModule {
  id: number;
  url: string;
  name: string;
  instance: number;
  contextid: number;
  visible: number;
  uservisible: boolean;
  visibleoncoursepage: number;
  modicon: string;
  modname: string; // assign, quiz, resource, page, url, forum, etc.
  modplural: string;
  indent: number;
  onclick: string;
  afterlink: string | null;
  customdata: string;
  noviewlink: boolean;
  completion: number;
  completiondata?: MoodleCompletionData;
  contents?: MoodleFile[];
  description?: string;
}

export interface MoodleCourseSection {
  id: number;
  name: string;
  visible: number;
  summary: string;
  summaryformat: number;
  section: number;
  hiddenbynumsections: number;
  uservisible: boolean;
  modules: MoodleModule[];
}

// ========================================
// QUIZ TYPES
// API: mod_quiz_get_quizzes_by_courses, mod_quiz_get_user_attempts
// ========================================

export interface MoodleQuiz {
  id: number;
  course: number;
  coursemodule: number;
  name: string;
  intro: string;
  introformat: number;
  introfiles: MoodleFile[];
  timeopen: number;
  timeclose: number;
  timelimit: number; // in seconds
  overduehandling: string;
  graceperiod: number;
  preferredbehaviour: string;
  canredoquestions: number;
  attempts: number;
  attemptonlast: number;
  grademethod: number; // 1=highest, 2=average, 3=first, 4=last
  decimalpoints: number;
  questiondecimalpoints: number;
  reviewattempt: number;
  reviewcorrectness: number;
  reviewmarks: number;
  reviewspecificfeedback: number;
  reviewgeneralfeedback: number;
  reviewrightanswer: number;
  reviewoverallfeedback: number;
  questionsperpage: number;
  navmethod: string;
  shuffleanswers: number;
  sumgrades: number;
  grade: number;
  timecreated: number;
  timemodified: number;
  password: string;
  subnet: string;
  browsersecurity: string;
  delay1: number;
  delay2: number;
  showuserpicture: number;
  showblocks: number;
  completionattemptsexhausted: number;
  completionminattempts: number;
  allowofflineattempts: number;
  autosaveperiod: number;
  hasfeedback: number;
  hasquestions: number;
  section: number;
  visible: number;
  groupmode: number;
  groupingid: number;
}

export interface MoodleQuizAttempt {
  id: number;
  quiz: number;
  userid: number;
  attempt: number;
  uniqueid: number;
  layout: string;
  currentpage: number;
  preview: number;
  state: 'inprogress' | 'overdue' | 'finished' | 'abandoned';
  timestart: number;
  timefinish: number;
  timemodified: number;
  timemodifiedoffline: number;
  timecheckstate: number | null;
  sumgrades: number | null;
  gradednotificationsenttime: number | null;
}

export interface MoodleQuizQuestion {
  slot: number;
  type: string; // multichoice, truefalse, shortanswer, essay, etc.
  page: number;
  html: string;
  responsefileareas: any[];
  sequencecheck: number;
  lastactiontime: number;
  hasautosavedstep: boolean;
  flagged: boolean;
  number: number;
  state: string;
  status: string;
  blockedbyprevious: boolean;
  mark: string;
  maxmark: number;
}

// ========================================
// ASSIGNMENT TYPES
// API: mod_assign_get_assignments, mod_assign_get_submissions
// ========================================

export interface MoodleAssignment {
  id: number;
  cmid: number;
  course: number;
  name: string;
  nosubmissions: number;
  submissiondrafts: number;
  sendnotifications: number;
  sendlatenotifications: number;
  sendstudentnotifications: number;
  duedate: number;
  allowsubmissionsfromdate: number;
  grade: number;
  timemodified: number;
  completionsubmit: number;
  cutoffdate: number;
  gradingduedate: number;
  teamsubmission: number;
  requireallteammemberssubmit: number;
  teamsubmissiongroupingid: number;
  blindmarking: number;
  hidegrader: number;
  revealidentities: number;
  attemptreopenmethod: string;
  maxattempts: number;
  markingworkflow: number;
  markingallocation: number;
  requiresubmissionstatement: number;
  preventsubmissionnotingroup: number;
  intro: string;
  introformat: number;
  introfiles: MoodleFile[];
  introattachments: MoodleFile[];
}

export interface MoodleSubmission {
  id: number;
  userid: number;
  attemptnumber: number;
  timecreated: number;
  timemodified: number;
  status: 'new' | 'draft' | 'submitted';
  groupid: number;
  assignment: number;
  latest: number;
  plugins: MoodleSubmissionPlugin[];
}

export interface MoodleSubmissionPlugin {
  type: string;
  name: string;
  fileareas?: {
    area: string;
    files: MoodleFile[];
  }[];
  editorfields?: {
    name: string;
    description: string;
    text: string;
    format: number;
  }[];
}

export interface MoodleGradingInfo {
  userid: number;
  grade: number | null;
  gradefordisplay: string | null;
  gradeddate: number | null;
  feedbackplugins: any[];
}

// ========================================
// GRADE TYPES
// API: gradereport_user_get_grade_items
// ========================================

export interface MoodleGradeItem {
  id: number;
  itemname: string;
  itemtype: string; // course, category, mod
  itemmodule: string; // quiz, assign, etc.
  iteminstance: number;
  itemnumber: number;
  idnumber: string;
  categoryid: number;
  outcomeid: number | null;
  scaleid: number | null;
  locked: boolean;
  cmid: number;
  weightraw: number | null;
  weightformatted: string;
  graderaw: number | null;
  gradedatesubmitted: number | null;
  gradedategraded: number | null;
  gradehiddenbydate: boolean;
  gradeneedsupdate: boolean;
  gradeishidden: boolean;
  gradeislocked: boolean;
  gradeisoverridden: boolean;
  gradeformatted: string;
  grademin: number;
  grademax: number;
  rangeformatted: string;
  percentageformatted: string;
  lettergradeformatted: string;
  rank: number;
  numusers: number;
  averageformatted: string;
  feedback: string;
  feedbackformat: number;
}

export interface MoodleUserGrades {
  courseid: number;
  courseidnumber: string;
  userid: number;
  userfullname: string;
  useridnumber: string;
  maxdepth: number;
  gradeitems: MoodleGradeItem[];
}

// ========================================
// FORUM/DISCUSSION TYPES
// API: mod_forum_get_forums_by_courses
// ========================================

export interface MoodleForum {
  id: number;
  course: number;
  type: string;
  name: string;
  intro: string;
  introformat: number;
  introfiles: MoodleFile[];
  duedate: number;
  cutoffdate: number;
  assessed: number;
  assesstimestart: number;
  assesstimefinish: number;
  scale: number;
  maxbytes: number;
  maxattachments: number;
  forcesubscribe: number;
  trackingtype: number;
  rsstype: number;
  rssarticles: number;
  timemodified: number;
  warnafter: number;
  blockafter: number;
  blockperiod: number;
  completiondiscussions: number;
  completionreplies: number;
  completionposts: number;
  cmid: number;
  numdiscussions: number;
  cancreatediscussions: boolean;
  lockdiscussionafter: number;
  istracked: boolean;
}

export interface MoodleDiscussion {
  id: number;
  name: string;
  groupid: number;
  timemodified: number;
  usermodified: number;
  timestart: number;
  timeend: number;
  discussion: number;
  parent: number;
  userid: number;
  created: number;
  modified: number;
  mailed: number;
  subject: string;
  message: string;
  messageformat: number;
  messagetrust: number;
  messageinlinefiles: MoodleFile[];
  attachment: boolean;
  attachments: MoodleFile[];
  totalscore: number;
  mailnow: number;
  userfullname: string;
  usermodifiedfullname: string;
  userpictureurl: string;
  usermodifiedpictureurl: string;
  numreplies: number;
  numunread: number;
  pinned: boolean;
  locked: boolean;
  starred: boolean;
  canreply: boolean;
  canlock: boolean;
  canfavourite: boolean;
}

// ========================================
// MESSAGE TYPES
// API: core_message_get_messages
// ========================================

export interface MoodleMessage {
  id: number;
  useridfrom: number;
  useridto: number;
  subject: string;
  text: string;
  fullmessage: string;
  fullmessageformat: number;
  fullmessagehtml: string;
  smallmessage: string;
  notification: number;
  contexturl: string;
  contexturlname: string;
  timecreated: number;
  timeread: number;
  usertofullname: string;
  userfromfullname: string;
}

export interface MoodleConversation {
  id: number;
  name: string;
  subname: string;
  imageurl: string;
  type: number;
  membercount: number;
  ismuted: boolean;
  isfavourite: boolean;
  isread: boolean;
  unreadcount: number;
  members: MoodleConversationMember[];
  messages: MoodleConversationMessage[];
  candeletemessagesforallusers: boolean;
}

export interface MoodleConversationMember {
  id: number;
  fullname: string;
  profileurl: string;
  profileimageurl: string;
  profileimageurlsmall: string;
  isonline: boolean;
  showonlinestatus: boolean;
  isblocked: boolean;
  iscontact: boolean;
  isdeleted: boolean;
  canmessageevenifblocked: boolean;
  canmessage: boolean;
  requirescontact: boolean;
  contactrequests: any[];
}

export interface MoodleConversationMessage {
  id: number;
  useridfrom: number;
  text: string;
  timecreated: number;
}

// ========================================
// CALENDAR/EVENT TYPES
// API: core_calendar_get_calendar_events
// ========================================

export interface MoodleCalendarEvent {
  id: number;
  name: string;
  description: string;
  descriptionformat: number;
  location: string;
  categoryid: number | null;
  groupid: number | null;
  userid: number | null;
  repeatid: number | null;
  eventcount: number | null;
  component: string | null;
  modulename: string;
  activityname: string;
  activitystr: string;
  instance: number;
  eventtype: string; // user, site, course, category, etc.
  timestart: number;
  timeduration: number;
  timesort: number;
  timeusermidnight: number;
  visible: number;
  timemodified: number;
  subscriptionid: number | null;
  course: MoodleCourse;
  canedit: boolean;
  candelete: boolean;
  deleteurl: string;
  editurl: string;
  viewurl: string;
  formattedtime: string;
  formattedlocation: string;
  isactionevent: boolean;
  iscourseevent: boolean;
  iscategoryevent: boolean;
  groupname: string | null;
  normalisedeventtype: string;
  normalisedeventtypetext: string;
  url: string;
  icon: {
    key: string;
    component: string;
    alttext: string;
  };
}

// ========================================
// NOTIFICATION TYPES
// API: message_popup_get_popup_notifications
// ========================================

export interface MoodleNotification {
  id: number;
  useridfrom: number;
  useridto: number;
  subject: string;
  shortenedsubject: string;
  text: string;
  fullmessage: string;
  fullmessageformat: number;
  fullmessagehtml: string;
  smallmessage: string;
  contexturl: string;
  contexturlname: string;
  timecreated: number;
  timecreatedpretty: string;
  timeread: number | null;
  read: boolean;
  deleted: boolean;
  iconurl: string;
  component: string;
  eventtype: string;
  customdata: string;
}

// ========================================
// CERTIFICATE TYPES
// Plugin: mod_certificate or mod_customcert
// ========================================

export interface MoodleCertificate {
  id: number;
  course: number;
  name: string;
  intro: string;
  introformat: number;
  requiredtime: number;
  emailteachers: number;
  emailothers: string;
  savecert: number;
  reportcert: number;
  delivery: number;
  templateid: number;
  timecreated: number;
  timemodified: number;
}

export interface MoodleIssuedCertificate {
  id: number;
  userid: number;
  certificateid: number;
  code: string;
  emailed: number;
  timecreated: number;
  // Extended info
  coursename?: string;
  certificatename?: string;
  userfullname?: string;
  downloadurl?: string;
}

// ========================================
// BADGE/ACHIEVEMENT TYPES
// API: core_badges_get_user_badges
// ========================================

export interface MoodleBadge {
  id: number;
  name: string;
  description: string;
  timecreated: number;
  timemodified: number;
  usercreated: number;
  usermodified: number;
  issuername: string;
  issuerurl: string;
  issuercontact: string;
  expiredate: number | null;
  expireperiod: number | null;
  type: number; // 1 = site, 2 = course
  courseid: number | null;
  message: string;
  messagesubject: string;
  attachment: number;
  notification: number;
  nextcron: number | null;
  status: number;
  issuedid: number;
  uniquehash: string;
  dateissued: number;
  dateexpire: number | null;
  visible: number;
  email: string;
  version: string;
  language: string;
  imageauthorname: string;
  imageauthoremail: string;
  imageauthorurl: string;
  imagecaption: string;
  badgeurl: string;
  endorsement: any | null;
  alignment: any[];
  relatedbadges: any[];
}

// ========================================
// COMPETENCY TYPES
// API: core_competency_list_competencies
// ========================================

export interface MoodleCompetency {
  id: number;
  shortname: string;
  idnumber: string;
  description: string;
  descriptionformat: number;
  sortorder: number;
  parentid: number;
  path: string;
  ruleoutcome: number;
  ruletype: string | null;
  ruleconfig: string | null;
  scaleid: number;
  scaleconfiguration: string;
  competencyframeworkid: number;
  timecreated: number;
  timemodified: number;
  usermodified: number;
}

// ========================================
// SITE INFO
// API: core_webservice_get_site_info
// ========================================

export interface MoodleSiteInfo {
  sitename: string;
  username: string;
  firstname: string;
  lastname: string;
  fullname: string;
  lang: string;
  userid: number;
  siteurl: string;
  userpictureurl: string;
  functions: {
    name: string;
    version: string;
  }[];
  downloadfiles: number;
  uploadfiles: number;
  release: string;
  version: string;
  mobilecssurl: string;
  advancedfeatures: {
    name: string;
    value: number;
  }[];
  usercanmanageownfiles: boolean;
  userquota: number;
  usermaxuploadfilesize: number;
  userhomepage: number;
  userprivateaccesskey: string;
  siteid: number;
  sitecalendartype: string;
  usercalendartype: string;
  userissiteadmin: boolean;
  theme: string;
}

// ========================================
// API RESPONSE WRAPPER
// ========================================

export interface MoodleAPIResponse<T> {
  data: T;
  warnings?: MoodleWarning[];
  exception?: string;
  errorcode?: string;
  message?: string;
  debuginfo?: string;
}

export interface MoodleWarning {
  item: string;
  itemid: number;
  warningcode: string;
  message: string;
}

// ========================================
// EXTENDED TYPES FOR LMS FRONTEND
// ========================================

export interface LMSUserWithProgress extends MoodleUser {
  enrolledCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalLearningHours: number;
  averageScore: number;
  certificates: number;
  badges: number;
  lastActivity: number;
}

export interface LMSCourseWithDetails extends MoodleCourse {
  instructor: MoodleUser;
  sections: MoodleCourseSection[];
  quizzes: MoodleQuiz[];
  assignments: MoodleAssignment[];
  forums: MoodleForum[];
  userProgress?: {
    completed: number;
    total: number;
    percentage: number;
  };
}

export interface LMSDashboardStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  upcomingCourses: number;
  totalLearningHours: number;
  certificates: number;
  averageScore: number;
  streak: number;
  rank?: number;
  totalUsers?: number;
}
