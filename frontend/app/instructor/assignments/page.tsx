'use client';

import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

// Mock data for assignments
const assignmentsData = [
  {
    id: 1,
    title: 'งานที่ 1: วิเคราะห์กรณีศึกษาการจัดการทีม',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    description: 'วิเคราะห์กรณีศึกษาบริษัทที่มีปัญหาการจัดการทีมและเสนอแนวทางแก้ไข',
    type: 'assignment',
    status: 'published',
    dueDate: '2024-01-25',
    maxScore: 100,
    submissions: 45,
    graded: 38,
    avgScore: 85.2,
    priority: 'high',
    createdAt: '2024-01-15',
    instructions: '1. อ่านกรณีศึกษาที่แนบมา\n2. วิเคราะห์ปัญหาและสาเหตุ\n3. เสนอแนวทางแก้ไข 3 วิธี\n4. เขียนรายงานสรุป 2-3 หน้า',
    attachments: ['case_study.pdf', 'guidelines.docx']
  },
  {
    id: 2,
    title: 'แบบทดสอบที่ 2: การสร้างทีม',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    description: 'ทดสอบความเข้าใจเกี่ยวกับหลักการสร้างทีมที่มีประสิทธิภาพ',
    type: 'quiz',
    status: 'published',
    dueDate: '2024-01-28',
    maxScore: 50,
    submissions: 42,
    graded: 42,
    avgScore: 88.7,
    priority: 'medium',
    createdAt: '2024-01-18',
    instructions: 'ทำแบบทดสอบออนไลน์ 20 ข้อ คะแนนข้อละ 2.5 คะแนน',
    attachments: []
  },
  {
    id: 3,
    title: 'โปรเจคต์สุดท้าย: สร้างเว็บแอปพลิเคชัน',
    courseTitle: 'การเขียนโปรแกรม Python',
    description: 'สร้างเว็บแอปพลิเคชันง่ายๆ ด้วย Python และ Flask',
    type: 'project',
    status: 'published',
    dueDate: '2024-02-15',
    maxScore: 200,
    submissions: 28,
    graded: 15,
    avgScore: 82.3,
    priority: 'high',
    createdAt: '2024-01-10',
    instructions: 'สร้างเว็บแอปพลิเคชันตามข้อกำหนดที่กำหนด',
    attachments: ['project_requirements.pdf', 'starter_code.zip']
  },
  {
    id: 4,
    title: 'งานที่ 3: การวางแผนการตลาดดิจิทัล',
    courseTitle: 'การตลาดดิจิทัล',
    description: 'วางแผนการตลาดดิจิทัลสำหรับผลิตภัณฑ์ใหม่',
    type: 'assignment',
    status: 'draft',
    dueDate: '2024-02-01',
    maxScore: 100,
    submissions: 0,
    graded: 0,
    avgScore: 0,
    priority: 'medium',
    createdAt: '2024-01-22',
    instructions: 'สร้างแผนการตลาดดิจิทัลครบวงจร',
    attachments: []
  },
  {
    id: 5,
    title: 'การสอบกลางภาค',
    courseTitle: 'การเขียนโปรแกรม Python',
    description: 'สอบกลางภาคครอบประกอบด้วยการเขียนโปรแกรม',
    type: 'exam',
    status: 'scheduled',
    dueDate: '2024-02-10',
    maxScore: 150,
    submissions: 0,
    graded: 0,
    avgScore: 0,
    priority: 'high',
    createdAt: '2024-01-20',
    instructions: 'สอบในห้องสอบ 2 ชั่วโมง',
    attachments: ['exam_outline.pdf']
  }
];

export default function InstructorAssignmentsPage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [selectedAssignment, setSelectedAssignment] = useState<typeof assignmentsData[0] | null>(null);

  // Filter and sort assignments
  const filteredAssignments = useMemo(() => {
    let filtered = assignmentsData.filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;
      const matchesType = filterType === 'all' || assignment.type === filterType;
      const matchesPriority = filterPriority === 'all' || assignment.priority === filterPriority;

      return matchesSearch && matchesStatus && matchesType && matchesPriority;
    });

    // Sort assignments
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'submissions':
          return b.submissions - a.submissions;
        case 'avgScore':
          return b.avgScore - a.avgScore;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterStatus, filterType, filterPriority, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = assignmentsData.length;
    const published = assignmentsData.filter(a => a.status === 'published').length;
    const draft = assignmentsData.filter(a => a.status === 'draft').length;
    const scheduled = assignmentsData.filter(a => a.status === 'scheduled').length;
    const totalSubmissions = assignmentsData.reduce((sum, a) => sum + a.submissions, 0);
    const totalGraded = assignmentsData.reduce((sum, a) => sum + a.graded, 0);
    const avgScore = assignmentsData.filter(a => a.avgScore > 0).reduce((sum, a) => sum + a.avgScore, 0) / assignmentsData.filter(a => a.avgScore > 0).length || 0;

    return {
      total,
      published,
      draft,
      scheduled,
      totalSubmissions,
      totalGraded,
      avgScore
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'closed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'quiz':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'exam':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'project':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">งานและแบบทดสอบ</h1>
              <p className="text-gray-600 dark:text-gray-400">จัดการงาน แบบทดสอบ และการประเมิน</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
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
                <span className="text-2xl">📢</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.published}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">เผยแพร่แล้ว</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <span className="text-2xl">📋</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.totalSubmissions}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">การส่ง</p>
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
                  placeholder="ค้นหาชื่องาน, คำอธิบาย, หลักสูตร..."
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
              <option value="scheduled">กำหนดการ</option>
              <option value="closed">ปิดแล้ว</option>
            </select>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">ประเภททั้งหมด</option>
              <option value="assignment">งาน</option>
              <option value="quiz">แบบทดสอบ</option>
              <option value="exam">การสอบ</option>
              <option value="project">โปรเจคต์</option>
            </select>

            {/* Priority Filter */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">ความสำคัญทั้งหมด</option>
              <option value="high">สูง</option>
              <option value="medium">กลาง</option>
              <option value="low">ต่ำ</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="created">วันที่สร้าง</option>
              <option value="title">ชื่องาน</option>
              <option value="dueDate">วันกำหนดส่ง</option>
              <option value="submissions">การส่ง</option>
              <option value="avgScore">คะแนนเฉลี่ย</option>
            </select>
          </div>
        </div>

        {/* Assignments List */}
        {filteredAssignments.length > 0 ? (
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <div key={assignment.id} className={`${cardClasses} p-6 hover:shadow-lg transition-all duration-300`}>
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
                        {assignment.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {assignment.courseTitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                      {assignment.status === 'published' ? '📢 เผยแพร่แล้ว' :
                        assignment.status === 'draft' ? '✏️ ฉบับร่าง' :
                          assignment.status === 'scheduled' ? '📅 กำหนดการ' :
                            assignment.status === 'closed' ? '🔒 ปิดแล้ว' : assignment.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(assignment.type)}`}>
                      {assignment.type === 'assignment' ? '📋 งาน' :
                        assignment.type === 'quiz' ? '📝 แบบทดสอบ' :
                          assignment.type === 'exam' ? '📚 การสอบ' :
                            assignment.type === 'project' ? '🚀 โปรเจคต์' : assignment.type}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {assignment.description}
                </p>

                {/* Assignment Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      {assignment.submissions}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">การส่ง</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {assignment.graded}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">ที่เกรดแล้ว</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(assignment.avgScore)}`}>
                      {assignment.avgScore > 0 ? assignment.avgScore.toFixed(1) : '-'}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">คะแนนเฉลี่ย</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      {assignment.maxScore}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">คะแนนเต็ม</p>
                  </div>
                </div>

                {/* Progress Bar */}
                {assignment.submissions > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">การให้เกรด</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {assignment.graded}/{assignment.submissions} ({Math.round((assignment.graded / assignment.submissions) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(assignment.graded / assignment.submissions) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>📅 กำหนดส่ง: {formatDate(assignment.dueDate)}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(assignment.priority)}`}>
                      {assignment.priority === 'high' ? '🔴 สูง' :
                        assignment.priority === 'medium' ? '🟡 กลาง' :
                          assignment.priority === 'low' ? '🟢 ต่ำ' : assignment.priority}
                    </span>
                    {assignment.attachments.length > 0 && (
                      <span>📎 ไฟล์แนบ: {assignment.attachments.length}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedAssignment(assignment)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      ดูรายละเอียด
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      แก้ไข
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      ให้เกรด
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
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">ไม่พบงานหรือแบบทดสอบ</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือกรองข้อมูล</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterType('all');
              setFilterPriority('all');
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
