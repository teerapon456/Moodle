'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/MainLayout';

// Mock data for enrolled courses
const allMyCourses = [
  // In Progress
  {
    id: 1,
    title: 'มาตรฐานความปลอดภัยในโรงงาน (Safety Standards)',
    category: 'ความปลอดภัย',
    instructor: 'ดร.สมชาย ใจดี',
    progress: 65,
    level: 'L2',
    status: 'in-progress',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
    duration: 20,
    enrolled: 234,
    completedLessons: 13,
    totalLessons: 20,
    lastAccessed: '2 ชั่วโมงที่แล้ว',
    nextDeadline: 'แบบทดสอบ Module 3 - 2 วัน',
    year: 2024,
    department: 'การผลิต',
    tags: ['ความปลอดภัย', 'โรงงาน', 'มาตรฐาน', 'ISO'],
    courseCode: 'SAF-2024-001',
    language: 'ไทย',
  },
  {
    id: 2,
    title: 'การใช้งาน ERP System สำหรับการผลิต',
    category: 'เทคโนโลยี',
    instructor: 'อ.วิไล เก่งมาก',
    progress: 30,
    level: 'L3',
    status: 'in-progress',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    duration: 25,
    enrolled: 189,
    completedLessons: 6,
    totalLessons: 20,
    lastAccessed: '1 วันที่แล้ว',
    nextDeadline: 'งานมอบหมาย - 5 วัน',
    year: 2024,
    department: 'IT',
    tags: ['ERP', 'SAP', 'ระบบ', 'การผลิต'],
    courseCode: 'IT-2024-015',
    language: 'ไทย/อังกฤษ',
  },
  {
    id: 3,
    title: 'การควบคุมคุณภาพผลิตภัณฑ์ (Quality Control)',
    category: 'คุณภาพ',
    instructor: 'อ.สมหญิง รักงาน',
    progress: 85,
    level: 'L2',
    status: 'in-progress',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    duration: 18,
    enrolled: 312,
    completedLessons: 17,
    totalLessons: 20,
    lastAccessed: '3 ชั่วโมงที่แล้ว',
    nextDeadline: 'แบบทดสอบสุดท้าย - 7 วัน',
    year: 2024,
    department: 'QA/QC',
    tags: ['คุณภาพ', 'ควบคุม', 'ตรวจสอบ', 'มาตรฐาน'],
    courseCode: 'QC-2024-008',
    language: 'ไทย',
  },
  {
    id: 4,
    title: 'Six Sigma Green Belt',
    category: 'Quality Management',
    instructor: 'ดร.ประเสริฐ คุณภาพ',
    progress: 45,
    level: 'L3-L5',
    status: 'in-progress',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
    duration: 40,
    enrolled: 156,
    completedLessons: 18,
    totalLessons: 40,
    lastAccessed: '5 วันที่แล้ว',
    nextDeadline: 'Live Session - พรุ่งนี้',
    year: 2023,
    department: 'Quality Management',
    tags: ['Six Sigma', 'Green Belt', 'DMAIC', 'Lean'],
    courseCode: 'QM-2023-042',
    language: 'อังกฤษ',
  },
  {
    id: 5,
    title: 'Digital Transformation for Manufacturing',
    category: 'Digital & Innovation',
    instructor: 'ดร.ดิจิทัล นวัตกรรม',
    progress: 20,
    level: 'L3-L6',
    status: 'in-progress',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400',
    duration: 35,
    enrolled: 98,
    completedLessons: 7,
    totalLessons: 35,
    lastAccessed: '1 สัปดาห์ที่แล้ว',
    nextDeadline: 'Project Proposal - 3 วัน',
    year: 2024,
    department: 'Innovation',
    tags: ['Digital', 'Transformation', 'Industry 4.0', 'IoT', 'AI'],
    courseCode: 'DIG-2024-012',
    language: 'อังกฤษ',
  },
  // Completed
  {
    id: 6,
    title: 'การสื่อสารเชิงธุรกิจ',
    category: 'ทักษะอ่อน',
    instructor: 'คุณสมศรี มั่นคง',
    progress: 100,
    level: 'L1-L3',
    status: 'completed',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
    duration: 15,
    enrolled: 456,
    completedLessons: 12,
    totalLessons: 12,
    completedDate: '15 ธ.ค. 2567',
    certificateId: 'CERT-2023-023',
    score: 92,
    year: 2023,
    department: 'HR',
    tags: ['Communication', 'Business', 'Presentation', 'Negotiation'],
    courseCode: 'COM-2023-023',
    language: 'ไทย',
  },
  {
    id: 7,
    title: 'Project Management Fundamentals (PMP Basics)',
    category: 'การจัดการ',
    instructor: 'ดร.วิญญาณ จัดการ',
    progress: 100,
    level: 'L2-L4',
    status: 'completed',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
    duration: 25,
    enrolled: 234,
    completedLessons: 15,
    totalLessons: 15,
    completedDate: '10 ธ.ค. 2567',
    certificateId: 'CERT-2023-045',
    score: 88,
    year: 2023,
    department: 'PMO',
    tags: ['Project Management', 'PMP', 'Agile', 'Scrum', 'Planning'],
    courseCode: 'PM-2023-045',
    language: 'ไทย/อังกฤษ',
  },
  {
    id: 8,
    title: 'Data Analysis with Excel',
    category: 'เทคโนโลยี',
    instructor: 'อ.เอ็กเซล ชำนาญ',
    progress: 100,
    level: 'L2-L4',
    status: 'completed',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400',
    duration: 20,
    enrolled: 378,
    completedLessons: 16,
    totalLessons: 16,
    completedDate: '5 ธ.ค. 2567',
    certificateId: 'CERT-2023-067',
    score: 95,
    year: 2023,
    department: 'IT',
    tags: ['Excel', 'Data Analysis', 'Pivot Tables', 'Charts', 'Formulas'],
    courseCode: 'IT-2023-067',
    language: 'ไทย',
  },
  {
    id: 9,
    title: 'Time Management & Productivity Skills',
    category: 'ทักษะอ่อน',
    instructor: 'คุณเวลา จัดการ',
    progress: 100,
    level: 'L1-L2',
    status: 'completed',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    duration: 8,
    enrolled: 523,
    completedLessons: 8,
    totalLessons: 8,
    completedDate: '20 พ.ย. 2567',
    certificateId: 'CERT-2023-089',
    score: 90,
    year: 2023,
    department: 'HR',
    tags: ['Time Management', 'Productivity', 'Planning', 'Focus', 'Efficiency'],
    courseCode: 'HR-2023-089',
    language: 'ไทย',
  },
  {
    id: 10,
    title: 'Workplace Safety Basics',
    category: 'ความปลอดภัย',
    instructor: 'อ.ปลอดภัย มั่นคง',
    progress: 100,
    level: 'L1-L3',
    status: 'completed',
    thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
    duration: 8,
    enrolled: 623,
    completedLessons: 8,
    totalLessons: 8,
    completedDate: '20 ธ.ค. 2567',
    certificateId: 'CERT-2023-044',
    year: 2023,
    department: 'Safety',
    tags: ['Safety', 'Workplace', 'PPE', 'Emergency', 'OSHA'],
    courseCode: 'SAF-2023-055',
    language: 'ไทย',
  },
  // Not Started
  {
    id: 11,
    title: 'Advanced Excel for Business Analytics',
    category: 'เทคโนโลยี',
    instructor: 'อ.เอ็กเซล ชำนาญ',
    progress: 0,
    level: 'L2-L5',
    status: 'not-started',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400',
    duration: 16,
    enrolled: 412,
    completedLessons: 0,
    totalLessons: 16,
    enrolledDate: '18 ม.ค. 2568',
    year: 2024,
    department: 'IT',
    tags: ['Excel', 'VBA', 'Macro', 'Pivot Table', 'Data Analysis'],
    courseCode: 'IT-2024-022',
    language: 'ไทย',
  },
  {
    id: 12,
    title: 'Leadership Development Program for Managers',
    category: 'Leadership',
    instructor: 'ดร.ผู้นำ พัฒนา',
    progress: 0,
    level: 'L4-L6',
    status: 'not-started',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
    duration: 35,
    enrolled: 234,
    completedLessons: 0,
    totalLessons: 35,
    enrolledDate: '20 ม.ค. 2568',
    year: 2024,
    department: 'HR',
    tags: ['Leadership', 'Management', 'Coaching', 'Team Building', 'Strategy'],
    courseCode: 'HR-2024-005',
    language: 'ไทย/อังกฤษ',
  },
];

export default function MyCoursesPage() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'in-progress' | 'completed' | 'not-started'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'progress' | 'title'>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // แสดง 12 หลักสูตรต่อหน้า (4x3 grid)

  // Search courses - ค้นหาได้หลายเกณฑ์
  const searchedCourses = allMyCourses.filter(course => {
    const query = searchQuery.toLowerCase();
    return (
      // ชื่อหลักสูตร
      course.title.toLowerCase().includes(query) ||
      // หมวดหมู่
      course.category.toLowerCase().includes(query) ||
      // วิทยากร
      course.instructor.toLowerCase().includes(query) ||
      // ระดับ (L1, L2, etc.)
      course.level.toLowerCase().includes(query) ||
      // ปี (2023, 2024, etc.)
      course.year.toString().includes(query) ||
      // แผนก/ฝ่าย
      course.department.toLowerCase().includes(query) ||
      // รหัสหลักสูตร
      course.courseCode.toLowerCase().includes(query) ||
      // ภาษา
      course.language.toLowerCase().includes(query) ||
      // Tags (คำค้นหาเพิ่มเติม)
      course.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  // Filter courses
  const filteredCourses = filterStatus === 'all'
    ? searchedCourses
    : searchedCourses.filter(course => course.status === filterStatus);

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'progress') {
      return b.progress - a.progress;
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title, 'th');
    }
    // Default: recent (by lastAccessed or completedDate)
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCourses = sortedCourses.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, sortBy, searchQuery]);

  // Stats (based on search results)
  const stats = {
    total: searchedCourses.length,
    inProgress: searchedCourses.filter(c => c.status === 'in-progress').length,
    completed: searchedCourses.filter(c => c.status === 'completed').length,
    notStarted: searchedCourses.filter(c => c.status === 'not-started').length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300">
            กำลังเรียน
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">
            เรียนจบแล้ว
          </span>
        );
      case 'not-started':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            ยังไม่เริ่ม
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout userName="สมชาย ใจดี" userRole="learner">
      {/* Header */}
      <div className="mb-4 pt-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">หลักสูตรของฉัน</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          จัดการและติดตามความคืบหน้าของหลักสูตรที่คุณลงทะเบียนไว้
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">ทั้งหมด</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">กำลังเรียน</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">{stats.inProgress}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">เรียนจบแล้ว</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-500">{stats.completed}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">ยังไม่เริ่ม</p>
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-500">{stats.notStarted}</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="ค้นหา: ชื่อหลักสูตร, รหัส, ปี, แผนก, วิทยากร, ระดับ, ภาษา, Tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="ล้างการค้นหา"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Search Info & Examples */}
        {searchQuery ? (
          <div className="mt-3 flex items-start gap-2">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                พบ {sortedCourses.length} หลักสูตรจากการค้นหา "{searchQuery}"
              </p>
              {sortedCourses.length === 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  ลองค้นหาด้วยคำอื่น เช่น ชื่อหลักสูตร, รหัส, ปี, หรือ Tags
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              💡 ตัวอย่างการค้นหา:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '2024', icon: '📅' },
                { label: 'Safety', icon: '🛡️' },
                { label: 'L2', icon: '📊' },
                { label: 'IT', icon: '💻' },
                { label: 'ไทย', icon: '🇹🇭' },
                { label: 'Six Sigma', icon: '⚙️' },
                { label: 'SAF-2024-001', icon: '🔢' },
              ].map((example) => (
                <button
                  key={example.label}
                  onClick={() => setSearchQuery(example.label)}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#A21D21] hover:text-white transition-colors"
                >
                  {example.icon} {example.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filters and Sort */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Status Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">สถานะ:</span>
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${filterStatus === 'all'
                ? 'bg-[#A21D21] text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              ทั้งหมด ({stats.total})
            </button>
            <button
              onClick={() => setFilterStatus('in-progress')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${filterStatus === 'in-progress'
                ? 'bg-yellow-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              กำลังเรียน ({stats.inProgress})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${filterStatus === 'completed'
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              เรียนจบแล้ว ({stats.completed})
            </button>
            <button
              onClick={() => setFilterStatus('not-started')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${filterStatus === 'not-started'
                ? 'bg-gray-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              ยังไม่เริ่ม ({stats.notStarted})
            </button>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">เรียงตาม:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-[#A21D21]"
            >
              <option value="recent">เข้าถึงล่าสุด</option>
              <option value="progress">ความคืบหน้า</option>
              <option value="title">ชื่อหลักสูตร</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {sortedCourses.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">ไม่พบหลักสูตร</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchQuery ? `ไม่พบหลักสูตรที่ตรงกับ "${searchQuery}"` : 'ไม่มีหลักสูตรในหมวดนี้'}
          </p>
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              ล้างการค้นหา
            </button>
          ) : (
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#A21D21] text-white rounded-lg hover:bg-[#8A1919] transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              ค้นหาหลักสูตร
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {paginatedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all group"
              >
                {/* Thumbnail */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    {getStatusBadge(course.status)}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300">
                      {course.level}
                    </span>
                  </div>
                  {course.status === 'completed' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <svg className="w-16 h-16 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3">
                  {/* Category & Year */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-[#A21D21] dark:text-[#C92828] truncate">
                      {course.category}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                      {course.year}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {course.title}
                  </h3>

                  {/* Instructor Only - ขยายขนาดและทำให้เด่นขึ้น */}
                  <div className="mb-3">
                    <div className="flex items-center text-xs text-gray-700 dark:text-gray-300 font-medium">
                      <svg className="w-4 h-4 mr-1.5 flex-shrink-0 text-[#A21D21]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="truncate">{course.instructor}</span>
                    </div>
                  </div>

                  {/* Progress Section - ทำให้ใหญ่และชัดเจนขึ้น */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-gray-600 dark:text-gray-400">ความคืบหน้า</span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${course.progress === 100
                          ? 'bg-green-500'
                          : course.progress >= 75
                            ? 'bg-emerald-500'
                            : course.progress >= 50
                              ? 'bg-amber-500'
                              : course.progress >= 25
                                ? 'bg-orange-500'
                                : course.progress > 0
                                  ? 'bg-red-500'
                                  : 'bg-gray-400'
                          }`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{course.completedLessons}/{course.totalLessons} บท</span>
                      <span>{course.duration} ชม.</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1.5 px-3 pb-3">
                  <Link
                    href={`/learn/${course.id}`}
                    className="flex-1 px-2 py-1.5 bg-[#A21D21] text-white text-xs font-semibold rounded hover:bg-[#8A1919] transition-colors text-center"
                  >
                    {course.status === 'completed' ? 'ดูหรือเรียนต่อ' : course.status === 'not-started' ? 'เริ่ม' : 'เรียนต่อ'}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page Info */}
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  แสดง {startIndex + 1}-{Math.min(endIndex, sortedCourses.length)} จาก {sortedCourses.length} หลักสูตร
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${currentPage === 1
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage =
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1);

                      // Show ellipsis
                      const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                      const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                      if (showEllipsisBefore || showEllipsisAfter) {
                        return (
                          <span key={page} className="px-2 text-gray-400 dark:text-gray-600">
                            ...
                          </span>
                        );
                      }

                      if (!showPage) return null;

                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`min-w-[40px] px-3 py-2 rounded-lg font-semibold text-sm transition-all ${currentPage === page
                            ? 'bg-[#A21D21] text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${currentPage === totalPages
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Jump to Page */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">ไปหน้า:</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value);
                      if (page >= 1 && page <= totalPages) {
                        setCurrentPage(page);
                      }
                    }}
                    className="w-16 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#A21D21]"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
}
