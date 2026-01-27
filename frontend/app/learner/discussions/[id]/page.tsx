'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/MainLayout';

// Mock discussion detail data
const mockDiscussion = {
  id: 1,
  courseId: 1,
  courseTitle: 'มาตรฐานความปลอดภัยในโรงงาน',
  courseCode: 'SAF-2024-001',
  title: 'มีคำถามเกี่ยวกับ Module 2: Risk Assessment',
  content: `ผมไม่เข้าใจในส่วนของการประเมินความเสี่ยงแบบ HAZOP ครับ พอดีผมได้อ่านเนื้อหาใน Module 2 แล้ว แต่ยังงงๆ อยู่ในส่วนของ:

1. การกำหนด Parameters ที่ต้องการตรวจสอบ
2. การใช้ Guide Words ต่างๆ เช่น NO, MORE, LESS, etc.
3. การจัดทำ HAZOP Worksheet ให้ถูกต้อง

มีใครเคยทำ HAZOP จริงๆ บ้างไหมครับ หรือมี resource เพิ่มเติมที่แนะนำได้บ้างครับ ขอบคุณครับ`,
  author: 'สมชาย ใจดี',
  authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
  authorRole: 'learner',
  createdAt: '2 ชั่วโมงที่แล้ว',
  updatedAt: '30 นาทีที่แล้ว',
  views: 45,
  likes: 12,
  tags: ['risk-assessment', 'hazop', 'module-2'],
  status: 'active',
  isPinned: true
};

const mockReplies = [
  {
    id: 1,
    discussionId: 1,
    author: 'ดร.วิไล เก่งมาก',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    authorRole: 'instructor',
    content: `สวัสดีครับคุณสมชาย

ขออธิบายเพิ่มเติมเกี่ยวกับ HAZOP ครับ:

**1. การกำหนด Parameters:**
- เริ่มจาก Process Flow Diagram (PFD)
- กำหนด Parameters หลัก: Temperature, Pressure, Flow, Level, Composition
- พิจารณาทั้ง Process Parameters และ Operational Parameters

**2. การใช้ Guide Words:**
- **NO**: ไม่มีการทำงาน (No flow, no pressure)
- **MORE**: มากกว่าปกติ (High temperature, high pressure)
- **LESS**: น้อยกว่าปกติ (Low flow, low level)
- **REVERSE**: ทำงานกลับทาง (Reverse flow)
- **AS WELL AS**: สิ่งเจือปน (Contamination)
- **PART OF**: น้อยกว่าปกติ (Missing component)
- **OTHER THAN**: อย่างอื่น (Wrong material)

**3. HAZOP Worksheet:**
- มีโครงสร้างตามมาตรฐาน IEC 61882
- ต้องระบุ: Node, Parameter, Guide Word, Cause, Consequence, Safeguards, Recommendations

แนะนำให้ลองทำตามตัวอย่างในหลักสูตรก่อนครับ จะช่วยให้เข้าใจโครงสร้างมากขึ้น`,
    createdAt: '1 ชั่วโมงที่แล้ว',
    updatedAt: '1 ชั่วโมงที่แล้ว',
    likes: 8,
    isAnswer: true
  },
  {
    id: 2,
    discussionId: 1,
    author: 'วีระชัย มุ่งมั่น',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    authorRole: 'learner',
    content: `ผมก็เคยงงๆ ตรงนี้เหมือนกันครับ แต่พอลองทำตามตัวอย่างใน workshop แล้วเข้าใจขึ้นเยอะ

เคล็ดลับคือ:
- ลองเริ่มจากกระบวนการที่คุ้นเคยก่อน
- ใช้ Guide Words แค่ 3-4 ตัวแรกก่อน (NO, MORE, LESS, REVERSE)
- ถามตัวเองว่า "What if..." ตลอดเวลา

แนะนำ video นี้ด้วยครับ: https://example.com/hazop-tutorial (เป็นภาษาอังกฤษแต่มีภาษาไทย subtitle)`,
    createdAt: '45 นาทีที่แล้ว',
    updatedAt: '45 นาทีที่แล้ว',
    likes: 5,
    isAnswer: false
  },
  {
    id: 3,
    discussionId: 1,
    author: 'สมศรี มั่นคง',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    authorRole: 'learner',
    content: `ขอบคุณทุกคนครับ ผมเพิ่งเริ่มเรียน Module 2 พอดีเลย

มีใครมี template ของ HAZOP Worksheet ที่ใช้งานจริงไหมครับ อยากได้เป็นตัวอย่างในการทำงานครับ`,
    createdAt: '30 นาทีที่แล้ว',
    updatedAt: '30 นาทีที่แล้ว',
    likes: 2,
    isAnswer: false
  }
];

export default function DiscussionDetailPage() {
  const [discussion] = useState(mockDiscussion);
  const [replies, setReplies] = useState(mockReplies);
  const [newReply, setNewReply] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReply = async () => {
    if (!newReply.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const reply = {
        id: replies.length + 1,
        discussionId: discussion.id,
        author: 'ผู้เรียนปัจจุบัน',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        authorRole: 'learner',
        content: newReply,
        createdAt: 'เมื่อสักครู่',
        updatedAt: 'เมื่อสักครู่',
        likes: 0,
        isAnswer: false
      };

      setReplies([...replies, reply]);
      setNewReply('');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleLikeReply = (replyId: number) => {
    setReplies(replies.map(reply =>
      reply.id === replyId
        ? { ...reply, likes: reply.likes + 1 }
        : reply
    ));
  };

  return (
    <MainLayout userName="ผู้เรียน" userRole="learner">
      <div className="pt-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/learner/discussions" className="hover:text-[#A21D21] dark:hover:text-[#C92828]">
            💬 กระทู้สนทนา
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{discussion.title}</span>
        </nav>

        {/* Discussion Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          {/* Pinned Badge */}
          {discussion.isPinned && (
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded-full flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                ปักหมุด
              </span>
            </div>
          )}

          {/* Course Info */}
          <div className="flex items-center gap-2 mb-4">
            <Link
              href={`/learner/my-courses/${discussion.courseId}`}
              className="text-sm text-[#A21D21] dark:text-[#C92828] hover:underline"
            >
              {discussion.courseTitle} ({discussion.courseCode})
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {discussion.createdAt}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {discussion.title}
          </h1>

          {/* Tags */}
          {discussion.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {discussion.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <img
                src={discussion.authorAvatar}
                alt={discussion.author}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {discussion.author}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {discussion.authorRole === 'instructor' ? 'วิทยากร' : 'ผู้เรียน'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 ml-auto">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {discussion.views}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {discussion.likes}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {discussion.content}
            </div>
          </div>
        </div>

        {/* Replies Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            คำตอบ ({replies.length})
          </h2>

          {/* Reply Form */}
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              เขียนคำตอบ
            </h3>
            <div className="space-y-4">
              <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="เขียนคำตอบของคุณ..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSubmitReply}
                  disabled={!newReply.trim() || isSubmitting}
                  className="px-6 py-2 bg-[#A21D21] text-white rounded-lg hover:bg-[#8A1919] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'กำลังส่ง...' : 'ส่งคำตอบ'}
                </button>
              </div>
            </div>
          </div>

          {/* Replies List */}
          <div className="space-y-6">
            {replies.map((reply) => (
              <div key={reply.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0">
                <div className="flex items-start gap-4">
                  {/* Author Avatar */}
                  <div className="flex-shrink-0">
                    <img
                      src={reply.authorAvatar}
                      alt={reply.author}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>

                  {/* Reply Content */}
                  <div className="flex-1">
                    {/* Author Info */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {reply.author}
                      </span>
                      {reply.authorRole === 'instructor' && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                          วิทยากร
                        </span>
                      )}
                      {reply.isAnswer && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                          คำตอบที่ดีที่สุด
                        </span>
                      )}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {reply.createdAt}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="prose prose-gray dark:prose-invert max-w-none mb-4">
                      <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                        {reply.content}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLikeReply(reply.id)}
                        className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-[#A21D21] dark:hover:text-[#C92828] transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {reply.likes}
                      </button>
                      <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#A21D21] dark:hover:text-[#C92828] transition-colors">
                        ตอบกลับ
                      </button>
                      <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#A21D21] dark:hover:text-[#C92828] transition-colors">
                        รายงาน
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
