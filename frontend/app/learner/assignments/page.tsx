'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/MainLayout';

// Mock assignments data
const mockAssignments = [
  {
    id: 1,
    courseId: 1,
    courseTitle: 'มาตรฐานความปลอดภัยในโรงงาน',
    courseCode: 'SAF-2024-001',
    title: 'Risk Assessment Report',
    description: 'ทำรายงานการประเมินความเสี่ยงสำหรับกระบวนการผลิตสายการประกอบ โดยใช้เทคนิค HAZOP',
    type: 'report',
    status: 'submitted',
    submittedAt: '2024-01-20 14:30',
    dueDate: '2024-01-25 23:59',
    maxScore: 100,
    score: 85,
    grade: 'B+',
    feedback: 'รายงานดีมาก มีการวิเคราะห์ความเสี่ยงอย่างละเอียด แต่ควรเพิ่มตัวอย่างจริงมากขึ้น',
    instructor: 'ดร.วิไล เก่งมาก',
    attachments: [
      { name: 'risk_assessment_template.pdf', size: '2.3 MB', type: 'template' },
      { name: 'hazop_guide.pdf', size: '1.8 MB', type: 'guide' }
    ],
    estimatedTime: '4 ชั่วโมง',
    difficulty: 'medium',
    weight: 20
  },
  {
    id: 2,
    courseId: 1,
    courseTitle: 'มาตรฐานความปลอดภัยในโรงงาน',
    courseCode: 'SAF-2024-001',
    title: 'Safety Inspection Checklist',
    description: 'สร้าง checklist สำหรับตรวจสอบความปลอดภัยในพื้นที่ผลิต และทำการตรวจสอบจริง',
    type: 'practical',
    status: 'in-progress',
    submittedAt: null,
    dueDate: '2024-01-28 23:59',
    maxScore: 100,
    score: null,
    grade: null,
    feedback: null,
    instructor: 'ดร.วิไล เก่งมาก',
    attachments: [
      { name: 'inspection_template.xlsx', size: '45 KB', type: 'template' },
      { name: 'safety_standards.pdf', size: '3.2 MB', type: 'reference' }
    ],
    estimatedTime: '3 ชั่วโมง',
    difficulty: 'easy',
    weight: 15
  },
  {
    id: 3,
    courseId: 2,
    courseTitle: 'การใช้งาน ERP System',
    courseCode: 'IT-2024-015',
    title: 'ERP System Analysis',
    description: 'วิเคราะห์ปัญหาและเสนอแนะการปรับปรุงการใช้งาน ERP System ในแผนกการผลิต',
    type: 'analysis',
    status: 'not-started',
    submittedAt: null,
    dueDate: '2024-02-05 23:59',
    maxScore: 100,
    score: null,
    grade: null,
    feedback: null,
    instructor: 'อ.วิไล เก่งมาก',
    attachments: [
      { name: 'erp_case_study.pdf', size: '1.5 MB', type: 'case' },
      { name: 'analysis_framework.pdf', size: '890 KB', type: 'guide' }
    ],
    estimatedTime: '6 ชั่วโมง',
    difficulty: 'hard',
    weight: 25
  },
  {
    id: 4,
    courseId: 3,
    courseTitle: 'การควบคุมคุณภาพผลิตภัณฑ์',
    courseCode: 'QC-2024-008',
    title: 'Quality Control Data Analysis',
    description: 'วิเคราะห์ข้อมูลคุณภาพจากกระบวนการผลิตและสร้างรายงานควบคุมคุณภาพ',
    type: 'data-analysis',
    status: 'graded',
    submittedAt: '2024-01-15 16:45',
    dueDate: '2024-01-18 23:59',
    maxScore: 100,
    score: 92,
    grade: 'A',
    feedback: 'การวิเคราะห์ข้อมูลดีเยี่ยม มีการใช้ statistical tools อย่างเหมาะสม และนำเสนอข้อเสนอแนะที่เป็นประโยชน์',
    instructor: 'ดร.สมชาย ใจดี',
    attachments: [
      { name: 'quality_data.xlsx', size: '125 KB', type: 'data' },
      { name: 'spc_guide.pdf', size: '2.1 MB', type: 'guide' }
    ],
    estimatedTime: '5 ชั่วโมง',
    difficulty: 'medium',
    weight: 20
  },
  {
    id: 5,
    courseId: 2,
    courseTitle: 'การใช้งาน ERP System',
    courseCode: 'IT-2024-015',
    title: 'ERP Configuration Exercise',
    description: 'ทำการตั้งค่า ERP System สำหรับสถานการณ์จำลอง',
    type: 'practical',
    status: 'overdue',
    submittedAt: null,
    dueDate: '2024-01-10 23:59',
    maxScore: 100,
    score: null,
    grade: null,
    feedback: null,
    instructor: 'อ.วิไล เก่งมาก',
    attachments: [
      { name: 'erp_simulation.zip', size: '15.2 MB', type: 'simulation' },
      { name: 'config_manual.pdf', size: '4.5 MB', type: 'manual' }
    ],
    estimatedTime: '8 ชั่วโมง',
    difficulty: 'hard',
    weight: 30
  }
];

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'status' | 'difficulty'>('dueDate');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssignments = assignments.filter(assignment => {
    const matchesStatus = selectedStatus === 'all' || assignment.status === selectedStatus;
    const matchesCourse = selectedCourse === 'all' || assignment.courseId === parseInt(selectedCourse);
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesCourse && matchesSearch;
  });

  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'status':
        const statusOrder = { 'overdue': 0, 'not-started': 1, 'in-progress': 2, 'submitted': 3, 'graded': 4 };
        return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
      case 'difficulty':
        const difficultyOrder = { 'easy': 0, 'medium': 1, 'hard': 2 };
        return difficultyOrder[b.difficulty as keyof typeof difficultyOrder] - difficultyOrder[a.difficulty as keyof typeof difficultyOrder];
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'not-started': 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300',
      'in-progress': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      'submitted': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
      'graded': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      'overdue': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
    };
    return colors[status as keyof typeof colors] || colors['not-started'];
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'not-started': 'ยังไม่เริ่ม',
      'in-progress': 'กำลังทำ',
      'submitted': 'ส่งแล้ว',
      'graded': 'ได้คะแนนแล้ว',
      'overdue': 'หมดเวลา'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'easy': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      'medium': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
      'hard': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
    };
    return colors[difficulty as keyof typeof colors] || colors['medium'];
  };

  const getDifficultyLabel = (difficulty: string) => {
    const labels = {
      'easy': 'ง่าย',
      'medium': 'กลาง',
      'hard': 'ยาก'
    };
    return labels[difficulty as keyof typeof labels] || difficulty;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      'report': '📄',
      'practical': '🔧',
      'analysis': '📊',
      'data-analysis': '📈',
      'presentation': '📊',
      'quiz': '📝'
    };
    return icons[type as keyof typeof icons] || '📄';
  };

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status !== 'submitted' && status !== 'graded';
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `หมดเวลา ${Math.abs(diffDays)} วัน`;
    if (diffDays === 0) return 'วันนี้';
    if (diffDays === 1) return 'พรุ่งนี้';
    return `อีก ${diffDays} วัน`;
  };

  const uniqueCourses = Array.from(new Set(assignments.map(a => a.courseId))).map(id => {
    const course = assignments.find(a => a.courseId === id);
    return course ? { id: course.courseId, title: course.courseTitle, code: course.courseCode } : null;
  }).filter(Boolean);

  return (
    <MainLayout userName="ผู้เรียน" userRole="learner">
      <div className="pt-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📝 งานมอบหมาย</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                ติดตามและส่งงานมอบหมายทั้งหมดของคุณ
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
              {assignments.filter(a => isOverdue(a.dueDate, a.status)).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">หมดเวลา</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {assignments.filter(a => a.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">กำลังทำ</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
              {assignments.filter(a => a.status === 'submitted').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">รอการตรวจ</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
              {assignments.filter(a => a.status === 'graded').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">ได้คะแนนแล้ว</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหางานมอบหมาย..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
            />
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Course Filter & Sort */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
              >
                <option value="all">ทุกหลักสูตร</option>
                {uniqueCourses.map(course => (
                  <option key={course?.id} value={course?.id}>
                    {course?.title} ({course?.code})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedStatus === 'all'
                    ? 'bg-[#A21D21] text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                ทั้งหมด
              </button>
              <button
                onClick={() => setSelectedStatus('overdue')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedStatus === 'overdue'
                    ? 'bg-[#A21D21] text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                หมดเวลา
              </button>
              <button
                onClick={() => setSelectedStatus('in-progress')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedStatus === 'in-progress'
                    ? 'bg-[#A21D21] text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                กำลังทำ
              </button>
              <button
                onClick={() => setSelectedStatus('graded')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedStatus === 'graded'
                    ? 'bg-[#A21D21] text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                ได้คะแนนแล้ว
              </button>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
            >
              <option value="dueDate">เรียงตามวันกำหนดส่ง</option>
              <option value="status">เรียงตามสถานะ</option>
              <option value="difficulty">เรียงตามความยาก</option>
            </select>
          </div>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {sortedAssignments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                ไม่พบงานมอบหมาย
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                ลองปรับเปลี่ยนเงื่อนไขการค้นหา
              </p>
            </div>
          ) : (
            sortedAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className={`bg-white dark:bg-gray-800 rounded-xl border transition-all ${isOverdue(assignment.dueDate, assignment.status)
                    ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10'
                    : 'border-gray-200 dark:border-gray-700 hover:shadow-lg'
                  }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Type Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl">
                        {getTypeIcon(assignment.type)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Link
                              href={`/learner/my-courses/${assignment.courseId}`}
                              className="text-sm text-[#A21D21] dark:text-[#C92828] hover:underline"
                            >
                              {assignment.courseTitle} ({assignment.courseCode})
                            </Link>
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(assignment.difficulty)}`}>
                              {getDifficultyLabel(assignment.difficulty)}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {assignment.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {assignment.description}
                          </p>
                        </div>

                        {/* Status Badge */}
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                          {getStatusLabel(assignment.status)}
                        </span>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {getDaysUntilDue(assignment.dueDate)}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          {assignment.estimatedTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          {assignment.weight}% น้ำหนัก
                        </span>
                      </div>

                      {/* Attachments */}
                      {assignment.attachments.length > 0 && (
                        <div className="mb-3">
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">ไฟล์แนบ:</div>
                          <div className="flex flex-wrap gap-2">
                            {assignment.attachments.map((file, index) => (
                              <div key={index} className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300">{file.name}</span>
                                <span className="text-gray-500 dark:text-gray-400">({file.size})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Score & Feedback */}
                      {assignment.status === 'graded' && (
                        <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-green-700 dark:text-green-300">
                              คะแนน: {assignment.score}/{assignment.maxScore} (เกรด {assignment.grade})
                            </span>
                          </div>
                          {assignment.feedback && (
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              <strong>ความคิดเห็น:</strong> {assignment.feedback}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            โดย {assignment.instructor}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        {assignment.status === 'not-started' && (
                          <button className="px-4 py-2 bg-[#A21D21] text-white rounded-lg hover:bg-[#8A1919] transition-colors font-medium">
                            เริ่มทำงาน
                          </button>
                        )}
                        {assignment.status === 'in-progress' && (
                          <>
                            <button className="px-4 py-2 bg-[#A21D21] text-white rounded-lg hover:bg-[#8A1919] transition-colors font-medium">
                              ทำต่อ
                            </button>
                            <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                              บันทึกฉบับร่าง
                            </button>
                          </>
                        )}
                        {assignment.status === 'submitted' && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            ส่งเมื่อ {assignment.submittedAt} • รอการตรวจสอบ
                          </div>
                        )}
                        {assignment.status === 'graded' && (
                          <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            ดูผลการประเมิน
                          </button>
                        )}
                        {assignment.status === 'overdue' && (
                          <div className="text-sm text-red-600 dark:text-red-400">
                            หมดเวลาส่งแล้ว • ติดต่ออาจารย์ผู้สอน
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}
