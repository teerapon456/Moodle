'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/MainLayout';
import { getLearnerNotifications, Notification } from '@/app/database/mockData';

export default function LearnerNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(getLearnerNotifications());
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'course':
        return (
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        );
      case 'assignment':
        return (
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'achievement':
        return (
          <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13C6.477 5 2 9.477 2 15c0 1.746.477 3.332 1.253 4.5m18.494 0C22.523 18.332 23 16.746 23 15c0-5.523-4.477-10-10-10" />
            </svg>
          </div>
        );
      case 'deadline':
        return (
          <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'reminder':
        return (
          <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-900/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <MainLayout userName="ผู้เรียน" userRole="learner">
      <div className="pt-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🔔 การแจ้งเตือน</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                การแจ้งเตือนสำหรับผู้เรียน
              </p>
            </div>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-[#A21D21] text-white rounded-lg hover:bg-[#8A1919] transition-colors font-medium"
                >
                  ทำเครื่องหมายว่าอ่านทั้งหมด ({unreadCount})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${filter === 'all'
                  ? 'bg-white dark:bg-gray-700 text-[#A21D21] dark:text-red-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
            >
              ทั้งหมด ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${filter === 'unread'
                  ? 'bg-white dark:bg-gray-700 text-[#A21D21] dark:text-red-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
            >
              ยังไม่อ่าน ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${filter === 'read'
                  ? 'bg-white dark:bg-gray-700 text-[#A21D21] dark:text-red-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
            >
              อ่านแล้ว ({notifications.filter(n => n.read).length})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {filter === 'unread' ? 'ไม่มีการแจ้งเตือนที่ยังไม่อ่าน' :
                  filter === 'read' ? 'ไม่มีการแจ้งเตือนที่อ่านแล้ว' :
                    'ไม่มีการแจ้งเตือน'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {filter === 'unread' ? 'การแจ้งเตือนทั้งหมดถูกอ่านแล้ว' :
                  filter === 'read' ? 'ยังไม่มีการแจ้งเตือนที่อ่านแล้ว' :
                    'คุณจะได้รับการแจ้งเตือนเมื่อมีกิจกรรมใหม่'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white dark:bg-gray-800 rounded-xl border transition-all ${notification.read
                    ? 'border-gray-200 dark:border-gray-700 opacity-75'
                    : 'border-[#A21D21]/20 dark:border-[#A21D21]/30 shadow-sm'
                  }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {getNotificationIcon(notification.type)}

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-lg font-medium ${notification.read
                              ? 'text-gray-900 dark:text-gray-100'
                              : 'text-[#A21D21] dark:text-red-400'
                            }`}>
                            {notification.title}
                          </h3>
                          <p className={`mt-1 ${notification.read
                              ? 'text-gray-600 dark:text-gray-400'
                              : 'text-gray-700 dark:text-gray-300'
                            }`}>
                            {notification.message}
                          </p>
                        </div>

                        {!notification.read && (
                          <span className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full"></span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-gray-500 dark:text-gray-500">
                          {notification.timestamp}
                        </span>

                        <div className="flex items-center gap-2">
                          {notification.link && (
                            <Link
                              href={notification.link}
                              onClick={() => markAsRead(notification.id)}
                              className="px-4 py-2 bg-[#A21D21] text-white rounded-lg hover:bg-[#8A1919] transition-colors text-sm font-medium"
                            >
                              {notification.actionLabel || 'ดูเพิ่มเติม'}
                            </Link>
                          )}
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                              title="ทำเครื่องหมายว่าอ่านแล้ว"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="ลบการแจ้งเตือน"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
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
