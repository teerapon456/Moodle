'use client';

import React from 'react';
import Link from 'next/link';

const stats = {
  totalCourses: 24,
  totalEnrollments: 456,
  activeLearners: 89,
  completionRate: 68,
  requiredCourses: 8,
  optionalCourses: 16,
};

const trainingReports = [
  { id: 1, title: 'รายงานการฝึกอบรมประจำเดือนมกราคม 2024', period: 'มกราคม 2024', totalLearners: 120, completed: 85, status: 'completed' },
  { id: 2, title: 'รายงานการฝึกอบรมประจำเดือนกุมภาพันธ์ 2024', period: 'กุมภาพันธ์ 2024', totalLearners: 145, completed: 102, status: 'completed' },
  { id: 3, title: 'รายงานการฝึกอบรมประจำเดือนมีนาคม 2024', period: 'มีนาคม 2024', totalLearners: 168, completed: 125, status: 'in-progress' },
];

const departmentStats = [
  { department: 'ฝ่ายผลิต', totalLearners: 45, completed: 32, inProgress: 13, completionRate: 71 },
  { department: 'ฝ่ายขาย', totalLearners: 32, completed: 21, inProgress: 11, completionRate: 66 },
  { department: 'ฝ่ายพัฒนาบุคลากร', totalLearners: 28, completed: 22, inProgress: 6, completionRate: 79 },
  { department: 'ฝ่าย IT', totalLearners: 25, completed: 21, inProgress: 4, completionRate: 84 },
];

export default function HRTrainingDashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">แดชบอร์ดฝ่ายพัฒนาบุคลากร</h1>
        <p className="text-gray-600 mt-1">จัดการและติดตามการฝึกอบรมบุคลากร</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">หลักสูตรทั้งหมด</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalCourses}</p>
              <p className="text-xs text-gray-500 mt-1">บังคับ: {stats.requiredCourses} | เลือก: {stats.optionalCourses}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">การลงทะเบียนทั้งหมด</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalEnrollments}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">ผู้เรียนที่กำลังเรียน</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeLearners}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">อัตราเรียนจบ</p>
              <p className="text-3xl font-bold text-gray-900">{stats.completionRate}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Department Statistics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">สถิติตามแผนก</h2>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{dept.department}</h3>
                  <span className="text-sm font-medium text-[#A21D21]">{dept.completionRate}%</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <span>ทั้งหมด: {dept.totalLearners}</span>
                  <span>เรียนจบ: {dept.completed}</span>
                  <span>กำลังเรียน: {dept.inProgress}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#A21D21] h-2 rounded-full"
                    style={{ width: `${dept.completionRate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Reports */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">รายงานการฝึกอบรม</h2>
            <Link href="/hr-training/reports" className="text-sm text-[#A21D21] hover:underline">
              ดูทั้งหมด →
            </Link>
          </div>
          <div className="space-y-3">
            {trainingReports.map((report) => (
              <div key={report.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <h3 className="font-medium text-gray-900 mb-1">{report.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{report.period}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span>ผู้เรียน: {report.totalLearners} | </span>
                    <span>เรียนจบ: {report.completed}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    report.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status === 'completed' ? 'เสร็จสิ้น' : 'กำลังดำเนินการ'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">การดำเนินการด่วน</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/hr-training/reports" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">สร้างรายงาน</p>
                <p className="text-sm text-gray-500">สร้างรายงานการฝึกอบรม</p>
              </div>
            </div>
          </Link>
          <Link href="/hr-training/courses" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">จัดการหลักสูตร</p>
                <p className="text-sm text-gray-500">กำหนดหลักสูตรบังคับ</p>
              </div>
            </div>
          </Link>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">ส่งออกรายงาน</p>
                <p className="text-sm text-gray-500">ส่งออกรายงาน Excel/PDF</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
