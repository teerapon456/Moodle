'use client';

import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

// Mock data for progress tracking
const progressData = [
  {
    id: 1,
    studentName: 'สมชาย ใจดี',
    studentId: '64012345',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    overallProgress: 78.5,
    modules: [
      { id: 1, title: 'บทนำและแนวคิด', progress: 100, completed: true, score: 92 },
      { id: 2, title: 'การสร้างทีม', progress: 100, completed: true, score: 88 },
      { id: 3, title: 'การสื่อสารในทีม', progress: 85, completed: false, score: null },
      { id: 4, title: 'การแก้ปัญหาในทีม', progress: 70, completed: false, score: null },
      { id: 5, title: 'การประเมินประสิทธิภาพ', progress: 45, completed: false, score: null }
    ],
    assignments: [
      { id: 1, title: 'งานที่ 1: วิเคราะห์กรณีศึกษา', progress: 100, score: 85, submitted: true },
      { id: 2, title: 'งานที่ 2: สร้างแผนงานทีม', progress: 100, score: 88, submitted: true },
      { id: 3, title: 'งานที่ 3: การนำเสนองาน', progress: 60, score: null, submitted: false }
    ],
    quizzes: [
      { id: 1, title: 'แบบทดสอบที่ 1: แนวคิดพื้นฐาน', progress: 100, score: 92, completed: true },
      { id: 2, title: 'แบบทดสอบที่ 2: การสร้างทีม', progress: 100, score: 88, completed: true },
      { id: 3, title: 'แบบทดสอบที่ 3: การสื่อสาร', progress: 75, score: null, completed: false }
    ],
    lastActivity: '2024-01-22 14:30',
    estimatedCompletion: '2024-02-15',
    status: 'on-track'
  },
  {
    id: 2,
    studentName: 'มานี สุขใจ',
    studentId: '64012346',
    courseTitle: 'การเขียนโปรแกรม Python',
    overallProgress: 92.3,
    modules: [
      { id: 1, title: 'บทนำ Python', progress: 100, completed: true, score: 95 },
      { id: 2, title: 'ตัวแปรและชนิดข้อมูล', progress: 100, completed: true, score: 94 },
      { id: 3, title: 'โครงสร้างควบคุม', progress: 100, completed: true, score: 90 },
      { id: 4, title: 'ฟังก์ชัน', progress: 95, completed: false, score: null },
      { id: 5, title: 'การทำงานกับไฟล์', progress: 85, completed: false, score: null }
    ],
    assignments: [
      { id: 1, title: 'โปรแกรมพื้นฐาน', progress: 100, score: 92, submitted: true },
      { id: 2, title: 'โปรแกรมคำนวณ', progress: 100, score: 94, submitted: true },
      { id: 3, title: 'โปรเจคต์สุดท้าย', progress: 80, score: null, submitted: false }
    ],
    quizzes: [
      { id: 1, title: 'พื้นฐาน Python', progress: 100, score: 95, completed: true },
      { id: 2, title: 'ตัวแปรและชนิดข้อมูล', progress: 100, score: 94, completed: true },
      { id: 3, title: 'โครงสร้างควบคุม', progress: 100, score: 90, completed: true }
    ],
    lastActivity: '2024-01-22 16:45',
    estimatedCompletion: '2024-01-30',
    status: 'ahead'
  },
  {
    id: 3,
    studentName: 'วิชัย รัตน์',
    studentId: '64012347',
    courseTitle: 'การตลาดดิจิทัล',
    overallProgress: 65.8,
    modules: [
      { id: 1, title: 'บทนำการตลาดดิจิทัล', progress: 100, completed: true, score: 96 },
      { id: 2, title: 'SEO และ SEM', progress: 80, completed: false, score: null },
      { id: 3, title: 'โซเชียลมีเดีย', progress: 60, completed: false, score: null },
      { id: 4, title: 'การสร้างเนื้อหา', progress: 50, completed: false, score: null },
      { id: 5, title: 'การวิเคราะห์ข้อมูล', progress: 40, completed: false, score: null }
    ],
    assignments: [
      { id: 1, title: 'วิเคราะห์เว็บไซต์', progress: 100, score: 95, submitted: true },
      { id: 2, title: 'แผน SEO', progress: 70, score: null, submitted: false },
      { id: 3, title: 'แคมเปญโซเชียลมีเดีย', progress: 40, score: null, submitted: false }
    ],
    quizzes: [
      { id: 1, title: 'พื้นฐานการตลาดดิจิทัล', progress: 100, score: 96, completed: true },
      { id: 2, title: 'SEO พื้นฐาน', progress: 75, score: null, completed: false },
      { id: 3, title: 'โซเชียลมีเดีย', progress: 50, score: null, completed: false }
    ],
    lastActivity: '2024-01-21 10:20',
    estimatedCompletion: '2024-02-28',
    status: 'behind'
  }
];

export default function InstructorProgressPage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCourse, setFilterCourse] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedStudent, setSelectedStudent] = useState<typeof progressData[0] | null>(null);

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    let filtered = progressData.filter(student => {
      const matchesSearch = student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
      const matchesCourse = filterCourse === 'all' || student.courseTitle === filterCourse;

      return matchesSearch && matchesStatus && matchesCourse;
    });

    // Sort students
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.studentName.localeCompare(b.studentName);
        case 'progress':
          return b.overallProgress - a.overallProgress;
        case 'lastActivity':
          return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
        case 'completion':
          return new Date(a.estimatedCompletion).getTime() - new Date(b.estimatedCompletion).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterStatus, filterCourse, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = progressData.length;
    const onTrack = progressData.filter(s => s.status === 'on-track').length;
    const ahead = progressData.filter(s => s.status === 'ahead').length;
    const behind = progressData.filter(s => s.status === 'behind').length;
    const avgProgress = progressData.reduce((sum, s) => sum + s.overallProgress, 0) / total;

    return {
      total,
      onTrack,
      ahead,
      behind,
      avgProgress
    };
  }, []);

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-emerald-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'on-track':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'behind':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ahead':
        return '🚀';
      case 'on-track':
        return '✅';
      case 'behind':
        return '⚠️';
      default:
        return '📊';
    }
  };

  const formatLastActivity = (date: string) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffMs = now.getTime() - activityDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      return `${diffDays} วันที่ผ่านมา`;
    } else if (diffHours > 0) {
      return `${diffHours} ชั่วโมงที่ผ่านมา`;
    } else {
      return 'เมื่อกี่นนี้';
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">ความคืบหน้าการเรียน</h1>
              <p className="text-gray-600 dark:text-gray-400">ติดตามความคืบหน้าของนักเรียนในแต่ละหลักสูตร</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">นักเรียนทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="text-2xl">🚀</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.ahead}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">เร็วกว่าแผน</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.onTrack}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ตามแผน</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <span className="text-2xl">⚠️</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.behind}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ช้ากว่าแผน</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6-6" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.avgProgress.toFixed(1)}%</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ความคืบหน้าเฉลี่ย</p>
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
                  placeholder="ค้นหาชื่อนักเรียน, รหัสนักศึกษา, หลักสูตร..."
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
              <option value="ahead">เร็วกว่าแผน</option>
              <option value="on-track">ตามแผน</option>
              <option value="behind">ช้ากว่าแผน</option>
            </select>

            {/* Course Filter */}
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">หลักสูตรทั้งหมด</option>
              <option value="การจัดการทีมอย่างมีประสิทธิภาพ">การจัดการทีมอย่างมีประสิทธิภาพ</option>
              <option value="การเขียนโปรแกรม Python">การเขียนโปรแกรม Python</option>
              <option value="การตลาดดิจิทัล">การตลาดดิจิทัล</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">ชื่อนักเรียน</option>
              <option value="progress">ความคืบหน้า</option>
              <option value="lastActivity">ใช้งที่ใช้งาน</option>
              <option value="completion">วันที่คาดว่าจะเสร็จ</option>
            </select>
          </div>
        </div>

        {/* Students List */}
        {filteredStudents.length > 0 ? (
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className={`${cardClasses} p-6 hover:shadow-lg transition-all duration-300`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">
                        {student.studentName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                        {student.studentName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {student.studentId} • {student.courseTitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(student.status)}`}>
                      {getStatusIcon(student.status)} {student.status === 'ahead' ? 'เร็วกว่าแผน' :
                        student.status === 'on-track' ? 'ตามแผน' :
                          student.status === 'behind' ? 'ช้ากว่าแผน' : student.status}
                    </span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        {student.overallProgress.toFixed(1)}%
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">ความคืบหน้าทั้งหมด</p>
                    </div>
                  </div>
                </div>

                {/* Overall Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">ความคืบหน้าทั้งหมด</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{student.overallProgress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 ${getProgressColor(student.overallProgress)} rounded-full transition-all duration-300`}
                      style={{ width: `${student.overallProgress}%` }}
                    />
                  </div>
                </div>

                {/* Modules Progress */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-3">โมดูลที่เรียน</h4>
                  <div className="space-y-2">
                    {student.modules.map((module) => (
                      <div key={module.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-2 h-2 rounded-full ${module.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{module.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 ${getProgressColor(module.progress)} rounded-full`}
                              style={{ width: `${module.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                            {module.progress}%
                          </span>
                          {module.completed && (
                            <span className="text-sm font-medium text-green-600">
                              {module.score}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assignments Progress */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-3">งานที่ส่ง</h4>
                  <div className="space-y-2">
                    {student.assignments.map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-2 h-2 rounded-full ${assignment.submitted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{assignment.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 ${getProgressColor(assignment.progress)} rounded-full`}
                              style={{ width: `${assignment.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                            {assignment.progress}%
                          </span>
                          {assignment.submitted && (
                            <span className="text-sm font-medium text-green-600">
                              {assignment.score}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quizzes Progress */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-3">แบบทดสอบ</h4>
                  <div className="space-y-2">
                    {student.quizzes.map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-2 h-2 rounded-full ${quiz.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{quiz.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 ${getProgressColor(quiz.progress)} rounded-full`}
                              style={{ width: `${quiz.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                            {quiz.progress}%
                          </span>
                          {quiz.completed && (
                            <span className="text-sm font-medium text-green-600">
                              {quiz.score}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>🕐 ใช้งานล่าสุด: {formatLastActivity(student.lastActivity)}</span>
                    <span>📅 คาดว่าจะเสร็จ: {student.estimatedCompletion}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      ดูรายละเอียด
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      ติดต่อ
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">ไม่พบข้อมูลความคืบหน้า</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือกรองข้อมูล</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterCourse('all');
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
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002 2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4z" />
              </svg>
              พิมพิมพรายงาน
            </span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
