'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/MainLayout';

// Mock course detail data
const getCourseDetail = (id: string) => {
  const courses: Record<string, any> = {
    '6': {
      id: 6,
      title: 'Lean Manufacturing Fundamentals',
      category: 'Process Improvement',
      instructor: 'อ.ลีน ประสิทธิภาพ',
      progress: 100,
      level: 'L2-L4',
      status: 'completed',
      thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400',
      duration: 15,
      enrolled: 445,
      completedLessons: 15,
      totalLessons: 15,
      completedDate: '15 ม.ค. 2568',
      certificateId: 'CERT-2024-001',
      year: 2024,
      department: 'การผลิต',
      tags: ['Lean', 'Manufacturing', 'Kaizen', '5S', 'Waste Reduction'],
      courseCode: 'LM-2023-025',
      language: 'ไทย',
      startDate: '1 ธ.ค. 2567',
      description: 'หลักสูตรพื้นฐานการผลิตแบบลีน เรียนรู้หลักการลดความสูญเปล่า เพิ่มประสิทธิภาพ และสร้างคุณค่าให้กับลูกค้า',
      learningObjectives: [
        'เข้าใจหลักการและปรัชญาของ Lean Manufacturing',
        'สามารถระบุและลดความสูญเปล่า 7 ประการในกระบวนการผลิต',
        'ประยุกต์ใช้เครื่องมือ Lean เช่น 5S, Kaizen, Value Stream Mapping',
        'วิเคราะห์และปรับปรุงกระบวนการทำงานอย่างต่อเนื่อง',
      ],
      syllabus: [
        {
          module: 'Module 1: Introduction to Lean Manufacturing',
          topics: ['ประวัติและหลักการ Lean', 'Toyota Production System', '7 Wastes (Muda)', 'Value & Value Stream'],
          duration: '2 ชั่วโมง',
        },
        {
          module: 'Module 2: 5S Workplace Organization',
          topics: ['Seiri (Sort)', 'Seiton (Set in Order)', 'Seiso (Shine)', 'Seiketsu (Standardize)', 'Shitsuke (Sustain)'],
          duration: '3 ชั่วโมง',
        },
        {
          module: 'Module 3: Value Stream Mapping',
          topics: ['Current State Mapping', 'Future State Mapping', 'Implementation Planning', 'Metrics & KPIs'],
          duration: '3 ชั่วโมง',
        },
        {
          module: 'Module 4: Kaizen & Continuous Improvement',
          topics: ['Kaizen Events', 'PDCA Cycle', 'Problem Solving', 'Team Building'],
          duration: '3 ชั่วโมง',
        },
        {
          module: 'Module 5: Lean Tools & Techniques',
          topics: ['Kanban System', 'Just-in-Time (JIT)', 'Poka-Yoke', 'Standard Work'],
          duration: '2 ชั่วโมง',
        },
        {
          module: 'Module 6: Implementation & Case Studies',
          topics: ['Real-world Examples', 'Best Practices', 'Common Challenges', 'Final Project'],
          duration: '2 ชั่วโมง',
        },
      ],
      assessments: [
        { name: 'Quiz Module 1-2', score: 95, maxScore: 100, date: '5 ธ.ค. 2567' },
        { name: 'Quiz Module 3-4', score: 88, maxScore: 100, date: '10 ธ.ค. 2567' },
        { name: 'Final Project', score: 92, maxScore: 100, date: '14 ธ.ค. 2567' },
        { name: 'Final Exam', score: 90, maxScore: 100, date: '15 ธ.ค. 2567' },
      ],
      totalScore: 91.25,
      grade: 'A',
      studyTime: '18 ชั่วโมง 30 นาที',
    },
    '7': {
      id: 7,
      title: 'Effective Communication Skills',
      category: 'Soft Skills',
      instructor: 'อ.สื่อสาร ชัดเจน',
      progress: 100,
      level: 'L1-L4',
      status: 'completed',
      thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
      duration: 10,
      enrolled: 567,
      completedLessons: 10,
      totalLessons: 10,
      completedDate: '10 ม.ค. 2568',
      certificateId: 'CERT-2024-002',
      year: 2024,
      department: 'HR',
      tags: ['Communication', 'Presentation', 'Soft Skills', 'Teamwork'],
      courseCode: 'HR-2024-012',
      language: 'ไทย',
      startDate: '5 ม.ค. 2568',
      description: 'พัฒนาทักษะการสื่อสารที่มีประสิทธิภาพ ทั้งการพูด การฟัง การเขียน และการนำเสนอในที่ทำงาน',
      learningObjectives: [
        'สื่อสารอย่างชัดเจนและมีประสิทธิภาพในสถานการณ์ต่างๆ',
        'ฟังอย่างตั้งใจและเข้าใจผู้อื่น',
        'นำเสนอข้อมูลและความคิดเห็นอย่างมั่นใจ',
        'แก้ไขความขัดแย้งและสร้างความสัมพันธ์ที่ดี',
      ],
      syllabus: [
        {
          module: 'Module 1: Communication Fundamentals',
          topics: ['Communication Process', 'Verbal & Non-verbal', 'Barriers', 'Active Listening'],
          duration: '2 ชั่วโมง',
        },
        {
          module: 'Module 2: Business Writing',
          topics: ['Email Etiquette', 'Reports', 'Proposals', 'Professional Writing'],
          duration: '2 ชั่วโมง',
        },
        {
          module: 'Module 3: Presentation Skills',
          topics: ['Structure', 'Visual Aids', 'Body Language', 'Q&A Handling'],
          duration: '2 ชั่วโมง',
        },
        {
          module: 'Module 4: Interpersonal Communication',
          topics: ['Emotional Intelligence', 'Empathy', 'Feedback', 'Conflict Resolution'],
          duration: '2 ชั่วโมง',
        },
        {
          module: 'Module 5: Team Communication',
          topics: ['Meetings', 'Collaboration', 'Cross-cultural', 'Virtual Teams'],
          duration: '2 ชั่วโมง',
        },
      ],
      assessments: [
        { name: 'Quiz Module 1-2', score: 92, maxScore: 100, date: '7 ม.ค. 2568' },
        { name: 'Presentation Assignment', score: 95, maxScore: 100, date: '9 ม.ค. 2568' },
        { name: 'Final Exam', score: 88, maxScore: 100, date: '10 ม.ค. 2568' },
      ],
      totalScore: 91.67,
      grade: 'A',
      studyTime: '12 ชั่วโมง 15 นาที',
    },
  };

  return courses[id] || null;
};

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params?.id as string;
  const course = getCourseDetail(courseId);

  if (!course) {
    return (
      <MainLayout userName="สมชาย ใจดี" userRole="learner">
        <div className="pt-4 text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">ไม่พบหลักสูตร</h1>
          <Link href="/learner/my-courses" className="text-[#A21D21] hover:underline">
            กลับไปหน้าหลักสูตรของฉัน
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout userName="สมชาย ใจดี" userRole="learner">
      {/* Header */}
      <div className="mb-4 pt-4">
        <Link href="/learner/my-courses" className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-[#A21D21] dark:hover:text-[#C92828] mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          กลับไปหลักสูตรของฉัน
        </Link>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">
                เรียนจบแล้ว
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {course.level}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#A21D21]/10 dark:bg-[#A21D21]/20 text-[#A21D21] dark:text-[#C92828]">
                {course.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{course.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-3">{course.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {course.instructor}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                {course.courseCode}
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration} ชั่วโมง
              </div>
            </div>
          </div>

          <Link
            href={`/learner/my-courses/${courseId}/certificate`}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold shadow-md"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ดูใบประกาศนียบัตร
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Learning Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">สรุปผลการเรียน</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{course.totalScore}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">คะแนนเฉลี่ย</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{course.grade}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">เกรด</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">{course.completedLessons}/{course.totalLessons}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">บทเรียน</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">{course.studyTime}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">เวลาเรียน</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">วันที่เริ่มเรียน:</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{course.startDate}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-600 dark:text-gray-400">วันที่เรียนจบ:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">{course.completedDate}</span>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">วัตถุประสงค์การเรียนรู้</h2>
            <ul className="space-y-2">
              {course.learningObjectives.map((objective: string, index: number) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Syllabus */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">เนื้อหาหลักสูตร</h2>
            <div className="space-y-4">
              {course.syllabus.map((module: any, index: number) => (
                <div key={index} className="border-l-4 border-[#A21D21] pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100">{module.module}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{module.duration}</span>
                  </div>
                  <ul className="space-y-1">
                    {module.topics.map((topic: string, topicIndex: number) => (
                      <li key={topicIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Assessments */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">ผลการประเมิน</h2>
            <div className="space-y-3">
              {course.assessments.map((assessment: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{assessment.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{assessment.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#A21D21] dark:text-[#C92828]">
                      {assessment.score}/{assessment.maxScore}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {((assessment.score / assessment.maxScore) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Certificate Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-center text-xl font-bold mb-2">ใบประกาศนียบัตร</h3>
            <p className="text-center text-sm mb-4 text-green-100">เลขที่: {course.certificateId}</p>
            <Link
              href={`/learner/my-courses/${courseId}/certificate`}
              className="block w-full px-4 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold text-center"
            >
              ดูและดาวน์โหลด
            </Link>
          </div>

          {/* Course Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">ข้อมูลหลักสูตร</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">แผนก</div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">{course.department}</div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">ภาษา</div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">{course.language}</div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">ผู้เรียนทั้งหมด</div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">{course.enrolled.toLocaleString()} คน</div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 mb-1">Tags</div>
                <div className="flex flex-wrap gap-1">
                  {course.tags.map((tag: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
