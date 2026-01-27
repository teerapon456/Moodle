'use client';

import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

// Mock data for grading
const gradingData = [
  {
    id: 1,
    studentName: 'สมชาย ใจดี',
    studentId: '64012345',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    assignmentTitle: 'ส่งงานชิ้นที่ 3: วิเคราะห์กรณีศึกษา',
    submissionDate: '2024-01-20',
    status: 'graded',
    score: 85,
    maxScore: 100,
    grade: 'B+',
    feedback: 'งานดีมีการวิเคราะห์ที่ลึกซึ้ง แต่ควรเพิ่มการอ้างอิงแหล่งข้อมูล',
    timeSpent: '2 ชั่วโมง 30 นาที'
  },
  {
    id: 2,
    studentName: 'มานี สุขใจ',
    studentId: '64012346',
    courseTitle: 'การเขียนโปรแกรม Python',
    assignmentTitle: 'โปรเจคต์สุดท้าย: Web Application',
    submissionDate: '2024-01-19',
    status: 'pending',
    score: null,
    maxScore: 100,
    grade: null,
    feedback: null,
    timeSpent: null
  },
  {
    id: 3,
    studentName: 'วิชัย รัตน์',
    studentId: '64012347',
    courseTitle: 'การตลาดดิจิทัล',
    assignmentTitle: 'แคมเปญจณ์การตลาด: Social Media Strategy',
    submissionDate: '2024-01-21',
    status: 'reviewing',
    score: null,
    maxScore: 100,
    grade: null,
    feedback: null,
    timeSpent: '1 ชั่วโมง 45 นาที'
  },
  {
    id: 4,
    studentName: 'นฤมล แสงสุข',
    studentId: '64012348',
    courseTitle: 'การวิเคราะห์ข้อมูลธุรกิจ',
    assignmentTitle: 'รายงานวิเคราะห์ข้อมูลยอดขาย',
    submissionDate: '2024-01-18',
    status: 'graded',
    score: 92,
    maxScore: 100,
    grade: 'A',
    feedback: 'วิเคราะห์ข้อมูลได้ดีมีความเข้าใจในธุรกิจ การนำเสนอชัดเจน',
    timeSpent: '3 ชั่วโมง'
  },
  {
    id: 5,
    studentName: 'ประเสริฐ มีชัย',
    studentId: '64012349',
    courseTitle: 'สื่อสารเพื่อการนำเสนอ',
    assignmentTitle: 'การนำเสนอ: Product Pitch',
    submissionDate: '2024-01-17',
    status: 'graded',
    score: 78,
    maxScore: 100,
    grade: 'B',
    feedback: 'การนำเสนอดี แต่ควรปรับปรุนเรื่องการจัดการเวลา',
    timeSpent: '1 ชั่วโมง 15 นาที'
  }
];

export default function InstructorGradingPage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCourse, setFilterCourse] = useState('all');
  const [sortBy, setSortBy] = useState('submissionDate');

  // Filter and sort grading data
  const filteredGrading = useMemo(() => {
    let filtered = gradingData.filter(item => {
      const matchesSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.assignmentTitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      const matchesCourse = filterCourse === 'all' || item.courseTitle === filterCourse;

      return matchesSearch && matchesStatus && matchesCourse;
    });

    // Sort data
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'submissionDate':
          return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
        case 'studentName':
          return a.studentName.localeCompare(b.studentName);
        case 'courseTitle':
          return a.courseTitle.localeCompare(b.courseTitle);
        case 'score':
          return (b.score || 0) - (a.score || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterStatus, filterCourse, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = gradingData.length;
    const graded = gradingData.filter(item => item.status === 'graded').length;
    const pending = gradingData.filter(item => item.status === 'pending').length;
    const reviewing = gradingData.filter(item => item.status === 'reviewing').length;
    const avgScore = gradingData
      .filter(item => item.score !== null)
      .reduce((sum, item) => sum + item.score, 0) /
      gradingData.filter(item => item.score !== null).length;

    return {
      total,
      graded,
      pending,
      reviewing,
      avgScore: avgScore || 0
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'graded':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'reviewing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getGradeColor = (grade: string) => {
    if (!grade) return 'bg-gray-100 text-gray-700 border-gray-200';

    switch (grade.charAt(0)) {
      case 'A':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'B':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'C':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'D':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'F':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 65) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const cardClasses = "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow";

  return (
    <MainLayout userName={currentUser.name} userRole="instructor">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">การตรวจงาน</h1>
              <p className="text-gray-600 dark:text-gray-400">ตรวจสอบและให้คะแนนงานของนักเรียน</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  ดาวน์โหลดรายงาน
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
            <p className="text-sm text-gray-600 dark:text-gray-400">งานทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.graded}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ตรวจแล้ว</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.pending}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">รอตรวจ</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.avgScore.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">คะแนนเฉลี่ย</p>
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
                  placeholder="ค้นหาชื่อนักเรียน, รหัสนักศึกษา, หลักสูตร, ชื่องาน..."
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
              <option value="graded">ตรวจแล้ว</option>
              <option value="pending">รอตรวจ</option>
              <option value="reviewing">กำลังตรวจ</option>
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
              <option value="การวิเคราะห์ข้อมูลธุรกิจ">การวิเคราะห์ข้อมูลธุรกิจ</option>
              <option value="สื่อสารเพื่อการนำเสนอ">สื่อสารเพื่อการนำเสนอ</option>
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
                <option value="submissionDate">วันที่ส่ง</option>
                <option value="studentName">ชื่อนักเรียน</option>
                <option value="courseTitle">หลักสูตร</option>
                <option value="score">คะแนน</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              พบ {filteredGrading.length} รายการ
            </div>
          </div>
        </div>

        {/* Grading List */}
        {filteredGrading.length > 0 ? (
          <div className="space-y-4">
            {filteredGrading.map((item) => (
              <div key={item.id} className={`${cardClasses} p-6 hover:shadow-lg transition-all duration-300`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">
                        {item.studentName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                        {item.studentName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.studentId} • {item.courseTitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                      {item.status === 'graded' ? 'ตรวจแล้ว' :
                        item.status === 'pending' ? 'รอตรวจ' :
                          item.status === 'reviewing' ? 'กำลังตรวจ' : item.status}
                    </span>
                    {item.grade && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getGradeColor(item.grade)}`}>
                        เกรด {item.grade}
                      </span>
                    )}
                  </div>
                </div>

                {/* Assignment Details */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-2">
                    {item.assignmentTitle}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>ส่งวันที่: {new Date(item.submissionDate).toLocaleDateString('th-TH')}</span>
                    {item.timeSpent && <span>ใช้เวลา: {item.timeSpent}</span>}
                  </div>
                </div>

                {/* Score and Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    {item.score !== null ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">คะแนน:</span>
                        <span className={`text-2xl font-bold ${getScoreColor(item.score)}`}>
                          {item.score}/{item.maxScore}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">ยังไม่ได้ให้คะแนน</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {item.status === 'pending' && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        เริ่มตรวจ
                      </button>
                    )}
                    {item.status === 'reviewing' && (
                      <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium">
                        ดำเนินการต่อ
                      </button>
                    )}
                    {item.status === 'graded' && (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                        ดูรายละเอียด
                      </button>
                    )}
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      ดาวน์โหลดงาน
                    </button>
                  </div>
                </div>

                {/* Feedback */}
                {item.feedback && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h5 className="font-medium text-gray-900 dark:text-gray-50 mb-2">ความคิดเห็น:</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.feedback}</p>
                  </div>
                )}
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
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">ไม่พบรายการที่ค้นหา</h3>
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
      </div>
    </MainLayout>
  );
}
