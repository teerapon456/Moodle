'use client';

import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

// Mock data for student statistics
const studentStatsData = [
  {
    id: 1,
    studentId: 'STU001',
    name: 'สมชาย ใจดี',
    email: 'somchai@example.com',
    course: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    status: 'active',
    enrollmentDate: '2024-01-15',
    lastLogin: '2024-01-24',
    progress: 85,
    avgScore: 88.5,
    assignmentsCompleted: 12,
    assignmentsTotal: 15,
    attendanceRate: 92,
    timeSpent: 45.5,
    badges: ['🏆 ดีเด่น', '⭐ สมาชิกคล่องแคล่ว', '🎯 ทำงานเกินพิกัด'],
    skills: ['การสื่อสาร', 'การจัดการ', 'การวางแผน'],
    riskLevel: 'low',
    nextMilestone: 'การสอบปลายภาค',
    milestoneProgress: 75
  },
  {
    id: 2,
    studentId: 'STU002',
    name: 'มานี สุขใจ',
    email: 'manee@example.com',
    course: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    status: 'active',
    enrollmentDate: '2024-01-16',
    lastLogin: '2024-01-23',
    progress: 72,
    avgScore: 82.3,
    assignmentsCompleted: 10,
    assignmentsTotal: 15,
    attendanceRate: 88,
    timeSpent: 38.2,
    badges: ['⭐ สมาชิกคล่องแคล่ว'],
    skills: ['การสื่อสาร', 'การทำงานทีม'],
    riskLevel: 'medium',
    nextMilestone: 'ส่งโปรเจคต์',
    milestoneProgress: 60
  },
  {
    id: 3,
    studentId: 'STU003',
    name: 'วิชัย รัตน์',
    email: 'vichai@example.com',
    course: 'การเขียนโปรแกรม Python',
    status: 'at-risk',
    enrollmentDate: '2024-01-10',
    lastLogin: '2024-01-20',
    progress: 45,
    avgScore: 68.7,
    assignmentsCompleted: 6,
    assignmentsTotal: 12,
    attendanceRate: 65,
    timeSpent: 25.8,
    badges: [],
    skills: ['การเขียนโปรแกรมพื้นฐาน'],
    riskLevel: 'high',
    nextMilestone: 'การสอบกลางภาค',
    milestoneProgress: 30
  },
  {
    id: 4,
    studentId: 'STU004',
    name: 'สมศรี เจริญ',
    email: 'somsri@example.com',
    course: 'การตลาดดิจิทัล',
    status: 'inactive',
    enrollmentDate: '2024-01-18',
    lastLogin: '2024-01-18',
    progress: 25,
    avgScore: 75.0,
    assignmentsCompleted: 3,
    assignmentsTotal: 10,
    attendanceRate: 40,
    timeSpent: 12.5,
    badges: [],
    skills: ['การตลาดพื้นฐาน'],
    riskLevel: 'high',
    nextMilestone: 'เริ่มโมดูลที่ 2',
    milestoneProgress: 15
  },
  {
    id: 5,
    studentId: 'STU005',
    name: 'ประเสริฐ มีชัย',
    email: 'prasert@example.com',
    course: 'การเขียนโปรแกรม Python',
    status: 'active',
    enrollmentDate: '2024-01-12',
    lastLogin: '2024-01-24',
    progress: 95,
    avgScore: 94.2,
    assignmentsCompleted: 11,
    assignmentsTotal: 12,
    attendanceRate: 98,
    timeSpent: 52.3,
    badges: ['🏆 ดีเด่น', '⭐ สมาชิกคล่องแคล่ว', '🎯 ทำงานเกินพิกัด', '📚 อ่านหนังสือเก่ง'],
    skills: ['การเขียนโปรแกรมขั้นสูง', 'การแก้ไขปัญหา', 'การออกแบบระบบ'],
    riskLevel: 'low',
    nextMilestone: 'จบหลักสูตร',
    milestoneProgress: 95
  }
];

export default function InstructorStudentStatsPage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedStudent, setSelectedStudent] = useState<typeof studentStatsData[0] | null>(null);

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    let filtered = studentStatsData.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
      const matchesCourse = filterCourse === 'all' || student.course === filterCourse;
      const matchesRisk = filterRisk === 'all' || student.riskLevel === filterRisk;

      return matchesSearch && matchesStatus && matchesCourse && matchesRisk;
    });

    // Sort students
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'progress':
          return b.progress - a.progress;
        case 'score':
          return b.avgScore - a.avgScore;
        case 'attendance':
          return b.attendanceRate - a.attendanceRate;
        case 'lastLogin':
          return new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterStatus, filterCourse, filterRisk, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = studentStatsData.length;
    const active = studentStatsData.filter(s => s.status === 'active').length;
    const inactive = studentStatsData.filter(s => s.status === 'inactive').length;
    const atRisk = studentStatsData.filter(s => s.status === 'at-risk').length;
    const avgProgress = studentStatsData.reduce((sum, s) => sum + s.progress, 0) / total;
    const avgScore = studentStatsData.reduce((sum, s) => sum + s.avgScore, 0) / total;
    const avgAttendance = studentStatsData.reduce((sum, s) => sum + s.attendanceRate, 0) / total;
    const highRisk = studentStatsData.filter(s => s.riskLevel === 'high').length;
    const lowRisk = studentStatsData.filter(s => s.riskLevel === 'low').length;

    return {
      total,
      active,
      inactive,
      atRisk,
      avgProgress,
      avgScore,
      avgAttendance,
      highRisk,
      lowRisk
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'at-risk':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '🟢';
      case 'inactive':
        return '⚪';
      case 'at-risk':
        return '🔴';
      default:
        return '📋';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'high':
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

  const getLastLoginText = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'วันนี้';
    if (diffDays === 1) return 'เมื่อวาน';
    if (diffDays <= 7) return `${diffDays} วันที่แล้ว`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} สัปดาห์ที่แล้ว`;
    return formatDate(dateString);
  };

  const cardClasses = "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow";

  return (
    <MainLayout userName={currentUser.name} userRole="instructor">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">สถิตินักเรียน</h1>
              <p className="text-gray-600 dark:text-gray-400">ติดตามและวิเคราะห์ข้อมูลการเรียนของนักเรียน</p>
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
            <p className="text-sm text-gray-600 dark:text-gray-400">นักเรียนทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="text-2xl">🟢</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.active}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">กำลังเรียน</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <span className="text-2xl">🔴</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.atRisk}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">เสี่ยง</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="ค้นหาชื่อ, รหัส, อีเมล, หลักสูตร..."
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
              <option value="active">กำลังเรียน</option>
              <option value="inactive">ไม่ทำงาน</option>
              <option value="at-risk">เสี่ยง</option>
            </select>

            {/* Risk Filter */}
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">ระดับความเสี่ยงทั้งหมด</option>
              <option value="low">ต่ำ</option>
              <option value="medium">ปานกลาง</option>
              <option value="high">สูง</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">ชื่อ</option>
              <option value="progress">ความคืบหน้า</option>
              <option value="score">คะแนนเฉลี่ย</option>
              <option value="attendance">การเข้าเรียน</option>
              <option value="lastLogin">เข้าใช้งานล่าสุด</option>
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
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                        {student.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {student.studentId} • {student.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(student.status)}`}>
                      {getStatusIcon(student.status)} {student.status === 'active' ? 'กำลังเรียน' :
                        student.status === 'inactive' ? 'ไม่ทำงาน' :
                          student.status === 'at-risk' ? 'เสี่ยง' : student.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(student.riskLevel)}`}>
                      {student.riskLevel === 'low' ? '🟢 ต่ำ' :
                        student.riskLevel === 'medium' ? '🟡 ปานกลาง' :
                          student.riskLevel === 'high' ? '🔴 สูง' : student.riskLevel}
                    </span>
                  </div>
                </div>

                {/* Course Info */}
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>หลักสูตร:</strong> {student.course}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ลงทะเบียนเมื่อ {formatDate(student.enrollmentDate)} • เข้าใช้งานล่าสุด {getLastLoginText(student.lastLogin)}
                  </p>
                </div>

                {/* Performance Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      {student.progress}%
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">ความคืบหน้า</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(student.avgScore)}`}>
                      {student.avgScore.toFixed(1)}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">คะแนนเฉลี่ย</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {student.attendanceRate}%
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">การเข้าเรียน</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {student.timeSpent}h
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">เวลาเรียน</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">ความคืบหน้า</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{student.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(student.progress)}`}
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                </div>

                {/* Assignments Progress */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-2">งานที่ส่ง</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {student.assignmentsCompleted}/{student.assignmentsTotal} งาน
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {Math.round((student.assignmentsCompleted / student.assignmentsTotal) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${(student.assignmentsCompleted / student.assignmentsTotal) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Badges */}
                {student.badges.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-2">เหรียญรางวัล</h4>
                    <div className="flex flex-wrap gap-2">
                      {student.badges.map((badge, index) => (
                        <span key={index} className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 rounded-full text-xs text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {student.skills.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-2">ทักษะที่พัฒนา</h4>
                    <div className="flex flex-wrap gap-2">
                      {student.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 rounded-full text-xs text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Milestone */}
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-1">เป้าหมายถัดไป</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    {student.nextMilestone} - {student.milestoneProgress}% เสร็จสิ้น
                  </p>
                  <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2 mt-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${student.milestoneProgress}%` }}
                    />
                  </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>📅 ลงทะเบียน: {formatDate(student.enrollmentDate)}</span>
                    <span>👤 เข้าใช้: {getLastLoginText(student.lastLogin)}</span>
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
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">ไม่พบข้อมูลนักเรียน</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือกรองข้อมูล</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterCourse('all');
              setFilterRisk('all');
            }}>
              ล้างตัวกรอง
            </Button>
          </div>
        )}

        {/* Quick Actions */}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              วิเคราะห์ข้อมูล
            </span>
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              ส่งอีเมลแจ้งเตือน
            </span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
