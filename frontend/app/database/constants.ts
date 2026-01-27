// ========================================
// CONSTANTS & FILTER OPTIONS
// ข้อมูลคงที่สำหรับใช้ในระบบ
// ========================================

// ========================================
// FILTER OPTIONS
// ========================================

export const filterOptions = {
  categories: [
    'การผลิต',
    'คุณภาพ',
    'ความปลอดภัย',
    'ภาวะผู้นำ',
    'การจัดการ',
    'ทักษะส่วนบุคคล',
    'เทคโนโลยี',
    'HR',
    'การเงิน',
    'การตลาด',
  ],

  levels: [
    'L0',
    'L1',
    'L2',
    'L3',
    'L4',
    'L5',
    'L6',
    'L7',
    'L8',
    'L9',
    'L10',
    'L11',
    'L12',
    'L13',
  ],

  departments: [
    'การผลิต',
    'HR',
    'IT',
    'QA',
    'Safety',
    'PMO',
    'Finance',
    'Marketing',
    'Sales',
    'Operations',
    'R&D',
    'Training',
  ],

  divisions: [
    'Production',
    'Quality',
    'Safety',
    'Human Resources',
    'Information Technology',
    'Project Management',
    'Finance & Accounting',
    'Marketing & Sales',
    'Operations',
    'Research & Development',
    'Learning & Development',
  ],

  roles: [
    { value: 'learner', label: 'ผู้เรียน' },
    { value: 'instructor', label: 'ผู้สอน' },
    { value: 'admin', label: 'ผู้ดูแลระบบ' },
    { value: 'course-creator', label: 'ผู้สร้างหลักสูตร' },
  ],

  statuses: [
    { value: 'active', label: 'ใช้งาน' },
    { value: 'inactive', label: 'ไม่ใช้งาน' },
    { value: 'pending', label: 'รอดำเนินการ' },
  ],

  courseStatuses: [
    { value: 'in-progress', label: 'กำลังเรียน' },
    { value: 'completed', label: 'เรียนจบแล้ว' },
    { value: 'upcoming', label: 'ยังไม่เริ่ม' },
    { value: 'overdue', label: 'เลยกำหนด' },
  ],

  activityTypes: [
    { value: 'completed', label: 'เรียนจบ' },
    { value: 'enrolled', label: 'ลงทะเบียน' },
    { value: 'certificate', label: 'ได้รับใบประกาศ' },
    { value: 'achievement', label: 'ความสำเร็จ' },
  ],

  languages: [
    'ไทย',
    'English',
    'ไทย/English',
  ],

  employeeTypes: [
    'พนักงานประจำ',
    'พนักงานชั่วคราว',
    'พนักงานสัญญาจ้าง',
    'พนักงานรายวัน',
  ],
};

// ========================================
// CALENDAR CONSTANTS
// ========================================

export const calendarConstants = {
  thaiMonths: [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ],

  thaiMonthsShort: [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย.',
    'ธ.ค.',
  ],

  thaiDays: [
    'อา',
    'จ',
    'อ',
    'พ',
    'พฤ',
    'ศ',
    'ส',
  ],

  thaiDaysFull: [
    'อาทิตย์',
    'จันทร์',
    'อังคาร',
    'พุธ',
    'พฤหัสบดี',
    'ศุกร์',
    'เสาร์',
  ],

  englishMonths: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],

  englishMonthsShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],

  englishDays: [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ],

  englishDaysFull: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
};

// ========================================
// NAVIGATION ITEMS
// ========================================

export const navigationItems = {
  base: [
    { name: 'หน้าหลัก', href: '/', icon: 'home' },
    { name: 'แค็ตตาล็อก', href: '/catalog', icon: 'book' },
    { name: 'ตารางเรียน', href: '/schedule', icon: 'calendar' },
  ],

  roleSpecific: {
    learner: [
      { name: 'แดชบอร์ด', href: '/learner', icon: 'dashboard' },
      { name: 'หลักสูตรของฉัน', href: '/learner/my-courses', icon: 'book-open' },
      { name: 'กิจกรรม', href: '/activities', icon: 'activity' },
      { name: 'ความคืบหน้า', href: '/progress', icon: 'chart' },
      { name: 'ใบประกาศ', href: '/certificates', icon: 'award' },
      { name: 'โปรไฟล์', href: '/profile', icon: 'user' },
    ],

    instructor: [
      { name: 'แดชบอร์ด', href: '/instructor', icon: 'dashboard' },
      { name: 'หลักสูตรของฉัน', href: '/instructor/courses', icon: 'book' },
      { name: 'งานที่มอบหมาย', href: '/instructor/assignments', icon: 'clipboard' },
      { name: 'นักเรียน', href: '/instructor/students', icon: 'users' },
      { name: 'รายงาน', href: '/instructor/reports', icon: 'chart' },
      { name: 'โปรไฟล์', href: '/profile', icon: 'user' },
    ],

    admin: [
      { name: 'แดชบอร์ด', href: '/admin', icon: 'dashboard' },
      { name: 'จัดการผู้ใช้', href: '/admin/users', icon: 'users' },
      { name: 'จัดการหลักสูตร', href: '/admin/courses', icon: 'book' },
      { name: 'รายงาน', href: '/admin/reports', icon: 'chart' },
      { name: 'ตั้งค่า', href: '/admin/settings', icon: 'settings' },
      { name: 'โปรไฟล์', href: '/profile', icon: 'user' },
    ],

    'course-creator': [
      { name: 'แดชบอร์ด', href: '/course-creator', icon: 'dashboard' },
      { name: 'หลักสูตรของฉัน', href: '/course-creator/courses', icon: 'book' },
      { name: 'สร้างหลักสูตร', href: '/course-creator/create', icon: 'plus' },
      { name: 'เนื้อหา', href: '/course-creator/content', icon: 'file' },
      { name: 'สถิติ', href: '/course-creator/analytics', icon: 'chart' },
      { name: 'โปรไฟล์', href: '/profile', icon: 'user' },
    ],
  },
};

// ========================================
// GRADE SCALES
// ========================================

export const gradeScales = {
  letter: [
    { min: 90, max: 100, grade: 'A', gpa: 4.0 },
    { min: 85, max: 89, grade: 'B+', gpa: 3.5 },
    { min: 80, max: 84, grade: 'B', gpa: 3.0 },
    { min: 75, max: 79, grade: 'C+', gpa: 2.5 },
    { min: 70, max: 74, grade: 'C', gpa: 2.0 },
    { min: 65, max: 69, grade: 'D+', gpa: 1.5 },
    { min: 60, max: 64, grade: 'D', gpa: 1.0 },
    { min: 0, max: 59, grade: 'F', gpa: 0.0 },
  ],

  passFail: [
    { min: 70, max: 100, grade: 'Pass', status: 'passed' },
    { min: 0, max: 69, grade: 'Fail', status: 'failed' },
  ],
};

// ========================================
// HELPER FUNCTIONS
// ========================================

export const getCategories = () => filterOptions.categories;
export const getLevels = () => filterOptions.levels;
export const getDepartments = () => filterOptions.departments;
export const getDivisions = () => filterOptions.divisions;
export const getRoles = () => filterOptions.roles;
export const getStatuses = () => filterOptions.statuses;
export const getCourseStatuses = () => filterOptions.courseStatuses;
export const getActivityTypes = () => filterOptions.activityTypes;
export const getLanguages = () => filterOptions.languages;
export const getEmployeeTypes = () => filterOptions.employeeTypes;

export const getThaiMonths = () => calendarConstants.thaiMonths;
export const getThaiMonthsShort = () => calendarConstants.thaiMonthsShort;
export const getThaiDays = () => calendarConstants.thaiDays;
export const getThaiDaysFull = () => calendarConstants.thaiDaysFull;

export const getNavigationItems = (role: string) => {
  const base = navigationItems.base;
  const specific = navigationItems.roleSpecific[role as keyof typeof navigationItems.roleSpecific] || [];
  return [...base, ...specific];
};

export const getGradeFromScore = (score: number): string => {
  const scale = gradeScales.letter.find(s => score >= s.min && score <= s.max);
  return scale?.grade || 'F';
};

export const getGPAFromScore = (score: number): number => {
  const scale = gradeScales.letter.find(s => score >= s.min && score <= s.max);
  return scale?.gpa || 0.0;
};

// ========================================
// EXPORT ALL
// ========================================

export default {
  filterOptions,
  calendarConstants,
  navigationItems,
  gradeScales,
  
  // Helper functions
  getCategories,
  getLevels,
  getDepartments,
  getDivisions,
  getRoles,
  getStatuses,
  getCourseStatuses,
  getActivityTypes,
  getLanguages,
  getEmployeeTypes,
  getThaiMonths,
  getThaiMonthsShort,
  getThaiDays,
  getThaiDaysFull,
  getNavigationItems,
  getGradeFromScore,
  getGPAFromScore,
};
