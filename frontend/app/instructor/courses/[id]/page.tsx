'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Badge } from '@/components/ui';

// Mock Course Data
const mockCourseData = {
  '1': {
    id: '1',
    name: 'Digital Marketing Fundamentals',
    description: 'เรียนรู้พื้นฐานการตลาดดิจิทัลตั้งแต่ SEO ไปจนถึง Social Media Marketing',
    status: 'active',
    students: 25,
    progress: 75,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    modules: [
      { id: '1', name: 'Introduction to Digital Marketing', completed: true, lessons: 5 },
      { id: '2', name: 'SEO Fundamentals', completed: true, lessons: 4 },
      { id: '3', name: 'Social Media Marketing', completed: false, lessons: 6 },
      { id: '4', name: 'Content Marketing', completed: false, lessons: 4 }
    ],
    recentActivity: [
      { type: 'assignment', title: 'Marketing Plan Submission', student: 'สมชาย ใจดี', time: '2 ชั่วโมงที่แล้ว' },
      { type: 'quiz', title: 'SEO Quiz Completed', student: 'มานี รักดี', time: '5 ชั่วโมงที่แล้ว' },
      { type: 'discussion', title: 'New discussion in Module 3', student: 'วีระ มุ่งมั่น', time: '1 วันที่แล้ว' }
    ]
  }
};

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const [course, setCourse] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }

    // Load course data
    const courseData = mockCourseData[courseId as keyof typeof mockCourseData];
    if (courseData) {
      setCourse(courseData);
    }
  }, [courseId]);

  if (!course) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              ไม่พบข้อมูลคอร์ส
            </h3>
            <Link href="/instructor/courses">
              <Button className="bg-[#A21D21] hover:bg-[#7A1818] text-white">
                กลับไปรายการคอร์ส
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment': return '📝';
      case 'quiz': return '📋';
      case 'discussion': return '💬';
      case 'video': return '🎥';
      default: return '📄';
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/instructor/dashboard">
              <Button variant="outline" className="border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white">
                ← กลับแดชบอร์ด
              </Button>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className={`text-3xl font-bold text-[#A21D21] dark:text-[#C92828]`}>
                  {course.name}
                </h1>
                <Badge className="bg-green-500 text-white">
                  กำลังสอน
                </Badge>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>
                {course.description}
              </p>
            </div>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className={`p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#A21D21]/10 rounded-lg flex items-center justify-center">
                  <span className="text-lg">👥</span>
                </div>
                <div>
                  <p className={`text-xl font-bold text-[#A21D21] dark:text-[#C92828]`}>
                    {course.students}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>นักเรียน</p>
                </div>
              </div>
            </Card>

            <Card className={`p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#A21D21]/10 rounded-lg flex items-center justify-center">
                  <span className="text-lg">📊</span>
                </div>
                <div>
                  <p className={`text-xl font-bold text-[#A21D21] dark:text-[#C92828]`}>
                    {course.progress}%
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>ความคืบหน้า</p>
                </div>
              </div>
            </Card>

            <Card className={`p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#A21D21]/10 rounded-lg flex items-center justify-center">
                  <span className="text-lg">📅</span>
                </div>
                <div>
                  <p className={`text-sm font-bold text-[#A21D21] dark:text-[#C92828]`}>
                    {course.startDate}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>เริ่มคอร์ส</p>
                </div>
              </div>
            </Card>

            <Card className={`p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#A21D21]/10 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🎯</span>
                </div>
                <div>
                  <p className={`text-sm font-bold text-[#A21D21] dark:text-[#C92828]`}>
                    {course.endDate}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>สิ้นสุดคอร์ส</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'ภาพรวม', icon: '📊' },
              { id: 'content', label: 'เนื้อหา', icon: '📚' },
              { id: 'students', label: 'นักเรียน', icon: '👥' },
              { id: 'assignments', label: 'งาน', icon: '📝' },
              { id: 'quizzes', label: 'แบบทดสอบ', icon: '📋' },
              { id: 'analytics', label: 'วิเคราะห์', icon: '📈' },
              { id: 'settings', label: 'ตั้งค่า', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-[#A21D21] text-[#A21D21]'
                    : `border-transparent ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Course Progress */}
                <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
                  <h3 className={`text-lg font-semibold text-[#A21D21] dark:text-[#C92828] mb-4`}>
                    ความคืบหน้าคอร์ส
                  </h3>
                  <div className="space-y-4">
                    {course.modules.map((module: any) => (
                      <div key={module.id} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {module.name}
                          </h4>
                          <Badge className={module.completed ? 'bg-green-500' : 'bg-yellow-500'}>
                            {module.completed ? 'เสร็จสิ้น' : 'กำลังดำเนินการ'}
                          </Badge>
                        </div>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {module.lessons} บทเรียน
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Recent Activity */}
                <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
                  <h3 className={`text-lg font-semibold text-[#A21D21] dark:text-[#C92828] mb-4`}>
                    กิจกรรมล่าสุด
                  </h3>
                  <div className="space-y-3">
                    {course.recentActivity.map((activity: any, index: number) => (
                      <div key={index} className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{getActivityIcon(activity.type)}</span>
                          <div className="flex-1">
                            <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {activity.title}
                            </p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              โดย {activity.student} • {activity.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
                  <h3 className={`text-lg font-semibold text-[#A21D21] dark:text-[#C92828] mb-4`}>
                    การทำงานด่วน
                  </h3>
                  <div className="space-y-3">
                    <Link href={`/instructor/courses/${courseId}/content`}>
                      <Button className="w-full bg-[#A21D21] hover:bg-[#7A1818] text-white">
                        📚 จัดการเนื้อหา
                      </Button>
                    </Link>
                    <Link href={`/instructor/courses/${courseId}/assignments`}>
                      <Button variant="outline" className="w-full border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white">
                        📝 สร้างงานใหม่
                      </Button>
                    </Link>
                    <Link href={`/instructor/courses/${courseId}/quizzes`}>
                      <Button variant="outline" className="w-full border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white">
                        📋 สร้างแบบทดสอบ
                      </Button>
                    </Link>
                    <Link href={`/instructor/live-sessions`}>
                      <Button variant="outline" className="w-full border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white">
                        🎥 เริ่มการสอนสด
                      </Button>
                    </Link>
                  </div>
                </Card>

                {/* Course Info */}
                <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
                  <h3 className={`text-lg font-semibold text-[#A21D21] dark:text-[#C92828] mb-4`}>
                    ข้อมูลคอร์ส
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>รหัสคอร์ส:</span>
                      <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>DM-001</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>จำนวนโมดูล:</span>
                      <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{course.modules.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>ระยะเวลา:</span>
                      <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>12 สัปดาห์</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>ประเภท:</span>
                      <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>ออนไลน์</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-semibold text-[#A21D21] dark:text-[#C92828]`}>
                  จัดการเนื้อหาคอร์ส
                </h3>
                <Button className="bg-[#A21D21] hover:bg-[#7A1818] text-white">
                  + เพิ่มเนื้อหาใหม่
                </Button>
              </div>
              <div className="text-center py-12">
                <span className="text-4xl">📚</span>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mt-4`}>
                  หน้าจัดการเนื้อหาคอร์ส
                </p>
              </div>
            </Card>
          )}

          {activeTab === 'students' && (
            <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-semibold text-[#A21D21] dark:text-[#C92828]`}>
                  นักเรียนในคอร์ส ({course.students})
                </h3>
                <Button className="bg-[#A21D21] hover:bg-[#7A1818] text-white">
                  + เพิ่มนักเรียน
                </Button>
              </div>
              <div className="text-center py-12">
                <span className="text-4xl">👥</span>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mt-4`}>
                  หน้าจัดการนักเรียนในคอร์ส
                </p>
              </div>
            </Card>
          )}

          {activeTab === 'assignments' && (
            <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-semibold text-[#A21D21] dark:text-[#C92828]`}>
                  งานในคอร์ส
                </h3>
                <Button className="bg-[#A21D21] hover:bg-[#7A1818] text-white">
                  + สร้างงานใหม่
                </Button>
              </div>
              <div className="text-center py-12">
                <span className="text-4xl">📝</span>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mt-4`}>
                  หน้าจัดการงานในคอร์ส
                </p>
              </div>
            </Card>
          )}

          {activeTab === 'quizzes' && (
            <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-semibold text-[#A21D21] dark:text-[#C92828]`}>
                  แบบทดสอบในคอร์ส
                </h3>
                <Button className="bg-[#A21D21] hover:bg-[#7A1818] text-white">
                  + สร้างแบบทดสอบใหม่
                </Button>
              </div>
              <div className="text-center py-12">
                <span className="text-4xl">📋</span>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mt-4`}>
                  หน้าจัดการแบบทดสอบในคอร์ส
                </p>
              </div>
            </Card>
          )}

          {activeTab === 'analytics' && (
            <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
              <h3 className={`text-lg font-semibold text-[#A21D21] dark:text-[#C92828] mb-4`}>
                วิเคราะห์คอร์ส
              </h3>
              <div className="text-center py-12">
                <span className="text-4xl">📈</span>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mt-4`}>
                  หน้าวิเคราะห์ข้อมูลคอร์ส
                </p>
              </div>
            </Card>
          )}

          {activeTab === 'settings' && (
            <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
              <h3 className={`text-lg font-semibold text-[#A21D21] dark:text-[#C92828] mb-4`}>
                ตั้งค่าคอร์ส
              </h3>
              <div className="text-center py-12">
                <span className="text-4xl">⚙️</span>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mt-4`}>
                  หน้าตั้งค่าคอร์ส
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
