'use client';

import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

// Mock data for monthly report
const monthlyReportData = [
  {
    id: 1,
    month: 'มกราคม 2567',
    totalCourses: 5,
    totalStudents: 1250,
    totalSessions: 45,
    avgAttendance: 87.5,
    completionRate: 92.3,
    avgScore: 85.2,
    topPerformingCourse: 'การตลาดดิจิทัล',
    lowPerformingCourse: 'การวิเคราะห์ข้อมูลธุรกิจ',
    studentFeedback: 4.6,
    issues: [
      'นักเรียนบางคนขาดเข้าเรียนบ่อย',
      'ระบบเสียงที่ห้องประชุมมีปัญหาบ้างครั้ง',
      'ต้องการอัปเดตเนื้อหลักสูตรบางส่วน'
    ],
    achievements: [
      'เพิ่มจำนวนนักเรียน 15%',
      'คะแนนเฉลี่ยสูงขึ้น 3%',
      'การตอบสนองดีขึ้น 5%'
    ],
    recommendations: [
      'จัดทำ workshop เสริมทักษะเพิ่มเติม',
      'ปรับปรุนระบบเสียงในห้องเรียน',
      'พัฒนาเนื้อหลักสูตรให้ทันสมัย'
    ]
  },
  {
    id: 2,
    month: 'ธันวาคม 2566',
    totalCourses: 5,
    totalStudents: 1087,
    totalSessions: 40,
    avgAttendance: 85.2,
    completionRate: 89.7,
    avgScore: 82.8,
    topPerformingCourse: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    lowPerformingCourse: 'สื่อสารเพื่อการนำเสนอ',
    studentFeedback: 4.4,
    issues: [
      'เนื้อหลักสูตรบางส่วนล้าสมัย',
      'การสื่อสารกับนักเรียนต้องปรับปรุน'
    ],
    achievements: [
      'จัดการปัญหาด้านเทคนิคครั้งเรียบร้อย',
      'เพิ่มการใช้เทคโนโลยีในการสอน'
    ],
    recommendations: [
      'อัปเดตเนื้อหลักสูตรประจำปี',
      'จัดอบรมการสื่อสารสำหรับผู้สอน'
    ]
  },
  {
    id: 3,
    month: 'ธันวาคม 2566',
    totalCourses: 4,
    totalStudents: 987,
    totalSessions: 36,
    avgAttendance: 83.8,
    completionRate: 87.2,
    avgScore: 80.5,
    topPerformingCourse: 'การเขียนโปรแกรม Python',
    lowPerformingCourse: 'การวิเคราะห์ข้อมูลธุรกิจ',
    studentFeedback: 4.2,
    issues: [
      'นักเรียนใหม่ปรับตัวกับการเรียนออนไลน์',
      'การประเมินยังไม่ครอบคลุม'
    ],
    achievements: [
      'เปิดหลักสูตรใหม่ 1 หลักสูตร',
      'พัฒนาการสอนแบบ hybrid'
    ],
    recommendations: [
      'เพิ่มการสนับสนุนนักเรียนในการเรียนออนไลน์',
      'พัฒนาระบบการประเมิน'
    ]
  }
];

export default function InstructorMonthlyReportPage() {
  const currentUser = getCurrentUser();
  const [selectedMonth, setSelectedMonth] = useState('มกราคม 2567');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('month');

  // Filter and sort reports
  const filteredReports = useMemo(() => {
    let filtered = monthlyReportData.filter(report => {
      const matchesSearch = report.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.topPerformingCourse.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.lowPerformingCourse.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });

    // Sort reports
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'month':
          return new Date(b.month).getTime() - new Date(a.month).getTime();
        case 'students':
          return b.totalStudents - a.totalStudents;
        case 'completion':
          return b.completionRate - a.completionRate;
        case 'score':
          return b.avgScore - a.avgScore;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, sortBy]);

  // Get current report data
  const currentReport = monthlyReportData.find(report => report.month === selectedMonth) || monthlyReportData[0];

  const getGradeColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 65) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPerformanceColor = (rate: number) => {
    if (rate >= 90) return 'text-emerald-600';
    if (rate >= 80) return 'text-blue-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const cardClasses = "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow";

  return (
    <MainLayout userName={currentUser.name} userRole="instructor">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">รายงานประจำเดือน</h1>
              <p className="text-gray-600 dark:text-gray-400">สรุปผลการสอนและประสิทธิภาพรายเดือน</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707H19a2 2 0 012 2v1z" />
                  </svg>
                  ส่งออกรายงาน
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Month Selector */}
        <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">เลือกเดือน</h2>
            <div className="flex items-center gap-4">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {monthlyReportData.map(report => (
                  <option key={report.id} value={report.month}>
                    {report.month}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="ค้นหา..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{currentReport.totalStudents}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">นักเรียนทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className={`text-2xl font-bold ${getPerformanceColor(currentReport.completionRate)}`}>
                {currentReport.completionRate}%
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">อัตราสำเร็จ</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className={`text-2xl font-bold ${getGradeColor(currentReport.avgScore)}`}>
                {currentReport.avgScore}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">คะแนนเฉลี่ย</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.005 1.603-.921 1.902 0l-1.07-3.292a1 1 0 00-.95-.69h-3.462c-.969 0-1.371-1.24-.588-1.81l2.8-2.034a1 1 0 00.364-1.118l-1.07-3.292z" />
                </svg>
              </div>
              <span className={`text-2xl font-bold ${getPerformanceColor(currentReport.avgAttendance)}`}>
                {currentReport.avgAttendance}%
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">การเข้าเรียนเฉลี่ย</p>
          </div>
        </div>

        {/* Course Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className={`${cardClasses} p-6`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">หลักสูตรที่ทำได้ดีที่สุด</h3>
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-50">{currentReport.topPerformingCourse}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">อัตราสำเร็จสูงสุดในเดือน</p>
              </div>
              <div className="text-2xl font-bold text-green-600">🏆</div>
            </div>
          </div>

          <div className={`${cardClasses} p-6`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">หลักสูตรที่ต้องปรับปรุน</h3>
            <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-50">{currentReport.lowPerformingCourse}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">ต้องการความสนใจเพิ่มเติม</p>
              </div>
              <div className="text-2xl font-bold text-orange-600">📈</div>
            </div>
          </div>
        </div>

        {/* Issues and Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className={`${cardClasses} p-6`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">ปัญหาที่พบ</h3>
            <div className="space-y-3">
              {currentReport.issues.map((issue, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{issue}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${cardClasses} p-6`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">ความสำเร็จ</h3>
            <div className="space-y-3">
              {currentReport.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className={`${cardClasses} p-6 mb-8`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">ข้อเสนอแนะ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentReport.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Student Feedback */}
        <div className={`${cardClasses} p-6 mb-8`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">คะแนนความพึงพอจากนักเรียน</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-6 h-6 ${star <= currentReport.studentFeedback ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{currentReport.studentFeedback}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">จาก 5 คะแนน</span>
          </div>
        </div>

        {/* Historical Comparison */}
        <div className={`${cardClasses} p-6`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">เปรียบเทียบย้อนหลัง</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-50">เดือน</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-gray-50">นักเรียน</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-gray-50">อัตราสำเร็จ</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-gray-50">คะแนนเฉลี่ย</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-gray-50">ความพึงพอ</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-50">{report.month}</td>
                    <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400">{report.totalStudents}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-medium ${getPerformanceColor(report.completionRate)}`}>
                        {report.completionRate}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-medium ${getGradeColor(report.avgScore)}`}>
                        {report.avgScore}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${star <= report.studentFeedback ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{report.studentFeedback}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Options */}
        <div className="flex items-center justify-center gap-4">
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707H19a2 2 0 012 2v1z" />
              </svg>
              ส่งออกเป็น PDF
            </span>
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m3-2V8a2 2 0 00-2-2H9a2 2 0 00-2 2v8m3-2h6m-6-4h6a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2v2" />
              </svg>
              ส่งออกเป็น Excel
            </span>
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2h2zm7-8a2 2 0 01-2 2H9a2 2 0 00-2 2v4a2 2 0 002 2h6a2 2 0 002-2V9a2 2 0 00-2-2z" />
              </svg>
              พิมพ์รายงาน
            </span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
