'use client';

import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

// Mock data for notifications
const notificationsData = [
  {
    id: 1,
    type: 'assignment',
    title: 'มีนักเรียนส่งงานใหม่',
    message: 'สมชาย ใจดี ได้ส่งงาน "ส่งงานชิ้นที่ 3: วิเคราะห์กรณีศึกษา" ในหลักสูตร "การจัดการทีมอย่างมีประสิทธิภาพ"',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    studentName: 'สมชาย ใจดี (64012345)',
    timestamp: '2024-01-22 14:30',
    isRead: false,
    priority: 'medium',
    actionUrl: '/instructor/grading'
  },
  {
    id: 2,
    type: 'quiz',
    title: 'มีการสอบพัฒนาที่ต้องตรวจ',
    message: 'มานี สุขใจ ได้ทำแบบทดสอบพัฒนา "การเขียนโปรแกรม Python" แล้ว 15 คน ต้องการตรวจ',
    courseTitle: 'การเขียนโปรแกรม Python',
    studentName: 'มานี สุขใจ (64012346)',
    timestamp: '2024-01-22 13:15',
    isRead: false,
    priority: 'high',
    actionUrl: '/instructor/quizzes'
  },
  {
    id: 3,
    type: 'system',
    title: 'ระบบมีการอัปเดต',
    message: 'ระบบจะปิดการอัปเดตในวันที่ 23 มกราคม 2567 เวลา 23:00-24:00 น.',
    courseTitle: 'ระบบ',
    studentName: 'ระบบ',
    timestamp: '2024-01-22 10:00',
    isRead: true,
    priority: 'low',
    actionUrl: null
  },
  {
    id: 4,
    type: 'student',
    title: 'นักเรียนร้องขอความช่วยยุ',
    message: 'ประเสริฐ มีชัย ร้องขอความช่วยยุเกี่ยวกับการทำแบบทดสอบในหลักสูตร "การตลาดดิจิทัล"',
    courseTitle: 'การตลาดดิจิทัล',
    studentName: 'ประเสริฐ มีชัย (64012349)',
    timestamp: '2024-01-22 09:30',
    isRead: false,
    priority: 'medium',
    actionUrl: '/instructor/courses'
  },
  {
    id: 5,
    type: 'deadline',
    title: 'กำหนดส่งงานใกล้เข้ามาแล้ว',
    message: 'กำหนดส่งงาน "โปรเจคต์สุดท้าย: Web Application" ในหลักสูตร "การเขียนโปรแกรม Python" จะสิ้นสุดในวันที่ 25 มกราคม',
    courseTitle: 'การเขียนโปรแกรม Python',
    studentName: 'ทุกคน',
    timestamp: '2024-01-21 16:00',
    isRead: true,
    priority: 'high',
    actionUrl: '/instructor/assignments'
  },
  {
    id: 6,
    type: 'assignment',
    title: 'การตรวจงานเสร็จสิ้น',
    message: 'การตรวจงานของนฤมล แสงสุข ในหลักสูตร "การวิเคราะห์ข้อมูลธุรกิจ" เสร็จสิ้นแล้ว',
    courseTitle: 'การวิเคราะห์ข้อมูลธุรกิจ',
    studentName: 'นฤมล แสงสุข (64012348)',
    timestamp: '2024-01-21 14:45',
    isRead: true,
    priority: 'low',
    actionUrl: '/instructor/grading'
  }
];

export default function InstructorNotificationsPage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterRead, setFilterRead] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');

  // Filter and sort notifications
  const filteredNotifications = useMemo(() => {
    let filtered = notificationsData.filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.studentName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filterType === 'all' || notification.type === filterType;
      const matchesRead = filterRead === 'all' ||
        (filterRead === 'read' && notification.isRead) ||
        (filterRead === 'unread' && !notification.isRead);

      return matchesSearch && matchesType && matchesRead;
    });

    // Sort notifications
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'timestamp':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'priority':
          const priorityOrder: Record<string, number> = { high: 3, medium: 2, low: 1 };
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterType, filterRead, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = notificationsData.length;
    const unread = notificationsData.filter(n => !n.isRead).length;
    const highPriority = notificationsData.filter(n => n.priority === 'high').length;
    const assignment = notificationsData.filter(n => n.type === 'assignment').length;
    const quiz = notificationsData.filter(n => n.type === 'quiz').length;
    const system = notificationsData.filter(n => n.type === 'system').length;
    const student = notificationsData.filter(n => n.type === 'student').length;
    const deadline = notificationsData.filter(n => n.type === 'deadline').length;

    return {
      total,
      unread,
      highPriority,
      assignment,
      quiz,
      system,
      student,
      deadline
    };
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case 'quiz':
        return (
          <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4m3 4h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case 'system':
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756-.426 1.756-2.924 0-3.35a1.724 1.724 0 00-1.066-2.573c-.94-1.543-.826-3.31-.826-2.37a1.724 1.724 0 00-2.572-1.065c-1.756.426-1.756 2.924 0 3.35a1.724 1.724 0 001.066 2.573c.94 1.543.826 3.31.826 2.37.1.724 1.724 0 002.573-1.066c1.543.94 3.31.826 2.37.826zm1.06-2.829a.756.756 0 01.649.66c.774-.18 1.633-.54 2.11-.826.48-.286.856-.54 1.11-.826.756 0 1.293.54 1.633.66a.756.756 0 01.66-.649c.18-.774.54-1.633.826-2.11.286-.48.54-.856.826-1.11.826-.756 0-1.293-.54-1.633-.66a.756.756 0 01-.649.66c-.774.18-1.633.54-2.11.826-.48.286-.856.54-1.11.826-.756 0-1.293-.54-1.633-.66z" />
          </svg>
        );
      case 'student':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'deadline':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a2.032 2.032 0 00-1.405-1.405L17 9m0 0l-2 2m0 0l-2-2m3 4a2 2 0 01-2 2h-1a2 2 0 01-2-2V9a2 2 0 012-2h1a2 2 0 012 2v4z" />
          </svg>
        );
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'quiz':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'system':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'student':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'deadline':
        return 'bg-red-100 text-red-700 border-red-200';
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

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">การแจ้งเตือน</h1>
              <p className="text-gray-600 dark:text-gray-400">ติดตามการแจ้งเตือนและการดำเนินงานต่างๆ</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m4-4l-4 4m-9-4v10a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v10z" />
                  </svg>
                  อ่านทั้งหมด
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a2.032 2.032 0 00-1.405-1.405L17 9m0 0l-2 2m0 0l-2-2m3 4a2 2 0 01-2 2h-1a2 2 0 01-2-2V9a2 2 0 012-2h1a2 2 0 012 2v4z" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-9h.01M6 9h.01" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.unread}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ยังไม่อ่าน</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.highPriority}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ความสำคัญ</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.assignment}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">งานที่ส่ง</p>
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
                  placeholder="ค้นหาหัวข้อ, ข้อความ, หลักสูตร..."
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
              <option value="all">ประเภทททั้งหมด</option>
              <option value="assignment">งาน</option>
              <option value="quiz">แบบทดสอบ</option>
              <option value="system">ระบบ</option>
              <option value="student">นักเรียน</option>
              <option value="deadline">กำหนด</option>
            </select>

            {/* Read Filter */}
            <select
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">ทั้งหมด</option>
              <option value="unread">ยังไม่อ่าน</option>
              <option value="read">อ่านแล้ว</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="timestamp">เวลา</option>
              <option value="priority">ความสำคัญ</option>
              <option value="type">ประเภทท</option>
            </select>
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`${cardClasses} p-6 hover:shadow-lg transition-all duration-300 ${!notification.isRead ? 'border-l-4 border-l-red-500' : ''}`}
              >
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${getTypeColor(notification.type)}`}>
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                        {notification.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notification.priority)}`}>
                          {notification.priority === 'high' ? 'สูง' :
                            notification.priority === 'medium' ? 'กลาง' :
                              notification.priority === 'low' ? 'ต่ำ' : notification.priority}
                        </span>
                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>📚 {notification.courseTitle}</span>
                      <span>👤 {notification.studentName}</span>
                      <span>🕐 {formatTimestamp(notification.timestamp)}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                  <div className="flex items-center gap-2">
                    {!notification.isRead && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        ทำเครื่อนอ่าน
                      </button>
                    )}
                    {notification.actionUrl && (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                        ดำเนินการ
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      ละเว้น
                    </button>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a2.032 2.032 0 00-1.405-1.405L17 9m0 0l-2 2m0 0l-2-2m3 4a2 2 0 01-2 2h-1a2 2 0 01-2-2V9a2 2 0 012-2h1a2 2 0 012 2v4z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">ไม่มีการแจ้งเตือน</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">คุณมีการแจ้งเตือนทั้งหมดแล้วแล้ว</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterType('all');
              setFilterRead('all');
            }}>
              ล้างตัวกรอง
            </Button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
            ทำเครื่อนอ่านทั้งหมด
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
            ตั้งค่านแจ้งเตือน
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
