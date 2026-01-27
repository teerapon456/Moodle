'use client';

import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

// Mock data for student groups
const studentGroupsData = [
  {
    id: 1,
    name: 'กลุ่ม A: ทีมบริหาร',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    description: 'กลุ่มเรียนรู้การบริหารทีมสำหรับผู้จัดการระดับกลาง',
    status: 'active',
    members: 8,
    maxMembers: 10,
    leader: 'สมชาย ใจดี',
    createdAt: '2024-01-15',
    lastActivity: '2024-01-22',
    progress: 75,
    avgScore: 85.2,
    assignments: [
      { title: 'กรณีศึกษาบริษัท ABC', dueDate: '2024-01-25', status: 'pending' },
      { title: 'สรุปบทเรียนสัปดาห์ที่ 3', dueDate: '2024-01-20', status: 'completed' }
    ],
    meetings: [
      { date: '2024-01-22', time: '14:00', topic: 'วางแผนโครงการ', attendance: 8 },
      { date: '2024-01-15', time: '10:00', topic: 'ทำความรู้จัก', attendance: 9 }
    ]
  },
  {
    id: 2,
    name: 'กลุ่ม B: ทีมพัฒนา',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    description: 'กลุ่มเรียนรู้การพัฒนาทีมและการสร้างสรรค์',
    status: 'active',
    members: 7,
    maxMembers: 10,
    leader: 'มานี สุขใจ',
    createdAt: '2024-01-16',
    lastActivity: '2024-01-21',
    progress: 68,
    avgScore: 82.7,
    assignments: [
      { title: 'โครงการพัฒนาทีม', dueDate: '2024-01-28', status: 'in-progress' },
      { title: 'บันทึกการเรียนรู้', dueDate: '2024-01-18', status: 'completed' }
    ],
    meetings: [
      { date: '2024-01-21', time: '13:00', topic: 'การสร้างสรรค์', attendance: 7 },
      { date: '2024-01-16', time: '09:00', topic: 'แนะนำตัว', attendance: 8 }
    ]
  },
  {
    id: 3,
    name: 'กลุ่ม C: ทีมวิเคราะห์',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    description: 'กลุ่มเรียนรู้การวิเคราะห์ปัญหาและแก้ไข',
    status: 'completed',
    members: 9,
    maxMembers: 10,
    leader: 'วิชัย รัตน์',
    createdAt: '2024-01-10',
    lastActivity: '2024-01-20',
    progress: 100,
    avgScore: 91.3,
    assignments: [
      { title: 'รายงานวิเคราะห์', dueDate: '2024-01-15', status: 'completed' },
      { title: 'สรุปผลการดำเนินงาน', dueDate: '2024-01-20', status: 'completed' }
    ],
    meetings: [
      { date: '2024-01-20', time: '15:00', topic: 'สรุปผลงาน', attendance: 9 },
      { date: '2024-01-10', time: '11:00', topic: 'เปิดโครงการ', attendance: 10 }
    ]
  },
  {
    id: 4,
    name: 'กลุ่ม D: ทีมสื่อสาร',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    description: 'กลุ่มเรียนรู้การสื่อสารภายในทีม',
    status: 'in-progress',
    members: 6,
    maxMembers: 10,
    leader: 'สมศรี เจริญ',
    createdAt: '2024-01-18',
    lastActivity: '2024-01-19',
    progress: 45,
    avgScore: 78.9,
    assignments: [
      { title: 'การฝึกสื่อสาร', dueDate: '2024-01-30', status: 'in-progress' }
    ],
    meetings: [
      { date: '2024-01-19', time: '16:00', topic: 'การนำเสนอ', attendance: 6 }
    ]
  }
];

export default function InstructorStudentGroupsPage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCourse, setFilterCourse] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [selectedGroup, setSelectedGroup] = useState<typeof studentGroupsData[0] | null>(null);

  // Filter and sort groups
  const filteredGroups = useMemo(() => {
    let filtered = studentGroupsData.filter(group => {
      const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'all' || group.status === filterStatus;
      const matchesCourse = filterCourse === 'all' || group.courseTitle === filterCourse;

      return matchesSearch && matchesStatus && matchesCourse;
    });

    // Sort groups
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'progress':
          return b.progress - a.progress;
        case 'members':
          return b.members - a.members;
        case 'score':
          return b.avgScore - a.avgScore;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterStatus, filterCourse, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = studentGroupsData.length;
    const active = studentGroupsData.filter(g => g.status === 'active').length;
    const completed = studentGroupsData.filter(g => g.status === 'completed').length;
    const inProgress = studentGroupsData.filter(g => g.status === 'in-progress').length;
    const totalMembers = studentGroupsData.reduce((sum, g) => sum + g.members, 0);
    const avgProgress = studentGroupsData.reduce((sum, g) => sum + g.progress, 0) / total;
    const avgScore = studentGroupsData.reduce((sum, g) => sum + g.avgScore, 0) / total;

    return {
      total,
      active,
      completed,
      inProgress,
      totalMembers,
      avgProgress,
      avgScore
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '🟢';
      case 'completed':
        return '✅';
      case 'in-progress':
        return '🔄';
      case 'inactive':
        return '⚪';
      default:
        return '📋';
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

  const cardClasses = "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow";

  return (
    <MainLayout userName={currentUser.name} userRole="instructor">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">กลุ่มนักเรียน</h1>
              <p className="text-gray-600 dark:text-gray-400">จัดการและติดตามกลุ่มนักเรียนในหลักสูตรต่างๆ</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  สร้างกลุ่มใหม่
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">กลุ่มทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="text-2xl">🟢</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.active}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">กำลังทำงาน</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.totalMembers}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">สมาชิกทั้งหมด</p>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="ค้นหาชื่อกลุ่ม, คำอธิบาย, หัวหน้ากลุ่ม..."
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
              <option value="active">กำลังทำงาน</option>
              <option value="completed">เสร็จสิ้น</option>
              <option value="in-progress">กำลังดำเนินการ</option>
              <option value="inactive">ไม่ทำงาน</option>
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
              <option value="name">ชื่อกลุ่ม</option>
              <option value="progress">ความคืบหน้า</option>
              <option value="members">จำนวนสมาชิก</option>
              <option value="score">คะแนนเฉลี่ย</option>
            </select>
          </div>
        </div>

        {/* Groups List */}
        {filteredGroups.length > 0 ? (
          <div className="space-y-4">
            {filteredGroups.map((group) => (
              <div key={group.id} className={`${cardClasses} p-6 hover:shadow-lg transition-all duration-300`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                        {group.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {group.courseTitle} • หัวหน้า: {group.leader}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(group.status)}`}>
                      {getStatusIcon(group.status)} {group.status === 'active' ? 'กำลังทำงาน' :
                        group.status === 'completed' ? 'เสร็จสิ้น' :
                          group.status === 'in-progress' ? 'กำลังดำเนินการ' :
                            group.status === 'inactive' ? 'ไม่ทำงาน' : group.status}
                    </span>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-gray-50">
                        {group.members}/{group.maxMembers}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">สมาชิก</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {group.description}
                </p>

                {/* Group Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      📅 {formatDate(group.createdAt)}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">สร้างเมื่อ</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      🔄 {formatDate(group.lastActivity)}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">ใช้งานล่าสุด</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(group.avgScore)}`}>
                      {group.avgScore.toFixed(1)}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">คะแนนเฉลี่ย</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      👥 {group.members}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">สมาชิกปัจจุบัน</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">ความคืบหน้า</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{group.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(group.progress)}`}
                      style={{ width: `${group.progress}%` }}
                    />
                  </div>
                </div>

                {/* Recent Assignments */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-2">งานล่าสุด</h4>
                  <div className="space-y-1">
                    {group.assignments.slice(0, 2).map((assignment, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{assignment.title}</span>
                        <span className={`px-2 py-1 rounded text-xs ${assignment.status === 'completed' ? 'bg-green-100 text-green-700' :
                            assignment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                          }`}>
                          {assignment.status === 'completed' ? 'เสร็จ' :
                            assignment.status === 'in-progress' ? 'กำลังทำ' : 'รอดำเนินการ'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Meetings */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-2">การประชุมล่าสุด</h4>
                  <div className="space-y-1">
                    {group.meetings.slice(0, 2).map((meeting, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          {meeting.topic} • {formatDate(meeting.date)} {meeting.time}
                        </span>
                        <span className="text-gray-500">{meeting.attendance}/{group.maxMembers} คน</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>👤 หัวหน้า: {group.leader}</span>
                    <span>📊 ความคืบหน้า: {group.progress}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedGroup(group)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      ดูรายละเอียด
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      จัดการสมาชิก
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">ไม่พบกลุ่มนักเรียน</h3>
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

        {/* Quick Actions */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              สร้างกลุ่มใหม่
            </span>
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              จัดการสมาชิก
            </span>
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              ดูรายงานกลุ่ม
            </span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
