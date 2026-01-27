# 📦 Mock Database - Centralized Data Management

โฟลเดอร์นี้เป็นแหล่งข้อมูล Mock ส่วนกลางสำหรับทั้งระบบ เพื่อให้ทุกหน้าใช้ข้อมูลชุดเดียวกัน

## 📁 โครงสร้างไฟล์

```
app/database/
├── mockData.ts                  # ข้อมูล Mock ทั้งหมด + Helper Functions
├── constants.ts                 # ค่าคงที่ Filter Options, Calendar, Navigation
├── thailand-address-data.ts     # ข้อมูลจังหวัด-อำเภอ-ตำบล
└── README.md                    # เอกสารนี้
```

## 🎯 วัตถุประสงค์

1. **Centralized Data** - ข้อมูลอยู่ที่เดียว ไม่กระจัดกระจาย
2. **Consistency** - ทุกหน้าใช้ข้อมูลเดียวกัน
3. **Easy Maintenance** - แก้ไขที่เดียว มีผลทั้งระบบ
4. **Reusability** - มี Helper Functions พร้อมใช้
5. **Type Safety** - มี TypeScript Interfaces ครบถ้วน

---

## 📊 ข้อมูลที่มีใน mockData.ts

### 1. **Users** (ผู้ใช้งาน) - 5 users

```typescript
import { mockUsers, getCurrentUser, getUserById } from '@/app/database/mockData';

// ดึงข้อมูลผู้ใช้ปัจจุบัน
const user = getCurrentUser();

// ดึงข้อมูลผู้ใช้ตาม ID
const user = getUserById('USR-001');
```

**ครอบคลุม roles:** learner, instructor, admin, course-creator

---

### 2. **Courses** (หลักสูตร) - 8 courses

```typescript
import { 
  mockCourses, 
  getCourseById, 
  getCoursesByStatus,
  getCoursesByDepartment,
  getCoursesByLevel,
  searchCourses,
  getCourseProgress
} from '@/app/database/mockData';

// ดึงหลักสูตรทั้งหมด
const allCourses = mockCourses;

// ดึงหลักสูตรตาม ID
const course = getCourseById(1);

// ดึงหลักสูตรตามสถานะ
const inProgressCourses = getCoursesByStatus('in-progress');
const completedCourses = getCoursesByStatus('completed');

// ดึงหลักสูตรตามแผนก
const productionCourses = getCoursesByDepartment('การผลิต');

// ดึงหลักสูตรตาม Level
const l2Courses = getCoursesByLevel('L2');

// ค้นหาหลักสูตร
const results = searchCourses('Lean');

// คำนวณความคืบหน้า
const progress = getCourseProgress(1); // returns percentage
```

---

### 3. **Lessons** (บทเรียน) - 28 lessons

```typescript
import { 
  mockLessons,
  getLessonsByCourseId,
  getLessonById,
  getCompletedLessons,
  getNextLesson
} from '@/app/database/mockData';

// ดึงบทเรียนทั้งหมดของหลักสูตร (เรียงตาม order)
const lessons = getLessonsByCourseId(1);

// ดึงบทเรียนตาม ID
const lesson = getLessonById(1);

// ดึงบทเรียนที่เรียนจบแล้ว
const completed = getCompletedLessons(1);

// ดึงบทเรียนถัดไปที่ยังไม่เรียน
const nextLesson = getNextLesson(1);
```

**ประเภทบทเรียน:** video, document, quiz, assignment

---

### 4. **Quizzes** (แบบทดสอบ) - 3 quizzes

```typescript
import { 
  mockQuizzes,
  getQuizById,
  getQuizzesByCourseId,
  getQuizByLessonId
} from '@/app/database/mockData';

// ดึงแบบทดสอบตาม ID
const quiz = getQuizById(1);

// ดึงแบบทดสอบทั้งหมดของหลักสูตร
const quizzes = getQuizzesByCourseId(1);

// ดึงแบบทดสอบจากบทเรียน
const lessonQuiz = getQuizByLessonId(5);
```

**โครงสร้าง:** แต่ละ quiz มี questions พร้อม options, correctAnswer, explanation, points

---

### 5. **Assignments** (งานที่มอบหมาย) - 5 assignments

```typescript
import { 
  mockAssignments,
  getAssignmentById,
  getAssignmentsByCourseId,
  getAssignmentByLessonId,
  getPendingAssignments,
  getSubmittedAssignments,
  getGradedAssignments
} from '@/app/database/mockData';

// ดึงงานตาม ID
const assignment = getAssignmentById(1);

// ดึงงานทั้งหมดของหลักสูตร
const assignments = getAssignmentsByCourseId(1);

// ดึงงานจากบทเรียน
const lessonAssignment = getAssignmentByLessonId(8);

// ดึงงานตามสถานะ
const pending = getPendingAssignments();
const submitted = getSubmittedAssignments();
const graded = getGradedAssignments();
```

**สถานะ:** pending, submitted, graded

---

### 6. **Reviews** (รีวิวหลักสูตร) - 12 reviews

```typescript
import { 
  mockReviews,
  getReviewsByCourseId,
  getReviewById,
  getAverageRating,
  getReviewCount
} from '@/app/database/mockData';

// ดึงรีวิวทั้งหมดของหลักสูตร
const reviews = getReviewsByCourseId(1);

// ดึงรีวิวตาม ID
const review = getReviewById(1);

// คำนวณคะแนนเฉลี่ย
const avgRating = getAverageRating(1); // returns number (0-5)

// นับจำนวนรีวิว
const count = getReviewCount(1);
```

---

### 7. **Activities** (กิจกรรม) - 5 activities

```typescript
import { 
  mockActivities, 
  getActivitiesByUserId,
  getRecentActivities 
} from '@/app/database/mockData';

// ดึงกิจกรรมทั้งหมด
const activities = mockActivities;

// ดึงกิจกรรมล่าสุด
const recent = getRecentActivities(5);

// ดึงกิจกรรมของผู้ใช้
const userActivities = getActivitiesByUserId('USR-001');
```

**ประเภท:** completed, enrolled, certificate, achievement

---

### 8. **Certificates** (ใบประกาศ) - 3 certificates

```typescript
import { 
  mockCertificates, 
  getCertificateById,
  getCertificatesByUserId 
} from '@/app/database/mockData';

// ดึงใบประกาศทั้งหมด
const certificates = mockCertificates;

// ดึงใบประกาศตาม ID
const cert = getCertificateById('6');

// ดึงใบประกาศของผู้ใช้
const userCerts = getCertificatesByUserId('USR-001');
```

---

### 9. **Events/Schedule** (ตารางเรียน/กิจกรรม) - 23 events

```typescript
import { 
  mockEvents,
  getEventsByDate,
  getUpcomingEvents,
  getEventsByMonth,
  getEventsByWeek,
  getEventsByType
} from '@/app/database/mockData';

// ดึงกิจกรรมทั้งหมด
const events = mockEvents;

// ดึงกิจกรรมตามวันที่
const todayEvents = getEventsByDate('2025-01-25');

// ดึงกิจกรรมที่กำลังจะมาถึง
const upcoming = getUpcomingEvents(10);

// ดึงกิจกรรมตามเดือน
const januaryEvents = getEventsByMonth(2025, 0); // 0 = มกราคม

// ดึงกิจกรรมตามสัปดาห์
const weekEvents = getEventsByWeek(new Date());

// ดึงกิจกรรมตามประเภท
const exams = getEventsByType('exam');
```

**ประเภท:** class, exam, assignment, event

---

### 10. **Progress Timeline** (ไทม์ไลน์ความคืบหน้า) - 2 timelines

```typescript
import { 
  mockProgressTimelines,
  getProgressTimeline,
  getCompletedMilestones,
  getTotalMilestones
} from '@/app/database/mockData';

// ดึง timeline ของหลักสูตร
const timeline = getProgressTimeline(1);

// นับ milestones ที่เสร็จแล้ว
const completed = getCompletedMilestones(1);

// นับ milestones ทั้งหมด
const total = getTotalMilestones(1);
```

---

### 11. **Dashboard Stats** (สถิติแดชบอร์ด)

```typescript
import { getUserStats, getDashboardStats } from '@/app/database/mockData';

// ดึงสถิติของผู้ใช้
const stats = getUserStats('USR-001');
// Returns: {
//   totalCourses: 8,
//   completedCourses: 3,
//   inProgressCourses: 4,
//   upcomingCourses: 1,
//   totalHours: 272,
//   certificates: 3,
//   averageScore: 90.47
// }

// ดึงสถิติตาม role
const learnerStats = getDashboardStats('learner');
const instructorStats = getDashboardStats('instructor');
const adminStats = getDashboardStats('admin');
const creatorStats = getDashboardStats('course-creator');
```

---

## 🎨 ข้อมูลที่มีใน constants.ts

### 1. **Filter Options**

```typescript
import { 
  filterOptions,
  getCategories,
  getLevels,
  getDepartments,
  getRoles,
  getStatuses
} from '@/app/database/constants';

// ดึง categories ทั้งหมด
const categories = getCategories();
// ['การผลิต', 'คุณภาพ', 'ความปลอดภัย', ...]

// ดึง levels ทั้งหมด
const levels = getLevels();
// ['L0', 'L1', 'L2', ..., 'L13']

// ดึง departments
const departments = getDepartments();

// ดึง roles
const roles = getRoles();
// [{ value: 'learner', label: 'ผู้เรียน' }, ...]
```

---

### 2. **Calendar Constants**

```typescript
import { 
  calendarConstants,
  getThaiMonths,
  getThaiDays
} from '@/app/database/constants';

// ดึงชื่อเดือนภาษาไทย
const months = getThaiMonths();
// ['มกราคม', 'กุมภาพันธ์', ...]

// ดึงชื่อวันภาษาไทย
const days = getThaiDays();
// ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']

// เข้าถึงข้อมูลทั้งหมด
const { thaiMonths, thaiDays, thaiDaysFull, englishMonths } = calendarConstants;
```

---

### 3. **Navigation Items**

```typescript
import { getNavigationItems } from '@/app/database/constants';

// ดึงเมนูตาม role
const learnerNav = getNavigationItems('learner');
const instructorNav = getNavigationItems('instructor');
const adminNav = getNavigationItems('admin');

// Returns array of: { name, href, icon, roles?, badge? }
```

---

### 4. **Grade Scales**

```typescript
import { getGradeFromScore, getGPAFromScore } from '@/app/database/constants';

// แปลงคะแนนเป็นเกรด
const grade = getGradeFromScore(85); // returns 'B+'

// แปลงคะแนนเป็น GPA
const gpa = getGPAFromScore(85); // returns 3.5
```

---

## 🗺️ ข้อมูลที่มีใน thailand-address-data.ts

### Thailand Address Data

```typescript
import {
  thailandAddressData,
  getProvinces,
  getDistrictsByProvince,
  getSubDistrictsByDistrict,
  getPostalCodeBySubDistrict
} from '@/app/database/thailand-address-data';

// ดึงจังหวัดทั้งหมด
const provinces = getProvinces();

// ดึงอำเภอตามจังหวัด
const districts = getDistrictsByProvince('กรุงเทพมหานคร');

// ดึงตำบลตามอำเภอ
const subDistricts = getSubDistrictsByDistrict('กรุงเทพมหานคร', 'คลองเตย');

// ดึงรหัสไปรษณีย์
const postalCode = getPostalCodeBySubDistrict('กรุงเทพมหานคร', 'คลองเตย', 'คลองเตย');
// returns '10110'
```

**ครอบคลุม:** 20 จังหวัด, 50+ อำเภอ, 150+ ตำบล

---

## 🔧 ตัวอย่างการใช้งานในหน้าต่างๆ

### ตัวอย่างที่ 1: Course Detail Page

```typescript
'use client';

import { useParams } from 'next/navigation';
import {
  getCourseById,
  getLessonsByCourseId,
  getReviewsByCourseId,
  getAverageRating,
  getReviewCount
} from '@/app/database/mockData';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = parseInt(params.id as string);

  const course = getCourseById(courseId);
  const lessons = getLessonsByCourseId(courseId);
  const reviews = getReviewsByCourseId(courseId);
  const avgRating = getAverageRating(courseId);
  const reviewCount = getReviewCount(courseId);

  if (!course) return <div>Course not found</div>;

  return (
    <div>
      <h1>{course.title}</h1>
      <p>Rating: {avgRating.toFixed(1)} ({reviewCount} reviews)</p>
      <h2>Lessons ({lessons.length})</h2>
      {lessons.map(lesson => (
        <div key={lesson.id}>{lesson.title}</div>
      ))}
    </div>
  );
}
```

---

### ตัวอย่างที่ 2: Quiz Page

```typescript
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getQuizById } from '@/app/database/mockData';

export default function QuizPage() {
  const params = useParams();
  const quizId = parseInt(params.id as string);
  const quiz = getQuizById(quizId);
  
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);

  if (!quiz) return <div>Quiz not found</div>;

  const handleSubmit = () => {
    let totalScore = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        totalScore += q.points;
      }
    });
    setScore(totalScore);
  };

  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>
      {/* Render questions */}
    </div>
  );
}
```

---

### ตัวอย่างที่ 3: Learner Dashboard

```typescript
'use client';

import {
  getCurrentUser,
  getUserStats,
  getRecentActivities,
  getUpcomingEvents
} from '@/app/database/mockData';

export default function LearnerDashboard() {
  const user = getCurrentUser();
  const stats = getUserStats(user.id);
  const activities = getRecentActivities(5);
  const events = getUpcomingEvents(5);

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      
      <div className="stats">
        <div>Total Courses: {stats.totalCourses}</div>
        <div>Completed: {stats.completedCourses}</div>
        <div>In Progress: {stats.inProgressCourses}</div>
        <div>Average Score: {stats.averageScore?.toFixed(1)}</div>
      </div>

      <div className="activities">
        <h2>Recent Activities</h2>
        {activities.map(activity => (
          <div key={activity.id}>{activity.title}</div>
        ))}
      </div>

      <div className="schedule">
        <h2>Upcoming Events</h2>
        {events.map(event => (
          <div key={event.id}>{event.title} - {event.date}</div>
        ))}
      </div>
    </div>
  );
}
```

---

### ตัวอย่างที่ 4: Catalog Page with Filters

```typescript
'use client';

import { useState } from 'react';
import { mockCourses, searchCourses } from '@/app/database/mockData';
import { getCategories, getLevels } from '@/app/database/constants';

export default function CatalogPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const categories = getCategories();
  const levels = getLevels();

  let courses = query ? searchCourses(query) : mockCourses;
  
  if (selectedCategory) {
    courses = courses.filter(c => c.category === selectedCategory);
  }
  
  if (selectedLevel) {
    courses = courses.filter(c => c.level.includes(selectedLevel));
  }

  return (
    <div>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search courses..."
      />
      
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select onChange={(e) => setSelectedLevel(e.target.value)}>
        <option value="">All Levels</option>
        {levels.map(level => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>

      <div className="courses">
        {courses.map(course => (
          <div key={course.id}>{course.title}</div>
        ))}
      </div>
    </div>
  );
}
```

---

## 📈 สถิติข้อมูล Mock

- **Users:** 5 users (ครอบคลุมทุก role)
- **Courses:** 8 courses (หลากหลายหมวดหมู่)
- **Lessons:** 28 lessons (video, quiz, assignment, document)
- **Quizzes:** 3 quizzes (รวม 12 คำถาม)
- **Assignments:** 5 assignments (ทุกสถานะ)
- **Reviews:** 12 reviews (ครอบคลุม 6 courses)
- **Activities:** 5 activities (ทุกประเภท)
- **Certificates:** 3 certificates
- **Events:** 23 events (ครอบคลุม 4 เดือน)
- **Progress Timelines:** 2 timelines
- **Provinces:** 20 จังหวัด
- **Districts:** 50+ อำเภอ
- **Sub-districts:** 150+ ตำบล

---

## ✅ ประโยชน์ที่ได้รับ

1. **Single Source of Truth** - ข้อมูลอยู่ที่เดียว แก้ไขง่าย
2. **Type Safety** - มี TypeScript interfaces ครบถ้วน
3. **Consistency** - ข้อมูลตรงกันทั้งระบบ
4. **Maintainability** - บำรุงรักษาง่าย ไม่ต้องหาข้อมูลกระจัดกระจาย
5. **Scalability** - เพิ่มข้อมูลใหม่ได้ง่าย
6. **Ready for API** - เปลี่ยนเป็น API calls ได้ทันที โดยแค่แทนที่ helper functions

---

## 🚀 ขั้นตอนต่อไป (เมื่อพัฒนาจริง)

1. แทนที่ mock data ด้วย API calls
2. ใช้ State Management (Redux, Zustand, etc.)
3. เพิ่ม Caching (React Query, SWR)
4. เพิ่ม Real-time updates (WebSocket)
5. เพิ่ม Pagination สำหรับข้อมูลจำนวนมาก
6. เพิ่ม Error Handling และ Loading States

---

**หมายเหตุ:** ไฟล์นี้เป็น Mock Data สำหรับการพัฒนาเท่านั้น ในระบบจริงควรดึงข้อมูลจาก Backend API
