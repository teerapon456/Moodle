'use client';

import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

// Mock data for content
const contentData = [
  {
    id: 1,
    title: 'บทนำ: แนวคิดการจัดการทีม',
    type: 'document',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    description: 'บทนำแนะนำแนวคิดพื้นฐานของการจัดการทีมที่มีประสิทธิภาพ',
    status: 'published',
    size: '2.4 MB',
    format: 'PDF',
    duration: '15 นาที',
    views: 156,
    downloads: 89,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    tags: ['พื้นฐาน', 'แนะนำ', 'ทฤษฎี'],
    url: '/content/intro-team-management.pdf'
  },
  {
    id: 2,
    title: 'วิดีโอ: เทคนิคการสื่อสารในทีม',
    type: 'video',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    description: 'วิดีโอสาธิติเทคนิคการสื่อสารที่มีประสิทธิภาพในทีม',
    status: 'published',
    size: '125 MB',
    format: 'MP4',
    duration: '25 นาที',
    views: 234,
    downloads: 45,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
    tags: ['วิดีโอ', 'การสื่อสาร', 'ทักษะ'],
    url: '/content/communication-techniques.mp4'
  },
  {
    id: 3,
    title: 'แบบฝึกหัด: การวิเคราะห์กรณีศึกษา',
    type: 'assignment',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    description: 'แบบฝึกหัดสำหรับการวิเคราะห์กรณีศึกษาการจัดการทีม',
    status: 'published',
    size: '1.8 MB',
    format: 'DOCX',
    duration: '45 นาที',
    views: 178,
    downloads: 156,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-22',
    tags: ['แบบฝึกหัด', 'กรณีศึกษา', 'ปฏิบัติ'],
    url: '/content/case-study-exercise.docx'
  },
  {
    id: 4,
    title: 'สไลด์: กลยุทธ์การสร้างทีม',
    type: 'presentation',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    description: 'สไลด์นำเสนอกลยุทธ์และวิธีการสร้างทีมที่มีประสิทธิภาพ',
    status: 'draft',
    size: '8.5 MB',
    format: 'PPTX',
    duration: '30 นาที',
    views: 45,
    downloads: 12,
    createdAt: '2024-01-22',
    updatedAt: '2024-01-23',
    tags: ['สไลด์', 'กลยุทธ์', 'การสร้างทีม'],
    url: '/content/team-building-strategy.pptx'
  },
  {
    id: 5,
    title: 'อีเลิร์นนิ่ง: การประเมินประสิทธิภาพทีม',
    type: 'interactive',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    description: 'เนื้อหาอีเลิร์นนิ่งสำหรับการประเมินประสิทธิภาพทีม',
    status: 'published',
    size: '5.2 MB',
    format: 'HTML',
    duration: '20 นาที',
    views: 89,
    downloads: 0,
    createdAt: '2024-01-21',
    updatedAt: '2024-01-21',
    tags: ['อีเลิร์นนิ่ง', 'การประเมิน', 'แบบทดสอบ'],
    url: '/content/team-performance-assessment.html'
  },
  {
    id: 6,
    title: 'เสียง: การสัมภาษณ์ผู้เชี่ยวชาญ',
    type: 'audio',
    courseTitle: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    description: 'บันทึกเสียงการสัมภาษณ์ผู้เชี่ยวชาญด้านการจัดการทีม',
    status: 'published',
    size: '45 MB',
    format: 'MP3',
    duration: '35 นาที',
    views: 67,
    downloads: 23,
    createdAt: '2024-01-19',
    updatedAt: '2024-01-19',
    tags: ['เสียง', 'สัมภาษณ์', 'ผู้เชี่ยวชาญ'],
    url: '/content/expert-interview.mp3'
  }
];

export default function InstructorContentPage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCourse, setFilterCourse] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [selectedContent, setSelectedContent] = useState<typeof contentData[0] | null>(null);

  // Filter and sort content
  const filteredContent = useMemo(() => {
    let filtered = contentData.filter(content => {
      const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesType = filterType === 'all' || content.type === filterType;
      const matchesStatus = filterStatus === 'all' || content.status === filterStatus;
      const matchesCourse = filterCourse === 'all' || content.courseTitle === filterCourse;

      return matchesSearch && matchesType && matchesStatus && matchesCourse;
    });

    // Sort content
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'updated':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'views':
          return b.views - a.views;
        case 'downloads':
          return b.downloads - a.downloads;
        case 'size':
          return parseFloat(b.size) - parseFloat(a.size);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterType, filterStatus, filterCourse, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = contentData.length;
    const published = contentData.filter(c => c.status === 'published').length;
    const draft = contentData.filter(c => c.status === 'draft').length;
    const totalViews = contentData.reduce((sum, c) => sum + c.views, 0);
    const totalDownloads = contentData.reduce((sum, c) => sum + c.downloads, 0);
    const totalSize = contentData.reduce((sum, c) => sum + parseFloat(c.size), 0);

    return {
      total,
      published,
      draft,
      totalViews,
      totalDownloads,
      totalSize
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'archived':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'video':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'assignment':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'presentation':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'interactive':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'audio':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return '📄';
      case 'video':
        return '🎥';
      case 'assignment':
        return '📋';
      case 'presentation':
        return '📊';
      case 'interactive':
        return '🎮';
      case 'audio':
        return '🎵';
      default:
        return '📁';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF':
        return '📕';
      case 'MP4':
        return '🎬';
      case 'DOCX':
        return '📘';
      case 'PPTX':
        return '📙';
      case 'HTML':
        return '🌐';
      case 'MP3':
        return '🎧';
      default:
        return '📄';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatFileSize = (size: string) => {
    return size;
  };

  const cardClasses = "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow";

  return (
    <MainLayout userName={currentUser.name} userRole="instructor">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">เนื้อหาการสอน</h1>
              <p className="text-gray-600 dark:text-gray-400">จัดการเนื้อหา วิดีโอ เอกสาร และสื่อการสอน</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  อัปโหลดใหม่
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">เนื้อหาทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="text-2xl">📢</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.published}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">เผยแพร่แล้ว</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.totalViews}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">การดูทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.totalDownloads}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">การดาวน์โหลด</p>
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
                  placeholder="ค้นหาชื่อเนื้อหา, คำอธิบาย, แท็ก..."
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
              <option value="document">เอกสาร</option>
              <option value="video">วิดีโอ</option>
              <option value="assignment">งาน</option>
              <option value="presentation">สไลด์</option>
              <option value="interactive">อีเลิร์นนิ่ง</option>
              <option value="audio">เสียง</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">สถานะทั้งหมด</option>
              <option value="published">เผยแพร่แล้ว</option>
              <option value="draft">ฉบับร่าง</option>
              <option value="archived">เก็บไว้ในคลัง</option>
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
              <option value="updated">วันที่อัปเดต</option>
              <option value="title">ชื่อเนื้อหา</option>
              <option value="views">การดู</option>
              <option value="downloads">การดาวน์โหลด</option>
              <option value="size">ขนาดไฟล์</option>
            </select>
          </div>
        </div>

        {/* Content List */}
        {filteredContent.length > 0 ? (
          <div className="space-y-4">
            {filteredContent.map((content) => (
              <div key={content.id} className={`${cardClasses} p-6 hover:shadow-lg transition-all duration-300`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{getTypeIcon(content.type)}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                        {content.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {content.courseTitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(content.status)}`}>
                      {content.status === 'published' ? '📢 เผยแพร่แล้ว' :
                        content.status === 'draft' ? '✏️ ฉบับร่าง' :
                          content.status === 'archived' ? '📦 เก็บไว้ในคลัง' : content.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(content.type)}`}>
                      {getTypeIcon(content.type)} {content.type === 'document' ? 'เอกสาร' :
                        content.type === 'video' ? 'วิดีโอ' :
                          content.type === 'assignment' ? 'งาน' :
                            content.type === 'presentation' ? 'สไลด์' :
                              content.type === 'interactive' ? 'อีเลิร์นนิ่ง' :
                                content.type === 'audio' ? 'เสียง' : content.type}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {content.description}
                </p>

                {/* Content Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      {getFormatIcon(content.format)}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{content.format}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      {formatFileSize(content.size)}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">ขนาดไฟล์</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {content.views}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">การดู</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {content.downloads}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">ดาวน์โหลด</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {content.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>⏱️ {content.duration}</span>
                    <span>📅 สร้าง: {formatDate(content.createdAt)}</span>
                    <span>🔄 อัปเดต: {formatDate(content.updatedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedContent(content)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      ดูรายละเอียด
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      แก้ไข
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      ดูตัวอย่าง
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">ไม่พบเนื้อหา</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือกรองข้อมูล</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterType('all');
              setFilterStatus('all');
              setFilterCourse('all');
            }}>
              ล้างตัวกรอง
            </Button>
          </div>
        )}

        {/* Upload Options */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              อัปโหลดไฟล์
            </span>
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              สร้างเนื้อหาใหม่
            </span>
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              นำเข้าจากไลบรารี
            </span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
