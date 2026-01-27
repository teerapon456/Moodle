'use client';

import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

// Mock data for live sessions
const liveSessionsData = [
  {
    id: 1,
    title: 'Workshop: การใช้ AI ในการจัดการทีม',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    instructor: 'ดร. สมชาย ใจดี',
    date: '2024-01-25',
    time: '14:00 - 16:00',
    duration: '2 ชั่วโมง',
    status: 'live',
    participants: 45,
    maxParticipants: 50,
    platform: 'Zoom',
    meetingLink: 'https://zoom.us/j/123456789',
    recordingAvailable: false,
    materials: ['สไลด์นำเสนอ', 'เอกสารประกอบ'],
    description: 'เรียนรู้วิธีการประยุกต์ใช้ AI ในการจัดการทีมเพื่อเพิ่มประสิทธิภาพ'
  },
  {
    id: 2,
    title: 'Q&A Session: การเขียนโปรแกรม Python',
    courseTitle: 'การเขียนโปรแกรม Python',
    instructor: 'อ. มานี สุขใจ',
    date: '2024-01-26',
    time: '10:00 - 11:30',
    duration: '1.5 ชั่วโมง',
    status: 'scheduled',
    participants: 0,
    maxParticipants: 30,
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/abc-123-def',
    recordingAvailable: false,
    materials: ['คำถามที่พบบบ่อย'],
    description: 'ตอบคำถามเกี่ยวกับการเขียนโปรแกรม Python ขั้นพื้นฐาน'
  },
  {
    id: 3,
    title: 'Guest Lecture: การตลาดดิจิทัลยุคใหม่',
    courseTitle: 'การตลาดดิจิทัล',
    instructor: 'ดร. วิชัย รัตน์ (Guest Speaker)',
    date: '2024-01-22',
    time: '13:00 - 15:00',
    duration: '2 ชั่วโมง',
    status: 'completed',
    participants: 89,
    maxParticipants: 100,
    platform: 'Microsoft Teams',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/xyz',
    recordingAvailable: true,
    materials: ['สไลด์นำเสนอ', 'Video Recording', 'Case Studies'],
    description: 'บรรยายพิเศษโดยผู้เชี่ยวชาญด้านการตลาดดิจิทัล'
  },
  {
    id: 4,
    title: 'Lab Session: การวิเคราะห์ข้อมูลด้วย Excel',
    courseTitle: 'การวิเคราะห์ข้อมูลธุรกิจ',
    instructor: 'อ. นฤมล แสงสุข',
    date: '2024-01-27',
    time: '09:00 - 12:00',
    duration: '3 ชั่วโมง',
    status: 'scheduled',
    participants: 0,
    maxParticipants: 25,
    platform: 'Zoom',
    meetingLink: 'https://zoom.us/j/987654321',
    recordingAvailable: false,
    materials: ['Dataset ตัวอย่าง', 'Lab Manual'],
    description: 'การฝึกปฏิบัติการวิเคราะห์ข้อมูลโดยใช้ Excel'
  },
  {
    id: 5,
    title: 'Presentation Skills Workshop',
    courseTitle: 'สื่อสารเพื่อการนำเสนอ',
    instructor: 'อ. ประเสริฐ มีชัย',
    date: '2024-01-20',
    time: '15:00 - 17:00',
    duration: '2 ชั่วโมง',
    status: 'cancelled',
    participants: 0,
    maxParticipants: 20,
    platform: 'Google Meet',
    meetingLink: '',
    recordingAvailable: false,
    materials: [],
    description: 'เวิร์คช็อพการพัฒนาทักษะการนำเสนอ'
  }
];

export default function InstructorLiveSessionsPage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCourse, setFilterCourse] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Filter and sort sessions
  const filteredSessions = useMemo(() => {
    let filtered = liveSessionsData.filter(session => {
      const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'all' || session.status === filterStatus;
      const matchesCourse = filterCourse === 'all' || session.courseTitle === filterCourse;

      return matchesSearch && matchesStatus && matchesCourse;
    });

    // Sort sessions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'participants':
          return b.participants - a.participants;
        case 'duration':
          return parseInt(b.duration) - parseInt(a.duration);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterStatus, filterCourse, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = liveSessionsData.length;
    const live = liveSessionsData.filter(s => s.status === 'live').length;
    const scheduled = liveSessionsData.filter(s => s.status === 'scheduled').length;
    const completed = liveSessionsData.filter(s => s.status === 'completed').length;
    const cancelled = liveSessionsData.filter(s => s.status === 'cancelled').length;
    const totalParticipants = liveSessionsData.reduce((sum, s) => sum + s.participants, 0);

    return {
      total,
      live,
      scheduled,
      completed,
      cancelled,
      totalParticipants
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Zoom':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.5 2.5c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2h-1c-1.1 0-2-.9-2-2v-1zM7 7c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2V7zm9 0c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2h-1c-1.1 0-2-.9-2-2V7zm-9 9c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-1zm9 0c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2h-1c-1.1 0-2-.9-2-2v-1z" />
          </svg>
        );
      case 'Google Meet':
        return (
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );
      case 'Microsoft Teams':
        return (
          <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">Live Sessions</h1>
              <p className="text-gray-600 dark:text-gray-400">จัดการและติดตามการสอนสดออนไลน์</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  สร้าง Session ใหม่
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728 0m12.728 0a9 9 0 01-12.728 0" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v6m0 4v6" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.live}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">กำลังสด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.scheduled}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ที่กำหนด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.completed}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">เสร็จสิ้น</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.totalParticipants}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ผู้เข้าร่วม</p>
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
                  placeholder="ค้นหาชื่อ session, หลักสูตร, ผู้สอน..."
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
              <option value="live">กำลังสด</option>
              <option value="scheduled">ที่กำหนด</option>
              <option value="completed">เสร็จสิ้น</option>
              <option value="cancelled">ยกเลิก</option>
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
                <option value="date">วันที่</option>
                <option value="title">ชื่อ Session</option>
                <option value="participants">ผู้เข้าร่วม</option>
                <option value="duration">ระยะเวลา</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              พบ {filteredSessions.length} Session
            </div>
          </div>
        </div>

        {/* Sessions List */}
        {filteredSessions.length > 0 ? (
          <div className="space-y-4">
            {filteredSessions.map((session) => (
              <div key={session.id} className={`${cardClasses} p-6 hover:shadow-lg transition-all duration-300`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      {getPlatformIcon(session.platform)}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                          {session.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {session.courseTitle} • {session.instructor}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(session.status)}`}>
                      {session.status === 'live' ? '🔴 กำลังสด' :
                        session.status === 'scheduled' ? '⏰ ที่กำหนด' :
                          session.status === 'completed' ? '✅ เสร็จสิ้น' :
                            session.status === 'cancelled' ? '❌ ยกเลิก' : session.status}
                    </span>
                  </div>
                </div>

                {/* Session Details */}
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {session.description}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-400">
                        {new Date(session.date).toLocaleDateString('th-TH')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-400">{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-400">{session.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-400">
                        {session.participants}/{session.maxParticipants} คน
                      </span>
                    </div>
                  </div>
                </div>

                {/* Materials */}
                {session.materials.length > 0 && (
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 dark:text-gray-50 mb-2">เอกสารประกอบ:</h5>
                    <div className="flex flex-wrap gap-2">
                      {session.materials.map((material, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-700 dark:text-gray-300">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    {session.status === 'live' && (
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                        🔴 เข้าร่วม Session
                      </button>
                    )}
                    {session.status === 'scheduled' && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        จัดการ Session
                      </button>
                    )}
                    {session.status === 'completed' && session.recordingAvailable && (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                        ดู Recording
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {session.meetingLink && (
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                        คัดลอกลิงก์
                      </button>
                    )}
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      ดูรายละเอียด
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">ไม่พบ Live Session</h3>
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
