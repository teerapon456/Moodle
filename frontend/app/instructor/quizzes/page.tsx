'use client';

import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

// Mock data for quizzes
const quizzesData = [
  {
    id: 1,
    title: 'แบบทดสอบที่ 1: แนวคิดพื้นฐาน',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    description: 'ทดสอบความเข้าใจเกี่ยวกับแนวคิดพื้นฐานของการจัดการทีม',
    type: 'quiz',
    status: 'published',
    totalQuestions: 20,
    timeLimit: 60,
    attempts: 45,
    avgScore: 85.2,
    passingScore: 70,
    dueDate: '2024-01-25',
    createdAt: '2024-01-15',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'สิ่งใดคือปัจจัยสำคัญที่สุดในการสร้างทีมที่มีประสิทธิภาพ?',
        options: [
          'ทักษะทางเทคนิค',
          'การสื่อสารที่ดี',
          'ประสบการณ์การทำงาน',
          'เงินเดือนสูง'
        ],
        correctAnswer: 1,
        points: 5
      },
      {
        id: 2,
        type: 'true-false',
        question: 'การมีผู้นำที่เข้มแข็งเป็นสิ่งจำเป็นสำหรับทีมทุกทีม',
        options: ['จริง', 'เท็จ'],
        correctAnswer: 0,
        points: 3
      }
    ]
  },
  {
    id: 2,
    title: 'แบบทดสอบที่ 2: การสร้างทีม',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    description: 'ทดสอบความเข้าใจเกี่ยวกับกระบวนการสร้างและพัฒนาทีม',
    type: 'quiz',
    status: 'draft',
    totalQuestions: 15,
    timeLimit: 45,
    attempts: 0,
    avgScore: 0,
    passingScore: 75,
    dueDate: '2024-02-01',
    createdAt: '2024-01-20',
    questions: []
  },
  {
    id: 3,
    title: 'แบบทดสอบที่ 1: พื้นฐาน Python',
    courseTitle: 'การเขียนโปรแกรม Python',
    description: 'ทดสอบความรู้พื้นฐานเกี่ยวกับภาษา Python',
    type: 'quiz',
    status: 'published',
    totalQuestions: 25,
    timeLimit: 90,
    attempts: 38,
    avgScore: 88.7,
    passingScore: 70,
    dueDate: '2024-01-28',
    createdAt: '2024-01-10',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'คำสั่งใดใช้สำหรับแสดงผลลัพธ์บนหน้าจอใน Python?',
        options: [
          'print()',
          'echo()',
          'console.log()',
          'display()'
        ],
        correctAnswer: 0,
        points: 4
      }
    ]
  },
  {
    id: 4,
    title: 'โปรเจคต์สุดท้าย: Web Application',
    courseTitle: 'การเขียนโปรแกรม Python',
    description: 'สร้างเว็บแอปพลิเคชันง่ายๆ ด้วย Python',
    type: 'assignment',
    status: 'published',
    totalQuestions: 1,
    timeLimit: 0,
    attempts: 12,
    avgScore: 82.3,
    passingScore: 60,
    dueDate: '2024-02-15',
    createdAt: '2024-01-18',
    questions: []
  },
  {
    id: 5,
    title: 'แบบทดสอบที่ 1: พื้นฐานการตลาดดิจิทัล',
    courseTitle: 'การตลาดดิจิทัล',
    description: 'ทดสอบความเข้าใจพื้นฐานการตลาดดิจิทัล',
    type: 'quiz',
    status: 'published',
    totalQuestions: 18,
    timeLimit: 50,
    attempts: 28,
    avgScore: 79.5,
    passingScore: 65,
    dueDate: '2024-01-30',
    createdAt: '2024-01-12',
    questions: []
  }
];

export default function InstructorQuizzesPage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [selectedQuiz, setSelectedQuiz] = useState<typeof quizzesData[0] | null>(null);

  // Filter and sort quizzes
  const filteredQuizzes = useMemo(() => {
    let filtered = quizzesData.filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'all' || quiz.status === filterStatus;
      const matchesCourse = filterCourse === 'all' || quiz.courseTitle === filterCourse;
      const matchesType = filterType === 'all' || quiz.type === filterType;

      return matchesSearch && matchesStatus && matchesCourse && matchesType;
    });

    // Sort quizzes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'due':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'attempts':
          return b.attempts - a.attempts;
        case 'score':
          return b.avgScore - a.avgScore;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterStatus, filterCourse, filterType, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = quizzesData.length;
    const published = quizzesData.filter(q => q.status === 'published').length;
    const draft = quizzesData.filter(q => q.status === 'draft').length;
    const totalAttempts = quizzesData.reduce((sum, q) => sum + q.attempts, 0);
    const avgScore = quizzesData.filter(q => q.avgScore > 0).reduce((sum, q) => sum + q.avgScore, 0) / quizzesData.filter(q => q.avgScore > 0).length || 0;

    return {
      total,
      published,
      draft,
      totalAttempts,
      avgScore
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'archived':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'quiz':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'assignment':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'exam':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">แบบทดสอบและงาน</h1>
              <p className="text-gray-600 dark:text-gray-400">จัดการแบบทดสอบ งาน และการประเมิน</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  สร้างใหม่
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.published}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">เผยแพร่แล้ว</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.draft}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ฉบับร่าง</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.totalAttempts}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ครั้งที่ทำ</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6-6" />
                </svg>
              </div>
              <span className={`text-2xl font-bold ${getScoreColor(stats.avgScore)}`}>
                {stats.avgScore.toFixed(1)}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">คะแนนเฉลี่ย</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="ค้นหาชื่อแบบทดสอบ, คำอธิบาย, หลักสูตร..."
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
              <option value="published">เผยแพร่แล้ว</option>
              <option value="draft">ฉบับร่าง</option>
              <option value="archived">เก็บไว้ในคลัง</option>
            </select>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">ประเภททั้งหมด</option>
              <option value="quiz">แบบทดสอบ</option>
              <option value="assignment">งาน</option>
              <option value="exam">การสอบ</option>
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
              <option value="created">วันที่สร้าง</option>
              <option value="title">ชื่อแบบทดสอบ</option>
              <option value="due">วันกำหนดส่ง</option>
              <option value="attempts">ครั้งที่ทำ</option>
              <option value="score">คะแนนเฉลี่ย</option>
            </select>
          </div>
        </div>

        {/* Quizzes List */}
        {filteredQuizzes.length > 0 ? (
          <div className="space-y-4">
            {filteredQuizzes.map((quiz) => (
              <div key={quiz.id} className={`${cardClasses} p-6 hover:shadow-lg transition-all duration-300`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                        {quiz.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {quiz.courseTitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(quiz.status)}`}>
                      {quiz.status === 'published' ? '📢 เผยแพร่แล้ว' :
                        quiz.status === 'draft' ? '✏️ ฉบับร่าง' :
                          quiz.status === 'archived' ? '📦 เก็บไว้ในคลัง' : quiz.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(quiz.type)}`}>
                      {quiz.type === 'quiz' ? '📝 แบบทดสอบ' :
                        quiz.type === 'assignment' ? '📋 งาน' :
                          quiz.type === 'exam' ? '📚 การสอบ' : quiz.type}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {quiz.description}
                </p>

                {/* Quiz Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      {quiz.totalQuestions}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">คำถาม</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      {quiz.timeLimit > 0 ? `${quiz.timeLimit} นาที` : 'ไม่จำกัด'}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">เวลา</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      {quiz.attempts}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">ครั้งที่ทำ</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(quiz.avgScore)}`}>
                      {quiz.avgScore > 0 ? quiz.avgScore.toFixed(1) : '-'}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">คะแนนเฉลี่ย</p>
                  </div>
                </div>

                {/* Progress Bar */}
                {quiz.avgScore > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">คะแนนเฉลี่ย</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{quiz.avgScore.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 ${getScoreColor(quiz.avgScore).replace('text-', 'bg-')} rounded-full`}
                        style={{ width: `${quiz.avgScore}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>📅 สร้างเมื่อ: {formatDate(quiz.createdAt)}</span>
                    <span>⏰ กำหนดส่ง: {formatDate(quiz.dueDate)}</span>
                    <span>🎯 คะแนนผ่าน: {quiz.passingScore}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedQuiz(quiz)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      ดูรายละเอียด
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      แก้ไข
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      ดูผล
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">ไม่พบแบบทดสอบ</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือกรองข้อมูล</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterCourse('all');
              setFilterType('all');
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
