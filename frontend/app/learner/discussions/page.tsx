'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/MainLayout';

// Mock discussions data
const mockDiscussions = [
  {
    id: 1,
    courseId: 1,
    courseTitle: 'มาตรฐานความปลอดภัยในโรงงาน',
    courseCode: 'SAF-2024-001',
    title: 'มีคำถามเกี่ยวกับ Module 2: Risk Assessment',
    content: 'ผมไม่เข้าใจในส่วนของการประเมินความเสี่ยงแบบ HAZOP ครับ มีใครสามารถอธิบายเพิ่มเติมได้ไหมครับ',
    author: 'สมชาย ใจดี',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    authorRole: 'learner',
    createdAt: '2 ชั่วโมงที่แล้ว',
    updatedAt: '30 นาทีที่แล้ว',
    views: 45,
    replies: 8,
    likes: 12,
    isPinned: true,
    tags: ['risk-assessment', 'hazop', 'module-2'],
    status: 'active',
    lastReply: {
      author: 'ดร.วิไล เก่งมาก',
      content: 'ขออธิบายเพิ่มเติมครับ...',
      time: '30 นาทีที่แล้ว'
    }
  },
  {
    id: 2,
    courseId: 1,
    courseTitle: 'มาตรฐานความปลอดภัยในโรงงาน',
    courseCode: 'SAF-2024-001',
    title: 'แชร์ประสบการณ์: การทำ Safety Audit จริง',
    content: 'เมื่อวานผมได้มีโอกาสทำ safety audit จริงในโรงงาน อยากแชร์ประสบการณ์ให้เพื่อนๆ ได้เรียนรู้กันครับ',
    author: 'วีระชัย มุ่งมั่น',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    authorRole: 'learner',
    createdAt: '5 ชั่วโมงที่แล้ว',
    updatedAt: '1 ชั่วโมงที่แล้ว',
    views: 128,
    replies: 15,
    likes: 34,
    isPinned: false,
    tags: ['safety-audit', 'ประสบการณ์', 'แชร์'],
    status: 'active',
    lastReply: {
      author: 'สมศรี มั่นคง',
      content: 'เยี่ยมมากครับ ขอบคุณสำหรับการแชร์...',
      time: '1 ชั่วโมงที่แล้ว'
    }
  },
  {
    id: 3,
    courseId: 2,
    courseTitle: 'การใช้งาน ERP System',
    courseCode: 'IT-2024-015',
    title: 'ปัญหาการเชื่อมต่อ SAP กับ Production Line',
    content: 'พบปัญหาตอน sync ข้อมูลระหว่าง SAP และ production line มีใครเคยเจอปัญหานี้ไหมครับ',
    author: 'มานี รักงาน',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    authorRole: 'learner',
    createdAt: '1 วันที่แล้ว',
    updatedAt: '3 ชั่วโมงที่แล้ว',
    views: 67,
    replies: 5,
    likes: 8,
    isPinned: false,
    tags: ['sap', 'production-line', 'sync', 'ปัญหา'],
    status: 'active',
    lastReply: {
      author: 'อ.วิไล เก่งมาก',
      content: 'ลองตรวจสอบ connection settings ดูนะครับ...',
      time: '3 ชั่วโมงที่แล้ว'
    }
  },
  {
    id: 4,
    courseId: 3,
    courseTitle: 'การควบคุมคุณภาพผลิตภัณฑ์',
    courseCode: 'QC-2024-008',
    title: 'ขอคำแนะนำ: การใช้เครื่องมือ QC ใหม่',
    content: 'มีใครใช้เครื่องมือ QC รุ่นใหม่บ้างครับ อยากทราบข้อมูลเกี่ยวกับ performance และความแม่นยำ',
    author: 'ประสิทธิ์ สุขใจ',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    authorRole: 'learner',
    createdAt: '2 วันที่แล้ว',
    updatedAt: '2 วันที่แล้ว',
    views: 34,
    replies: 3,
    likes: 6,
    isPinned: false,
    tags: ['qc-tools', 'performance', 'ความแม่นยำ'],
    status: 'active',
    lastReply: {
      author: 'ดร.สมชาย ใจดี',
      content: 'ผมเคยใช้รุ่นทดลองครับ แนะนำเลย...',
      time: '2 วันที่แล้ว'
    }
  }
];

const mockCourses = [
  { id: 1, title: 'มาตรฐานความปลอดภัยในโรงงาน', code: 'SAF-2024-001', discussions: 45 },
  { id: 2, title: 'การใช้งาน ERP System', code: 'IT-2024-015', discussions: 23 },
  { id: 3, title: 'การควบคุมคุณภาพผลิตภัณฑ์', code: 'QC-2024-008', discussions: 18 },
];

export default function DiscussionsPage() {
  const [discussions, setDiscussions] = useState(mockDiscussions);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'unanswered'>('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCourse = selectedCourse === 'all' || discussion.courseId === parseInt(selectedCourse);
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'popular':
        return b.likes - a.likes;
      case 'unanswered':
        return a.replies - b.replies;
      default:
        return 0;
    }
  });

  const formatTimeAgo = (timestamp: string) => {
    return timestamp;
  };

  return (
    <MainLayout userName="ผู้เรียน" userRole="learner">
      <div className="pt-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">💬 กระทู้สนทนา</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                แลกเปลี่ยนความรู้และปรึกษาปัญหากับเพื่อนๆ และวิทยากร
              </p>
            </div>
            <button
              onClick={() => setShowNewDiscussion(true)}
              className="px-6 py-3 bg-[#A21D21] text-white rounded-lg hover:bg-[#8A1919] transition-colors font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              สร้างกระทู้ใหม่
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหากระทู้..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
            />
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Course Filter & Sort */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
              >
                <option value="all">ทุกหลักสูตร</option>
                {mockCourses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.title} ({course.code})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('latest')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${sortBy === 'latest'
                    ? 'bg-[#A21D21] text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                ล่าสุด
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${sortBy === 'popular'
                    ? 'bg-[#A21D21] text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                ยอดนิยม
              </button>
              <button
                onClick={() => setSortBy('unanswered')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${sortBy === 'unanswered'
                    ? 'bg-[#A21D21] text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                ยังไม่มีคำตอบ
              </button>
            </div>
          </div>
        </div>

        {/* Discussions List */}
        <div className="space-y-4">
          {sortedDiscussions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                ไม่พบกระทู้ที่ค้นหา
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือสร้างกระทู้ใหม่
              </p>
            </div>
          ) : (
            sortedDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  {/* Pinned Badge */}
                  {discussion.isPinned && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded-full flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                        </svg>
                        ปักหมุด
                      </span>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    {/* Author Avatar */}
                    <div className="flex-shrink-0">
                      <img
                        src={discussion.authorAvatar}
                        alt={discussion.author}
                        className="w-12 h-12 rounded-full"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      {/* Course Info */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {discussion.courseTitle} ({discussion.courseCode})
                        </span>
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatTimeAgo(discussion.createdAt)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-[#A21D21] dark:hover:text-[#C92828] cursor-pointer">
                        <Link href={`/learner/discussions/${discussion.id}`}>
                          {discussion.title}
                        </Link>
                      </h3>

                      {/* Content Preview */}
                      <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {discussion.content}
                      </p>

                      {/* Tags */}
                      {discussion.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {discussion.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Stats & Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {discussion.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {discussion.replies}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {discussion.likes}
                          </span>
                        </div>

                        {/* Last Reply */}
                        {discussion.lastReply && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-medium">{discussion.lastReply.author}</span> ตอบเมื่อ {discussion.lastReply.time}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* New Discussion Modal */}
        {showNewDiscussion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                สร้างกระทู้ใหม่
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    เลือกหลักสูตร
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                    <option value="">เลือกหลักสูตร...</option>
                    {mockCourses.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.title} ({course.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    หัวข้อกระทู้
                  </label>
                  <input
                    type="text"
                    placeholder="กรอกหัวข้อกระทู้..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    เนื้อหา
                  </label>
                  <textarea
                    rows={6}
                    placeholder="กรอกเนื้อหากระทู้..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    แท็ก (คั่นด้วย , )
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น: ปัญหา, สอบถาม, module-1"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowNewDiscussion(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={() => setShowNewDiscussion(false)}
                  className="px-6 py-2 bg-[#A21D21] text-white rounded-lg hover:bg-[#8A1919] transition-colors"
                >
                  สร้างกระทู้
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
