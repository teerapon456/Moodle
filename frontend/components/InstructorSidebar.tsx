'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface InstructorSidebarProps {
  userRole?: string;
}

const InstructorSidebar: React.FC<InstructorSidebarProps> = ({ userRole = 'instructor' }) => {
  const pathname = usePathname() || '';
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isActive = (path: string) => {
    if (pathname === path) return true;
    if (pathname.startsWith(path + '/')) return true;
    return false;
  };

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev: string[]) =>
      prev.includes(itemName)
        ? prev.filter((item: string) => item !== itemName)
        : [...prev, itemName]
    );
  };

  const instructorNavItems = [
    {
      name: 'การจัดการหลักสูตร',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      children: [
        { name: 'หลักสูตรที่สอน', href: '/instructor/courses' },
        { name: 'สร้างหลักสูตร', href: '/instructor/create-course' },
        { name: 'เนื้อหาหลักสูตร', href: '/instructor/content' },
      ]
    },
    {
      name: 'การจัดการนักเรียน',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      children: [
        { name: 'รายชื่อนักเรียน', href: '/instructor/students' },
        { name: 'กลุ่มนักเรียน', href: '/instructor/student-groups' },
        { name: 'สถิตินักเรียน', href: '/instructor/student-stats' },
      ]
    },
    {
      name: 'การจัดการงาน',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      children: [
        { name: 'งานที่ต้องตรวจ', href: '/instructor/assignments' },
        { name: 'สร้างงาน', href: '/instructor/create-assignment' },
        { name: 'ประเมินงาน', href: '/instructor/grading' },
        { name: 'แบบทดสอบ', href: '/instructor/quizzes' },
      ]
    },
    {
      name: 'การสอน',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      children: [
        { name: 'ตารางสอน', href: '/instructor/schedule' },
        { name: 'ห้องเรียน', href: '/instructor/classroom' },
        { name: 'การออนไลน์', href: '/instructor/live-sessions' },
        { name: 'วิดีโอสอน', href: '/instructor/videos' },
      ]
    },
    {
      name: 'รายงานและวิเคราะห์',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      children: [
        { name: 'สถิติการสอน', href: '/instructor/reports' },
        { name: 'รายงานผล', href: '/instructor/performance' },
        { name: 'วิเคราะห์ข้อมูล', href: '/instructor/analytics' },
        { name: 'สรุปประจำเดือน', href: '/instructor/monthly-report' },
      ]
    },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50 border-r border-gray-200/50 dark:border-gray-700/50 min-h-screen fixed left-0 top-0 shadow-lg backdrop-blur-sm">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center mb-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-[#A21D21] to-[#7A1818] rounded-2xl flex items-center justify-center mr-3 shadow-lg transform hover:scale-105 transition-transform">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#A21D21] to-[#7A1818] bg-clip-text text-transparent">
              E-Learning
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">ระบบพัฒนาบุคลากร</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-3 pb-6">
        <div className="space-y-1">
          {/* Dashboard - always visible */}
          <Link
            href="/instructor"
            className={`group flex items-center px-4 py-3 text-sm font-medium transition-all rounded-xl relative overflow-hidden ${isActive('/instructor') && !pathname.startsWith('/instructor/') || pathname === '/instructor'
              ? 'bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white shadow-lg shadow-[#A21D21]/20'
              : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md'
              }`}
          >
            {(isActive('/instructor') && !pathname.startsWith('/instructor/') || pathname === '/instructor') && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            )}
            <div className={`mr-3 p-1.5 rounded-lg transition-all ${(isActive('/instructor') && !pathname.startsWith('/instructor/') || pathname === '/instructor')
              ? 'bg-white/20 text-white'
              : 'text-gray-500 group-hover:bg-[#A21D21]/10 group-hover:text-[#A21D21]'
              }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="relative z-10">แดชบอร์ด</span>
            {(isActive('/instructor') && !pathname.startsWith('/instructor/') || pathname === '/instructor') && (
              <div className="ml-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
              </div>
            )}
          </Link>

          {/* Divider */}
          <div className="my-4 px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          </div>

          {/* Instructor specific menu items */}
          {instructorNavItems.map((item) => (
            <div key={item.name} className="mb-2">
              <button
                onClick={() => toggleExpanded(item.name)}
                className={`group flex items-center px-4 py-3 text-sm font-medium transition-all rounded-xl relative overflow-hidden w-full text-left ${'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md'
                  }`}
              >
                <div className={`mr-3 p-1.5 rounded-lg transition-all ${'text-gray-500 group-hover:bg-[#A21D21]/10 group-hover:text-[#A21D21]'
                  }`}>
                  {item.icon}
                </div>
                <span className="relative z-10">{item.name}</span>
                <svg
                  className={`w-4 h-4 ml-auto text-gray-400 transition-transform duration-200 ${expandedItems.includes(item.name) ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`ml-4 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${expandedItems.includes(item.name) ? 'max-h-96' : 'max-h-0'}`}>
                {item.children.map((child: { name: string; href: string }) => {
                  const active = isActive(child.href);
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block px-4 py-2 text-sm rounded-lg transition-all ${active
                        ? 'bg-[#A21D21]/10 text-[#A21D21] font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                      {child.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-4 px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
        </div>

        {/* Profile & Notifications */}
        <div className="space-y-1">
          <Link
            href="/profile"
            className={`group flex items-center px-4 py-3 text-sm font-medium transition-all rounded-xl relative overflow-hidden ${isActive('/profile')
              ? 'bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white shadow-lg shadow-[#A21D21]/20'
              : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md'
              }`}
          >
            {isActive('/profile') && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            )}
            <div className={`mr-3 p-1.5 rounded-lg transition-all ${isActive('/profile')
              ? 'bg-white/20 text-white'
              : 'text-gray-500 group-hover:bg-[#A21D21]/10 group-hover:text-[#A21D21]'
              }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9H6a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-4m-4 0V7a2 2 0 012-2h4a2 2 0 012 2v2M10 9v6" />
              </svg>
            </div>
            <span className="relative z-10">โปรไฟล์</span>
            {isActive('/profile') && (
              <div className="ml-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
              </div>
            )}
          </Link>

          <Link
            href="/instructor/notifications"
            className={`group flex items-center px-4 py-3 text-sm font-medium transition-all rounded-xl relative overflow-hidden ${isActive('/instructor/notifications')
              ? 'bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white shadow-lg shadow-[#A21D21]/20'
              : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md'
              }`}
          >
            {isActive('/instructor/notifications') && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            )}
            <div className={`mr-3 p-1.5 rounded-lg transition-all ${isActive('/instructor/notifications')
              ? 'bg-white/20 text-white'
              : 'text-gray-500 group-hover:bg-[#A21D21]/10 group-hover:text-[#A21D21]'
              }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <span className="relative z-10">การแจ้งเตือน</span>
            {isActive('/instructor/notifications') && (
              <div className="ml-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
              </div>
            )}
            {/* Notification Badge */}
            <span className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-t from-gray-50/80 dark:from-gray-900/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span className="font-medium">Version 2.0</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSidebar;
