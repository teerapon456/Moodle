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
    description: 'เรียนรู้เทคนิคการจัดการทีมสมัยใหม่เพื่อเพิ่มประสิทธิภาพการทำงาน',
    modules: [
      { id: 1, title: 'บทนำสู่การจัดการทีม', lessons: 5, completed: 5 },
      { id: 2, title: 'การสร้างทีมที่มีประสิทธิภาพ', lessons: 8, completed: 6 },
      { id: 3, title: 'การสื่อสารในทีม', lessons: 6, completed: 4 },
      { id: 4, title: 'การแก้ไขปัญหาในทีม', lessons: 7, completed: 2 }
    ],
    revenue: 125000,
    certificates: 892
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
    description: 'พื้นฐานการเขียนโปรแกรม Python สำหรับผู้เริ่มต้น',
    modules: [
      { id: 1, title: 'บทนำสู่ Python', lessons: 6, completed: 6 },
      { id: 2, title: 'ตัวแปรและข้อมูล', lessons: 8, completed: 7 },
      { id: 3, title: 'การควบคุม', lessons: 10, completed: 4 },
      { id: 4, title: 'ฟังก์ชัน', lessons: 9, completed: 2 },
      { id: 5, title: 'โมดูลและแพ็คเกจ', lessons: 7, completed: 0 }
    ],
    revenue: 210000,
    certificates: 1456
  },
  {
    id: 3,
    title: 'การตลาดดิจิทัล',
    category: 'การตลาด',
    level: 'กลาง',
    duration: '10 สัปดาห์',
    enrolledStudents: 890,
    maxStudents: 1000,
    rating: 4.7,
    averageProgress: 82,
    completionRate: 88,
    assignmentsPending: 12,
    totalAssignments: 35,
    nextClass: 'วันจันทร์ 13:00',
    status: 'active',
    createdAt: '2024-01-12',
    lastUpdated: '2024-01-22',
    description: 'กลยุทธ์การตลาดดิจิทัลเพื่อเติบโตธุรกิจในยุคดิจิทัล',
    modules: [
      { id: 1, title: 'พื้นฐานการตลาดดิจิทัล', lessons: 5, completed: 5 },
      { id: 2, title: 'SEO และ SEM', lessons: 8, completed: 7 },
      { id: 3, title: 'Social Media Marketing', lessons: 6, completed: 5 },
      { id: 4, title: 'Content Marketing', lessons: 7, completed: 3 }
    ],
    revenue: 89000,
    certificates: 678
  },
  {
    id: 4,
    title: 'การเงินส่วนบุคคล',
    category: 'การเงิน',
    level: 'เริ่มต้น',
    duration: '6 สัปดาห์',
    enrolledStudents: 450,
    maxStudents: 500,
    rating: 4.9,
    averageProgress: 91,
    completionRate: 94,
    assignmentsPending: 8,
    totalAssignments: 20,
    nextClass: 'วันพุธ 15:00',
    status: 'completed',
    createdAt: '2023-12-01',
    lastUpdated: '2024-01-18',
    description: 'การวางแผนการเงินส่วนบุคคลเพื่ออนาคตที่มั่นคง',
    modules: [
      { id: 1, title: 'พื้นฐานการเงิน', lessons: 4, completed: 4 },
      { id: 2, title: 'การออมและลงทุน', lessons: 6, completed: 6 },
      { id: 3, title: 'การจัดการหนี้', lessons: 4, completed: 4 },
      { id: 4, title: 'การวางแผนเกษียณ', lessons: 3, completed: 3 }
    ],
    revenue: 45000,
    certificates: 423
  }
];

export default function InstructorMyCoursesPage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = teachingCoursesData.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase());

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
        case 'rating':
          return b.rating - a.rating;
        case 'progress':
          return b.averageProgress - a.averageProgress;
        case 'revenue':
          return b.revenue - a.revenue;
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
    const totalRevenue = teachingCoursesData.reduce((sum, c) => sum + c.revenue, 0);
    const avgRating = teachingCoursesData.reduce((sum, c) => sum + c.rating, 0) / total;
    const avgProgress = teachingCoursesData.reduce((sum, c) => sum + c.averageProgress, 0) / total;
    const totalCertificates = teachingCoursesData.reduce((sum, c) => sum + c.certificates, 0);

    return {
      total,
      active,
      completed,
      totalStudents,
      totalRevenue,
      avgRating,
      avgProgress,
      totalCertificates
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
      case 'archived':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'เริ่มต้น':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'กลาง':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'ขั้นสูง':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-emerald-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">หลักสูตรของฉัน</h1>
              <p className="text-gray-600 dark:text-gray-400">จัดการและติดตามหลักสูตรที่คุณสอน</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  กริด
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  รายการ
                </button>
              </div>
              <Link href="/instructor/create-course">
                <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    สร้างหลักสูตรใหม่
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">หลักสูตรทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.totalStudents.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">นักเรียนทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <span className="text-2xl">⭐</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.avgRating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">คะแนนเฉลี่ย</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <span className="text-2xl">💰</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">฿{(stats.totalRevenue / 1000).toFixed(0)}K</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">รายได้รวม</p>
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
                  placeholder="ค้นหาชื่อหลักสูตร, คำอธิบาย, หมวดหมู่..."
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
              <option value="archived">เก็บถาวร</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="created">วันที่สร้าง</option>
              <option value="title">ชื่อหลักสูตร</option>
              <option value="students">จำนวนนักเรียน</option>
              <option value="rating">คะแนน</option>
              <option value="progress">ความคืบหน้า</option>
              <option value="revenue">รายได้</option>
            </select>
          </div>
        </div>

        {/* Courses Grid/List */}
        {filteredCourses.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredCourses.map((course) => (
              <div key={course.id} className={`${cardClasses} overflow-hidden hover:shadow-lg transition-all duration-300`}>
                {/* Course Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {course.description}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(course.status)}`}>
                      {course.status === 'active' ? '🟢 กำลังสอน' : 
                       course.status === 'completed' ? '✅ เสร็จสิ้น' : 
                       course.status === 'draft' ? '📝 ฉบับร่าง' : 
                       course.status === 'archived' ? '📦 เก็บถาวร' : course.status}
                    </span>
                  </div>

                  {/* Course Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">หมวดหมู่</span>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{course.category}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">ระดับ</span>
                      <p className={`text-sm font-medium ${getLevelColor(course.level).split(' ')[0]}`}>
                        {course.level}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">ระยะเวลา</span>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{course.duration}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">คะแนน</span>
                      <p className="text-sm font-medium text-yellow-600">⭐ {course.rating}</p>
                    </div>
                  </div>

                  {/* Students Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        นักเรียน: {course.enrolledStudents.toLocaleString()}/{course.maxStudents.toLocaleString()}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                        {Math.round((course.enrolledStudents / course.maxStudents) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Average Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">ความคืบหน้าเฉลี่ย</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-50">{course.averageProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(course.averageProgress)}`}
                        style={{ width: `${course.averageProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Modules Progress */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-2">โมดูล ({course.modules.length})</h4>
                    <div className="space-y-1">
                      {course.modules.slice(0, 3).map((module) => (
                        <div key={module.id} className="flex items-center justify-between text-xs">
                          <span className="text-gray-600 dark:text-gray-400">{module.title}</span>
                          <span className="text-gray-500">{module.completed}/{module.lessons} บทเรียน</span>
                        </div>
                      ))}
                      {course.modules.length > 3 && (
                        <div className="text-xs text-gray-500">+{course.modules.length - 3} โมดูลอื่นๆ</div>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <div className="text-lg font-bold text-gray-900 dark:text-gray-50">{course.assignmentsPending}</div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">งานรอตรวจ</p>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <div className="text-lg font-bold text-gray-900 dark:text-gray-50">{course.completionRate}%</div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">อัตราเรียนจบ</p>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <div className="text-lg font-bold text-gray-900 dark:text-gray-50">{course.certificates}</div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">ใบประกาศ</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div>📅 สร้าง: {formatDate(course.createdAt)}</div>
                      <div>🔄 อัปเดต: {formatDate(course.lastUpdated)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/instructor/courses/${course.id}`}>
                        <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          ดูรายละเอียด
                        </button>
                      </Link>
                      <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                        แก้ไข
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">ไม่พบหลักสูตร</h3>
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

        {/* Quick Actions */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link href="/instructor/create-course">
            <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                สร้างหลักสูตรใหม่
              </span>
            </button>
          </Link>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              นำเข้าหลักสูตร
            </span>
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              ดูรายงานหลักสูตร
            </span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
