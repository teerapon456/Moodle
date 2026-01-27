'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/MainLayout';
import {
  getCurrentUser,
  getUserStats,
  getCoursesByStatus,
  getUpcomingEvents,
  getRecentActivities,
  getRecommendedCourses,
  getUpcomingSchedule,
  // New learning tracking functions
  getLearningProgress,
  getRecentLearningActivities,
  getUpcomingDeadlines,
  getLearningStats,
  getCourseProgressDetails,
} from '@/app/database/mockData';

// Load data from centralized database
const currentUser = getCurrentUser();
const stats = getUserStats(currentUser.id);
const currentUserLevel = parseInt(currentUser.level.replace('L', '')); // Extract number from L2 -> 2

// Enhanced learning stats with tracking
const learningStats = getLearningStats(currentUser.id);

// Load in-progress courses from database
const continueLearningCourses = getCoursesByStatus('in-progress');

// Load enhanced learning activities and deadlines
const recentLearningActivities = getRecentLearningActivities(currentUser.id, 5);
const upcomingDeadlines = getUpcomingDeadlines(currentUser.id, 5);

// Load upcoming events and recent activities from database
const upcomingEvents = getUpcomingEvents(5).map(event => ({
  id: event.id,
  type: event.type,
  title: event.title,
  course: event.course || '',
  dueDate: event.date,
  dueTime: event.time,
}));

const recentActivities = getRecentActivities(5).map(activity => ({
  id: activity.id,
  type: activity.type,
  title: activity.title,
  course: activity.description,
  time: activity.date,
}));

// Load recommended courses from database (smart recommendation based on user level)
const recommendedCourses = getRecommendedCourses(currentUser.level, 8);

// Load upcoming schedule from database
const upcomingSchedule = getUpcomingSchedule(4);

// Enhanced course progress details
const courseProgressDetails = continueLearningCourses.map(course =>
  getCourseProgressDetails(currentUser.id, course.id)
);

export default function LearnerDashboardPage() {
  const [showMiniCalendar, setShowMiniCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mini Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const isToday = (day: number, month: number, year: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const goToPreviousMonth = () => {
    const { year, month } = getDaysInMonth(currentDate);
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    const { year, month } = getDaysInMonth(currentDate);
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
  const thaiMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  const thaiDays = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <MainLayout userName="สมชาย ใจดี" userRole="learner">
      {/* Welcome Section */}
      <div className="mb-4 pt-4 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            สวัสดี, สมชาย!
            <span className="text-3xl animate-wave inline-block">👋</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            ยินดีต้อนรับกลับสู่ Learning & Development Portal - เริ่มต้นการเรียนรู้ของคุณวันนี้
          </p>
        </div>

        {/* Mini Calendar Toggle Button */}
        <div className="relative">
          <button
            onClick={() => setShowMiniCalendar(!showMiniCalendar)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">ปฏิทิน</span>
            <svg className={`w-4 h-4 text-gray-500 transition-transform ${showMiniCalendar ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Mini Calendar Dropdown */}
          {showMiniCalendar && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 z-50">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {thaiMonths[month]} {year + 543}
                </h3>
                <button
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {thaiDays.map((day, index) => (
                  <div
                    key={day}
                    className={`text-center text-xs font-semibold ${index === 0 ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
                      }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1 mb-3">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }

                  const today = isToday(day, month, year);

                  return (
                    <Link
                      key={day}
                      href="/schedule"
                      className={`aspect-square flex items-center justify-center text-sm font-medium rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-700 ${today
                        ? 'bg-[#A21D21] text-white font-bold shadow-md'
                        : 'text-gray-700 dark:text-gray-300'
                        }`}
                    >
                      {day}
                    </Link>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/schedule"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#A21D21] text-white rounded-lg hover:bg-[#8A1919] transition-colors font-semibold text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  ดูตารางเต็ม
                </Link>
                <button
                  onClick={() => setShowMiniCalendar(false)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold text-sm"
                >
                  ปิด
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">หลักสูตรทั้งหมด</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{learningStats.totalCourses}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-yellow-300 dark:hover:border-yellow-600 transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">กำลังเรียน</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">{learningStats.inProgressCourses}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600 transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">สำเร็จแล้ว</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-500">{learningStats.completedCourses}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">เวลาเรียน</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-500">{learningStats.totalTimeSpent}h</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-600 transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">สตรีค</p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-500">{learningStats.streak}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-red-300 dark:hover:border-red-600 transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">กำหนดส่ง</p>
          <p className="text-2xl font-bold text-red-600 dark:text-red-500">{learningStats.upcomingDeadlines}</p>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-[#A21D21] to-[#7A1818] rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            เรียนต่อ
          </h2>
          <Link href="/learner/my-courses" className="text-[#A21D21] dark:text-[#C92828] hover:text-[#7A1818] dark:hover:text-[#A21D21] font-semibold text-sm flex items-center transition-colors">
            ดูทั้งหมด
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {continueLearningCourses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`} className="group">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:border-[#A21D21]/30 dark:hover:border-[#A21D21]/50 transition-all cursor-pointer h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-xs font-semibold text-gray-700 dark:text-gray-300 rounded-full shadow-sm">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full bg-gradient-to-r from-[#A21D21] to-[#7A1818] relative overflow-hidden"
                      style={{ width: `${course.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-[#A21D21] dark:group-hover:text-[#C92828] transition-colors">
                    {course.title}
                  </h3>
                  <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {course.instructor}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full font-semibold">
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#A21D21] dark:text-[#C92828]">
                        {course.progress}% เสร็จสิ้น
                      </span>
                      <button className="px-4 py-2 bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white rounded-lg hover:from-[#7A1818] hover:to-[#A21D21] transition-all text-sm font-semibold shadow-md hover:shadow-lg">
                        เรียนต่อ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Learning Schedule & Calendar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            ตารางเรียนและกิจกรรม
          </h2>
          <Link href="/schedule" className="text-[#A21D21] dark:text-[#C92828] hover:text-[#7A1818] dark:hover:text-[#A21D21] font-semibold text-sm flex items-center transition-colors">
            ดูปฏิทินเต็ม
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {upcomingSchedule.map((event) => (
            <div key={event.id} className="group">
              <div className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${event.type === 'live-session'
                ? 'bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-300 dark:border-red-700 hover:shadow-lg hover:border-red-400 dark:hover:border-red-600'
                : event.type === 'webinar'
                  ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-300 dark:border-blue-700 hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-600'
                  : 'bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-300 dark:border-orange-700 hover:shadow-lg hover:border-orange-400 dark:hover:border-orange-600'
                }`}>
                <div className="flex items-start mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${event.type === 'live-session' ? 'bg-red-500' :
                    event.type === 'webinar' ? 'bg-blue-500' : 'bg-orange-500'
                    }`}>
                    {event.type === 'live-session' && (
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                    {event.type === 'webinar' && (
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    {event.type === 'deadline' && (
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2 ${event.type === 'live-session' ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' :
                      event.type === 'webinar' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' :
                        'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300'
                      }`}>
                      {event.type === 'live-session' ? 'Live Session' : event.type === 'webinar' ? 'Webinar' : 'Deadline'}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">{event.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 truncate">{event.course}</p>
                <div className="space-y-1">
                  <div className="flex items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </div>
                  <div className="flex items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {event.time}
                  </div>
                  {event.instructor && (
                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {event.instructor}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Upcoming Deadlines */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            กำหนดส่งที่ใกล้มาถึง
          </h2>
          <div className="space-y-2">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-start">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${deadline.type === 'quiz' ? 'bg-blue-500' : 'bg-purple-500'
                    }`}>
                    {deadline.type === 'quiz' ? (
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{deadline.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{deadline.course}</p>
                    <div className="flex items-center text-xs text-orange-600 dark:text-orange-400 font-semibold">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      เหลืออีก {deadline.dueDate} ({deadline.dueTime})
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#A21D21] to-[#7A1818] rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            กิจกรรมล่าสุด
          </h2>
          <div className="space-y-2">
            {recentLearningActivities.map((activity) => (
              <div key={activity.id} className="flex items-start p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${activity.type === 'lesson_completed' ? 'bg-green-500' :
                  activity.type === 'quiz_completed' ? 'bg-blue-500' :
                    activity.type === 'assignment_submitted' ? 'bg-purple-500' :
                      activity.type === 'lesson_started' ? 'bg-yellow-500' :
                        'bg-orange-500'
                  }`}>
                  {activity.type === 'lesson_completed' && (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {activity.type === 'quiz_completed' && (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  )}
                  {activity.type === 'assignment_submitted' && (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  {activity.type === 'lesson_started' && (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {activity.type === 'discussion_posted' && (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">{activity.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{activity.course}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-500">{activity.time}</p>
                    {activity.score && (
                      <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                        {activity.score}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            แนะนำสำหรับคุณ
          </h2>
          <Link href="/catalog" className="text-[#A21D21] dark:text-[#C92828] hover:text-[#7A1818] dark:hover:text-[#A21D21] font-semibold text-sm flex items-center transition-colors">
            ดูหลักสูตรทั้งหมด
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center text-sm text-blue-700 dark:text-blue-300">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>คุณอยู่ที่ระดับ <strong className="font-bold">L{currentUserLevel}</strong> - คอร์สที่แนะนำจะแสดงคอร์สที่เหมาะสมกับระดับของคุณก่อน แต่คุณสามารถเรียนคอร์สทุกระดับได้</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedCourses.map((course) => {
            const isRecommendedLevel = course.levelRange && currentUserLevel >= course.levelRange[0] && currentUserLevel <= course.levelRange[1];

            return (
              <Link key={course.id} href={`/courses/${course.id}`} className="group">
                <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 overflow-hidden hover:shadow-xl transition-all cursor-pointer h-full flex flex-col ${isRecommendedLevel
                  ? 'border-green-300 dark:border-green-700 hover:border-green-400 dark:hover:border-green-600'
                  : 'border-gray-200 dark:border-gray-700 hover:border-[#A21D21]/30 dark:hover:border-[#A21D21]/50'
                  }`}>
                  <div className="relative overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                      {isRecommendedLevel && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center">
                          <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          เหมาะกับคุณ
                        </span>
                      )}
                      <span className="px-3 py-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-xs font-semibold text-gray-700 dark:text-gray-300 rounded-full shadow-sm ml-auto">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-[#A21D21] dark:group-hover:text-[#C92828] transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mb-3">
                      <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="truncate">{course.instructor}</span>
                    </div>
                    <div className="mt-auto space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center text-gray-500 dark:text-gray-400">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {course.duration}
                        </span>
                        <span className={`px-2 py-1 rounded-full font-semibold ${isRecommendedLevel
                          ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                          : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                          }`}>
                          {course.levelDisplay || course.level}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {course.enrolled} ผู้เรียน
                      </div>
                      <button className="w-full px-4 py-2 bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white rounded-lg hover:from-[#7A1818] hover:to-[#A21D21] transition-all text-sm font-semibold shadow-md hover:shadow-lg">
                        ดูรายละเอียด
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
