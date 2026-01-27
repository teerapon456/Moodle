'use client';

import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

// Mock data for videos
const videosData = [
  {
    id: 1,
    title: 'บทนำสู่การจัดการทีม',
    description: 'เรียนรู้พื้นฐานการจัดการทีมและความสำคัญของการทำงานร่วมกัน',
    course: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    category: 'บรรยาย',
    duration: '15:30',
    size: '125 MB',
    views: 234,
    status: 'published',
    uploadDate: '2024-01-15',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: 'https://example.com/video1.mp4',
    tags: ['การจัดการ', 'ทีม', 'พื้นฐาน'],
    chapters: [
      { title: 'บทนำ', startTime: '00:00', duration: '02:30' },
      { title: 'ความสำคัญของทีม', startTime: '02:30', duration: '05:00' },
      { title: 'ประเภททีม', startTime: '07:30', duration: '05:00' },
      { title: 'สรุป', startTime: '12:30', duration: '03:00' }
    ],
    materials: ['สไลด์นำเสนอ', 'แบบฝึกหัด', 'บทความเพิ่มเติม'],
    quiz: {
      enabled: true,
      questions: 5,
      passingScore: 70
    }
  },
  {
    id: 2,
    title: 'เทคนิคการสื่อสารในทีม',
    description: 'วิธีการสื่อสารที่มีประสิทธิภาพภายในทีมงาน',
    course: 'การจัดการทีมอย่างมีประสิทธิภาพ',
    category: 'เวิร์กช็อป',
    duration: '22:45',
    size: '180 MB',
    views: 189,
    status: 'published',
    uploadDate: '2024-01-16',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: 'https://example.com/video2.mp4',
    tags: ['การสื่อสาร', 'ทีม', 'เวิร์กช็อป'],
    chapters: [
      { title: 'บทนำ', startTime: '00:00', duration: '03:00' },
      { title: 'การฟัง', startTime: '03:00', duration: '06:00' },
      { title: 'การพูด', startTime: '09:00', duration: '06:00' },
      { title: 'การแก้ไขปัญหา', startTime: '15:00', duration: '07:45' }
    ],
    materials: ['แบบฝึกหัด', 'กรณีศึกษา'],
    quiz: {
      enabled: true,
      questions: 8,
      passingScore: 75
    }
  },
  {
    id: 3,
    title: 'การเขียนโปรแกรม Python พื้นฐาน',
    description: 'เรียนรู้พื้นฐานการเขียนโปรแกรม Python สำหรับผู้เริ่มต้น',
    course: 'การเขียนโปรแกรม Python',
    category: 'บรรยาย',
    duration: '45:20',
    size: '350 MB',
    views: 567,
    status: 'draft',
    uploadDate: '2024-01-20',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: 'https://example.com/video3.mp4',
    tags: ['Python', 'การเขียนโปรแกรม', 'พื้นฐาน'],
    chapters: [
      { title: 'บทนำ', startTime: '00:00', duration: '05:00' },
      { title: 'ติดตั้ง Python', startTime: '05:00', duration: '10:00' },
      { title: 'ตัวแปรและข้อมูล', startTime: '15:00', duration: '15:00' },
      { title: 'การควบคุม', startTime: '30:00', duration: '15:20' }
    ],
    materials: ['โค้ดตัวอย่าง', 'แบบฝึกหัด', 'เอกสารประกอบ'],
    quiz: {
      enabled: false,
      questions: 0,
      passingScore: 0
    }
  },
  {
    id: 4,
    title: 'การตลาดดิจิทัลเบื้องต้น',
    description: 'แนะนำการตลาดดิจิทัลและกลยุทธ์พื้นฐาน',
    course: 'การตลาดดิจิทัล',
    category: 'บรรยาย',
    duration: '28:15',
    size: '220 MB',
    views: 145,
    status: 'processing',
    uploadDate: '2024-01-21',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: '',
    tags: ['การตลาด', 'ดิจิทัล', 'กลยุทธ์'],
    chapters: [],
    materials: ['สไลด์นำเสนอ'],
    quiz: {
      enabled: false,
      questions: 0,
      passingScore: 0
    }
  },
  {
    id: 5,
    title: 'การสอบ Python กลางภาค',
    description: 'แนะนำการสอบกลางภาควิชาการเขียนโปรแกรม Python',
    course: 'การเขียนโปรแกรม Python',
    category: 'การสอบ',
    duration: '05:30',
    size: '45 MB',
    views: 89,
    status: 'failed',
    uploadDate: '2024-01-22',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: '',
    tags: ['Python', 'การสอบ', 'กลางภาค'],
    chapters: [],
    materials: ['ข้อสอบ', 'เฉลย'],
    quiz: {
      enabled: false,
      questions: 0,
      passingScore: 0
    }
  }
];

export default function InstructorVideosPage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('uploadDate');
  const [selectedVideo, setSelectedVideo] = useState<typeof videosData[0] | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    let filtered = videosData.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = filterStatus === 'all' || video.status === filterStatus;
      const matchesCourse = filterCourse === 'all' || video.course === filterCourse;
      const matchesCategory = filterCategory === 'all' || video.category === filterCategory;

      return matchesSearch && matchesStatus && matchesCourse && matchesCategory;
    });

    // Sort videos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'uploadDate':
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        case 'views':
          return b.views - a.views;
        case 'duration':
          return parseInt(b.duration.split(':')[0]) * 60 + parseInt(b.duration.split(':')[1]) -
            parseInt(a.duration.split(':')[0]) * 60 - parseInt(a.duration.split(':')[1]);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterStatus, filterCourse, filterCategory, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = videosData.length;
    const published = videosData.filter(v => v.status === 'published').length;
    const draft = videosData.filter(v => v.status === 'draft').length;
    const processing = videosData.filter(v => v.status === 'processing').length;
    const failed = videosData.filter(v => v.status === 'failed').length;
    const totalViews = videosData.reduce((sum, v) => sum + v.views, 0);
    const totalDuration = videosData.reduce((sum, v) => {
      const parts = v.duration.split(':');
      return sum + parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }, 0);
    const avgViews = total > 0 ? Math.round(totalViews / total) : 0;

    return {
      total,
      published,
      draft,
      processing,
      failed,
      totalViews,
      totalDuration,
      avgViews
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'draft':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return '✅';
      case 'draft':
        return '📝';
      case 'processing':
        return '⏳';
      case 'failed':
        return '❌';
      default:
        return '📋';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'บรรยาย':
        return '📚';
      case 'เวิร์กช็อป':
        return '🛠️';
      case 'ปฏิบัติการ':
        return '🔬';
      case 'การสอบ':
        return '📝';
      default:
        return '🎥';
    }
  };

  const formatDuration = (duration: string) => {
    const parts = duration.split(':');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);

    if (hours > 0) {
      return `${hours}ชม ${minutes}นาที`;
    }
    return `${minutes}นาที`;
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">วิดีโอการสอน</h1>
              <p className="text-gray-600 dark:text-gray-400">จัดการและติดตามวิดีโอการสอนทั้งหมด</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${viewMode === 'grid'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                >
                  กริด
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${viewMode === 'list'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                >
                  รายการ
                </button>
              </div>
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  อัปโหลดวิดีโอ
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">วิดีโอทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="text-2xl">✅</span>
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
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.totalViews.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">การดูทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                {Math.floor(stats.totalDuration / 60)}:{(stats.totalDuration % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ระยะเวลารวม</p>
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
                  placeholder="ค้นหาชื่อวิดีโอ, คำอธิบาย, หลักสูตร, แท็ก..."
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
              <option value="published">เผยแพร่แล้ว</option>
              <option value="draft">ฉบับร่าง</option>
              <option value="processing">กำลังประมวลผล</option>
              <option value="failed">ล้มเหลว</option>
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
              <option value="uploadDate">วันที่อัปโหลด</option>
              <option value="title">ชื่อวิดีโอ</option>
              <option value="views">จำนวนการดู</option>
              <option value="duration">ระยะเวลา</option>
            </select>
          </div>
        </div>

        {/* Videos Grid/List */}
        {filteredVideos.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredVideos.map((video) => (
              <div key={video.id} className={`${cardClasses} overflow-hidden hover:shadow-lg transition-all duration-300`}>
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(video.status)}`}>
                      {getStatusIcon(video.status)} {video.status === 'published' ? 'เผยแพร่' :
                        video.status === 'draft' ? 'ฉบับร่าง' :
                          video.status === 'processing' ? 'กำลังประมวลผล' :
                            video.status === 'failed' ? 'ล้มเหลว' : video.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 line-clamp-2">
                      {video.title}
                    </h3>
                    <span className="text-2xl">{getCategoryIcon(video.category)}</span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {video.description}
                  </p>

                  {/* Video Info */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">หลักสูตร:</span>
                      <span className="text-gray-900 dark:text-gray-50">{video.course}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">ขนาด:</span>
                      <span className="text-gray-900 dark:text-gray-50">{formatFileSize(video.size)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">การดู:</span>
                      <span className="text-gray-900 dark:text-gray-50">{video.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">อัปโหลด:</span>
                      <span className="text-gray-900 dark:text-gray-50">{formatDate(video.uploadDate)}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {video.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setSelectedVideo(video)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      ดู
                    </button>
                    <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      แก้ไข
                    </button>
                    <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      สถิติ
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
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">ไม่พบวิดีโอ</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือกรองข้อมูล</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterCourse('all');
              setFilterCategory('all');
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
              อัปโหลดวิดีโอใหม่
            </span>
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              นำเข้าวิดีโอ
            </span>
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              ดูรายงานวิดีโอ
            </span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
