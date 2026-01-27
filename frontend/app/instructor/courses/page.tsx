'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

// Mock data for instructor's teaching courses
const teachingCoursesData = [
  {
    id: 1,
    title: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    category: 'การจัดการ',
    level: 'กลาง',
    duration: '8 สัปดาห์',
    enrolledStudents: 1250,
    maxStudents: 1500,
    rating: 4.8,
    averageProgress: 75,
    completionRate: 85,
    assignmentsPending: 23,
    totalAssignments: 45,
    nextClass: 'วันพฤหัสบดี 14:00',
    status: 'active',
    createdAt: '2024-01-15',
    lastUpdated: '2024-01-20',
    description: 'เรียนรู้เทคนิคการจัดการทีมสมัยใหม่เพื่อเพิ่มประสิทธิภาพการทำงาน'
  },
  {
    id: 2,
    title: 'การเขียนโปรแกรม Python',
    category: 'เทคโนโลยี',
    level: 'เริ่มต้น',
    duration: '12 สัปดาห์',
    enrolledStudents: 2100,
    maxStudents: 2500,
    rating: 4.6,
    averageProgress: 60,
    completionRate: 78,
    assignmentsPending: 45,
    totalAssignments: 80,
    nextClass: 'วันศุกร์ 10:00',
    status: 'active',
    createdAt: '2024-01-10',
    lastUpdated: '2024-01-21',
    description: 'พื้นฐานการเขียนโปรแกรม Python สำหรับผู้เริ่มต้น'
  },
  {
    id: 3,
    title: 'การตลาดดิจิทัล',
    category: 'การตลาด',
    level: 'กลาง',
    duration: '10 สัปดาห์',
    enrolledStudents: 890,
    maxStudents: 1000,
    rating: 4.9,
    averageProgress: 90,
    completionRate: 92,
    assignmentsPending: 8,
    totalAssignments: 25,
    nextClass: 'วันจันทร์ 13:00',
    status: 'active',
    createdAt: '2023-11-01',
    lastUpdated: '2024-01-19',
    description: 'กลยุทธ์การตลาดดิจิทัลเพื่อเติบโตธุรกิจในยุคดิจิทัล'
  },
  {
    id: 4,
    title: 'การวิเคราะห์ข้อมูลธุรกิจ',
    category: 'วิเคราะห์ข้อมูล',
    level: 'ขั้นสูง',
    duration: '14 สัปดาห์',
    enrolledStudents: 650,
    maxStudents: 800,
    rating: 4.7,
    averageProgress: 30,
    completionRate: 88,
    assignmentsPending: 12,
    totalAssignments: 40,
    nextClass: 'วันอังคาร 15:00',
    status: 'active',
    createdAt: '2024-01-05',
    lastUpdated: '2024-01-18',
    description: 'เทคนิคการวิเคราะห์ข้อมูลเชิงธุรกิจด้วยเครื่องมือสมัยใหม่'
  },
  {
    id: 5,
    title: 'สื่อสารเพื่อการนำเสนอ',
    category: 'การสื่อสาร',
    level: 'พื้นฐาน',
    duration: '6 สัปดาห์',
    enrolledStudents: 450,
    maxStudents: 500,
    rating: 4.5,
    averageProgress: 95,
    completionRate: 94,
    assignmentsPending: 3,
    totalAssignments: 15,
    nextClass: '-',
    status: 'completed',
    createdAt: '2023-10-01',
    lastUpdated: '2023-12-15',
    description: 'พัฒนาทักษะการนำเสนอและสื่อสารอย่างมืออาชีพ'
  }
];

export default function InstructorCoursesPage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('title');

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = teachingCoursesData.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || course.category === filterCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'students':
          return b.enrolledStudents - a.enrolledStudents;
        case 'progress':
          return b.averageProgress - a.averageProgress;
        case 'rating':
          return b.rating - a.rating;
        case 'completion':
          return b.completionRate - a.completionRate;
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterStatus, filterCategory, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = teachingCoursesData.length;
    const active = teachingCoursesData.filter(c => c.status === 'active').length;
    const completed = teachingCoursesData.filter(c => c.status === 'completed').length;
    const totalStudents = teachingCoursesData.reduce((sum, c) => sum + c.enrolledStudents, 0);
    const avgRating = (teachingCoursesData.reduce((sum, c) => sum + c.rating, 0) / total).toFixed(1);
    const avgProgress = Math.round(teachingCoursesData.reduce((sum, c) => sum + c.averageProgress, 0) / total);
    const totalAssignmentsPending = teachingCoursesData.reduce((sum, c) => sum + c.assignmentsPending, 0);

    return {
      total,
      active,
      completed,
      totalStudents,
      avgRating,
      avgProgress,
      totalAssignmentsPending
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'draft':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'เริ่มต้น':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'พื้นฐาน':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'กลาง':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'ขั้นสูง':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const cardClasses = "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow";

  return (
    <MainLayout userName={currentUser.name} userRole="instructor">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">หลักสูตรที่สอน</h1>
              <p className="text-gray-600 dark:text-gray-400">จัดการและติดตามหลักสูตรที่คุณรับผิดชอบ</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  สร้างหลักสูตรใหม่
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">หลักสูตรทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.active}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">กำลังสอน</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.totalStudents.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ผู้เรียนทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-red-600">{stats.totalAssignmentsPending}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">งานที่ต้องตรวจ</p>
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
                  placeholder="ค้นหาหลักสูตร, หมวดหมู่, คำอธิบาย..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">สถานะทั้งหมด</option>
              <option value="active">กำลังสอน</option>
              <option value="completed">เสร็จสิ้น</option>
              <option value="draft">ฉบับร่าง</option>
            </select>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">หมวดหมู่ทั้งหมด</option>
              <option value="การจัดการ">การจัดการ</option>
              <option value="เทคโนโลยี">เทคโนโลยี</option>
              <option value="การตลาด">การตลาด</option>
              <option value="วิเคราะห์ข้อมูล">วิเคราะห์ข้อมูล</option>
              <option value="การสื่อสาร">การสื่อสาร</option>
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">เรียงลำดับ:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="title">ชื่อหลักสูตร</option>
                <option value="students">จำนวนผู้เรียน</option>
                <option value="progress">ความคืบหน้าเฉลี่ย</option>
                <option value="rating">คะแนน</option>
                <option value="completion">อัตราสำเร็จ</option>
                <option value="created">วันที่สร้าง</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              พบ {filteredCourses.length} หลักสูตร
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className={`${cardClasses} p-6 hover:shadow-lg transition-all duration-300`}>
                {/* Course Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2 hover:text-red-600 transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(course.status)}`}>
                        {course.status === 'active' ? 'กำลังสอน' : course.status === 'completed' ? 'เสร็จสิ้น' : 'ฉบับร่าง'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-50">{course.rating}</span>
                  </div>
                </div>

                {/* Course Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-50">{course.enrolledStudents}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">ผู้เรียน</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-50">{course.completionRate}%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">อัตราสำเร็จ</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600 dark:text-gray-400">ความคืบหน้าเฉลี่ย</span>
                    <span className="text-xs font-medium text-gray-900 dark:text-gray-50">{course.averageProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.averageProgress}%` }}
                    />
                  </div>
                </div>

                {/* Course Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {course.duration} • {course.category}
                  </div>
                  <div className="flex items-center gap-2">
                    {course.nextClass !== '-' && (
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        <span className="font-medium">คลาสต่อไป:</span> {course.nextClass}
                      </div>
                    )}
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      จัดการ →
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">ไม่พบหลักสูตรที่ค้นหา</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือกรองข้อมูล</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterCategory('all');
            }}>
              ล้างตัวกรอง
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
