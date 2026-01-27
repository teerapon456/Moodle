'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Badge } from '@/components/ui';

// Mock data for analytics
const analyticsData = {
  overview: {
    totalStudents: 156,
    activeCourses: 12,
    completionRate: 78.5,
    avgScore: 85.2,
    totalHours: 1240,
    monthlyGrowth: 12.3
  },
  coursePerformance: [
    { id: 1, title: 'การจัดการทีมอย่างมีประสิทธิภาพ', students: 45, avgScore: 88.5, completionRate: 92, satisfaction: 4.5 },
    { id: 2, title: 'การเขียนโปรแกรม Python', students: 38, avgScore: 82.3, completionRate: 85, satisfaction: 4.2 },
    { id: 3, title: 'การตลาดดิจิทัล', students: 52, avgScore: 79.8, completionRate: 76, satisfaction: 4.1 },
    { id: 4, title: 'การเงินส่วนบุคคล', students: 21, avgScore: 86.7, completionRate: 89, satisfaction: 4.6 }
  ],
  studentProgress: [
    { id: 1, name: 'สมชาย ใจดี', courses: 3, avgScore: 87.5, completed: 2, inProgress: 1, lastActive: '2024-01-22' },
    { id: 2, name: 'มานี สุขใจ', courses: 2, avgScore: 91.2, completed: 1, inProgress: 1, lastActive: '2024-01-21' },
    { id: 3, name: 'วิชัย รัตน์', courses: 4, avgScore: 83.8, completed: 3, inProgress: 1, lastActive: '2024-01-20' },
    { id: 4, name: 'สมศรี เจริญ', courses: 1, avgScore: 78.9, completed: 0, inProgress: 1, lastActive: '2024-01-19' }
  ],
  monthlyStats: [
    { month: 'ม.ค.', students: 145, courses: 11, completionRate: 75.2, avgScore: 84.1 },
    { month: 'ก.พ.', students: 152, courses: 12, completionRate: 78.5, avgScore: 85.2 },
    { month: 'มี.ค.', students: 156, courses: 12, completionRate: 78.5, avgScore: 85.2 }
  ]
};

export default function InstructorAnalyticsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const getFilteredData = () => {
    switch (selectedPeriod) {
      case 'week':
        return analyticsData.monthlyStats.slice(-1);
      case 'month':
        return analyticsData.monthlyStats.slice(-3);
      case 'quarter':
        return analyticsData.monthlyStats;
      default:
        return analyticsData.monthlyStats;
    }
  };

  const filteredData = getFilteredData();

  const getMetricColor = (value: number, type: string) => {
    if (type === 'score') {
      if (value >= 90) return 'text-emerald-600';
      if (value >= 80) return 'text-blue-600';
      if (value >= 70) return 'text-yellow-600';
      return 'text-red-600';
    }
    if (type === 'completion') {
      if (value >= 85) return 'text-emerald-600';
      if (value >= 70) return 'text-blue-600';
      if (value >= 50) return 'text-yellow-600';
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  const getProgressColor = (value: number) => {
    if (value >= 90) return 'bg-emerald-500';
    if (value >= 75) return 'bg-blue-500';
    if (value >= 60) return 'bg-yellow-500';
    if (value >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const cardClasses = "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow";

  return (
    <MainLayout userName={currentUser.name} userRole="instructor">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">การวิเคราะห์ข้อมูล</h1>
              <p className="text-gray-600 dark:text-gray-400">วิเคราะห์ข้อมูลการเรียนและประสิทธิภาพการสอน</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1">
                {['week', 'month', 'quarter'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedPeriod === period
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                  >
                    {period === 'week' ? 'สัปดาห์' : period === 'month' ? 'เดือน' : 'ไตรมาส'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{analyticsData.overview.totalStudents}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">นักเรียนทั้งหมด</p>
            <p className="text-xs text-green-600 mt-1">+{analyticsData.overview.monthlyGrowth}% จากเดือนที่แล้ว</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className={`text-2xl font-bold ${getMetricColor(analyticsData.overview.completionRate, 'completion')}`}>
                {analyticsData.overview.completionRate}%
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">อัตราเรียนจบ</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full ${getProgressColor(analyticsData.overview.completionRate)}`}
                style={{ width: `${analyticsData.overview.completionRate}%` }}
              />
            </div>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6-6" />
                </svg>
              </div>
              <span className={`text-2xl font-bold ${getMetricColor(analyticsData.overview.avgScore, 'score')}`}>
                {analyticsData.overview.avgScore}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">คะแนนเฉลี่ย</p>
            <p className="text-xs text-gray-500 mt-1">จากทั้งหมด {analyticsData.overview.activeCourses} หลักสูตร</p>
          </div>
        </div>

        {/* Course Performance */}
        <div className={`${cardClasses} p-6 mb-8`}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">ประสิทธิภาพหลักสูตร</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">หลักสูตร</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">นักเรียน</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">คะแนนเฉลี่ย</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">อัตราเรียนจบ</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">ความพึงพอใจ</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.coursePerformance.map((course) => (
                  <tr key={course.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-50">{course.title}</p>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{course.students}</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className={`text-sm font-medium ${getMetricColor(course.avgScore, 'score')}`}>
                        {course.avgScore}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(course.completionRate)}`}
                            style={{ width: `${course.completionRate}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{course.completionRate}%</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center">
                        <span className="text-yellow-400">{'★'.repeat(Math.floor(course.satisfaction))}</span>
                        <span className="text-gray-300">{'★'.repeat(5 - Math.floor(course.satisfaction))}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">({course.satisfaction})</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student Progress */}
        <div className={`${cardClasses} p-6 mb-8`}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">ความคืบหน้านักเรียน</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analyticsData.studentProgress.map((student) => (
              <div key={student.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-50">{student.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ใช้งานล่าสุด: {student.lastActive}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getMetricColor(student.avgScore, 'score')}`}>
                      {student.avgScore}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">คะแนนเฉลี่ย</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    หลักสูตร: {student.courses}
                  </span>
                  <span className="text-green-600">
                    เสร็จ: {student.completed}
                  </span>
                  <span className="text-blue-600">
                    กำลังเรียน: {student.inProgress}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="flex items-center justify-center gap-4">
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707H19a2 2 0 012 2v1z" />
              </svg>
              ส่งออกรายงาน
            </span>
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m3-2H7a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v8m3-2h6m-6-4h6m2 2v10a2 2 0 002 2H9a2 2 0 00-2-2V6a2 2 0 00-2 2h6a2 2 0 002 2v2m2 4h10a2 2 0 002-2H9a2 2 0 00-2-2V8a2 2 0 00-2-2h6a2 2 0 00-2 2v2z" />
              </svg>
              ส่งออกเป็น Excel
            </span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
