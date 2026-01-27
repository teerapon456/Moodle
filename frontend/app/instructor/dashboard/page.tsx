'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Badge } from '@/components/ui';

// Mock Data
const mockDashboardData = {
  stats: {
    totalCourses: 8,
    activeStudents: 156,
    pendingAssignments: 12,
    completionRate: 78
  },
  recentCourses: [
    { id: '1', name: 'Digital Marketing Fundamentals', students: 25, progress: 75, status: 'active' },
    { id: '2', name: 'Leadership Skills', students: 18, progress: 60, status: 'active' },
    { id: '3', name: 'Communication Mastery', students: 32, progress: 85, status: 'completed' }
  ],
  urgentTasks: [
    { id: '1', type: 'assignment', title: 'Grade Marketing Plan', course: 'Digital Marketing', priority: 'high', dueDate: '2024-01-28' },
    { id: '2', type: 'quiz', title: 'Review Quiz Results', course: 'Leadership Skills', priority: 'medium', dueDate: '2024-01-29' },
    { id: '3', type: 'content', title: 'Upload Week 4 Materials', course: 'Communication Mastery', priority: 'low', dueDate: '2024-01-30' }
  ],
  upcomingSessions: [
    { id: '1', title: 'Live Q&A - Digital Marketing', time: '14:00', date: '2024-01-27', attendees: 25 },
    { id: '2', title: 'Workshop - Leadership', time: '10:00', date: '2024-01-28', attendees: 18 }
  ]
};

export default function InstructorDashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [data, setData] = useState(mockDashboardData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
    
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment': return '📝';
      case 'quiz': return '📋';
      case 'content': return '📚';
      case 'session': return '🎥';
      default: return '📄';
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-gray-300 rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-64 bg-gray-300 rounded"></div>
              <div className="h-64 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-3xl font-bold text-[#A21D21] dark:text-[#C92828] mb-2`}>
                แดชบอร์ดผู้สอน
              </h1>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                ภาพรวมการสอนและจัดการคอร์สของคุณ
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/instructor/courses/create">
                <Button className="bg-[#A21D21] hover:bg-[#7A1818] text-white">
                  + สร้างคอร์สใหม่
                </Button>
              </Link>
              <Link href="/instructor/notifications">
                <Button variant="outline" className="border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white">
                  🔔 การแจ้งเตือน
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20 hover:bg-white/15 transition-all`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>คอร์สทั้งหมด</p>
                <p className={`text-3xl font-bold text-[#A21D21] dark:text-[#C92828]`}>
                  {data.stats.totalCourses}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                  +2 จากเดือนที่แล้ว
                </p>
              </div>
              <div className="w-12 h-12 bg-[#A21D21]/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
            </div>
          </Card>

          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20 hover:bg-white/15 transition-all`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>นักเรียนทั้งหมด</p>
                <p className={`text-3xl font-bold text-[#A21D21] dark:text-[#C92828]`}>
                  {data.stats.activeStudents}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                  กำลังเรียนอยู่
                </p>
              </div>
              <div className="w-12 h-12 bg-[#A21D21]/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </Card>

          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20 hover:bg-white/15 transition-all`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>งานที่รอดำเนินการ</p>
                <p className={`text-3xl font-bold text-[#A21D21] dark:text-[#C92828]`}>
                  {data.stats.pendingAssignments}
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                  3 รายการด่วน
                </p>
              </div>
              <div className="w-12 h-12 bg-[#A21D21]/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
          </Card>

          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20 hover:bg-white/15 transition-all`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>อัตราการเสร็จสิ้น</p>
                <p className={`text-3xl font-bold text-[#A21D21] dark:text-[#C92828]`}>
                  {data.stats.completionRate}%
                </p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                  +5% จากเดือนที่แล้ว
                </p>
              </div>
              <div className="w-12 h-12 bg-[#A21D21]/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Courses */}
          <div className="lg:col-span-2">
            <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-semibold text-[#A21D21] dark:text-[#C92828]`}>
                  คอร์สล่าสุด
                </h3>
                <Link href="/instructor/courses">
                  <Button variant="outline" size="sm" className="border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white">
                    ดูทั้งหมด
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {data.recentCourses.map((course) => (
                  <div key={course.id} className={`p-4 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} hover:shadow-md transition-shadow`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className={`font-semibold text-[#A21D21] dark:text-[#C92828]`}>
                            {course.name}
                          </h4>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(course.status)}`}></div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            👥 {course.students} นักเรียน
                          </span>
                          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            📊 {course.progress}% เสร็จสิ้น
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#A21D21] h-2 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <Link href={`/instructor/courses/${course.id}`}>
                        <Button variant="outline" size="sm" className="border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white">
                          จัดการ
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Urgent Tasks */}
            <Card className={`p-6 mt-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-semibold text-[#A21D21] dark:text-[#C92828]`}>
                  งานที่ต้องดำเนินการ
                </h3>
                <Link href="/instructor/assignments">
                  <Button variant="outline" size="sm" className="border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white">
                    ดูทั้งหมด
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-3">
                {data.urgentTasks.map((task) => (
                  <div key={task.id} className={`p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{getTypeIcon(task.type)}</span>
                        <div>
                          <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {task.title}
                          </p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {task.course} • กำหนด {task.dueDate}
                          </p>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority === 'high' ? 'ด่วน' : task.priority === 'medium' ? 'ปานกลาง' : 'ต่ำ'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
              <h3 className={`text-lg font-semibold text-[#A21D21] dark:text-[#C92828] mb-4`}>
                การทำงานด่วน
              </h3>
              <div className="space-y-3">
                <Link href="/instructor/grading">
                  <Button className="w-full bg-[#A21D21] hover:bg-[#7A1818] text-white">
                    📝 ตรวจงานที่รอการตรวจ
                  </Button>
                </Link>
                <Link href="/instructor/create-course">
                  <Button variant="outline" className="w-full border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white">
                    📚 สร้างคอร์สใหม่
                  </Button>
                </Link>
                <Link href="/instructor/live-sessions">
                  <Button variant="outline" className="w-full border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white">
                    🎥 เริ่มการสอนสด
                  </Button>
                </Link>
                <Link href="/instructor/groups">
                  <Button variant="outline" className="w-full border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white">
                    👥 จัดการกลุ่มผู้เรียน
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Upcoming Sessions */}
            <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} backdrop-blur bg-white/10 border border-white/20`}>
              <h3 className={`text-lg font-semibold text-[#A21D21] dark:text-[#C92828] mb-4`}>
                การสอนที่จะถึง
              </h3>
              <div className="space-y-3">
                {data.upcomingSessions.map((session) => (
                  <div key={session.id} className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {session.title}
                      </span>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {session.time}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        📅 {session.date}
                      </span>
                      <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        👥 {session.attendees} คน
                      </span>
                    </div>
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
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    🎉 สมชาย ส่งงาน "Marketing Plan" เรียบร้อย
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                    2 ชั่วโมงที่แล้ว
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    📚 อัพโหลดวิดีโอ "Week 3" สำเร็จ
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                    5 ชั่วโมงที่แล้ว
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    💬 มีข้อความใหม่จากนักเรียน 5 รายการ
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                    1 วันที่แล้ว
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
