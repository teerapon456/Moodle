'use client';

import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

// Mock data for schedule
const scheduleData = [
  {
    id: 1,
    title: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    type: 'lecture',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    instructor: 'ผู้สอน',
    date: '2024-01-25',
    startTime: '09:00',
    endTime: '12:00',
    room: 'ห้อง 101',
    building: 'อาคาร A',
    students: 45,
    maxStudents: 50,
    status: 'scheduled',
    description: 'บทนำสู่การจัดการทีมที่มีประสิทธิภาพ',
    materials: ['สไลด์นำเสนอ', 'กรณีศึกษา', 'แบบฝึกหัด'],
    recurring: {
      enabled: true,
      frequency: 'weekly',
      endDate: '2024-03-15'
    }
  },
  {
    id: 2,
    title: 'เวิร์กช็อป: การสร้างทีม',
    type: 'workshop',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    instructor: 'ผู้สอน',
    date: '2024-01-26',
    startTime: '13:00',
    endTime: '16:00',
    room: 'ห้อง 201',
    building: 'อาคาร B',
    students: 25,
    maxStudents: 30,
    status: 'scheduled',
    description: 'กิจกรรมสร้างทีมแบบจับกลุ่ม',
    materials: ['แบบฝึกหัด', 'อุปกรณ์ทีมบิลดิ้ง'],
    recurring: {
      enabled: false,
      frequency: 'once',
      endDate: null
    }
  },
  {
    id: 3,
    title: 'ปฏิบัติการ: การเขียนโปรแกรม Python',
    type: 'lab',
    courseTitle: 'การเขียนโปรแกรม Python',
    instructor: 'ผู้สอน',
    date: '2024-01-27',
    startTime: '10:00',
    endTime: '12:00',
    room: 'ห้องคอมพิวเตอร์ 301',
    building: 'อาคาร C',
    students: 20,
    maxStudents: 20,
    status: 'scheduled',
    description: 'ปฏิบัติการเขียนโปรแกรม Python ขั้นพื้นฐาน',
    materials: ['คอมพิวเตอร์', 'ซอฟต์แวร์ Python', 'แบบฝึกหัด'],
    recurring: {
      enabled: true,
      frequency: 'weekly',
      endDate: '2024-04-15'
    }
  },
  {
    id: 4,
    title: 'ออนไลน์: การตลาดดิจิทัล',
    type: 'online',
    courseTitle: 'การตลาดดิจิทัล',
    instructor: 'ผู้สอน',
    date: '2024-01-28',
    startTime: '14:00',
    endTime: '16:00',
    room: 'Zoom Meeting',
    building: 'ออนไลน์',
    students: 60,
    maxStudents: 100,
    status: 'scheduled',
    description: 'การสอนออนไลน์เกี่ยวกับการตลาดดิจิทัล',
    materials: ['ลิงก์ Zoom', 'สไลด์นำเสนอ', 'แบบฝึกหัด'],
    recurring: {
      enabled: true,
      frequency: 'weekly',
      endDate: '2024-03-20'
    }
  },
  {
    id: 5,
    title: 'สอบกลางภาค',
    type: 'exam',
    courseTitle: 'การเขียนโปรแกรม Python',
    instructor: 'ผู้สอน',
    date: '2024-01-29',
    startTime: '09:00',
    endTime: '11:00',
    room: 'ห้องสอบ 401',
    building: 'อาคาร D',
    students: 38,
    maxStudents: 40,
    status: 'scheduled',
    description: 'สอบกลางภาควิชาการเขียนโปรแกรม Python',
    materials: ['ข้อสอบ', 'กระดาษคำตอบ'],
    recurring: {
      enabled: false,
      frequency: 'once',
      endDate: null
    }
  }
];

export default function InstructorSchedulePage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedSession, setSelectedSession] = useState<typeof scheduleData[0] | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  // Filter and sort schedule
  const filteredSchedule = useMemo(() => {
    let filtered = scheduleData.filter(session => {
      const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.room.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filterType === 'all' || session.type === filterType;
      const matchesStatus = filterStatus === 'all' || session.status === filterStatus;
      const matchesDate = filterDate === 'all' ||
        (filterDate === 'today' && session.date === '2024-01-25') ||
        (filterDate === 'week' && new Date(session.date) <= new Date('2024-01-31')) ||
        (filterDate === 'month' && new Date(session.date) <= new Date('2024-01-31'));

      return matchesSearch && matchesType && matchesStatus && matchesDate;
    });

    // Sort schedule
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date + ' ' + a.startTime).getTime() - new Date(b.date + ' ' + b.startTime).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'students':
          return b.students - a.students;
        case 'duration':
          return (new Date(a.date + ' ' + a.endTime).getTime() - new Date(a.date + ' ' + a.startTime).getTime()) -
            (new Date(b.date + ' ' + b.endTime).getTime() - new Date(b.date + ' ' + b.startTime).getTime());
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterType, filterStatus, filterDate, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = scheduleData.length;
    const today = scheduleData.filter(s => s.date === '2024-01-25').length;
    const thisWeek = scheduleData.filter(s => new Date(s.date) <= new Date('2024-01-31')).length;
    const totalStudents = scheduleData.reduce((sum, s) => sum + s.students, 0);
    const totalHours = scheduleData.reduce((sum, s) => {
      const start = new Date(s.date + ' ' + s.startTime);
      const end = new Date(s.date + ' ' + s.endTime);
      return sum + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    }, 0);

    return {
      total,
      today,
      thisWeek,
      totalStudents,
      totalHours: totalHours.toFixed(1)
    };
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'workshop':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'lab':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'online':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'exam':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture':
        return '📚';
      case 'workshop':
        return '🛠️';
      case 'lab':
        return '🔬';
      case 'online':
        return '💻';
      case 'exam':
        return '📝';
      default:
        return '📅';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return time;
  };

  const getDuration = (startTime: string, endTime: string) => {
    const start = new Date('2024-01-01 ' + startTime);
    const end = new Date('2024-01-01 ' + endTime);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return hours + ' ชั่วโมง';
  };

  const cardClasses = "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow";

  return (
    <MainLayout userName={currentUser.name} userRole="instructor">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">ตารางสอน</h1>
              <p className="text-gray-600 dark:text-gray-400">จัดการตารางสอนและกำหนดการเรียน</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${viewMode === 'list'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                >
                  รายการ
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${viewMode === 'calendar'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                >
                  ปฏิทิน
                </button>
              </div>
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  เพิ่มคลาส
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="text-2xl">📅</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.today}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">วันนี้</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.thisWeek}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">สัปดาห์นี้</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.totalStudents}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">นักเรียนทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.totalHours}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ชั่วโมงทั้งหมด</p>
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
                  placeholder="ค้นหาชื่อคลาส, หลักสูตร, ห้อง..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">ประเภททั้งหมด</option>
              <option value="lecture">บรรยาย</option>
              <option value="workshop">เวิร์กช็อป</option>
              <option value="lab">ปฏิบัติการ</option>
              <option value="online">ออนไลน์</option>
              <option value="exam">การสอบ</option>
            </select>

            {/* Date Filter */}
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">ทุกวัน</option>
              <option value="today">วันนี้</option>
              <option value="week">สัปดาห์นี้</option>
              <option value="month">เดือนนี้</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="date">วันที่</option>
              <option value="title">ชื่อคลาส</option>
              <option value="students">จำนวนนักเรียน</option>
              <option value="duration">ระยะเวลา</option>
            </select>
          </div>
        </div>

        {/* Schedule List */}
        {filteredSchedule.length > 0 ? (
          <div className="space-y-4">
            {filteredSchedule.map((session) => (
              <div key={session.id} className={`${cardClasses} p-6 hover:shadow-lg transition-all duration-300`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{getTypeIcon(session.type)}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                        {session.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {session.courseTitle} • {session.instructor}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(session.type)}`}>
                      {getTypeIcon(session.type)} {session.type === 'lecture' ? 'บรรยาย' :
                        session.type === 'workshop' ? 'เวิร์กช็อป' :
                          session.type === 'lab' ? 'ปฏิบัติการ' :
                            session.type === 'online' ? 'ออนไลน์' :
                              session.type === 'exam' ? 'การสอบ' : session.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(session.status)}`}>
                      {session.status === 'scheduled' ? '📅 กำหนดการ' :
                        session.status === 'completed' ? '✅ เสร็จสิ้น' :
                          session.status === 'cancelled' ? '❌ ยกเลิก' :
                            session.status === 'ongoing' ? '🔄 กำลังดำเนินการ' : session.status}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {session.description}
                </p>

                {/* Session Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      📅 {formatDate(session.date)}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">วันที่</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      ⏰ {formatTime(session.startTime)} - {formatTime(session.endTime)}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">เวลา</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      📍 {session.room}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">สถานที่</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      👥 {session.students}/{session.maxStudents}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">นักเรียน</p>
                  </div>
                </div>

                {/* Materials */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-2">วัสดุและอุปกรณ์</h4>
                  <div className="flex flex-wrap gap-2">
                    {session.materials.map((material, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300">
                        {material}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recurring Info */}
                {session.recurring.enabled && (
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-1">ทำซ้ำ</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      {session.recurring.frequency === 'weekly' ? 'ทุกสัปดาห์' : 'ครั้งเดียว'}
                      {session.recurring.endDate && ` จนถึง ${formatDate(session.recurring.endDate)}`}
                    </p>
                  </div>
                )}

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>🏢 {session.building}</span>
                    <span>⏱️ {getDuration(session.startTime, session.endTime)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedSession(session)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      ดูรายละเอียด
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      แก้ไข
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                      เริ่มคลาส
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">ไม่พบตารางสอน</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือกรองข้อมูล</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterType('all');
              setFilterStatus('all');
              setFilterDate('all');
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
              เพิ่มคลาสใหม่
            </span>
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              นำเข้าตาราง
            </span>
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707H19a2 2 0 012 2v1z" />
              </svg>
              ส่งออกตาราง
            </span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
