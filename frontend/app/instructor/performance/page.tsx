'use client';

import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

// Mock data for performance
const performanceData = [
  {
    id: 1,
    instructorName: 'ผู้สอน',
    department: 'ฝ่ายพัฒนาทักษะ',
    totalCourses: 5,
    totalStudents: 156,
    avgRating: 4.5,
    completionRate: 85.2,
    avgScore: 88.7,
    teachingHours: 120,
    responseTime: 2.3,
    lastUpdated: '2024-01-22',
    courses: [
      { title: 'การจัดการทีมอย่างมีประสิทธิภาพ', students: 45, rating: 4.6, completion: 92, avgScore: 89.2 },
      { title: 'การเขียนโปรแกรม Python', students: 38, rating: 4.4, completion: 88, avgScore: 87.5 },
      { title: 'การตลาดดิจิทัล', students: 52, rating: 4.5, completion: 82, avgScore: 88.9 },
      { title: 'การเงินส่วนบุคคล', students: 21, rating: 4.7, completion: 95, avgScore: 91.3 }
    ],
    metrics: {
      studentSatisfaction: 4.5,
      courseQuality: 4.6,
      teachingEffectiveness: 4.4,
      communication: 4.7,
      responsiveness: 4.3,
      materialQuality: 4.5
    }
  },
  {
    id: 2,
    instructorName: 'อาจารย์ สมชาย',
    department: 'ฝ่ายไอที',
    totalCourses: 3,
    totalStudents: 89,
    avgRating: 4.7,
    completionRate: 91.5,
    avgScore: 92.3,
    teachingHours: 85,
    responseTime: 1.8,
    lastUpdated: '2024-01-21',
    courses: [
      { title: 'การเขียนโปรแกรมขั้นสูง', students: 35, rating: 4.8, completion: 94, avgScore: 93.5 },
      { title: 'ฐานข้อมูลและ SQL', students: 28, rating: 4.6, completion: 89, avgScore: 90.8 },
      { title: 'การพัฒนาเว็บแอปพลิเคชัน', students: 26, rating: 4.7, completion: 92, avgScore: 92.7 }
    ],
    metrics: {
      studentSatisfaction: 4.7,
      courseQuality: 4.8,
      teachingEffectiveness: 4.6,
      communication: 4.7,
      responsiveness: 4.5,
      materialQuality: 4.6
    }
  },
  {
    id: 3,
    instructorName: 'ผู้สอน สุขใจ',
    department: 'ฝ่ายการตลาด',
    totalCourses: 4,
    totalStudents: 124,
    avgRating: 4.3,
    completionRate: 78.9,
    avgScore: 85.6,
    teachingHours: 95,
    responseTime: 3.1,
    lastUpdated: '2024-01-20',
    courses: [
      { title: 'การตลาดดิจิทัลขั้นสูง', students: 42, rating: 4.2, completion: 76, avgScore: 84.3 },
      { title: 'การสื่อสารทางการตลาด', students: 38, rating: 4.4, completion: 82, avgScore: 87.1 },
      { title: 'การวิเคราะห์ข้อมูลการตลาด', students: 44, rating: 4.3, completion: 79, avgScore: 85.4 }
    ],
    metrics: {
      studentSatisfaction: 4.3,
      courseQuality: 4.4,
      teachingEffectiveness: 4.2,
      communication: 4.5,
      responsiveness: 4.1,
      materialQuality: 4.3
    }
  }
];

export default function InstructorPerformancePage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedInstructor, setSelectedInstructor] = useState<typeof performanceData[0] | null>(null);

  // Filter and sort instructors
  const filteredInstructors = useMemo(() => {
    let filtered = performanceData.filter(instructor => {
      const matchesSearch = instructor.instructorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.courses.some(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDepartment = filterDepartment === 'all' || instructor.department === filterDepartment;

      return matchesSearch && matchesDepartment;
    });

    // Sort instructors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.avgRating - a.avgRating;
        case 'completion':
          return b.completionRate - a.completionRate;
        case 'students':
          return b.totalStudents - a.totalStudents;
        case 'courses':
          return b.totalCourses - a.totalCourses;
        case 'response':
          return a.responseTime - b.responseTime;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterDepartment, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = performanceData.length;
    const avgRating = performanceData.reduce((sum, i) => sum + i.avgRating, 0) / total;
    const avgCompletion = performanceData.reduce((sum, i) => sum + i.completionRate, 0) / total;
    const totalStudents = performanceData.reduce((sum, i) => sum + i.totalStudents, 0);
    const totalCourses = performanceData.reduce((sum, i) => sum + i.totalCourses, 0);
    const avgResponse = performanceData.reduce((sum, i) => sum + i.responseTime, 0) / total;

    return {
      total,
      avgRating,
      avgCompletion,
      totalStudents,
      totalCourses,
      avgResponse
    };
  }, []);

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-emerald-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 90) return 'text-emerald-600';
    if (rate >= 80) return 'text-blue-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (value: number) => {
    if (value >= 90) return 'bg-emerald-500';
    if (value >= 80) return 'bg-blue-500';
    if (value >= 70) return 'bg-yellow-500';
    if (value >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const cardClasses = "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow";

  return (
    <MainLayout userName={currentUser.name} userRole="instructor">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">ประสิทธิภาพการสอน</h1>
              <p className="text-gray-600 dark:text-gray-400">วิเคราะห์และติดตามประสิทธิภาพการสอนของผู้สอน</p>
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

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ผู้สอนทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <span className="text-2xl">⭐</span>
              </div>
              <span className={`text-2xl font-bold ${getRatingColor(stats.avgRating)}`}>
                {stats.avgRating.toFixed(1)}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">คะแนนเฉลี่ย</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className={`text-2xl font-bold ${getCompletionColor(stats.avgCompletion)}`}>
                {stats.avgCompletion.toFixed(1)}%
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">อัตราเรียนจบเฉลี่ย</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                {stats.avgResponse.toFixed(1)}h
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">เวลาตอบกลับเฉลี่ย</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="ค้นหาชื่อผู้สอน, แผนก, หลักสูตร..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Department Filter */}
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">แผนกทั้งหมด</option>
              <option value="ฝ่ายพัฒนาทักษะ">ฝ่ายพัฒนาทักษะ</option>
              <option value="ฝ่ายไอที">ฝ่ายไอที</option>
              <option value="ฝ่ายการตลาด">ฝ่ายการตลาด</option>
              <option value="ฝ่ายการเงิน">ฝ่ายการเงิน</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="rating">คะแนนเฉลี่ย</option>
              <option value="completion">อัตราเรียนจบ</option>
              <option value="students">จำนวนนักเรียน</option>
              <option value="courses">จำนวนหลักสูตร</option>
              <option value="response">เวลาตอบกลับ</option>
            </select>
          </div>
        </div>

        {/* Instructors List */}
        {filteredInstructors.length > 0 ? (
          <div className="space-y-4">
            {filteredInstructors.map((instructor) => (
              <div key={instructor.id} className={`${cardClasses} p-6 hover:shadow-lg transition-all duration-300`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                        {instructor.instructorName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {instructor.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getRatingColor(instructor.avgRating)}`}>
                        ⭐ {instructor.avgRating.toFixed(1)}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">คะแนนเฉลี่ย</p>
                    </div>
                  </div>
                </div>

                {/* Performance Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      {instructor.totalCourses}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">หลักสูตร</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {instructor.totalStudents}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">นักเรียนทั้งหมด</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getCompletionColor(instructor.completionRate)}`}>
                      {instructor.completionRate.toFixed(1)}%
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">อัตราเรียนจบ</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {instructor.teachingHours}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">ชั่วโมงสอน</p>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-3">ตัวชี้วัดประสิทธิภาพ</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(instructor.metrics).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {key === 'studentSatisfaction' ? 'ความพึงพอใจนักเรียน' :
                            key === 'courseQuality' ? 'คุณภาพหลักสูตร' :
                              key === 'teachingEffectiveness' ? 'ประสิทธิภาพการสอน' :
                                key === 'communication' ? 'การสื่อสาร' :
                                  key === 'responsiveness' ? 'การตอบกลับ' :
                                    key === 'materialQuality' ? 'คุณภาพวัสดุ' : key}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className={`text-sm font-medium ${getRatingColor(value)}`}>
                            {value.toFixed(1)}
                          </span>
                          <span className="text-yellow-400 text-xs">★</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Courses */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-3">หลักสูตรยอดนิยม</h4>
                  <div className="space-y-2">
                    {instructor.courses.slice(0, 3).map((course, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{course.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {course.students} นักเรียน • คะแนนเฉลี่ย {course.avgScore.toFixed(1)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${getRatingColor(course.rating)}`}>
                            ⭐ {course.rating.toFixed(1)}
                          </span>
                          <span className={`text-sm font-medium ${getCompletionColor(course.completion)}`}>
                            {course.completion}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>⏱️ ตอบกลับเฉลี่ย: {instructor.responseTime} ชั่วโมง</span>
                    <span>📅 อัปเดตล่าสุด: {formatDate(instructor.lastUpdated)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedInstructor(instructor)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      ดูรายละเอียด
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      ดูรายงาน
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">ไม่พบข้อมูลผู้สอน</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือกรองข้อมูล</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterDepartment('all');
            }}>
              ล้างตัวกรอง
            </Button>
          </div>
        )}

        {/* Export Options */}
        <div className="flex items-center justify-center gap-4 mt-8">
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
