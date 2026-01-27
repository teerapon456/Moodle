'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';

// Mock progress data
const progressData = {
  overallStats: {
    totalCourses: 12,
    completedCourses: 8,
    inProgressCourses: 3,
    notStartedCourses: 1,
    totalHours: 156,
    completedHours: 134,
    averageScore: 87.5,
    certificates: 8,
    currentStreak: 15,
    longestStreak: 45
  },
  coursesProgress: [
    {
      id: 1,
      title: 'การจัดการทีมอย่างมีประสิทธิภาพ',
      category: 'การพัฒนาบุคลากร',
      instructor: 'ดร.สมชาย ใจดี',
      totalLessons: 12,
      completedLessons: 8,
      totalHours: 20,
      completedHours: 15,
      progress: 67,
      status: 'in-progress',
      lastAccessed: '2024-01-22',
      estimatedCompletion: '2024-02-15',
      score: null,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 2,
      title: 'การสื่อสารเชิงธุรกิจ',
      category: 'ทักษะอ่อน',
      instructor: 'คุณสมศรี มั่นคง',
      totalLessons: 8,
      completedLessons: 8,
      totalHours: 12,
      completedHours: 12,
      progress: 100,
      status: 'completed',
      completedDate: '2024-01-15',
      score: 92,
      certificate: 'CERT002',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 3,
      title: 'การวิเคราะห์ข้อมูลด้วย Excel',
      category: 'สกิลดิจิทัล',
      instructor: 'คุณวิทยา ดีดี',
      totalLessons: 16,
      completedLessons: 5,
      totalHours: 24,
      completedHours: 8,
      progress: 31,
      status: 'in-progress',
      lastAccessed: '2024-01-20',
      estimatedCompletion: '2024-03-01',
      score: null,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 4,
      title: 'การบริหารโครงการ',
      category: 'การจัดการ',
      instructor: 'ดร.ประสิทธิ์ สุขใจ',
      totalLessons: 20,
      completedLessons: 0,
      totalHours: 30,
      completedHours: 0,
      progress: 0,
      status: 'not-started',
      enrolledDate: '2024-01-18',
      score: null,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: 5,
      title: 'เทคนิคการนำเสนอ',
      category: 'ทักษะอ่อน',
      instructor: 'คุณมานี พูดดี',
      totalLessons: 6,
      completedLessons: 6,
      totalHours: 8,
      completedHours: 8,
      progress: 100,
      status: 'completed',
      completedDate: '2024-01-10',
      score: 88,
      certificate: 'CERT003',
      thumbnail: '/api/placeholder/300/200'
    }
  ],
  weeklyActivity: [
    { day: 'จันทร์', hours: 2.5, lessons: 3 },
    { day: 'อังคาร', hours: 1.8, lessons: 2 },
    { day: 'พุธ', hours: 3.2, lessons: 4 },
    { day: 'พฤหัส', hours: 0, lessons: 0 },
    { day: 'ศุกร์', hours: 1.5, lessons: 2 },
    { day: 'เสาร์', hours: 4.0, lessons: 5 },
    { day: 'อาทิตย์', hours: 2.0, lessons: 3 }
  ],
  skillsProgress: [
    { skill: 'การจัดการทีม', progress: 75, courses: 3 },
    { skill: 'การสื่อสาร', progress: 90, courses: 4 },
    { skill: 'การวิเคราะห์ข้อมูล', progress: 45, courses: 2 },
    { skill: 'การบริหารโครงการ', progress: 20, courses: 1 },
    { skill: 'การนำเสนอ', progress: 85, courses: 2 }
  ],
  achievements: [
    { id: 1, title: 'Fast Learner', description: 'เรียนบทเรียน 5 บทใน 1 วัน', icon: '🚀', unlocked: true, unlockedDate: '2024-01-15' },
    { id: 2, title: 'Consistent Learner', description: 'เรียนติดต่อกัน 7 วัน', icon: '🔥', unlocked: true, unlockedDate: '2024-01-20' },
    { id: 3, title: 'Course Master', description: 'จบคอร์ส 10 คอร์ส', icon: '🎓', unlocked: false, progress: 8, total: 10 },
    { id: 4, title: 'Perfect Score', description: 'ได้คะแนนเต็ม 100 คะแนน', icon: '💯', unlocked: false, progress: 0, total: 1 },
    { id: 5, title: 'Knowledge Seeker', description: 'เรียนรวม 100 ชั่วโมง', icon: '📚', unlocked: true, unlockedDate: '2024-01-18' }
  ]
};

export default function ProgressPage() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter courses based on status
  const filteredCourses = progressData.coursesProgress.filter(course => {
    if (filterStatus === 'all') return true;
    return course.status === filterStatus;
  });

  const maxWeeklyHours = Math.max(...progressData.weeklyActivity.map(d => d.hours));

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">ความคืบหน้าการเรียน</h1>
          <p className="text-gray-600 dark:text-gray-400">ติดตามความก้าวหน้าในการเรียนรู้ของคุณ</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">คอร์สที่จบแล้ว</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {progressData.overallStats.completedCourses}/{progressData.overallStats.totalCourses}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {Math.round((progressData.overallStats.completedCourses / progressData.overallStats.totalCourses) * 100)}% เสร็จสิ้น
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">ชั่วโมงเรียน</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {progressData.overallStats.completedHours}/{progressData.overallStats.totalHours}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {Math.round((progressData.overallStats.completedHours / progressData.overallStats.totalHours) * 100)}% เสร็จสิ้น
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">คะแนนเฉลี่ย</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {progressData.overallStats.averageScore}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">จาก 100 คะแนน</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">สตรีคปัจจุบัน</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {progressData.overallStats.currentStreak} วัน
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  สูงสุด: {progressData.overallStats.longestStreak} วัน
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {['overview', 'courses', 'activity', 'skills', 'achievements'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${selectedTab === tab
                      ? 'border-[#A21D21] text-[#A21D21]'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                  {tab === 'overview' && 'ภาพรวม'}
                  {tab === 'courses' && 'คอร์ส'}
                  {tab === 'activity' && 'กิจกรรม'}
                  {tab === 'skills' && 'ทักษะ'}
                  {tab === 'achievements' && 'ความสำเร็จ'}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <div className="space-y-8">
                {/* Weekly Activity Chart */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">กิจกรรมรายสัปดาห์</h3>
                  <div className="space-y-4">
                    {progressData.weeklyActivity.map((day, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-12 text-sm text-gray-600 dark:text-gray-400">{day.day}</div>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                            <div
                              className="bg-gradient-to-r from-[#A21D21] to-[#7A1818] h-6 rounded-full flex items-center justify-center text-xs text-white"
                              style={{ width: `${(day.hours / maxWeeklyHours) * 100}%` }}
                            >
                              {day.hours > 0 && `${day.hours}h`}
                            </div>
                          </div>
                        </div>
                        <div className="w-16 text-sm text-gray-600 dark:text-gray-400 text-right">
                          {day.lessons} บท
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Courses */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">คอร์สล่าสุด</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {progressData.coursesProgress
                      .filter(course => course.status === 'in-progress')
                      .slice(0, 4)
                      .map(course => (
                        <div key={course.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">{course.title}</h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                            <div
                              className="bg-[#A21D21] h-2 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {course.completedLessons}/{course.totalLessons} บทเรียน • เข้าเรียนล่าสุด {course.lastAccessed}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {selectedTab === 'courses' && (
              <div className="space-y-6">
                {/* Filter */}
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">สถานะ:</label>
                  <div className="flex gap-2">
                    {['all', 'in-progress', 'completed', 'not-started'].map(status => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === status
                            ? 'bg-[#A21D21] text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                      >
                        {status === 'all' && 'ทั้งหมด'}
                        {status === 'in-progress' && 'กำลังเรียน'}
                        {status === 'completed' && 'เสร็จสิ้น'}
                        {status === 'not-started' && 'ยังไม่เริ่ม'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Courses List */}
                <div className="space-y-4">
                  {filteredCourses.map(course => (
                    <div key={course.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#A21D21] to-[#7A1818] rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{course.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{course.instructor} • {course.category}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${course.status === 'completed'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : course.status === 'in-progress'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                              }`}>
                              {course.status === 'completed' ? 'เสร็จสิ้น' : course.status === 'in-progress' ? 'กำลังเรียน' : 'ยังไม่เริ่ม'}
                            </span>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-600 dark:text-gray-400">ความคืบหน้า</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-[#A21D21] to-[#7A1818] h-2 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                            <div>{course.completedLessons}/{course.totalLessons} บทเรียน</div>
                            <div>{course.completedHours}/{course.totalHours} ชั่วโมง</div>
                            {course.score && <div>คะแนน: {course.score}/100</div>}
                            {course.estimatedCompletion && <div>คาดว่าจะเสร็จ: {course.estimatedCompletion}</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {selectedTab === 'skills' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">ทักษะที่พัฒนา</h3>
                <div className="space-y-4">
                  {progressData.skillsProgress.map((skill, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{skill.skill}</h4>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{skill.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-[#A21D21] to-[#7A1818] h-2 rounded-full"
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{skill.courses} คอร์สที่เกี่ยวข้อง</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {selectedTab === 'achievements' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">ความสำเร็จ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {progressData.achievements.map(achievement => (
                    <div
                      key={achievement.id}
                      className={`border rounded-lg p-4 text-center ${achievement.unlocked
                          ? 'border-yellow-300 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/20'
                          : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 opacity-60'
                        }`}
                    >
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <h4 className={`font-semibold mb-1 ${achievement.unlocked
                          ? 'text-yellow-800 dark:text-yellow-400'
                          : 'text-gray-600 dark:text-gray-400'
                        }`}>
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
                      {achievement.unlocked ? (
                        <p className="text-xs text-yellow-600 dark:text-yellow-500">
                          ได้รับเมื่อ {achievement.unlockedDate}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {achievement.progress}/{achievement.total} เสร็จสิ้น
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
