'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/MainLayout';

// Mock courses data for admin
const coursesData = [
  {
    id: 1,
    title: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    description: 'เรียนรู้พื้นฐานและเทคนิคการจัดการทีมที่มีประสิทธิภาพในสถานการณ์การทำงานจริง',
    category: 'การพัฒนาบุคลากร',
    level: 'กลาง',
    duration: '12 ชั่วโมง',
    lessons: 12,
    enrolledStudents: 1234,
    rating: 4.8,
    reviews: 256,
    instructor: 'ดร.สมชาย ใจดี',
    status: 'published',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    thumbnail: '/api/placeholder/300/200',
  },
  {
    id: 2,
    title: 'การสื่อสารเชิงธุรกิจ',
    description: 'พัฒนาทักษะการสื่อสารในสถานการณ์ทางธุรกิจและการเจรจาต่อรอง',
    category: 'ทักษะอ่อน',
    level: 'เริ่มต้น',
    duration: '8 ชั่วโมง',
    lessons: 8,
    enrolledStudents: 892,
    rating: 4.6,
    reviews: 178,
    instructor: 'คุณสมศรี มั่นคง',
    status: 'published',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-20',
    thumbnail: '/api/placeholder/300/200',
  },
  {
    id: 3,
    title: 'การวิเคราะห์ข้อมูลด้วย Excel',
    description: 'เรียนรู้การวิเคราะห์ข้อมูลและสร้างรายงานด้วย Microsoft Excel',
    category: 'สกิลดิจิทัล',
    level: 'กลาง',
    duration: '16 ชั่วโมง',
    lessons: 16,
    enrolledStudents: 567,
    rating: 4.7,
    reviews: 134,
    instructor: 'คุณวิทยา ดีดี',
    status: 'draft',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-22',
    thumbnail: '/api/placeholder/300/200',
  },
  {
    id: 4,
    title: 'การบริหารโครงการ',
    description: 'เรียนรู้หลักการและกระบวนการบริหารจัดการโครงการอย่างมืออาชีพ',
    category: 'การจัดการ',
    level: 'ขั้นสูง',
    duration: '20 ชั่วโมง',
    lessons: 20,
    enrolledStudents: 234,
    rating: 4.9,
    reviews: 89,
    instructor: 'ดร.ประสิทธิ์ สุขใจ',
    status: 'published',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-25',
    thumbnail: '/api/placeholder/300/200',
  },
];

const categories = ['ทั้งหมด', 'การพัฒนาบุคลากร', 'ทักษะอ่อน', 'สกิลดิจิทัล', 'การจัดการ'];
const statuses = ['ทั้งหมด', 'published', 'draft', 'archived'];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [selectedStatus, setSelectedStatus] = useState('ทั้งหมด');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter courses
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ทั้งหมด' || course.category === selectedCategory;
    const matchesStatus = selectedStatus === 'ทั้งหมด' || course.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Stats
  const totalCourses = coursesData.length;
  const publishedCourses = coursesData.filter(c => c.status === 'published').length;
  const draftCourses = coursesData.filter(c => c.status === 'draft').length;
  const totalStudents = coursesData.reduce((sum, course) => sum + course.enrolledStudents, 0);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">จัดการหลักสูตร</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">จัดการและตรวจสอบหลักสูตรทั้งหมดในระบบ</p>
          </div>
          <Link
            href="/courses/create"
            className="mt-4 sm:mt-0 px-6 py-3 bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white rounded-lg hover:from-[#7A1818] hover:to-[#A21D21] transition-all font-medium inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            สร้างหลักสูตรใหม่
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">หลักสูตรทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalCourses}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">เผยแพร่แล้ว</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{publishedCourses}</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">ฉบับร่าง</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{draftCourses}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">นักเรียนทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalStudents.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="ค้นหาหลักสูตร, วิทยากร..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="lg:w-48">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'ทั้งหมด' ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-lg transition-colors ${viewMode === 'grid'
                    ? 'bg-[#A21D21] text-white'
                    : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-lg transition-colors ${viewMode === 'list'
                    ? 'bg-[#A21D21] text-white'
                    : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Courses List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Course Image */}
                <div className="h-48 bg-gradient-to-br from-[#A21D21] to-[#7A1818] flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${course.status === 'published'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : course.status === 'draft'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                      {course.status === 'published' ? 'เผยแพร่' : course.status === 'draft' ? 'ฉบับร่าง' : 'เก็บไว้'}
                    </span>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {course.rating}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                  {/* Course Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {course.instructor}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {course.category}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        {course.lessons} บทเรียน
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {course.enrolledStudents.toLocaleString()} นักเรียน
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {course.reviews} รีวิว
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/courses/${course.id}`}
                      className="flex-1 px-4 py-2 bg-[#A21D21] text-white rounded-lg hover:bg-[#7A1818] transition-colors text-sm font-semibold text-center"
                    >
                      แก้ไข
                    </Link>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-semibold">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">หลักสูตร</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">วิทยากร</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">หมวดหมู่</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">นักเรียน</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">สถานะ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{course.title}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{course.duration} • {course.lessons} บทเรียน</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{course.instructor}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{course.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{course.enrolledStudents.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${course.status === 'published'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : course.status === 'draft'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                          }`}>
                          {course.status === 'published' ? 'เผยแพร่' : course.status === 'draft' ? 'ฉบับร่าง' : 'เก็บไว้'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/courses/${course.id}`}
                            className="px-3 py-1 bg-[#A21D21] text-white rounded hover:bg-[#7A1818] transition-colors text-xs font-semibold"
                          >
                            แก้ไข
                          </Link>
                          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-xs font-semibold">
                            จัดการ
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">ไม่พบหลักสูตร</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือสร้างหลักสูตรใหม่</p>
            <Link
              href="/courses/create"
              className="px-6 py-3 bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white rounded-lg hover:from-[#7A1818] hover:to-[#A21D21] transition-all font-medium inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              สร้างหลักสูตรใหม่
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
