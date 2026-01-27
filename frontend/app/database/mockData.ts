// ========================================
// CENTRALIZED MOCK DATABASE
// ใช้เป็นแหล่งข้อมูลกลางสำหรับทั้งระบบ
// ========================================

// ========================================
// TYPES & INTERFACES
// ========================================

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string; // fullName = firstName + lastName
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  employeeId: string;
  department: string;
  division: string;
  position: string;
  level: string;
  role: 'learner' | 'instructor' | 'admin' | 'course-creator';
  roleDisplay: string;
  joinDate: string;
  employeeType: string;
  avatar?: string;
  coverImage?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  username?: string;
  password?: string;
}

export interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  level: string;
  year: number;
  division: string; // หน่วยงานระดับฝ่าย (ใหญ่กว่า department)
  department: string;
  tags: string[];
  courseCode: string;
  language: string;
  startDate: string;
  duration: string;
  enrolled: number;
  progress?: number;
  status?: 'in-progress' | 'completed' | 'upcoming' | 'overdue';
  deadline?: string;
  completedDate?: string;
  thumbnail?: string;
  description?: string;
  objectives?: string[];
  syllabus?: {
    module: string;
    topics: string[];
    lessons?: {
      id: number;
      title: string;
      type: 'video' | 'document' | 'quiz' | 'assignment';
      duration: string;
      completed: boolean;
    }[];
  }[];
  assignments?: {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    maxScore: number;
    status: 'pending' | 'submitted' | 'graded';
    type?: 'project' | 'report' | 'exercise';
  }[];
  quizzes?: {
    id: number;
    title: string;
    description: string;
    duration: string;
    passingScore: number;
    status: 'completed' | 'pending';
    score?: number;
    questions?: {
      id: number;
      type: 'multiple-choice' | 'true-false';
      question: string;
      options?: string[];
      correctAnswer: number;
      explanation?: string;
    }[];
  }[];
  discussions?: {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    likes: number;
    replies: {
      id: number;
      content: string;
      author: string;
      createdAt: string;
      likes: number;
    }[];
    tags: string[];
  }[];
  resources?: {
    id: number;
    title: string;
    type: string;
    size: string;
    category: string;
    downloadUrl: string;
  }[];
  assessments?: {
    name: string;
    score: number;
    maxScore: number;
  }[];
  totalScore?: number;
  grade?: string;
  studyTime?: string;
  levelRange?: number[]; // For recommended courses [min, max]
  levelDisplay?: string; // Display format like "L2-L4"
  priority?: number; // Recommendation priority
  price?: number;
  lessons?: number;
  enrolledStudents?: number;
  certificate?: boolean;
  requirements?: string[];
}

export interface Activity {
  id: number;
  type: 'completed' | 'enrolled' | 'certificate' | 'achievement';
  title: string;
  description: string;
  date: string;
  courseId?: number;
}

export interface Certificate {
  id: string;
  courseTitle: string;
  courseCode: string;
  completedDate: string;
  certificateId: string;
  score: number;
  grade: string;
  studentName: string;
  studentId: string;
  organization: string;
  duration: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'class' | 'exam' | 'assignment' | 'event' | 'live-session' | 'webinar' | 'deadline';
  course?: string;
  location?: string;
  description?: string;
  status?: 'upcoming' | 'ongoing' | 'completed';
  instructor?: string | null;
}

export interface Lesson {
  id: number;
  courseId: number;
  title: string;
  type: 'video' | 'document' | 'quiz' | 'assignment';
  duration: string;
  completed: boolean;
  videoUrl?: string;
  content?: string;
  order: number;
}

export interface Quiz {
  id: number;
  courseId: number;
  lessonId: number;
  title: string;
  description: string;
  duration: string;
  passingScore: number;
  questions: Question[];
  totalPoints: number;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  points: number;
}

export interface Assignment {
  id: number;
  courseId: number;
  lessonId: number;
  title: string;
  description: string;
  deadline: string;
  maxScore: number;
  status: 'pending' | 'submitted' | 'graded';
  submittedDate?: string;
  score?: number;
  feedback?: string;
  attachments?: string[];
}

export interface Review {
  id: number;
  courseId: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface DashboardStats {
  totalCourses?: number;
  completedCourses?: number;
  inProgressCourses?: number;
  upcomingCourses?: number;
  totalHours?: number;
  certificates?: number;
  averageScore?: number;
  totalUsers?: number;
  activeUsers?: number;
  totalStudents?: number;
  pendingGrading?: number;
  totalTrainees?: number;
  completionRate?: number;
  activeCourses?: number;
  streak?: number;
}

export interface ProgressTimeline {
  courseId: number;
  milestones: {
    date: string;
    title: string;
    description: string;
    completed: boolean;
    type: 'start' | 'lesson' | 'quiz' | 'assignment' | 'completion';
  }[];
}

export interface Notification {
  id: number;
  type: 'course' | 'assignment' | 'quiz' | 'certificate' | 'deadline' | 'announcement' | 'system' | 'achievement' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
  icon?: string;
  priority?: 'low' | 'medium' | 'high';
  actionLabel?: string;
}

export interface NavItem {
  name: string;
  href: string;
  icon: string;
  roles?: string[];
  badge?: number;
}

// ========================================
// MOCK USERS DATA
// ========================================

export const mockUsers: User[] = [
  {
    id: 'USR-001',
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    name: 'สมชาย ใจดี', // fullName = firstName + lastName
    email: 'somchai.jaidee@inteqc.com',
    phone: '081-234-5678',
    dateOfBirth: '15 มิ.ย. 2533',
    gender: 'ชาย',
    address: '123/45 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
    employeeId: 'EMP-2024-12345',
    department: 'การผลิต',
    division: 'Production',
    position: 'ผู้ช่วยเจ้าหน้าที่วิเคราะห์การผลิต',
    level: 'L2',
    role: 'learner',
    roleDisplay: 'ผู้เรียน',
    joinDate: '1 ม.ค. 2567',
    employeeType: 'พนักงานประจำ',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop',
    emergencyContact: {
      name: 'สมหญิง ใจดี',
      phone: '082-345-6789',
      relationship: 'ภรรยา',
    },
    username: 'USR-001',
    password: 'password123',
  },
  {
    id: 'USR-002',
    firstName: 'สมหญิง',
    lastName: 'รักงาน',
    name: 'สมหญิง รักงาน', // fullName = firstName + lastName
    email: 'somying.rakngarn@inteqc.com',
    phone: '082-345-6789',
    dateOfBirth: '20 ส.ค. 2535',
    gender: 'หญิง',
    address: '456/78 ถ.พระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
    employeeId: 'EMP-2024-12346',
    department: 'HR',
    division: 'Human Resources',
    position: 'เจ้าหน้าที่ฝึกอบรม',
    level: 'L3',
    role: 'instructor',
    roleDisplay: 'ผู้สอน',
    joinDate: '15 มี.ค. 2566',
    employeeType: 'พนักงานประจำ',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop',
    emergencyContact: {
      name: 'วิชัย รักงาน',
      phone: '081-456-7890',
      relationship: 'สามี',
    },
    username: 'USR-002',
    password: 'password123',
  },
  {
    id: 'USR-003',
    firstName: 'วิชัย',
    lastName: 'ทำงานดี',
    name: 'วิชัย ทำงานดี', // fullName = firstName + lastName
    email: 'wichai.thamngandee@inteqc.com',
    phone: '083-456-7890',
    dateOfBirth: '10 ม.ค. 2530',
    gender: 'ชาย',
    address: '789/12 ถ.สาทร แขวงสีลม เขตบางรัก กรุงเทพมหานคร 10500',
    employeeId: 'EMP-2024-12347',
    department: 'IT',
    division: 'Information Technology',
    position: 'ผู้จัดการฝ่าย IT',
    level: 'L5',
    role: 'admin',
    roleDisplay: 'ผู้ดูแลระบบ',
    joinDate: '1 ม.ค. 2565',
    employeeType: 'พนักงานประจำ',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop',
    emergencyContact: {
      name: 'นิตยา ทำงานดี',
      phone: '082-567-8901',
      relationship: 'ภรรยา',
    },
    username: 'USR-003',
    password: 'password123',
  },
  {
    id: 'USR-004',
    firstName: 'ประวิทย์',
    lastName: 'ใฝ่เรียน',
    name: 'ประวิทย์ ใฝ่เรียน', // fullName = firstName + lastName
    email: 'prawit.failearn@inteqc.com',
    phone: '084-567-8901',
    dateOfBirth: '5 พ.ค. 2532',
    gender: 'ชาย',
    address: '321/45 ถ.ลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900',
    employeeId: 'EMP-2024-12348',
    department: 'Training',
    division: 'Learning & Development',
    position: 'ผู้พัฒนาหลักสูตร',
    level: 'L4',
    role: 'course-creator',
    roleDisplay: 'ผู้สร้างหลักสูตร',
    joinDate: '1 ก.ค. 2566',
    employeeType: 'พนักงานประจำ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=400&fit=crop',
    emergencyContact: {
      name: 'สุดา ใฝ่เรียน',
      phone: '083-678-9012',
      relationship: 'ภรรยา',
    },
    username: 'USR-004',
    password: 'password123',
  },
  {
    id: 'USR-005',
    firstName: 'สุดา',
    lastName: 'พูดเก่ง',
    name: 'สุดา พูดเก่ง', // fullName = firstName + lastName
    email: 'suda.poodgeng@inteqc.com',
    phone: '085-678-9012',
    dateOfBirth: '25 ก.ย. 2534',
    gender: 'หญิง',
    address: '654/32 ถ.พระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพมหานคร 10310',
    employeeId: 'EMP-2024-12349',
    department: 'QA',
    division: 'Quality Assurance',
    position: 'เจ้าหน้าที่ควบคุมคุณภาพ',
    level: 'L2',
    role: 'learner',
    roleDisplay: 'ผู้เรียน',
    joinDate: '15 ก.ย. 2567',
    employeeType: 'พนักงานประจำ',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=400&fit=crop',
    emergencyContact: {
      name: 'ชัยวัฒน์ พูดเก่ง',
      phone: '084-789-0123',
      relationship: 'สามี',
    },
    username: 'USR-005',
    password: 'password123',
  },
];

// ========================================
// MOCK COURSES DATA
// ========================================

export const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Lean Manufacturing Fundamentals',
    category: 'การผลิต',
    instructor: 'อ.วิชัย ผู้เชี่ยวชาญ',
    level: 'L1-L4',
    year: 2024,
    division: 'Production',
    department: 'การผลิต',
    tags: ['Lean', 'Manufacturing', 'Efficiency', 'Kaizen'],
    courseCode: 'LM-2024-001',
    language: 'ไทย',
    startDate: '1 ม.ค. 2568',
    duration: '40 ชม.',
    enrolled: 156,
    progress: 65,
    status: 'in-progress',
    deadline: '31 มี.ค. 2568',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    description: 'เรียนรู้หลักการและเทคนิค Lean Manufacturing เพื่อเพิ่มประสิทธิภาพการผลิต',
    objectives: [
      'เข้าใจหลักการพื้นฐานของ Lean Manufacturing',
      'สามารถระบุและลดความสูญเสียในกระบวนการผลิต',
      'ประยุกต์ใช้เครื่องมือ Lean ในการทำงานจริง',
    ],
    syllabus: [
      {
        module: '1',
        topics: ['บทนำสู่ Lean Manufacturing', 'ประวัติและวิวัฒนาการ', 'หลักการ 5 ประการ', 'Value Stream Mapping'],
        lessons: [
          { id: 1, title: 'บทนำสู่ Lean Manufacturing', type: 'video', duration: '45 นาที', completed: true },
          { id: 2, title: 'ประวัติและวิวัฒนาการ', type: 'document', duration: '30 นาที', completed: true },
          { id: 3, title: 'หลักการ 5 ประการ', type: 'video', duration: '60 นาที', completed: true },
          { id: 4, title: 'Value Stream Mapping', type: 'quiz', duration: '30 นาที', completed: false }
        ]
      },
      {
        module: '2',
        topics: ['การวิเคราะห์คุณค่า', 'Waste Identification', 'Process Mapping', 'Data Collection'],
        lessons: [
          { id: 5, title: 'การวิเคราะห์คุณค่า', type: 'video', duration: '50 นาที', completed: false },
          { id: 6, title: 'Waste Identification', type: 'document', duration: '25 นาที', completed: false },
          { id: 7, title: 'Process Mapping', type: 'assignment', duration: '90 นาที', completed: false },
          { id: 8, title: 'Data Collection', type: 'video', duration: '40 นาที', completed: false }
        ]
      },
      {
        module: '3',
        topics: ['Kaizen', 'Continuous Improvement', 'PDCA Cycle', 'Standardized Work'],
        lessons: [
          { id: 9, title: 'Kaizen คืออะไร', type: 'video', duration: '55 นาที', completed: false },
          { id: 10, title: 'Continuous Improvement', type: 'document', duration: '35 นาที', completed: false },
          { id: 11, title: 'PDCA Cycle', type: 'quiz', duration: '30 นาที', completed: false },
          { id: 12, title: 'Standardized Work', type: 'video', duration: '45 นาที', completed: false }
        ]
      },
      {
        module: '4',
        topics: ['Just-In-Time', 'Kanban System', 'Pull System', 'Inventory Management'],
        lessons: [
          { id: 13, title: 'Just-In-Time System', type: 'video', duration: '60 นาที', completed: false },
          { id: 14, title: 'Kanban System', type: 'document', duration: '40 นาที', completed: false },
          { id: 15, title: 'Pull System', type: 'assignment', duration: '120 นาที', completed: false },
          { id: 16, title: 'Inventory Management', type: 'video', duration: '50 นาที', completed: false }
        ]
      }
    ],
    assignments: [
      {
        id: 1,
        title: 'Process Improvement Project',
        description: 'วิเคราะห์กระบวนการปัจจุบันและเสนอแนะการปรับปรุงโดยใช้หลักการ Lean',
        dueDate: '2024-02-15',
        maxScore: 100,
        status: 'pending',
        type: 'project'
      },
      {
        id: 2,
        title: 'Waste Identification Report',
        description: 'สำรวจและระบุประเภทของ waste ในแผนกของคุณ',
        dueDate: '2024-02-28',
        maxScore: 50,
        status: 'pending',
        type: 'report'
      },
      {
        id: 3,
        title: 'Value Stream Mapping Exercise',
        description: 'สร้าง Value Stream Map สำหรับกระบวนการที่เลือก',
        dueDate: '2024-03-10',
        maxScore: 75,
        status: 'pending',
        type: 'exercise'
      }
    ],
    quizzes: [
      {
        id: 1,
        title: 'Quiz บทที่ 1: พื้นฐาน Lean Manufacturing',
        description: 'ทดสอบความเข้าใจหลักการพื้นฐานของ Lean Manufacturing',
        duration: '30 นาที',
        passingScore: 70,
        status: 'completed',
        score: 85,
        questions: [
          {
            id: 1,
            type: 'multiple-choice',
            question: 'ผลกระทบของการจัดการทีมที่ไม่ดีต่อองค์กรคืออะไร?',
            options: [
              'ประสิทธิภาพการทำงานลดลง',
              'ต้นทุนเพิ่มขึ้น',
              'รายได้เพิ่มขึ้น',
              'พนักงานมีความสุข'
            ],
            correctAnswer: 0,
            explanation: 'การจัดการทีมที่ไม่ดีส่งผลให้ประสิทธิภาพการทำงานลดลง'
          },
          {
            id: 2,
            type: 'multiple-choice',
            question: 'ปัจจัยที่ช่วยลดปัญหาในองค์กรคืออะไร?',
            options: [
              'การลดความขัดแย้ง',
              'การเพิ่มการแข่งขัน',
              'การลดการสื่อสาร',
              'การเพิ่มภาระงาน'
            ],
            correctAnswer: 0,
            explanation: 'การลดความขัดแย้งช่วยสร้างสภาพแวดล้อมที่ดีในองค์กร'
          }
        ]
      },
      {
        id: 2,
        title: 'Quiz บทที่ 2: Waste Identification',
        description: 'ทดสอบความสามารถในการระบุและจัดการ waste',
        duration: '45 นาที',
        passingScore: 75,
        status: 'pending',
        questions: [
          {
            id: 1,
            type: 'multiple-choice',
            question: 'ประเภทของ waste ที่พบบ่อยที่สุดในอุตสาหกรรมคืออะไร?',
            options: ['Overproduction', 'Inventory', 'Waiting', 'Motion'],
            correctAnswer: 1,
            explanation: 'Inventory เป็นปัญหาที่พบบ่อยที่สุดในอุตสาหกรรมไทย'
          }
        ]
      }
    ],
    discussions: [
      {
        id: 1,
        title: 'ประสบการณ์การใช้ Lean ในองค์กร',
        content: 'อยากแชร์ประสบการณ์การนำ Lean มาใช้ในองค์กรครับ',
        author: 'สมชาย ใจดี',
        createdAt: '2024-01-20',
        likes: 12,
        replies: [
          {
            id: 1,
            content: 'เริ่มจากการสำรวจ waste ในแผนกก่อนครับ',
            author: 'อ.วิชัย',
            createdAt: '2024-01-21',
            likes: 5
          }
        ],
        tags: ['ประสบการณ์', 'Lean', 'การนำไปใช้']
      }
    ],
    resources: [
      {
        id: 1,
        title: 'Lean Manufacturing Handbook',
        type: 'PDF',
        size: '15.2 MB',
        category: 'handbook',
        downloadUrl: '#'
      },
      {
        id: 2,
        title: '5S Implementation Guide',
        type: 'Video',
        size: '250 MB',
        category: 'tutorial',
        downloadUrl: '#'
      }
    ],
    price: 0,
    lessons: 16,
    enrolledStudents: 156,
    certificate: true,
    requirements: [
      'มีประสบการณ์ทำงานในแผนกการผลิตอย่างน้อย 1 ปี',
      'เข้าใจกระบวนการผลิตพื้นฐาน',
      'มีความสามารถในการวิเคราะห์ข้อมูล'
    ]
  },
  {
    id: 2,
    title: 'Effective Communication Skills',
    category: 'ทักษะส่วนบุคคล',
    instructor: 'อ.สุดา ศรีสวัสดิ์',
    level: 'L1-L3',
    year: 2024,
    division: 'Human Resources',
    department: 'HR',
    tags: ['Communication', 'Soft Skills', 'Teamwork'],
    courseCode: 'HR-2024-012',
    language: 'ไทย/English',
    startDate: '15 ม.ค. 2568',
    duration: '24 ชม.',
    enrolled: 234,
    progress: 100,
    status: 'completed',
    completedDate: '10 ม.ค. 2568',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    totalScore: 91.67,
    grade: 'A',
    studyTime: '22 ชม.',
  },
  {
    id: 3,
    title: 'Data Analytics for Beginners',
    category: 'เทคโนโลยี',
    instructor: 'อ.ประวิทย์ เทคโนโลยี',
    level: 'L1-L2',
    year: 2024,
    division: 'Information Technology',
    department: 'IT',
    tags: ['Data', 'Analytics', 'Excel', 'Power BI'],
    courseCode: 'DS-2024-007',
    language: 'ไทย',
    startDate: '1 ก.พ. 2568',
    duration: '32 ชม.',
    enrolled: 189,
    progress: 45,
    status: 'in-progress',
    deadline: '30 เม.ย. 2568',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    title: 'Safety Management System',
    category: 'ความปลอดภัย',
    instructor: 'อ.สมศักดิ์ ปลอดภัย',
    level: 'L0-L3',
    year: 2024,
    division: 'Safety',
    department: 'Safety',
    tags: ['Safety', 'ISO 45001', 'Risk Management'],
    courseCode: 'SF-2024-003',
    language: 'ไทย',
    startDate: '1 มี.ค. 2568',
    duration: '16 ชม.',
    enrolled: 312,
    status: 'upcoming',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    title: 'Leadership Development Program',
    category: 'ภาวะผู้นำ',
    instructor: 'อ.วิภา ผู้นำ',
    level: 'L3-L5',
    year: 2024,
    division: 'Human Resources',
    department: 'HR',
    tags: ['Leadership', 'Management', 'Team Building'],
    courseCode: 'LD-2024-015',
    language: 'ไทย/English',
    startDate: '15 ก.พ. 2568',
    duration: '48 ชม.',
    enrolled: 87,
    progress: 30,
    status: 'in-progress',
    deadline: '15 พ.ค. 2568',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
  },
  {
    id: 6,
    title: 'Quality Control & Assurance',
    category: 'คุณภาพ',
    instructor: 'อ.นิตยา คุณภาพ',
    level: 'L2-L4',
    year: 2024,
    division: 'Quality',
    department: 'QA',
    tags: ['Quality', 'ISO 9001', 'SPC'],
    courseCode: 'QA-2024-008',
    language: 'ไทย',
    startDate: '1 ม.ค. 2568',
    duration: '36 ชม.',
    enrolled: 145,
    progress: 100,
    status: 'completed',
    completedDate: '15 ม.ค. 2568',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    totalScore: 91.25,
    grade: 'A',
    studyTime: '34 ชม.',
  },
  {
    id: 7,
    title: 'Digital Transformation Essentials',
    category: 'เทคโนโลยี',
    instructor: 'อ.ดิจิทัล นวัตกรรม',
    level: 'L2-L5',
    year: 2024,
    division: 'Information Technology',
    department: 'IT',
    tags: ['Digital', 'Innovation', 'Technology'],
    courseCode: 'DT-2024-011',
    language: 'English',
    startDate: '1 ก.พ. 2568',
    duration: '28 ชม.',
    enrolled: 198,
    progress: 60,
    status: 'in-progress',
    deadline: '30 มี.ค. 2568',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
  },
  {
    id: 8,
    title: 'Project Management Professional',
    category: 'การจัดการ',
    instructor: 'อ.โครงการ สำเร็จ',
    level: 'L3-L5',
    year: 2024,
    division: 'Project Management',
    department: 'PMO',
    tags: ['Project Management', 'PMP', 'Agile'],
    courseCode: 'PM-2024-019',
    language: 'ไทย/English',
    startDate: '15 ม.ค. 2568',
    duration: '56 ชม.',
    enrolled: 76,
    progress: 100,
    status: 'completed',
    completedDate: '5 ม.ค. 2568',
    thumbnail: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=600&fit=crop',
    totalScore: 88.5,
    grade: 'B+',
    studyTime: '52 ชม.',
  },
  // Recommended Courses for Learner Dashboard
  {
    id: 10,
    title: 'Six Sigma Green Belt',
    category: 'Quality Management',
    instructor: 'ดร.สมชาย ใจดี',
    level: 'L3-L5',
    year: 2024,
    division: 'Quality',
    department: 'คุณภาพ',
    tags: ['Six Sigma', 'Quality', 'Process Improvement'],
    courseCode: 'SS-2024-030',
    language: 'ไทย/English',
    startDate: '1 ก.พ. 2568',
    duration: '40 ชม.',
    enrolled: 156,
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    levelRange: [3, 5],
    levelDisplay: 'L3-L5',
    priority: 1,
  },
  {
    id: 11,
    title: 'Leadership & Team Management',
    category: 'Leadership',
    instructor: 'ดร.พัฒนา องค์กร',
    level: 'L4-L6',
    year: 2024,
    division: 'Human Resources',
    department: 'HR',
    tags: ['Leadership', 'Management', 'Team'],
    courseCode: 'LD-2024-031',
    language: 'ไทย',
    startDate: '15 ก.พ. 2568',
    duration: '24 ชม.',
    enrolled: 245,
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
    levelRange: [4, 6],
    levelDisplay: 'L4-L6',
    priority: 2,
  },
  {
    id: 12,
    title: 'Digital Transformation & Innovation',
    category: 'Digital Skills',
    instructor: 'คุณวิไล เทคโนโลยี',
    level: 'L2-L4',
    year: 2024,
    division: 'Information Technology',
    department: 'IT',
    tags: ['Digital', 'Innovation', 'Transformation'],
    courseCode: 'DT-2024-032',
    language: 'ไทย/English',
    startDate: '1 มี.ค. 2568',
    duration: '12 ชม.',
    enrolled: 189,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
    levelRange: [2, 4],
    levelDisplay: 'L2-L4',
    priority: 1,
  },
  {
    id: 13,
    title: 'Data Analytics for Business',
    category: 'Technical Skills',
    instructor: 'ดร.ประเสริฐ ดาต้า',
    level: 'L3',
    year: 2024,
    division: 'Information Technology',
    department: 'IT',
    tags: ['Data', 'Analytics', 'Business Intelligence'],
    courseCode: 'DA-2024-033',
    language: 'ไทย/English',
    startDate: '15 มี.ค. 2568',
    duration: '20 ชม.',
    enrolled: 178,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    levelRange: [3, 3],
    levelDisplay: 'L3',
    priority: 1,
  },
  {
    id: 14,
    title: 'Basic Safety Training',
    category: 'Compliance',
    instructor: 'คุณอรุณ ปลอดภัย',
    level: 'L0-L2',
    year: 2024,
    division: 'Safety',
    department: 'EHS',
    tags: ['Safety', 'Compliance', 'Training'],
    courseCode: 'SF-2024-034',
    language: 'ไทย',
    startDate: '1 ม.ค. 2568',
    duration: '6 ชม.',
    enrolled: 428,
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
    levelRange: [0, 2],
    levelDisplay: 'L0-L2',
    priority: 3,
  },
  {
    id: 15,
    title: 'Advanced Project Management',
    category: 'Professional Development',
    instructor: 'คุณสมศักดิ์ โปรเจค',
    level: 'L5-L7',
    year: 2024,
    division: 'Project Management',
    department: 'PMO',
    tags: ['Project Management', 'PMP', 'Advanced'],
    courseCode: 'PM-2024-035',
    language: 'English',
    startDate: '1 เม.ย. 2568',
    duration: '35 ชม.',
    enrolled: 98,
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    levelRange: [5, 7],
    levelDisplay: 'L5-L7',
    priority: 3,
  },
  {
    id: 16,
    title: 'Effective Communication Skills',
    category: 'Soft Skills',
    instructor: 'อ.สมหญิง รักงาน',
    level: 'L1-L4',
    year: 2024,
    division: 'Human Resources',
    department: 'HR',
    tags: ['Communication', 'Soft Skills', 'Presentation'],
    courseCode: 'CM-2024-036',
    language: 'ไทย',
    startDate: '15 ก.พ. 2568',
    duration: '10 ชม.',
    enrolled: 312,
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
    levelRange: [1, 4],
    levelDisplay: 'L1-L4',
    priority: 1,
  },
  // Additional Courses for Complete Level Coverage (L6-L13)
  {
    id: 17,
    title: 'Strategic Management & Business Planning',
    category: 'ภาวะผู้นำ',
    instructor: 'ดร.วิชัย กลยุทธ์',
    level: 'L6-L8',
    year: 2024,
    division: 'Human Resources',
    department: 'HR',
    tags: ['Strategy', 'Management', 'Business Planning'],
    courseCode: 'SM-2024-037',
    language: 'English',
    startDate: '1 เม.ย. 2568',
    duration: '60 ชม.',
    enrolled: 45,
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    description: 'หลักสูตรการบริหารเชิงกลยุทธ์และการวางแผนธุรกิจสำหรับผู้บริหารระดับสูง',
  },
  {
    id: 18,
    title: 'Executive Leadership Program',
    category: 'ภาวะผู้นำ',
    instructor: 'Prof. สมชาย ผู้นำ',
    level: 'L7-L9',
    year: 2024,
    division: 'Human Resources',
    department: 'HR',
    tags: ['Executive', 'Leadership', 'Management'],
    courseCode: 'EL-2024-038',
    language: 'English',
    startDate: '15 เม.ย. 2568',
    duration: '80 ชม.',
    enrolled: 32,
    thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400',
    description: 'โปรแกรมพัฒนาภาวะผู้นำสำหรับผู้บริหารระดับสูง',
  },
  {
    id: 19,
    title: 'Digital Marketing & E-Commerce',
    category: 'การตลาด',
    instructor: 'คุณนภา ตลาดดิจิทัล',
    level: 'L2-L4',
    year: 2024,
    division: 'Marketing & Sales',
    department: 'Marketing',
    tags: ['Digital Marketing', 'E-Commerce', 'Social Media'],
    courseCode: 'DM-2024-039',
    language: 'ไทย',
    startDate: '1 มี.ค. 2568',
    duration: '28 ชม.',
    enrolled: 167,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    description: 'การตลาดดิจิทัลและพาณิชย์อิเล็กทรอนิกส์ยุคใหม่',
  },
  {
    id: 20,
    title: 'Financial Analysis & Investment',
    category: 'การเงิน',
    instructor: 'ดร.สมบัติ การเงิน',
    level: 'L4-L6',
    year: 2024,
    division: 'Finance & Accounting',
    department: 'Finance',
    tags: ['Finance', 'Investment', 'Analysis'],
    courseCode: 'FA-2024-040',
    language: 'ไทย/English',
    startDate: '1 ก.พ. 2568',
    duration: '42 ชม.',
    enrolled: 89,
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
    description: 'การวิเคราะห์ทางการเงินและการลงทุนเชิงลึก',
  },
  {
    id: 21,
    title: 'Corporate Governance & Compliance',
    category: 'การจัดการ',
    instructor: 'ดร.ธรรมนิติ ธรรมาภิบาล',
    level: 'L6-L10',
    year: 2024,
    division: 'Human Resources',
    department: 'Training',
    tags: ['Governance', 'Compliance', 'Ethics'],
    courseCode: 'CG-2024-041',
    language: 'English',
    startDate: '15 มี.ค. 2568',
    duration: '36 ชม.',
    enrolled: 54,
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
    description: 'ธรรมาภิบาลและการปฏิบัติตามกฎระเบียบองค์กร',
  },
  {
    id: 22,
    title: 'Advanced Data Science & AI',
    category: 'เทคโนโลยี',
    instructor: 'ดร.ปัญญา เอไอ',
    level: 'L5-L8',
    year: 2024,
    division: 'Information Technology',
    department: 'R&D',
    tags: ['AI', 'Machine Learning', 'Data Science'],
    courseCode: 'AI-2024-042',
    language: 'English',
    startDate: '1 เม.ย. 2568',
    duration: '72 ชม.',
    enrolled: 67,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
    description: 'วิทยาศาสตร์ข้อมูลและปัญญาประดิษฐ์ขั้นสูง',
  },
  {
    id: 23,
    title: 'Supply Chain Management Excellence',
    category: 'การผลิต',
    instructor: 'คุณสมชาย ซัพพลาย',
    level: 'L3-L6',
    year: 2024,
    division: 'Operations',
    department: 'Operations',
    tags: ['Supply Chain', 'Logistics', 'Operations'],
    courseCode: 'SC-2024-043',
    language: 'ไทย',
    startDate: '15 ก.พ. 2568',
    duration: '44 ชม.',
    enrolled: 123,
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400',
    description: 'การจัดการห่วงโซ่อุปทานและโลจิสติกส์',
  },
  {
    id: 24,
    title: 'Human Resource Management & Development',
    category: 'HR',
    instructor: 'ดร.สุดา ทรัพยากรบุคคล',
    level: 'L4-L7',
    year: 2024,
    division: 'Human Resources',
    department: 'HR',
    tags: ['HR', 'Talent Management', 'Development'],
    courseCode: 'HR-2024-044',
    language: 'ไทย',
    startDate: '1 มี.ค. 2568',
    duration: '48 ชม.',
    enrolled: 98,
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400',
    description: 'การบริหารและพัฒนาทรัพยากรบุคคล',
  },
  {
    id: 25,
    title: 'Change Management & Transformation',
    category: 'การจัดการ',
    instructor: 'ดร.พัฒนา เปลี่ยนแปลง',
    level: 'L5-L9',
    year: 2024,
    division: 'Human Resources',
    department: 'Training',
    tags: ['Change Management', 'Transformation', 'Leadership'],
    courseCode: 'CH-2024-045',
    language: 'English',
    startDate: '1 พ.ค. 2568',
    duration: '52 ชม.',
    enrolled: 76,
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    description: 'การบริหารการเปลี่ยนแปลงและการปรับเปลี่ยนองค์กร',
  },
  {
    id: 26,
    title: 'Risk Management & Internal Control',
    category: 'การจัดการ',
    instructor: 'ดร.ระวัง ความเสี่ยง',
    level: 'L5-L8',
    year: 2024,
    division: 'Finance & Accounting',
    department: 'Finance',
    tags: ['Risk', 'Control', 'Audit'],
    courseCode: 'RM-2024-046',
    language: 'ไทย/English',
    startDate: '15 มี.ค. 2568',
    duration: '40 ชม.',
    enrolled: 82,
    thumbnail: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400',
    description: 'การบริหารความเสี่ยงและการควบคุมภายใน',
  },
  {
    id: 27,
    title: 'Innovation & Design Thinking',
    category: 'นวัตกรรม',
    instructor: 'คุณสร้างสรรค์ นวัตกรรม',
    level: 'L3-L7',
    year: 2024,
    division: 'Research & Development',
    department: 'R&D',
    tags: ['Innovation', 'Design Thinking', 'Creativity'],
    courseCode: 'IN-2024-047',
    language: 'ไทย',
    startDate: '1 เม.ย. 2568',
    duration: '32 ชม.',
    enrolled: 145,
    thumbnail: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400',
    description: 'นวัตกรรมและกระบวนการคิดเชิงออกแบบ',
  },
  {
    id: 28,
    title: 'Business Analytics & Intelligence',
    category: 'เทคโนโลยี',
    instructor: 'ดร.วิเคราะห์ ธุรกิจ',
    level: 'L4-L7',
    year: 2024,
    division: 'Information Technology',
    department: 'IT',
    tags: ['Analytics', 'BI', 'Data'],
    courseCode: 'BA-2024-048',
    language: 'English',
    startDate: '15 ก.พ. 2568',
    duration: '46 ชม.',
    enrolled: 112,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    description: 'การวิเคราะห์และสติปัญญาธุรกิจ',
  },
  {
    id: 29,
    title: 'Organizational Behavior & Psychology',
    category: 'HR',
    instructor: 'ดร.จิตวิทยา องค์กร',
    level: 'L4-L6',
    year: 2024,
    division: 'Human Resources',
    department: 'HR',
    tags: ['OB', 'Psychology', 'Behavior'],
    courseCode: 'OB-2024-049',
    language: 'ไทย',
    startDate: '1 มี.ค. 2568',
    duration: '38 ชม.',
    enrolled: 134,
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    description: 'พฤติกรรมและจิตวิทยาองค์กร',
  },
  {
    id: 30,
    title: 'Advanced Manufacturing Technology',
    category: 'การผลิต',
    instructor: 'ดร.เทคโนโลยี การผลิต',
    level: 'L5-L8',
    year: 2024,
    division: 'Production',
    department: 'การผลิต',
    tags: ['Manufacturing', 'Technology', 'Automation'],
    courseCode: 'AM-2024-050',
    language: 'English',
    startDate: '1 พ.ค. 2568',
    duration: '56 ชม.',
    enrolled: 78,
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
    description: 'เทคโนโลยีการผลิตขั้นสูงและระบบอัตโนมัติ',
  },
  {
    id: 31,
    title: 'Mergers & Acquisitions Strategy',
    category: 'การจัดการ',
    instructor: 'ดร.ควบรวม ธุรกิจ',
    level: 'L8-L11',
    year: 2024,
    division: 'Finance & Accounting',
    department: 'Finance',
    tags: ['M&A', 'Strategy', 'Corporate Finance'],
    courseCode: 'MA-2024-051',
    language: 'English',
    startDate: '1 มิ.ย. 2568',
    duration: '64 ชม.',
    enrolled: 28,
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    description: 'กลยุทธ์การควบรวมและการซื้อกิจการ',
  },
  {
    id: 32,
    title: 'Board of Directors & Corporate Leadership',
    category: 'ภาวะผู้นำ',
    instructor: 'Prof. คณะกรรมการ บริหาร',
    level: 'L10-L13',
    year: 2024,
    division: 'Human Resources',
    department: 'Training',
    tags: ['Board', 'Corporate', 'Governance'],
    courseCode: 'BD-2024-052',
    language: 'English',
    startDate: '15 มิ.ย. 2568',
    duration: '72 ชม.',
    enrolled: 18,
    thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400',
    description: 'คณะกรรมการบริหารและภาวะผู้นำระดับองค์กร',
  },
  {
    id: 33,
    title: 'Advanced Quality Management Systems',
    category: 'คุณภาพ',
    instructor: 'ดร.คุณภาพ มาตรฐาน',
    level: 'L5-L7',
    year: 2024,
    division: 'Quality',
    department: 'QA',
    tags: ['Quality', 'ISO', 'TQM'],
    courseCode: 'QM-2024-053',
    language: 'ไทย/English',
    startDate: '1 มี.ค. 2568',
    duration: '50 ชม.',
    enrolled: 96,
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    description: 'ระบบการจัดการคุณภาพขั้นสูง ISO และ TQM',
  },
  {
    id: 34,
    title: 'Environmental & Sustainability Management',
    category: 'ความปลอดภัย',
    instructor: 'ดร.สิ่งแวดล้อม ยั่งยืน',
    level: 'L4-L8',
    year: 2024,
    division: 'Safety',
    department: 'Safety',
    tags: ['Environment', 'Sustainability', 'ISO 14001'],
    courseCode: 'ES-2024-054',
    language: 'English',
    startDate: '15 เม.ย. 2568',
    duration: '44 ชม.',
    enrolled: 87,
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
    description: 'การจัดการสิ่งแวดล้อมและความยั่งยืน',
  },
  {
    id: 35,
    title: 'Cloud Computing & DevOps',
    category: 'เทคโนโลยี',
    instructor: 'คุณคลาวด์ เทคโนโลยี',
    level: 'L3-L6',
    year: 2024,
    division: 'Information Technology',
    department: 'IT',
    tags: ['Cloud', 'DevOps', 'AWS', 'Azure'],
    courseCode: 'CC-2024-055',
    language: 'English',
    startDate: '1 มี.ค. 2568',
    duration: '54 ชม.',
    enrolled: 143,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
    description: 'Cloud Computing และการทำงานแบบ DevOps',
  },
];

// ========================================
// MOCK ACTIVITIES DATA
// ========================================

export const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'completed',
    title: 'เรียนจบหลักสูตร Lean Manufacturing',
    description: 'คะแนน 91.25 (เกรด A)',
    date: '15 ม.ค. 2568',
    courseId: 6,
  },
  {
    id: 2,
    type: 'certificate',
    title: 'ได้รับใบประกาศนียบัตร',
    description: 'Effective Communication Skills',
    date: '10 ม.ค. 2568',
    courseId: 2,
  },
  {
    id: 3,
    type: 'enrolled',
    title: 'ลงทะเบียนหลักสูตรใหม่',
    description: 'Leadership Development Program',
    date: '20 ม.ค. 2568',
    courseId: 5,
  },
  {
    id: 4,
    type: 'achievement',
    title: 'ปลดล็อกความสำเร็จ',
    description: 'เรียนจบ 5 หลักสูตร',
    date: '15 ม.ค. 2568',
  },
  {
    id: 5,
    type: 'completed',
    title: 'เรียนจบหลักสูตร Communication Skills',
    description: 'คะแนน 91.67 (เกรด A)',
    date: '10 ม.ค. 2568',
    courseId: 2,
  },
];

// ========================================
// MOCK NOTIFICATIONS DATA
// ========================================

export const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'deadline',
    title: 'กำหนดส่งงานใกล้ถึง',
    message: 'งาน "Process Improvement Project" จะหมดเวลาในวันพรุ่งนี้',
    timestamp: '2 ชั่วโมงที่แล้ว',
    read: false,
    link: '/assignment/1',
    priority: 'high',
    actionLabel: 'ส่งงาน',
    icon: '⏰',
  },
  {
    id: 2,
    type: 'achievement',
    title: '🎉 คุณสำเร็จหลักสูตรแล้ว!',
    message: 'ยินดีด้วย! คุณทำหลักสูตร "Effective Communication Skills" เสร็จสมบูรณ์',
    timestamp: '5 ชั่วโมงที่แล้ว',
    read: false,
    link: '/learner/my-courses/1/certificate',
    priority: 'high',
    actionLabel: 'ดูใบประกาศนียบัตร',
    icon: '🏆',
  },
  {
    id: 3,
    type: 'reminder',
    title: '📚 อย่าลืมเข้าเรียน',
    message: 'มีคลาส "Leadership Development Program" วันพรุ่งนี้ 9:00 น.',
    timestamp: '6 ชั่วโมงที่แล้ว',
    read: false,
    link: '/learner/my-courses/5',
    priority: 'medium',
    actionLabel: 'ดูตารางเรียน',
    icon: '🔔',
  },
  {
    id: 4,
    type: 'course',
    title: 'มีคอร์สใหม่แนะนำสำหรับคุณ',
    message: 'Advanced Data Science & AI เหมาะกับระดับ L3 ของคุณ',
    timestamp: '1 วันที่แล้ว',
    read: false,
    link: '/courses/22',
    priority: 'medium',
    actionLabel: 'ดูรายละเอียด',
    icon: '📚',
  },
  {
    id: 5,
    type: 'quiz',
    title: 'แบบทดสอบพร้อมแล้ว',
    message: 'Quiz: Lean Manufacturing Assessment พร้อมทำแล้ว',
    timestamp: '1 วันที่แล้ว',
    read: true,
    link: '/quiz/1',
    priority: 'medium',
    actionLabel: 'เริ่มทำแบบทดสอบ',
    icon: '📝',
  },
  {
    id: 6,
    type: 'certificate',
    title: 'คุณได้รับใบประกาศนียบัตร',
    message: 'ใบประกาศนียบัตร "Effective Communication Skills" พร้อมดาวน์โหลด',
    timestamp: '2 วันที่แล้ว',
    read: true,
    link: '/certificates',
    priority: 'low',
    icon: '🏆',
    actionLabel: 'ดูใบประกาศนียบัตร',
  },
  {
    id: 7,
    type: 'assignment',
    title: 'งานได้คะแนนแล้ว',
    message: 'คุณได้ 88/100 คะแนนจากงาน "Process Improvement Project"',
    timestamp: '3 วันที่แล้ว',
    read: true,
    link: '/assignment/2',
    priority: 'low',
    icon: '📋',
  },
  {
    id: 8,
    type: 'deadline',
    title: '⏰ เตือนกำหนดส่งงาน',
    message: 'งาน "Quality Control Report" จะหมดเวลาในอีก 3 วัน',
    timestamp: '4 วันที่แล้ว',
    read: true,
    link: '/assignment/3',
    priority: 'medium',
    actionLabel: 'ดูงาน',
    icon: '⏰',
  },
];

// Learner-specific notifications
export const getLearnerNotifications = (): Notification[] => {
  return mockNotifications.filter(notif =>
    ['course', 'assignment', 'quiz', 'certificate', 'deadline', 'achievement', 'reminder'].includes(notif.type)
  );
};

// ========================================
// MOCK CERTIFICATES DATA
// ========================================

export const mockCertificates: Certificate[] = [
  {
    id: '6',
    courseTitle: 'Lean Manufacturing Fundamentals',
    courseCode: 'LM-2023-025',
    completedDate: '15 ม.ค. 2568',
    certificateId: 'CERT-2024-001',
    score: 91.25,
    grade: 'A',
    studentName: 'สมชาย ใจดี',
    studentId: 'EMP-2024-12345',
    organization: 'INTEQC Corporation',
    duration: '40 ชั่วโมง',
  },
  {
    id: '2',
    courseTitle: 'Effective Communication Skills',
    courseCode: 'HR-2024-012',
    completedDate: '10 ม.ค. 2568',
    certificateId: 'CERT-2024-002',
    score: 91.67,
    grade: 'A',
    studentName: 'สมชาย ใจดี',
    studentId: 'EMP-2024-12345',
    organization: 'INTEQC Corporation',
    duration: '24 ชั่วโมง',
  },
  {
    id: '8',
    courseTitle: 'Basic Data Analytics',
    courseCode: 'DS-2024-007',
    completedDate: '5 ม.ค. 2568',
    certificateId: 'CERT-2024-003',
    score: 88.5,
    grade: 'B+',
    studentName: 'สมชาย ใจดี',
    studentId: 'EMP-2024-12345',
    organization: 'INTEQC Corporation',
    duration: '32 ชั่วโมง',
  },
];

// ========================================
// MOCK EVENTS/SCHEDULE DATA
// ========================================

export const mockEvents: Event[] = [
  // มกราคม 2568
  {
    id: 1,
    title: 'Lean Manufacturing - Module 3',
    date: '2025-01-25',
    time: '09:00 - 12:00',
    type: 'class',
    course: 'Lean Manufacturing Fundamentals',
    location: 'ห้องอบรม A',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'สอบปลายภาค - Communication Skills',
    date: '2025-01-28',
    time: '13:00 - 15:00',
    type: 'exam',
    course: 'Effective Communication Skills',
    location: 'ห้องสอบ 301',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'ส่งงาน - Data Analytics Project',
    date: '2025-01-30',
    time: '23:59',
    type: 'assignment',
    course: 'Data Analytics for Beginners',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Data Analytics - Live Session',
    date: '2025-01-27',
    time: '14:00 - 16:00',
    type: 'class',
    course: 'Data Analytics for Beginners',
    location: 'ห้องอบรม B',
    status: 'upcoming',
  },
  {
    id: 5,
    title: 'แบบทดสอบ Lean Manufacturing',
    date: '2025-01-29',
    time: '10:00 - 11:00',
    type: 'exam',
    course: 'Lean Manufacturing Fundamentals',
    location: 'ห้องสอบ 201',
    status: 'upcoming',
  },

  // กุมภาพันธ์ 2568
  {
    id: 6,
    title: 'Workshop: Leadership Skills',
    date: '2025-02-05',
    time: '09:00 - 17:00',
    type: 'event',
    course: 'Leadership Development Program',
    location: 'ห้องประชุมใหญ่',
    status: 'upcoming',
  },
  {
    id: 7,
    title: 'Leadership - Module 2',
    date: '2025-02-08',
    time: '09:00 - 12:00',
    type: 'class',
    course: 'Leadership Development Program',
    location: 'ห้องอบรม C',
    status: 'upcoming',
  },
  {
    id: 8,
    title: 'Safety Management - Webinar',
    date: '2025-02-10',
    time: '13:00 - 15:00',
    type: 'event',
    course: 'Safety Management System',
    location: 'Online',
    status: 'upcoming',
  },
  {
    id: 9,
    title: 'ส่งงาน - Leadership Plan',
    date: '2025-02-15',
    time: '23:59',
    type: 'assignment',
    course: 'Leadership Development Program',
    status: 'upcoming',
  },
  {
    id: 10,
    title: 'Quality Control - Lab Session',
    date: '2025-02-18',
    time: '10:00 - 13:00',
    type: 'class',
    course: 'Quality Control & Assurance',
    location: 'ห้องปฏิบัติการ',
    status: 'upcoming',
  },
  {
    id: 11,
    title: 'แบบทดสอบ Quality Control',
    date: '2025-02-20',
    time: '14:00 - 15:30',
    type: 'exam',
    course: 'Quality Control & Assurance',
    location: 'ห้องสอบ 302',
    status: 'upcoming',
  },
  {
    id: 12,
    title: 'Digital Transformation - Workshop',
    date: '2025-02-22',
    time: '09:00 - 16:00',
    type: 'event',
    course: 'Digital Transformation Essentials',
    location: 'ห้องประชุม Innovation',
    status: 'upcoming',
  },

  // มีนาคม 2568
  {
    id: 13,
    title: 'Project Management - Live Session',
    date: '2025-03-05',
    time: '09:00 - 12:00',
    type: 'class',
    course: 'Project Management Professional',
    location: 'ห้องอบรม D',
    status: 'upcoming',
  },
  {
    id: 14,
    title: 'ส่งงาน - PM Case Study',
    date: '2025-03-10',
    time: '23:59',
    type: 'assignment',
    course: 'Project Management Professional',
    status: 'upcoming',
  },
  {
    id: 15,
    title: 'Safety Management - สอบปลายภาค',
    date: '2025-03-12',
    time: '13:00 - 15:00',
    type: 'exam',
    course: 'Safety Management System',
    location: 'ห้องสอบ 401',
    status: 'upcoming',
  },
  {
    id: 16,
    title: 'Lean Manufacturing - Final Project',
    date: '2025-03-20',
    time: '23:59',
    type: 'assignment',
    course: 'Lean Manufacturing Fundamentals',
    status: 'upcoming',
  },
  {
    id: 17,
    title: 'Digital Transformation - Live Demo',
    date: '2025-03-22',
    time: '14:00 - 17:00',
    type: 'class',
    course: 'Digital Transformation Essentials',
    location: 'ห้องอบรม E',
    status: 'upcoming',
  },
  {
    id: 18,
    title: 'แบบทดสอบ Digital Transformation',
    date: '2025-03-25',
    time: '10:00 - 12:00',
    type: 'exam',
    course: 'Digital Transformation Essentials',
    location: 'ห้องสอบ 501',
    status: 'upcoming',
  },

  // เมษายน 2568
  {
    id: 19,
    title: 'Leadership - Final Presentation',
    date: '2025-04-05',
    time: '09:00 - 17:00',
    type: 'event',
    course: 'Leadership Development Program',
    location: 'ห้องประชุมใหญ่',
    status: 'upcoming',
  },
  {
    id: 20,
    title: 'Data Analytics - Dashboard Project',
    date: '2025-04-10',
    time: '23:59',
    type: 'assignment',
    course: 'Data Analytics for Beginners',
    status: 'upcoming',
  },
  {
    id: 21,
    title: 'แบบทดสอบ Project Management',
    date: '2025-04-15',
    time: '13:00 - 15:00',
    type: 'exam',
    course: 'Project Management Professional',
    location: 'ห้องสอบ 601',
    status: 'upcoming',
  },
  {
    id: 22,
    title: 'Quality Control - Final Assessment',
    date: '2025-04-20',
    time: '09:00 - 12:00',
    type: 'exam',
    course: 'Quality Control & Assurance',
    location: 'ห้องสอบ 701',
    status: 'upcoming',
  },
  {
    id: 23,
    title: 'All Courses - Graduation Ceremony',
    date: '2025-04-30',
    time: '14:00 - 17:00',
    type: 'event',
    location: 'ห้องประชุมใหญ่',
    description: 'พิธีมอบประกาศนียบัตร',
    status: 'upcoming',
  },
  // Schedule Events for Learner Dashboard
  {
    id: 101,
    title: 'Live Session: Six Sigma Introduction',
    date: 'วันนี้',
    time: '14:00-16:00 น.',
    type: 'live-session',
    course: 'Six Sigma Green Belt',
    instructor: 'ดร.สมชาย ใจดี',
    status: 'upcoming',
  },
  {
    id: 102,
    title: 'Webinar: Digital Transformation Trends',
    date: 'พรุ่งนี้',
    time: '10:00-11:30 น.',
    type: 'webinar',
    course: 'Digital Transformation',
    instructor: 'คุณวิไล เทคโนโลยี',
    status: 'upcoming',
  },
  {
    id: 103,
    title: 'Quiz Deadline: Safety Module 3',
    date: '2 วันข้างหน้า',
    time: '23:59 น.',
    type: 'deadline',
    course: 'มาตรฐานความปลอดภัย',
    instructor: null,
    status: 'upcoming',
  },
  {
    id: 104,
    title: 'Workshop: Data Visualization',
    date: '3 วันข้างหน้า',
    time: '13:00-17:00 น.',
    type: 'live-session',
    course: 'Data Analytics',
    instructor: 'ดร.ประเสริฐ ดาต้า',
    status: 'upcoming',
  },
];

// ========================================
// MOCK LESSONS DATA
// ========================================

export const mockLessons: Lesson[] = [
  // Course 1: Lean Manufacturing Fundamentals
  { id: 1, courseId: 1, title: 'บทที่ 1: บทนำ Lean Manufacturing', type: 'video', duration: '30 นาที', completed: true, order: 1, videoUrl: 'https://example.com/video1' },
  { id: 2, courseId: 1, title: 'บทที่ 2: 5S และการจัดระเบียบพื้นที่ทำงาน', type: 'video', duration: '45 นาที', completed: true, order: 2, videoUrl: 'https://example.com/video2' },
  { id: 3, courseId: 1, title: 'บทที่ 3: การระบุและลดความสูญเสีย (Waste)', type: 'video', duration: '40 นาที', completed: true, order: 3, videoUrl: 'https://example.com/video3' },
  { id: 4, courseId: 1, title: 'บทที่ 4: Value Stream Mapping', type: 'video', duration: '50 นาที', completed: false, order: 4, videoUrl: 'https://example.com/video4' },
  { id: 5, courseId: 1, title: 'แบบทดสอบบทที่ 1-4', type: 'quiz', duration: '20 นาที', completed: false, order: 5 },
  { id: 6, courseId: 1, title: 'บทที่ 5: Kaizen และการปรับปรุงอย่างต่อเนื่อง', type: 'video', duration: '45 นาที', completed: false, order: 6, videoUrl: 'https://example.com/video6' },
  { id: 7, courseId: 1, title: 'บทที่ 6: Just-In-Time (JIT)', type: 'video', duration: '40 นาที', completed: false, order: 7, videoUrl: 'https://example.com/video7' },
  { id: 8, courseId: 1, title: 'งานมอบหมาย: วิเคราะห์กระบวนการผลิต', type: 'assignment', duration: '60 นาที', completed: false, order: 8 },
  { id: 9, courseId: 1, title: 'บทที่ 7: การวัดผลและ KPI', type: 'video', duration: '35 นาที', completed: false, order: 9, videoUrl: 'https://example.com/video9' },
  { id: 10, courseId: 1, title: 'บทที่ 8: กรณีศึกษาการประยุกต์ใช้', type: 'video', duration: '50 นาที', completed: false, order: 10, videoUrl: 'https://example.com/video10' },
  { id: 11, courseId: 1, title: 'แบบทดสอบปลายภาค', type: 'quiz', duration: '30 นาที', completed: false, order: 11 },
  { id: 12, courseId: 1, title: 'สรุปและประเมินผล', type: 'video', duration: '25 นาที', completed: false, order: 12, videoUrl: 'https://example.com/video12' },

  // Course 2: Effective Communication Skills
  { id: 13, courseId: 2, title: 'บทที่ 1: หลักการสื่อสารที่มีประสิทธิภาพ', type: 'video', duration: '35 นาที', completed: true, order: 1, videoUrl: 'https://example.com/video13' },
  { id: 14, courseId: 2, title: 'บทที่ 2: การฟังอย่างตั้งใจ', type: 'video', duration: '30 นาที', completed: true, order: 2, videoUrl: 'https://example.com/video14' },
  { id: 15, courseId: 2, title: 'บทที่ 3: Body Language และการสื่อสารแบบไม่ใช้คำพูด', type: 'video', duration: '40 นาที', completed: true, order: 3, videoUrl: 'https://example.com/video15' },
  { id: 16, courseId: 2, title: 'แบบทดสอบบทที่ 1-3', type: 'quiz', duration: '15 นาที', completed: true, order: 4 },
  { id: 17, courseId: 2, title: 'บทที่ 4: การสื่อสารในทีม', type: 'video', duration: '45 นาที', completed: true, order: 5, videoUrl: 'https://example.com/video17' },
  { id: 18, courseId: 2, title: 'บทที่ 5: การจัดการความขัดแย้ง', type: 'video', duration: '40 นาที', completed: true, order: 6, videoUrl: 'https://example.com/video18' },
  { id: 19, courseId: 2, title: 'งานมอบหมาย: ฝึกปฏิบัติการสื่อสาร', type: 'assignment', duration: '45 นาที', completed: true, order: 7 },
  { id: 20, courseId: 2, title: 'แบบทดสอบปลายภาค', type: 'quiz', duration: '20 นาที', completed: true, order: 8 },

  // Course 3: Data Analytics for Beginners
  { id: 21, courseId: 3, title: 'บทที่ 1: บทนำ Data Analytics', type: 'video', duration: '30 นาที', completed: true, order: 1, videoUrl: 'https://example.com/video21' },
  { id: 22, courseId: 3, title: 'บทที่ 2: Excel พื้นฐาน', type: 'video', duration: '50 นาที', completed: true, order: 2, videoUrl: 'https://example.com/video22' },
  { id: 23, courseId: 3, title: 'บทที่ 3: การทำความสะอาดข้อมูล', type: 'video', duration: '45 นาที', completed: true, order: 3, videoUrl: 'https://example.com/video23' },
  { id: 24, courseId: 3, title: 'แบบทดสอบบทที่ 1-3', type: 'quiz', duration: '20 นาที', completed: false, order: 4 },
  { id: 25, courseId: 3, title: 'บทที่ 4: การวิเคราะห์ข้อมูลด้วย Pivot Table', type: 'video', duration: '55 นาที', completed: false, order: 5, videoUrl: 'https://example.com/video25' },
  { id: 26, courseId: 3, title: 'บทที่ 5: การสร้างกราฟและ Dashboard', type: 'video', duration: '50 นาที', completed: false, order: 6, videoUrl: 'https://example.com/video26' },
  { id: 27, courseId: 3, title: 'งานมอบหมาย: สร้าง Dashboard', type: 'assignment', duration: '90 นาที', completed: false, order: 7 },
  { id: 28, courseId: 3, title: 'บทที่ 6: บทนำ Power BI', type: 'video', duration: '40 นาที', completed: false, order: 8, videoUrl: 'https://example.com/video28' },
];

// ========================================
// MOCK QUIZZES DATA
// ========================================

export const mockQuizzes: Quiz[] = [
  {
    id: 1,
    courseId: 1,
    lessonId: 5,
    title: 'แบบทดสอบบทที่ 1-4: Lean Manufacturing Basics',
    description: 'ทดสอบความเข้าใจเกี่ยวกับหลักการพื้นฐานของ Lean Manufacturing',
    duration: '20 นาที',
    passingScore: 70,
    totalPoints: 100,
    questions: [
      {
        id: 1,
        question: '5S ประกอบด้วยขั้นตอนใดบ้าง?',
        options: [
          'Seiri, Seiton, Seiso, Seiketsu, Shitsuke',
          'Sort, Set, Shine, Standardize, Sustain',
          'ทั้งข้อ 1 และ 2 ถูกต้อง',
          'ไม่มีข้อใดถูก'
        ],
        correctAnswer: 2,
        explanation: '5S คือ Seiri (Sort/คัดแยก), Seiton (Set/จัดระเบียบ), Seiso (Shine/ทำความสะอาด), Seiketsu (Standardize/มาตรฐาน), Shitsuke (Sustain/รักษา)',
        points: 25
      },
      {
        id: 2,
        question: 'ความสูญเสีย (Waste) ใน Lean Manufacturing มีกี่ประเภท?',
        options: ['5 ประเภท', '7 ประเภท', '8 ประเภท', '10 ประเภท'],
        correctAnswer: 2,
        explanation: 'ความสูญเสียใน Lean มี 8 ประเภท: Defects, Overproduction, Waiting, Non-utilized talent, Transportation, Inventory, Motion, Extra-processing',
        points: 25
      },
      {
        id: 3,
        question: 'Value Stream Mapping ใช้เพื่อ?',
        options: [
          'วิเคราะห์กระบวนการผลิต',
          'ระบุจุดที่เกิดความสูญเสีย',
          'ปรับปรุงกระบวนการ',
          'ถูกทุกข้อ'
        ],
        correctAnswer: 3,
        explanation: 'Value Stream Mapping เป็นเครื่องมือที่ใช้วิเคราะห์กระบวนการ ระบุความสูญเสีย และวางแผนการปรับปรุง',
        points: 25
      },
      {
        id: 4,
        question: 'หลักการสำคัญของ Lean Manufacturing คือ?',
        options: [
          'ลดต้นทุนให้ได้มากที่สุด',
          'เพิ่มมูลค่าให้ลูกค้า ลดความสูญเสีย',
          'ผลิตให้เร็วที่สุด',
          'ลดพนักงานให้น้อยที่สุด'
        ],
        correctAnswer: 1,
        explanation: 'Lean มุ่งเน้นการสร้างมูลค่าให้ลูกค้า (Value) และกำจัดความสูญเสีย (Waste) ออกจากกระบวนการ',
        points: 25
      }
    ]
  },
  {
    id: 2,
    courseId: 2,
    lessonId: 16,
    title: 'แบบทดสอบบทที่ 1-3: Communication Basics',
    description: 'ทดสอบความเข้าใจเกี่ยวกับหลักการสื่อสารพื้นฐาน',
    duration: '15 นาที',
    passingScore: 70,
    totalPoints: 100,
    questions: [
      {
        id: 1,
        question: 'องค์ประกอบสำคัญของการสื่อสารที่มีประสิทธิภาพคือ?',
        options: [
          'ผู้ส่งสาร, สาร, ช่องทาง, ผู้รับสาร',
          'ผู้ส่งสาร, สาร, ช่องทาง, ผู้รับสาร, ข้อมูลป้อนกลับ',
          'ผู้พูด และผู้ฟัง',
          'ข้อความและช่องทาง'
        ],
        correctAnswer: 1,
        explanation: 'การสื่อสารที่สมบูรณ์ต้องมี 5 องค์ประกอบ รวมถึง Feedback เพื่อยืนยันความเข้าใจ',
        points: 25
      },
      {
        id: 2,
        question: 'Active Listening คืออะไร?',
        options: [
          'การฟังอย่างตั้งใจและมีสมาธิ',
          'การฟังและตอบสนอง',
          'การฟังและสรุปความ',
          'ถูกทุกข้อ'
        ],
        correctAnswer: 3,
        explanation: 'Active Listening คือการฟังอย่างตั้งใจ มีสมาธิ ตอบสนอง และสรุปความเพื่อยืนยันความเข้าใจ',
        points: 25
      },
      {
        id: 3,
        question: 'Body Language มีความสำคัญต่อการสื่อสารประมาณร้อยละเท่าไร?',
        options: ['30%', '50%', '70%', '90%'],
        correctAnswer: 2,
        explanation: 'Body Language มีผลต่อการสื่อสารประมาณ 55-70% ของการสื่อสารทั้งหมด',
        points: 25
      },
      {
        id: 4,
        question: 'อุปสรรคของการสื่อสารที่พบบ่อยคือ?',
        options: [
          'ภาษาและวัฒนธรรม',
          'อารมณ์และทัศนคติ',
          'สภาพแวดล้อมและเสียงรบกวน',
          'ถูกทุกข้อ'
        ],
        correctAnswer: 3,
        explanation: 'อุปสรรคของการสื่อสารมีหลายรูปแบบ ทั้งด้านภาษา อารมณ์ และสภาพแวดล้อม',
        points: 25
      }
    ]
  },
  {
    id: 3,
    courseId: 3,
    lessonId: 24,
    title: 'แบบทดสอบบทที่ 1-3: Data Analytics Fundamentals',
    description: 'ทดสอบความเข้าใจพื้นฐานการวิเคราะห์ข้อมูล',
    duration: '20 นาที',
    passingScore: 70,
    totalPoints: 100,
    questions: [
      {
        id: 1,
        question: 'Data Analytics คืออะไร?',
        options: [
          'การเก็บข้อมูล',
          'การวิเคราะห์ข้อมูลเพื่อหาข้อมูลเชิงลึก',
          'การสร้างกราฟ',
          'การพิมพ์รายงาน'
        ],
        correctAnswer: 1,
        explanation: 'Data Analytics คือกระบวนการวิเคราะห์ข้อมูลเพื่อค้นหาข้อมูลเชิงลึก รูปแบบ และแนวโน้มที่มีประโยชน์',
        points: 25
      },
      {
        id: 2,
        question: 'ขั้นตอนแรกของการวิเคราะห์ข้อมูลคือ?',
        options: [
          'สร้างกราฟ',
          'ทำความสะอาดข้อมูล',
          'เก็บรวบรวมข้อมูล',
          'นำเสนอผล'
        ],
        correctAnswer: 2,
        explanation: 'ขั้นตอนแรกคือการเก็บรวบรวมข้อมูล ตามด้วยการทำความสะอาด วิเคราะห์ และนำเสนอ',
        points: 25
      },
      {
        id: 3,
        question: 'Pivot Table ใน Excel ใช้เพื่อ?',
        options: [
          'สรุปและวิเคราะห์ข้อมูลจำนวนมาก',
          'สร้างตาราง',
          'พิมพ์เอกสาร',
          'บันทึกไฟล์'
        ],
        correctAnswer: 0,
        explanation: 'Pivot Table เป็นเครื่องมือที่ช่วยสรุป จัดกลุ่ม และวิเคราะห์ข้อมูลจำนวนมากได้อย่างรวดเร็ว',
        points: 25
      },
      {
        id: 4,
        question: 'Data Cleaning สำคัญเพราะ?',
        options: [
          'ทำให้ข้อมูลดูสวยงาม',
          'ลดขนาดไฟล์',
          'ทำให้การวิเคราะห์ถูกต้องแม่นยำ',
          'ประหยัดเวลา'
        ],
        correctAnswer: 2,
        explanation: 'Data Cleaning สำคัญเพราะข้อมูลที่สะอาดและถูกต้องจะทำให้การวิเคราะห์มีความแม่นยำและน่าเชื่อถือ',
        points: 25
      }
    ]
  }
];

// ========================================
// MOCK ASSIGNMENTS DATA
// ========================================

export const mockAssignments: Assignment[] = [
  {
    id: 1,
    courseId: 1,
    lessonId: 8,
    title: 'วิเคราะห์กระบวนการผลิตด้วย Value Stream Mapping',
    description: 'เลือกกระบวนการผลิตหนึ่งกระบวนการในองค์กรของคุณ และสร้าง Value Stream Map แสดงขั้นตอนการทำงาน ระยะเวลา และจุดที่เกิดความสูญเสีย จากนั้นเสนอแนวทางการปรับปรุง',
    deadline: '30 มี.ค. 2568',
    maxScore: 100,
    status: 'pending',
    attachments: []
  },
  {
    id: 2,
    courseId: 2,
    lessonId: 19,
    title: 'ฝึกปฏิบัติการสื่อสารในสถานการณ์จริง',
    description: 'บันทึกวิดีโอการนำเสนอหัวข้อที่ได้รับมอบหมาย ความยาว 5-7 นาที แสดงให้เห็นการใช้เทคนิคการสื่อสารที่มีประสิทธิภาพ การใช้ Body Language และการตอบคำถาม',
    deadline: '25 ก.พ. 2568',
    maxScore: 100,
    status: 'submitted',
    submittedDate: '23 ก.พ. 2568',
    score: 92,
    feedback: 'การนำเสนอดีมาก มีความมั่นใจและใช้ Body Language ได้เหมาะสม ควรปรับปรุงการตอบคำถามให้กระชับขึ้น',
    attachments: ['presentation_video.mp4']
  },
  {
    id: 3,
    courseId: 3,
    lessonId: 27,
    title: 'สร้าง Dashboard วิเคราะห์ข้อมูลการขาย',
    description: 'ใช้ข้อมูลการขายที่ให้มา สร้าง Dashboard ด้วย Excel หรือ Power BI แสดงข้อมูลสำคัญ เช่น ยอดขายรายเดือน สินค้าขายดี ภูมิภาคที่มียอดขายสูง และแนวโน้มการขาย',
    deadline: '15 เม.ย. 2568',
    maxScore: 100,
    status: 'pending',
    attachments: []
  },
  {
    id: 4,
    courseId: 5,
    lessonId: 35,
    title: 'แผนพัฒนาทีมงาน',
    description: 'จัดทำแผนพัฒนาทีมงานของคุณ ระบุจุดแข็ง จุดอ่อน และกิจกรรมที่จะทำเพื่อพัฒนาทีม ความยาว 3-5 หน้า',
    deadline: '10 พ.ค. 2568',
    maxScore: 100,
    status: 'pending',
    attachments: []
  },
  {
    id: 5,
    courseId: 6,
    lessonId: 42,
    title: 'การวิเคราะห์ปัญหาคุณภาพด้วย 7 QC Tools',
    description: 'เลือกปัญหาคุณภาพหนึ่งปัญหาในองค์กร วิเคราะห์ด้วย 7 QC Tools อย่างน้อย 3 เครื่องมือ และเสนอแนวทางแก้ไข',
    deadline: '20 มี.ค. 2568',
    maxScore: 100,
    status: 'graded',
    submittedDate: '18 มี.ค. 2568',
    score: 88,
    feedback: 'การวิเคราะห์ดี ใช้เครื่องมือถูกต้อง แต่ควรเพิ่มรายละเอียดในส่วนของแนวทางแก้ไข',
    attachments: ['quality_analysis.pdf']
  }
];

// ========================================
// MOCK REVIEWS DATA
// ========================================

export const mockReviews: Review[] = [
  // Course 1: Lean Manufacturing
  { id: 1, courseId: 1, userId: 'USR-002', userName: 'สมหญิง รักงาน', rating: 5, comment: 'หลักสูตรดีมาก เนื้อหาครบถ้วน อธิบายง่ายเข้าใจ สามารถนำไปใช้ได้จริง', date: '10 ม.ค. 2568', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: 2, courseId: 1, userId: 'USR-003', userName: 'วิชัย ทำงานดี', rating: 4, comment: 'เนื้อหาดี แต่บางส่วนอาจจะลึกเกินไปสำหรับผู้เริ่มต้น', date: '12 ม.ค. 2568', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  { id: 3, courseId: 1, userId: 'USR-004', userName: 'ประวิทย์ ใฝ่เรียน', rating: 5, comment: 'ชอบมาก มีกรณีศึกษาที่เป็นประโยชน์ อาจารย์สอนดี', date: '15 ม.ค. 2568', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },

  // Course 2: Communication Skills
  { id: 4, courseId: 2, userId: 'USR-005', userName: 'สุดา พูดเก่ง', rating: 5, comment: 'หลักสูตรนี้ช่วยให้ผมพัฒนาทักษะการสื่อสารได้มาก แนะนำเลยครับ', date: '8 ม.ค. 2568', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  { id: 5, courseId: 2, userId: 'USR-006', userName: 'นิตยา สื่อสารดี', rating: 5, comment: 'เนื้อหาเข้าใจง่าย มีแบบฝึกหัดให้ทำ ได้ประโยชน์มาก', date: '9 ม.ค. 2568', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop' },
  { id: 6, courseId: 2, userId: 'USR-007', userName: 'ชัยวัฒน์ เรียนรู้', rating: 4, comment: 'ดีครับ แต่อยากให้มีตัวอย่างเพิ่มเติม', date: '11 ม.ค. 2568', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },

  // Course 3: Data Analytics
  { id: 7, courseId: 3, userId: 'USR-008', userName: 'ดิจิทัล ยุคใหม่', rating: 5, comment: 'สอนดีมาก เข้าใจง่าย เหมาะสำหรับคนที่เริ่มต้นเรียน Data Analytics', date: '20 ม.ค. 2568', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop' },
  { id: 8, courseId: 3, userId: 'USR-009', userName: 'วิเคราะห์ ข้อมูล', rating: 4, comment: 'เนื้อหาดี มีประโยชน์ แต่อยากให้มี hands-on มากกว่านี้', date: '22 ม.ค. 2568', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },

  // Course 5: Leadership
  { id: 9, courseId: 5, userId: 'USR-010', userName: 'วิภา ผู้นำ', rating: 5, comment: 'หลักสูตรที่ดีที่สุดที่เคยเรียน ช่วยพัฒนาทักษะการเป็นผู้นำได้มาก', date: '18 ก.พ. 2568', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
  { id: 10, courseId: 5, userId: 'USR-011', userName: 'โครงการ สำเร็จ', rating: 5, comment: 'เนื้อหาครอบคลุม มีกรณีศึกษาที่น่าสนใจ', date: '20 ก.พ. 2568', avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop' },

  // Course 6: Quality Control
  { id: 11, courseId: 6, userId: 'USR-012', userName: 'คุณภาพ ดีเยี่ยม', rating: 5, comment: 'หลักสูตรดีมาก เนื้อหาครบถ้วน นำไปใช้งานได้จริง', date: '14 ม.ค. 2568', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop' },
  { id: 12, courseId: 6, userId: 'USR-013', userName: 'มาตรฐาน สูง', rating: 4, comment: 'เนื้อหาดี แต่ควรเพิ่มเวลาฝึกปฏิบัติ', date: '16 ม.ค. 2568', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop' },
];

// ========================================
// MOCK PROGRESS TIMELINE DATA
// ========================================

export const mockProgressTimelines: ProgressTimeline[] = [
  {
    courseId: 1,
    milestones: [
      { date: '1 ม.ค. 2568', title: 'เริ่มเรียน', description: 'ลงทะเบียนหลักสูตร Lean Manufacturing', completed: true, type: 'start' },
      { date: '5 ม.ค. 2568', title: 'เรียนจบบทที่ 1-3', description: 'ทำความเข้าใจพื้นฐาน Lean และ 5S', completed: true, type: 'lesson' },
      { date: '12 ม.ค. 2568', title: 'ผ่านแบบทดสอบกลางภาค', description: 'คะแนน 85/100', completed: true, type: 'quiz' },
      { date: '20 ม.ค. 2568', title: 'ส่งงาน Value Stream Mapping', description: 'วิเคราะห์กระบวนการผลิต', completed: false, type: 'assignment' },
      { date: '31 มี.ค. 2568', title: 'จบหลักสูตร', description: 'ทดสอบปลายภาคและรับใบประกาศ', completed: false, type: 'completion' },
    ]
  },
  {
    courseId: 2,
    milestones: [
      { date: '15 ม.ค. 2568', title: 'เริ่มเรียน', description: 'ลงทะเบียนหลักสูตร Communication Skills', completed: true, type: 'start' },
      { date: '20 ม.ค. 2568', title: 'เรียนจบบทที่ 1-3', description: 'เรียนรู้หลักการสื่อสารพื้นฐาน', completed: true, type: 'lesson' },
      { date: '25 ม.ค. 2568', title: 'ผ่านแบบทดสอบกลางภาค', description: 'คะแนน 90/100', completed: true, type: 'quiz' },
      { date: '1 ก.พ. 2568', title: 'ส่งงานฝึกปฏิบัติ', description: 'บันทึกวิดีโอการนำเสนอ', completed: true, type: 'assignment' },
      { date: '10 ก.พ. 2568', title: 'จบหลักสูตร', description: 'ผ่านการประเมินและรับใบประกาศ', completed: true, type: 'completion' },
    ]
  }
];

// ========================================
// HELPER FUNCTIONS
// ========================================

// Users
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getCurrentUser = (): User => {
  return mockUsers[0]; // Default user
};

// Authentication function
export const authenticateUser = (username: string, password: string): User | null => {
  const user = mockUsers.find(
    u => (u.username === username || u.email === username || u.employeeId === username)
      && u.password === password
  );
  return user || null;
};

// Courses
export const getCourseById = (id: number): Course | undefined => {
  return mockCourses.find(course => course.id === id);
};

// Get recommended courses based on user level
export const getRecommendedCourses = (userLevel: string, limit: number = 8): Course[] => {
  const levelNum = parseInt(userLevel.replace('L', ''));

  return mockCourses
    .filter(course => course.levelRange && course.priority) // Only recommended courses
    .sort((a, b) => {
      // Priority 1: Courses that include current level
      const aInRange = a.levelRange && levelNum >= a.levelRange[0] && levelNum <= a.levelRange[1];
      const bInRange = b.levelRange && levelNum >= b.levelRange[0] && levelNum <= b.levelRange[1];

      if (aInRange && !bInRange) return -1;
      if (!aInRange && bInRange) return 1;

      // Priority 2: Sort by priority field
      return (a.priority || 99) - (b.priority || 99);
    })
    .slice(0, limit);
};

export const getCoursesByStatus = (status: string): Course[] => {
  return mockCourses.filter(course => course.status === status);
};

export const getCoursesByDepartment = (department: string): Course[] => {
  return mockCourses.filter(course => course.department === department);
};

export const getCoursesByLevel = (level: string): Course[] => {
  return mockCourses.filter(course => course.level.includes(level));
};

export const searchCourses = (query: string): Course[] => {
  const lowerQuery = query.toLowerCase();
  return mockCourses.filter(course =>
    course.title.toLowerCase().includes(lowerQuery) ||
    course.category.toLowerCase().includes(lowerQuery) ||
    course.instructor.toLowerCase().includes(lowerQuery) ||
    course.courseCode.toLowerCase().includes(lowerQuery) ||
    course.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// Activities
export const getActivitiesByUserId = (userId: string): Activity[] => {
  return mockActivities; // In real app, filter by userId
};

export const getRecentActivities = (limit: number = 5): Activity[] => {
  return mockActivities.slice(0, limit);
};

// Certificates
export const getCertificatesByUserId = (userId: string): Certificate[] => {
  return mockCertificates; // In real app, filter by userId
};

export const getCertificateById = (id: string): Certificate | undefined => {
  return mockCertificates.find(cert => cert.id === id);
};

// Events
export const getEventsByDate = (date: string): Event[] => {
  return mockEvents.filter(event => event.date === date);
};

export const getUpcomingEvents = (limit?: number): Event[] => {
  const upcoming = mockEvents.filter(event => event.status === 'upcoming');
  return limit ? upcoming.slice(0, limit) : upcoming;
};

// ========================================
// LEARNING PROGRESS TRACKING FUNCTIONS
// ========================================

export const getLearningProgress = (userId: string, courseId: number) => {
  // Mock learning progress data
  const progressData = {
    1: {
      courseId: 1,
      userId: '1',
      overallProgress: 25,
      totalTimeSpent: 8.5,
      averageScore: 85,
      status: 'in-progress',
      enrolledDate: '2024-01-15',
      lastAccessed: '2024-01-20',
      lessonsCompleted: 2,
      totalLessons: 6,
      assignmentsCompleted: 1,
      totalAssignments: 2,
      quizzesCompleted: 2,
      totalQuizzes: 3
    }
  };

  return progressData[courseId as keyof typeof progressData] || null;
};

export const getRecentLearningActivities = (userId: string, limit: number = 5) => {
  // Mock recent learning activities
  const activities = [
    {
      id: 1,
      type: 'lesson_completed',
      title: 'เสร็จสิ้นบทเรียน: บทที่ 2 ความสำคัญของการจัดการทีม',
      course: 'การจัดการทีมอย่างมีประสิทธิภาพ',
      courseId: 1,
      time: '2024-01-18 10:15',
      score: 90
    },
    {
      id: 2,
      type: 'quiz_completed',
      title: 'ทำแบบทดสอบหลังบทเรียนที่ 2',
      course: 'การจัดการทีมอย่างมีประสิทธิภาพ',
      courseId: 1,
      time: '2024-01-18 11:30',
      score: 90
    },
    {
      id: 3,
      type: 'assignment_submitted',
      title: 'ส่งงาน: วิเคราะห์กรณีศึกษาทีม',
      course: 'การจัดการทีมอย่างมีประสิทธิภาพ',
      courseId: 1,
      time: '2024-01-20 14:30',
      score: 85
    },
    {
      id: 4,
      type: 'lesson_started',
      title: 'เริ่มเรียน: บทที่ 3 บทบาทของหัวหน้าทีม',
      course: 'การจัดการทีมอย่างมีประสิทธิภาพ',
      courseId: 1,
      time: '2024-01-20 16:00',
      score: null
    },
    {
      id: 5,
      type: 'discussion_posted',
      title: 'โพสต์: มีใครเคยเจอปัญหาการจัดการทีมที่มีคนอายุต่างกันมากบ้าง?',
      course: 'การจัดการทีมอย่างมีประสิทธิภาพ',
      courseId: 1,
      time: '2024-01-20 18:45',
      score: null
    }
  ];

  return activities.slice(0, limit);
};

export const getUpcomingDeadlines = (userId: string, limit: number = 5) => {
  // Mock upcoming deadlines
  const deadlines = [
    {
      id: 1,
      type: 'assignment',
      title: 'สร้างแผนการพัฒนาทีม',
      course: 'การจัดการทีมอย่างมีประสิทธิภาพ',
      courseId: 1,
      dueDate: '2024-01-30',
      dueTime: '23:59',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'quiz',
      title: 'แบบทดสอบหลังบทเรียนที่ 3',
      course: 'การจัดการทีมอย่างมีประสิทธิภาพ',
      courseId: 1,
      dueDate: '2024-01-25',
      dueTime: '23:59',
      priority: 'high'
    }
  ];

  return deadlines.slice(0, limit);
};

export const getLearningStats = (userId: string) => {
  // Mock comprehensive learning stats
  return {
    totalCourses: 3,
    inProgressCourses: 1,
    completedCourses: 1,
    totalLessons: 18,
    completedLessons: 5,
    totalTimeSpent: 25.5,
    averageScore: 87,
    streak: 7, // consecutive days
    achievements: 8,
    certificates: 2,
    upcomingDeadlines: 2,
    thisWeekHours: 8.5,
    lastWeekHours: 12.0,
    monthlyProgress: 65
  };
};

export const getCourseProgressDetails = (userId: string, courseId: number) => {
  // Mock detailed course progress
  return {
    courseId,
    progress: 25,
    timeSpent: 8.5,
    lastAccessed: '2024-01-20',
    nextLesson: {
      id: 3,
      title: 'บทที่ 3: บทบาทของหัวหน้าทีม',
      progress: 25
    },
    upcomingTasks: [
      {
        type: 'quiz',
        title: 'แบบทดสอบหลังบทเรียนที่ 3',
        dueDate: '2024-01-25'
      },
      {
        type: 'assignment',
        title: 'สร้างแผนการพัฒนาทีม',
        dueDate: '2024-01-30'
      }
    ],
    recentAchievements: [
      {
        id: 1,
        title: 'Fast Learner',
        description: 'เรียนรู้บทเรียนแรกเสร็จภายใน 24 ชั่วโมง',
        earnedAt: '2024-01-16'
      }
    ]
  };
};

export const getEventsByMonth = (year: number, month: number): Event[] => {
  return mockEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });
};

export const getEventsByWeek = (startDate: Date): Event[] => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);

  return mockEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= startDate && eventDate < endDate;
  });
};

export const getEventsByType = (type: string): Event[] => {
  return mockEvents.filter(event => event.type === type);
};

// Get upcoming schedule/calendar events for learner dashboard
export const getUpcomingSchedule = (limit: number = 4): Event[] => {
  return mockEvents
    .filter(event =>
      (event.type === 'live-session' || event.type === 'webinar' || event.type === 'deadline')
      && event.status === 'upcoming'
    )
    .slice(0, limit);
};

// Lessons
export const getLessonsByCourseId = (courseId: number): Lesson[] => {
  return mockLessons.filter(lesson => lesson.courseId === courseId).sort((a, b) => a.order - b.order);
};

export const getLessonById = (id: number): Lesson | undefined => {
  return mockLessons.find(lesson => lesson.id === id);
};

export const getCompletedLessons = (courseId: number): Lesson[] => {
  return mockLessons.filter(lesson => lesson.courseId === courseId && lesson.completed);
};

export const getNextLesson = (courseId: number): Lesson | undefined => {
  const lessons = getLessonsByCourseId(courseId);
  return lessons.find(lesson => !lesson.completed);
};

// Quizzes
export const getQuizById = (id: number): Quiz | undefined => {
  return mockQuizzes.find(quiz => quiz.id === id);
};

export const getQuizzesByCourseId = (courseId: number): Quiz[] => {
  return mockQuizzes.filter(quiz => quiz.courseId === courseId);
};

export const getQuizByLessonId = (lessonId: number): Quiz | undefined => {
  return mockQuizzes.find(quiz => quiz.lessonId === lessonId);
};

// Assignments
export const getAssignmentById = (id: number): Assignment | undefined => {
  return mockAssignments.find(assignment => assignment.id === id);
};

export const getAssignmentsByCourseId = (courseId: number): Assignment[] => {
  return mockAssignments.filter(assignment => assignment.courseId === courseId);
};

export const getAssignmentByLessonId = (lessonId: number): Assignment | undefined => {
  return mockAssignments.find(assignment => assignment.lessonId === lessonId);
};

export const getPendingAssignments = (userId?: string): Assignment[] => {
  return mockAssignments.filter(assignment => assignment.status === 'pending');
};

export const getSubmittedAssignments = (userId?: string): Assignment[] => {
  return mockAssignments.filter(assignment => assignment.status === 'submitted');
};

export const getGradedAssignments = (userId?: string): Assignment[] => {
  return mockAssignments.filter(assignment => assignment.status === 'graded');
};

// Reviews
export const getReviewsByCourseId = (courseId: number): Review[] => {
  return mockReviews.filter(review => review.courseId === courseId);
};

export const getReviewById = (id: number): Review | undefined => {
  return mockReviews.find(review => review.id === id);
};

export const getAverageRating = (courseId: number): number => {
  const reviews = getReviewsByCourseId(courseId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};

export const getReviewCount = (courseId: number): number => {
  return getReviewsByCourseId(courseId).length;
};

// Progress Timeline
export const getProgressTimeline = (courseId: number): ProgressTimeline | undefined => {
  return mockProgressTimelines.find(timeline => timeline.courseId === courseId);
};

export const getCompletedMilestones = (courseId: number): number => {
  const timeline = getProgressTimeline(courseId);
  if (!timeline) return 0;
  return timeline.milestones.filter(m => m.completed).length;
};

export const getTotalMilestones = (courseId: number): number => {
  const timeline = getProgressTimeline(courseId);
  if (!timeline) return 0;
  return timeline.milestones.length;
};

// Stats
export const getUserStats = (userId: string): DashboardStats => {
  const userCourses = mockCourses.filter(c => c.progress !== undefined);
  return {
    totalCourses: userCourses.length,
    completedCourses: userCourses.filter(c => c.status === 'completed').length,
    inProgressCourses: userCourses.filter(c => c.status === 'in-progress').length,
    upcomingCourses: userCourses.filter(c => c.status === 'upcoming').length,
    totalHours: userCourses.reduce((sum, c) => sum + parseInt(c.duration), 0),
    certificates: mockCertificates.length,
    averageScore: mockCertificates.length > 0
      ? mockCertificates.reduce((sum, c) => sum + c.score, 0) / mockCertificates.length
      : 0,
    streak: 15, // Mock streak data
  };
};

export const getDashboardStats = (role: string): DashboardStats => {
  switch (role) {
    case 'learner':
      return getUserStats('USR-001');

    case 'instructor':
      return {
        totalCourses: 3,
        totalStudents: 450,
        pendingGrading: 12,
        averageScore: 87.5,
      };

    case 'admin':
      return {
        totalUsers: mockUsers.length,
        activeUsers: mockUsers.filter(u => u.role !== 'admin').length,
        totalCourses: mockCourses.length,
        activeCourses: mockCourses.filter(c => c.status !== 'upcoming').length,
      };

    case 'course-creator':
      return {
        totalCourses: 5,
        totalStudents: 890,
        averageScore: 88.3,
        completionRate: 78.5,
      };

    default:
      return {};
  }
};

// Course Progress
export const getCourseProgress = (courseId: number): number => {
  const lessons = getLessonsByCourseId(courseId);
  if (lessons.length === 0) return 0;
  const completed = lessons.filter(l => l.completed).length;
  return Math.round((completed / lessons.length) * 100);
};

// ========================================
// EXPORT ALL
// ========================================

export default {
  // Data
  users: mockUsers,
  courses: mockCourses,
  activities: mockActivities,
  certificates: mockCertificates,
  events: mockEvents,
  lessons: mockLessons,
  quizzes: mockQuizzes,
  assignments: mockAssignments,
  reviews: mockReviews,
  progressTimelines: mockProgressTimelines,

  // User functions
  getUserById,
  getCurrentUser,
  authenticateUser,

  // Course functions
  getCourseById,
  getCoursesByStatus,
  getCoursesByDepartment,
  getCoursesByLevel,
  searchCourses,
  getCourseProgress,
  getRecommendedCourses,

  // Activity functions
  getActivitiesByUserId,
  getRecentActivities,

  // Certificate functions
  getCertificatesByUserId,
  getCertificateById,

  // Event functions
  getEventsByDate,
  getUpcomingEvents,
  getEventsByMonth,
  getEventsByWeek,
  getEventsByType,

  // Learning Progress Tracking functions
  getLearningProgress,
  getRecentLearningActivities,
  getUpcomingDeadlines,
  getLearningStats,
  getCourseProgressDetails,
  getUpcomingSchedule,

  // Lesson functions
  getLessonsByCourseId,
  getLessonById,
  getCompletedLessons,
  getNextLesson,

  // Quiz functions
  getQuizById,
  getQuizzesByCourseId,
  getQuizByLessonId,

  // Assignment functions
  getAssignmentById,
  getAssignmentsByCourseId,
  getAssignmentByLessonId,
  getPendingAssignments,
  getSubmittedAssignments,
  getGradedAssignments,

  // Review functions
  getReviewsByCourseId,
  getReviewById,
  getAverageRating,
  getReviewCount,

  // Progress functions
  getProgressTimeline,
  getCompletedMilestones,
  getTotalMilestones,

  // Stats functions
  getUserStats,
  getDashboardStats,
};
