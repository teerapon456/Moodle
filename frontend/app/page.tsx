'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Navigation Block Component
const NavigationBlock = ({ title, description, links, color }: {
  title: string;
  description: string;
  links: Array<{ name: string; href: string; color: string; icon: string }>;
  color: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/10 backdrop-blur rounded-lg border border-white/20 hover:bg-white/15 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex items-center justify-between"
      >
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">{title}</h2>
          <p className="text-sm text-gray-200">{description}</p>
        </div>
        <svg
          className={`w-5 h-5 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-2">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`flex items-center justify-center gap-2 px-4 py-3 ${link.color} text-white rounded-lg transition-all text-center font-medium shadow-md hover:shadow-lg hover:scale-105`}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Learning Pages Component with Folder Structure
const LearningPagesWithFoldersBlock = () => {
  const [isOpen, setIsOpen] = useState(false);

  const learningPages = [
    {
      category: '📚 สำหรับผู้เรียน',
      pages: [
        { name: 'Learn Portal', href: '/learn', color: 'bg-purple-500 hover:bg-purple-600', icon: '📚', description: 'หน้าหลักการเรียน' },
        { name: 'Course Catalog', href: '/catalog', color: 'bg-indigo-500 hover:bg-indigo-600', icon: '📖', description: 'ดูหลักสูตรทั้งหมด' },
        { name: 'My Learning', href: '/learner/my-courses', color: 'bg-pink-500 hover:bg-pink-600', icon: '🎯', description: 'คอร์สของฉัน' },
        { name: 'Progress', href: '/learner/progress', color: 'bg-cyan-500 hover:bg-cyan-600', icon: '📈', description: 'ความคืบหน้า' },
        { name: 'Reports', href: '/learner/reports', color: 'bg-teal-500 hover:bg-teal-600', icon: '📊', description: 'รายงาน' },
        { name: 'Profile', href: '/learner/profile', color: 'bg-emerald-500 hover:bg-emerald-600', icon: '👤', description: 'โปรไฟล' },
        { name: 'Notifications', href: '/learner/notifications', color: 'bg-purple-500 hover:bg-purple-600', icon: '🔔', description: 'การแจ้งเตือน' },
        { name: 'Discussions', href: '/learner/discussions', color: 'bg-indigo-500 hover:bg-indigo-600', icon: '💬', description: 'การอภิปราย' },
        { name: 'Roadmap', href: '/learner/roadmap', color: 'bg-orange-500 hover:bg-orange-600', icon: '🎯', description: 'แผนการเรียน' },
        { name: 'Achievements', href: '/learner/achievements', color: 'bg-yellow-500 hover:bg-yellow-600', icon: '🏆', description: 'ความสำเร็จ' },
        { name: 'Assignments', href: '/learner/assignments', color: 'bg-red-500 hover:bg-red-600', icon: '📝', description: 'การส่งงาน' },
      ]
    },
    {
      category: '📋 หน้าในคอร์ส',
      pages: [
        { name: 'Course Details', href: '/learn/1', color: 'bg-blue-500 hover:bg-blue-600', icon: '📋', description: 'รายละเอียดคอร์ส' },
        { name: 'Learn Lesson', href: '/learn/1/learn', color: 'bg-green-500 hover:bg-green-600', icon: '🎓', description: 'เรียนบทเรียน' },
        { name: 'Quiz', href: '/learn/1/quiz', color: 'bg-orange-500 hover:bg-orange-600', icon: '📝', description: 'แบบทดสอบ' },
        { name: 'Assignment', href: '/learn/1/assignment', color: 'bg-red-500 hover:bg-red-600', icon: '📋', description: 'ส่งงาน' },
        { name: 'Discussion', href: '/learn/1/discussion', color: 'bg-purple-500 hover:bg-purple-600', icon: '💬', description: 'อภิปราย' },
        { name: 'Resources', href: '/learn/1/resources', color: 'bg-yellow-500 hover:bg-yellow-600', icon: '📁', description: 'ทรัพยากร' },
        { name: 'Progress Detail', href: '/learn/1/progress', color: 'bg-cyan-500 hover:bg-cyan-600', icon: '📊', description: 'ความคืบหน้าคอร์ส' },
      ]
    },
    {
      category: '⚙️ อื่น ๆ',
      pages: [
        { name: 'Settings', href: '/settings', color: 'bg-gray-500 hover:bg-gray-600', icon: '⚙️', description: 'ตั้งค่าระบบ' },
        { name: 'System Config', href: '/admin/settings', color: 'bg-slate-500 hover:bg-slate-600', icon: '🔧', description: 'คอนฟิกุกรณ์ระบบ' },
        { name: 'Notifications', href: '/admin/notifications', color: 'bg-zinc-500 hover:bg-zinc-600', icon: '🔔', description: 'การแจ้งเตือน' },
        { name: 'Logs', href: '/admin/logs', color: 'bg-stone-500 hover:bg-stone-600', icon: '📋', description: 'บันทึกข้อมูล' },
      ]
    }
  ];

  return (
    <div className="bg-white/10 backdrop-blur rounded-lg border border-white/20 hover:bg-white/15 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex items-center justify-between"
      >
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">📚 Learning Pages (Folder View)</h2>
          <p className="text-sm text-gray-200">หน้าระบบเรียนแยกตามโครงสร้าง</p>
        </div>
        <svg
          className={`w-5 h-5 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          {learningPages.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white/5 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-white mb-3">{category.category}</h3>
              <div className="grid grid-cols-2 gap-2">
                {category.pages.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.href}
                    className={`flex items-center justify-center gap-2 px-3 py-2 ${link.color} text-white rounded-lg transition-all text-center text-sm font-medium shadow-md hover:shadow-lg hover:scale-105`}
                    title={link.description}
                  >
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const portalSections = [
  {
    title: '🔐 Authentication',
    description: 'หน้าเข้าสู่ระบบและสมัครสมาชิก',
    links: [
      { name: 'Login', href: '/login', color: 'bg-blue-500 hover:bg-blue-600', icon: '🔑' },
      { name: 'Register', href: '/register', color: 'bg-green-500 hover:bg-green-600', icon: '📝' },
      { name: 'Forgot Password', href: '/forgot-password', color: 'bg-orange-500 hover:bg-orange-600', icon: '🔒' },
    ]
  },
  {
    title: '👥 User Management',
    description: 'หน้าจัดการผู้ใช้และบทบาทต่างๆ',
    links: [
      { name: 'Admin Dashboard', href: '/admin', color: 'bg-red-600 hover:bg-red-700', icon: '🏠' },
      { name: 'All Users', href: '/admin/users', color: 'bg-orange-600 hover:bg-orange-700', icon: '👥' },
      { name: 'HR Training', href: '/hr-training', color: 'bg-emerald-600 hover:bg-emerald-700', icon: '🏢' },
      { name: 'Instructor', href: '/instructor', color: 'bg-sky-600 hover:bg-sky-700', icon: '🎓' },
      { name: 'Course Creator', href: '/course-creator', color: 'bg-violet-600 hover:bg-violet-700', icon: '🎨' },
    ]
  },
  {
    title: '🎓 Instructor Workspace',
    description: 'พื้นที่ทำงานของวิทยากร - จัดการการสอนและติดตามผู้เรียน',
    links: [
      { name: '🏠 Instructor Dashboard', href: '/instructor', color: 'bg-sky-600 hover:bg-sky-700', icon: '📊', description: 'ภาพรวมการสอน' },
      { name: '📚 My Courses', href: '/instructor/courses', color: 'bg-blue-600 hover:bg-blue-700', icon: '📚', description: 'จัดการหลักสูตรที่สอน' },
      { name: '👥 Students', href: '/instructor/students', color: 'bg-green-600 hover:bg-green-700', icon: '👥', description: 'จัดการผู้เรียน' },
      { name: '📈 Progress Tracking', href: '/instructor/progress', color: 'bg-purple-600 hover:bg-purple-700', icon: '📈', description: 'ติดตามความคืบหน้า' },
      { name: '📝 Assignments', href: '/instructor/assignments', color: 'bg-orange-600 hover:bg-orange-700', icon: '📝', description: 'ตรวจงาน' },
      { name: '📊 Reports', href: '/instructor/reports', color: 'bg-red-600 hover:bg-red-700', icon: '📊', description: 'รายงานผลการสอน' },
    ]
  },
  {
    title: '📊 Reports & Analytics',
    description: 'หน้ารายงานและวิเคราะห์ข้อมูล',
    links: [
      { name: 'Learner Reports', href: '/learner/reports', color: 'bg-blue-500 hover:bg-blue-600', icon: '📊' },
      { name: 'HR Reports', href: '/hr-training/reports', color: 'bg-green-500 hover:bg-green-600', icon: '📑' },
      { name: 'Admin Reports', href: '/admin/reports', color: 'bg-purple-500 hover:bg-purple-600', icon: '📈' },
      { name: 'System Analytics', href: '/admin/analytics', color: 'bg-indigo-500 hover:bg-indigo-600', icon: '📉' },
    ]
  },
  {
    title: '⚙️ System Settings',
    description: 'หน้าตั้งค่าและการจัดการระบบ',
    links: [
      { name: 'Settings', href: '/settings', color: 'bg-gray-500 hover:bg-gray-600', icon: '⚙️' },
      { name: 'System Config', href: '/admin/settings', color: 'bg-slate-500 hover:bg-slate-600', icon: '🔧' },
      { name: 'Notifications', href: '/admin/notifications', color: 'bg-zinc-500 hover:bg-zinc-600', icon: '🔔' },
      { name: 'Logs', href: '/admin/logs', color: 'bg-stone-500 hover:bg-stone-600', icon: '📋' },
    ]
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filter sections based on search query
  const filteredSections = portalSections.filter(section => {
    const query = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(query) ||
      section.description.toLowerCase().includes(query) ||
      section.links.some(link =>
        link.name.toLowerCase().includes(query) ||
        link.href.toLowerCase().includes(query)
      )
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A21D21] to-[#7A1818]">
      {/* Navigation Bar */}
      <div className="bg-white/10 backdrop-blur border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-white">🚀 E-Learning Portal</h1>
              <span className="text-white/80 text-sm">สำหรับพัฒนาบุคลาภายในองค์กร</span>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="ค้นหาหน้า..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setIsSearchOpen(false)}
                className="w-full md:w-96 px-4 py-2 rounded-lg bg-white/20 backdrop-blur border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-3">ระบบ E-Learning Portal</h1>
          <p className="text-xl mb-2">สำหรับพัฒนาบุคลาภายในองค์กร</p>
          <p className="text-gray-200">เลือกหน้าที่ต้องการเข้าถึง</p>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
              <p className="text-white text-sm mb-2">
                ผลลการค้นหาสำหรับ "{searchQuery}" พบ {filteredSections.length} หมวดหมู่
              </p>
            </div>
          </div>
        )}

        {/* Portal Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LearningPagesWithFoldersBlock />
          {filteredSections.map((section, sectionIndex) => (
            <NavigationBlock
              key={sectionIndex}
              title={section.title}
              description={section.description}
              links={section.links}
              color="bg-white/10"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
