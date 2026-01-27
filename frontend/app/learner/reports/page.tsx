'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import {
  getCurrentUser,
  getUserStats,
  getCoursesByStatus,
  getRecentActivities,
} from '@/app/database/mockData';

// Load data from centralized database
const currentUser = getCurrentUser();
const stats = getUserStats(currentUser.id);
const completedCourses = getCoursesByStatus('completed');
const inProgressCourses = getCoursesByStatus('in-progress');
const recentActivities = getRecentActivities(10);

// Mock certificates data
const certificates = [
  {
    id: 'CERT001',
    courseTitle: 'การพัฒนาทักษะการสื่อสาร',
    courseCode: 'COM101',
    completedDate: '15/01/2024',
    score: 95,
    maxScore: 100,
    grade: 'A',
    certificateId: 'CERT-2024-001',
    instructor: 'ดร.สมชาย ใจดี',
    department: 'ฝ่ายทรัพยากรมนุษย์',
  },
  {
    id: 'CERT002',
    courseTitle: 'การบริหารงานพัฒนาบุคลากร',
    courseCode: 'HRM201',
    completedDate: '20/12/2023',
    score: 88,
    maxScore: 100,
    grade: 'B+',
    certificateId: 'CERT-2023-002',
    instructor: 'ดร.มานี รักงาน',
    department: 'ฝ่ายบริหาร',
  },
  {
    id: 'CERT003',
    courseTitle: 'เทคนิคการสอนที่มีประสิทธิภาพ',
    courseCode: 'TECH301',
    completedDate: '10/11/2023',
    score: 92,
    maxScore: 100,
    grade: 'A',
    certificateId: 'CERT-2023-003',
    instructor: 'ดร.วิชัย คิดบวก',
    department: 'ฝ่ายพัฒนา',
  },
];

// Mock detailed course data with assessments
const detailedCourses = [
  {
    ...completedCourses[0],
    assessments: [
      { name: 'การสอบกลางภาค', score: 85, maxScore: 100, weight: 30 },
      { name: 'งานประเมิน', score: 92, maxScore: 100, weight: 30 },
      { name: 'การสอบปลายภาค', score: 95, maxScore: 100, weight: 40 },
    ],
    attendance: 95,
    participation: 88,
    totalScore: 91.1,
    grade: 'A',
    feedback: 'ผลงานดีเยี่ยม มีความคิดริเริ่มและสามารถประยุกต์ใช้ได้ดี',
    instructor: 'ดร.สมชาย ใจดี',
    department: 'ฝ่ายทรัพยากรมนุษย์',
    trainingHours: 24,
    startDate: '01/11/2023',
    endDate: '15/01/2024',
  },
  {
    ...completedCourses[1],
    assessments: [
      { name: 'การสอบกลางภาค', score: 82, maxScore: 100, weight: 30 },
      { name: 'โปรเจค', score: 90, maxScore: 100, weight: 40 },
      { name: 'การสอบปลายภาค', score: 85, maxScore: 100, weight: 30 },
    ],
    attendance: 92,
    participation: 85,
    totalScore: 85.9,
    grade: 'B+',
    feedback: 'ทำงานได้ดี มีความรู้ความเข้าใจในเนื้อหา',
    instructor: 'ดร.มานี รักงาน',
    department: 'ฝ่ายบริหาร',
    trainingHours: 32,
    startDate: '01/10/2023',
    endDate: '20/12/2023',
  },
  {
    ...completedCourses[2],
    assessments: [
      { name: 'การสอบกลางภาค', score: 90, maxScore: 100, weight: 30 },
      { name: 'การสาธิต', score: 94, maxScore: 100, weight: 30 },
      { name: 'การสอบปลายภาค', score: 88, maxScore: 100, weight: 40 },
    ],
    attendance: 98,
    participation: 92,
    totalScore: 90.4,
    grade: 'A',
    feedback: 'มีความสามารถในการสอนและถ่ายทอดความรู้ได้ดีมาก',
    instructor: 'ดร.วิชัย คิดบวก',
    department: 'ฝ่ายพัฒนา',
    trainingHours: 28,
    startDate: '15/09/2023',
    endDate: '10/11/2023',
  },
];

// Mock learning progress data
const learningProgress = {
  thisYear: {
    totalCourses: 8,
    completedCourses: 5,
    inProgressCourses: 3,
    totalHours: 156,
    averageScore: 88.5,
    topSkills: ['การสื่อสาร', 'การบริหาร', 'การสอน', 'การวางแผน', 'การแก้ปัญหา'],
  },
  lastYear: {
    totalCourses: 6,
    completedCourses: 4,
    inProgressCourses: 2,
    totalHours: 124,
    averageScore: 85.2,
  },
};

// Mock training plan
const trainingPlan = [
  {
    id: 1,
    courseName: 'การพัฒนาทักษะความเป็นผู้นำ',
    plannedDate: 'Q2 2024',
    priority: 'สูง',
    status: 'วางแผน',
    department: 'ฝ่ายทรัพยากรมนุษย์',
  },
  {
    id: 2,
    courseName: 'Digital Transformation',
    plannedDate: 'Q3 2024',
    priority: 'กลาง',
    status: 'วางแผน',
    department: 'ฝ่ายไอที',
  },
  {
    id: 3,
    courseName: 'การจัดการความเครียดในที่ทำงาน',
    plannedDate: 'Q1 2024',
    priority: 'สูง',
    status: 'กำลังจะเริ่ม',
    department: 'ฝ่ายสวัสดิการ',
  },
];

export default function LearnerReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Calculate statistics
  const totalCourses = completedCourses.length + inProgressCourses.length;
  const completionRate = totalCourses > 0 ? Math.round((completedCourses.length / totalCourses) * 100) : 0;
  const totalStudyHours = completedCourses.reduce((acc, course) => acc + (parseInt(course.duration) || 0), 0);
  const averageScore = completedCourses.reduce((acc, course) => acc + (course.totalScore || 0), 0) / completedCourses.length || 0;

  // Filter data based on selected period
  const getFilteredData = () => {
    const now = new Date();
    const filterDate = new Date();

    switch (selectedPeriod) {
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        filterDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return { activities: recentActivities, courses: detailedCourses };
    }

    const filteredActivities = recentActivities.filter(activity =>
      new Date(activity.date) >= filterDate
    );
    const filteredCourses = detailedCourses.filter(course =>
      course.completedDate && new Date(course.completedDate) >= filterDate
    );

    return { activities: filteredActivities, courses: filteredCourses };
  };

  const { activities, courses } = getFilteredData();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">รายงานผลการเรียน</h1>
              <p className="text-gray-600 dark:text-gray-400">สรุปผลการเรียนและพัฒนาการของ {currentUser.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">รหัสพนักงาน: {currentUser.employeeId}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">แผนก: {currentUser.department}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">ตำแหน่ง: {currentUser.position}</p>
              </div>
              {/* Export Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  พิมพ์
                </button>
                <button
                  onClick={() => alert('ส่งออก PDF...')}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  PDF
                </button>
                <button
                  onClick={() => alert('ส่งออก Excel...')}
                  className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m3-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v6m3 0h6" />
                  </svg>
                  Excel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Period Selector */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'ทั้งหมด' },
              { value: 'month', label: '1 เดือน' },
              { value: 'quarter', label: '3 เดือน' },
              { value: 'year', label: '1 ปี' },
            ].map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedPeriod === period.value
                  ? 'bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                {period.label}
              </button>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="ค้นหารายวิชา..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              กรอง
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">หลักสูตรทั้งหมด</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCourses}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">เรียนแล้ว {completedCourses.length} หลักสูตร</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-xl border border-green-200 dark:border-green-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">อัตราสำเร็จ</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{completionRate}%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">เสร็จสิ้น {completedCourses.length}/{totalCourses}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">ชั่วโมงเรียน</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalStudyHours}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">รวมทั้งหมด</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-6 rounded-xl border border-orange-200 dark:border-orange-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">คะแนนเฉลี่ย</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{averageScore.toFixed(2)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">จาก {completedCourses.length} หลักสูตร</p>
          </div>
        </div>

        {/* Report Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-100 dark:border-gray-700">
            <div className="flex space-x-1 p-1">
              {[
                { id: 'overview', label: 'ภาพรวม', icon: '📊' },
                { id: 'courses', label: 'รายวิชา', icon: '📚' },
                { id: 'grades', label: 'เกรด', icon: '🎯' },
                { id: 'activities', label: 'กิจกรรม', icon: '📝' },
                { id: 'certificates', label: 'ใบเซอร์', icon: '🏆' },
                { id: 'plan', label: 'แผนการเรียน', icon: '📅' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedReport(tab.id)}
                  className={`flex-1 flex items-center justify-center px-3 py-3 rounded-lg font-medium text-sm transition-all ${selectedReport === tab.id
                    ? 'bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {selectedReport === 'overview' && (
              <div className="space-y-6">
                {/* Summary Table */}
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">ตารางสรุปการเรียน</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-gray-100 dark:bg-gray-800">
                          <th className="text-left py-3 px-4 text-gray-900 dark:text-white">รายวิชา</th>
                          <th className="text-center py-3 px-4 text-gray-900 dark:text-white">รหัสวิชา</th>
                          <th className="text-center py-3 px-4 text-gray-900 dark:text-white">หน่วยกิต</th>
                          <th className="text-center py-3 px-4 text-gray-900 dark:text-white">ชั่วโมง</th>
                          <th className="text-center py-3 px-4 text-gray-900 dark:text-white">เกรด</th>
                          <th className="text-center py-3 px-4 text-gray-900 dark:text-white">คะแนน</th>
                          <th className="text-center py-3 px-4 text-gray-900 dark:text-white">สถานะ</th>
                          <th className="text-center py-3 px-4 text-gray-900 dark:text-white">ใบเซอร์</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailedCourses.map((course) => (
                          <tr key={course.id} className="border-b hover:bg-white dark:hover:bg-gray-800">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{course.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{course.instructor}</p>
                              </div>
                            </td>
                            <td className="text-center py-3 px-4 text-gray-900 dark:text-white">{course.courseCode}</td>
                            <td className="text-center py-3 px-4 text-gray-900 dark:text-white">{course.trainingHours / 8}</td>
                            <td className="text-center py-3 px-4 text-gray-900 dark:text-white">{course.trainingHours}</td>
                            <td className="text-center py-3 px-4">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${course.grade === 'A' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                course.grade === 'B+' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                  course.grade === 'B' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                    course.grade === 'C+' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                }`}>
                                {course.grade}
                              </span>
                            </td>
                            <td className="text-center py-3 px-4 text-gray-900 dark:text-white">{course.totalScore.toFixed(2)}</td>
                            <td className="text-center py-3 px-4">
                              <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded text-xs font-medium">
                                ผ่าน
                              </span>
                            </td>
                            <td className="text-center py-3 px-4">
                              <a
                                href={`/api/certificates/download/${certificates.find(c => c.courseCode === course.courseCode)?.id}`}
                                className="text-[#A21D21] dark:text-[#C92828] hover:text-[#7A1818] dark:hover:text-[#E53E3E] underline text-sm"
                                download
                              >
                                ดาวน์โหลด
                              </a>
                            </td>
                          </tr>
                        ))}
                        {inProgressCourses.map((course) => (
                          <tr key={course.id} className="border-b hover:bg-white dark:hover:bg-gray-800">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{course.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">กำลังเรียน</p>
                              </div>
                            </td>
                            <td className="text-center py-3 px-4 text-gray-900 dark:text-white">{course.courseCode}</td>
                            <td className="text-center py-3 px-4 text-gray-900 dark:text-white">-</td>
                            <td className="text-center py-3 px-4 text-gray-900 dark:text-white">{course.duration}</td>
                            <td className="text-center py-3 px-4">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded text-xs font-medium">
                                กำลังเรียน
                              </span>
                            </td>
                            <td className="text-center py-3 px-4 text-gray-900 dark:text-white">-</td>
                            <td className="text-center py-3 px-4">
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded text-xs font-medium">
                                ดำเนินการ
                              </span>
                            </td>
                            <td className="text-center py-3 px-4 text-gray-900 dark:text-white">-</td>
                          </tr>
                        ))}
                        {/* Summary Row */}
                        <tr className="bg-gray-200 dark:bg-gray-700 font-semibold">
                          <td className="py-3 px-4 text-gray-900 dark:text-white">รวมทั้งหมด</td>
                          <td className="text-center py-3 px-4 text-gray-900 dark:text-white">{detailedCourses.length + inProgressCourses.length}</td>
                          <td className="text-center py-3 px-4 text-gray-900 dark:text-white">
                            {(detailedCourses.reduce((acc, c) => acc + (c.trainingHours / 8), 0)).toFixed(1)}
                          </td>
                          <td className="text-center py-3 px-4 text-gray-900 dark:text-white">
                            {detailedCourses.reduce((acc, c) => acc + c.trainingHours, 0) +
                              inProgressCourses.reduce((acc, c) => acc + (parseInt(c.duration as string) || 0), 0)}
                          </td>
                          <td className="text-center py-3 px-4 text-gray-900 dark:text-white" colSpan={4}>
                            ผ่าน {detailedCourses.length}/{(detailedCourses.length + inProgressCourses.length)} หลักสูตร
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">สถิติการเรียน</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">หลักสูตรที่กำลังเรียน</span>
                        <span className="font-medium text-gray-900 dark:text-white">{inProgressCourses.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">หลักสูตรที่เสร็จสิ้น</span>
                        <span className="font-medium text-gray-900 dark:text-white">{completedCourses.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">ประกาศนียบัตรที่ได้รับ</span>
                        <span className="font-medium text-gray-900 dark:text-white">{certificates.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">ระดับปัจจุบัน</span>
                        <span className="font-medium text-gray-900 dark:text-white">{currentUser.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">ปีที่เข้าทำงาน</span>
                        <span className="font-medium text-gray-900 dark:text-white">2563</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">ทักษะที่พัฒนา</h4>
                    <div className="flex flex-wrap gap-2">
                      {learningProgress.thisYear.topSkills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-[#A21D21] text-white rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">ชั่วโมงเรียนปีนี้</span>
                        <span className="font-medium text-gray-900 dark:text-white">{learningProgress.thisYear.totalHours} ชม.</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">คะแนนเฉลี่ยปีนี้</span>
                        <span className="font-medium text-gray-900 dark:text-white">{learningProgress.thisYear.averageScore.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedReport === 'courses' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">รายละเอียดรายวิชา</h3>
                <div className="space-y-4">
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <div key={course.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{course.title}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{course.category} • {course.duration} ชั่วโมง</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">วิทยากร: {course.instructor}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">แผนก: {course.department}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600 dark:text-green-400">{course.grade}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{course.totalScore.toFixed(2)}/100</p>
                          </div>
                        </div>

                        {/* Assessments */}
                        <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">ผลการประเมิน</h5>
                          <div className="space-y-2">
                            {course.assessments.map((assessment, index) => (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">{assessment.name} ({assessment.weight}%)</span>
                                <div className="flex items-center">
                                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                                    <div
                                      className="bg-[#A21D21] h-2 rounded-full"
                                      style={{ width: `${(assessment.score / assessment.maxScore) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="font-medium text-gray-900 dark:text-white">{assessment.score}/{assessment.maxScore}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">เข้าเรียน:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{course.attendance}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">เข้าร่วม:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{course.participation}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">วันที่เรียน:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{course.startDate} - {course.endDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">ชั่วโมงเรียน:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{course.trainingHours} ชม.</span>
                          </div>
                        </div>

                        {/* Feedback */}
                        {course.feedback && (
                          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              <span className="font-medium text-gray-900 dark:text-white">ความเห็นวิทยากร:</span> {course.feedback}
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">ไม่มีข้อมูลรายวิชาในช่วงเวลาที่เลือก</p>
                  )}
                </div>
              </div>
            )}

            {selectedReport === 'grades' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">สรุปเกรด</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Grade Distribution */}
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">การกระจายเกรด</h4>
                    <div className="space-y-3">
                      {['A', 'B+', 'B', 'C+', 'C'].map((grade) => {
                        const count = courses.filter(c => c.grade === grade).length;
                        const percentage = courses.length > 0 ? (count / courses.length) * 100 : 0;
                        return (
                          <div key={grade} className="flex items-center">
                            <span className="w-12 text-sm font-medium text-gray-900 dark:text-white">{grade}</span>
                            <div className="flex-1 mx-3">
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                                <div
                                  className={`h-6 rounded-full flex items-center justify-center text-xs text-white ${grade === 'A' ? 'bg-green-500' :
                                    grade === 'B+' ? 'bg-blue-500' :
                                      grade === 'B' ? 'bg-yellow-500' :
                                        grade === 'C+' ? 'bg-orange-500' : 'bg-red-500'
                                    }`}
                                  style={{ width: `${percentage}%` }}
                                >
                                  {percentage > 10 && `${count} วิชา`}
                                </div>
                              </div>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">{percentage.toFixed(0)}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Grade Summary Table */}
                  <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">ตารางสรุปเกรด</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-2 text-gray-900 dark:text-white">รายวิชา</th>
                            <th className="text-center py-2 text-gray-900 dark:text-white">เกรด</th>
                            <th className="text-center py-2 text-gray-900 dark:text-white">คะแนน</th>
                            <th className="text-center py-2 text-gray-900 dark:text-white">หน่วยกิต</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.map((course) => (
                            <tr key={course.id} className="border-b border-gray-200 dark:border-gray-700">
                              <td className="py-2">
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">{course.title}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">{course.courseCode}</p>
                                </div>
                              </td>
                              <td className="text-center">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${course.grade === 'A' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                  course.grade === 'B+' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                    course.grade === 'B' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                      course.grade === 'C+' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                  }`}>
                                  {course.grade}
                                </span>
                              </td>
                              <td className="text-center text-gray-900 dark:text-white">{course.totalScore.toFixed(2)}</td>
                              <td className="text-center text-gray-900 dark:text-white">{course.trainingHours / 8}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedReport === 'activities' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">กิจกรรมการเรียนล่าสุด</h3>

                {/* Activity Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">ลงทะเบียน</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-700">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">8</p>
                        <p className="text-xs text-green-600 dark:text-green-400">เสร็จสิ้น</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">5</p>
                        <p className="text-xs text-purple-600 dark:text-purple-400">ได้ใบเซอร์</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">156</p>
                        <p className="text-xs text-orange-600 dark:text-orange-400">ชั่วโมงเรียน</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">ประวัติกิจกรรม</h4>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        ทั้งหมด
                      </button>
                      <button className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        7 วัน
                      </button>
                      <button className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        30 วัน
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        type: 'certificate',
                        title: 'ได้รับประกาศนียบัตร',
                        course: 'การพัฒนาทักษะการสื่อสาร',
                        time: '15/01/2024 14:30',
                        icon: '🏆',
                        color: 'purple'
                      },
                      {
                        type: 'completed',
                        title: 'เสร็จสิ้นการเรียน',
                        course: 'การพัฒนาทักษะการสื่อสาร',
                        time: '15/01/2024 10:00',
                        icon: '✅',
                        color: 'green'
                      },
                      {
                        type: 'enrolled',
                        title: 'ลงทะเบียนเรียน',
                        course: 'การบริหารงานพัฒนาบุคลากร',
                        time: '10/01/2024 09:15',
                        icon: '📝',
                        color: 'blue'
                      },
                      {
                        type: 'progress',
                        title: 'ทำกิจกรรมสำเร็จ',
                        course: 'เทคนิคการสอนที่มีประสิทธิภาพ',
                        time: '08/01/2024 16:45',
                        icon: '📚',
                        color: 'orange'
                      },
                      {
                        type: 'started',
                        title: 'เริ่มเรียน',
                        course: 'เทคนิคการสอนที่มีประสิทธิภาพ',
                        time: '05/01/2024 13:00',
                        icon: '▶️',
                        color: 'gray'
                      },
                      {
                        type: 'enrolled',
                        title: 'ลงทะเบียนเรียน',
                        course: 'เทคนิคการสอนที่มีประสิทธิภาพ',
                        time: '01/01/2024 10:30',
                        icon: '📝',
                        color: 'blue'
                      },
                      {
                        type: 'completed',
                        title: 'เสร็จสิ้นการเรียน',
                        course: 'การบริหารงานพัฒนาบุคลากร',
                        time: '20/12/2023 15:00',
                        icon: '✅',
                        color: 'green'
                      },
                      {
                        type: 'certificate',
                        title: 'ได้รับประกาศนียบัตร',
                        course: 'การบริหารงานพัฒนาบุคลากร',
                        time: '20/12/2023 15:30',
                        icon: '🏆',
                        color: 'purple'
                      }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${activity.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                          activity.color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                            activity.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                              activity.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                                'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                          }`}>
                          <span className="text-lg">{activity.icon}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{activity.course}</p>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedReport === 'certificates' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">ประกาศนียบัตรที่ได้รับ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.length > 0 ? (
                    certificates.map((cert) => (
                      <div key={cert.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{cert.courseTitle}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{cert.courseCode}</p>
                        </div>
                        <div className="text-center text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <p><strong className="text-gray-900 dark:text-white">เลขที่ใบเซอร์:</strong> {cert.certificateId}</p>
                          <p><strong className="text-gray-900 dark:text-white">ได้รับ:</strong> {cert.completedDate}</p>
                          <p><strong className="text-gray-900 dark:text-white">คะแนน:</strong> {cert.score}/{cert.maxScore}</p>
                          <p><strong className="text-gray-900 dark:text-white">เกรด:</strong> {cert.grade}</p>
                          <p><strong className="text-gray-900 dark:text-white">วิทยากร:</strong> {cert.instructor}</p>
                          <p><strong className="text-gray-900 dark:text-white">แผนก:</strong> {cert.department}</p>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button className="flex-1 bg-[#A21D21] text-white px-3 py-2 rounded text-sm hover:bg-[#7A1818] transition-colors">
                            ดูใบเซอร์
                          </button>
                          <button className="flex-1 border border-[#A21D21] text-[#A21D21] dark:text-[#C92828] dark:border-[#C92828] px-3 py-2 rounded text-sm hover:bg-[#A21D21] hover:text-white dark:hover:bg-[#C92828] transition-colors">
                            ดาวน์โหลด
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8 col-span-full">ยังไม่มีประกาศนียบัตร</p>
                  )}
                </div>
              </div>
            )}

            {selectedReport === 'plan' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">แผนการพัฒนา</h3>
                <div className="space-y-4">
                  {trainingPlan.length > 0 ? (
                    trainingPlan.map((plan) => (
                      <div key={plan.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">{plan.courseName}</h4>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                              <span>📅 {plan.plannedDate}</span>
                              <span>🏢 {plan.department}</span>
                              <span className={`px-2 py-1 rounded text-xs ${plan.priority === 'สูง' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                                plan.priority === 'กลาง' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                }`}>
                                {plan.priority}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs ${plan.status === 'กำลังจะเริ่ม' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                plan.status === 'กำลังเรียน' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                                  'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                                }`}>
                                {plan.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-[#A21D21] text-white rounded text-sm hover:bg-[#7A1818] transition-colors">
                              ลงทะเบียน
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">ไม่มีแผนการพัฒนาที่วางไว้</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
