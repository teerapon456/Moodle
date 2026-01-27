'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  getCourseById,
  getLessonsByCourseId,
  getReviewsByCourseId,
  getAverageRating,
  getReviewCount,
} from '@/app/database/mockData';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = parseInt(params.id as string);
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'reviews'>('overview');

  // Load data from centralized database
  const course = getCourseById(courseId);
  const lessons = getLessonsByCourseId(courseId);
  const reviews = getReviewsByCourseId(courseId);
  const avgRating = getAverageRating(courseId);
  const reviewCount = getReviewCount(courseId);

  // If course not found, show error
  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ไม่พบหลักสูตร</h1>
          <p className="text-gray-600 mb-4">ไม่พบหลักสูตรที่คุณต้องการ</p>
          <Link href="/catalog" className="text-[#A21D21] hover:underline">
            กลับไปหน้าแค็ตตาล็อก
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#A21D21]/10 to-[#7A1818]/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Course Image/Thumbnail */}
            <div className="lg:col-span-1">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#A21D21] to-[#7A1818] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative w-full aspect-video bg-gradient-to-br from-[#A21D21] via-[#A21D21] to-[#7A1818] rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <svg className="relative w-20 h-20 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>

              {/* Quick Stats Card */}
              <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">ข้อมูลหลักสูตร</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">ระดับ</span>
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium">
                      {course.level}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">ระยะเวลา</span>
                    <span className="text-sm font-medium text-gray-900">{course.duration} ชั่วโมง</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">ผู้เรียน</span>
                    <span className="text-sm font-medium text-gray-900">{course.enrolled.toLocaleString()} คน</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">ภาษา</span>
                    <span className="text-sm font-medium text-gray-900">{course.language}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white rounded-full text-sm font-semibold shadow-lg">
                    {course.category}
                  </span>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className={`w-5 h-5 ${star <= Math.floor(avgRating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">{avgRating.toFixed(1)}</span>
                    <span className="ml-1 text-sm text-gray-500">({reviewCount} รีวิว)</span>
                  </div>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {course.title}
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  {course.description}
                </p>

                {/* Instructor Info */}
                <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#A21D21] to-[#7A1818] rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {course.instructor.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">ผู้สอน</p>
                    <p className="font-semibold text-gray-900">{course.instructor}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white rounded-xl hover:from-[#7A1818] hover:to-[#A21D21] transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5">
                    ลงทะเบียนเรียน
                  </button>
                  <button className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold text-lg hover:border-gray-300">
                    เพิ่มในรายการโปรด
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex space-x-1 p-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 flex items-center justify-center px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${activeTab === 'overview'
                  ? 'bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ภาพรวม
              </button>
              <button
                onClick={() => setActiveTab('lessons')}
                className={`flex-1 flex items-center justify-center px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${activeTab === 'lessons'
                  ? 'bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                บทเรียน ({lessons.length})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 flex items-center justify-center px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${activeTab === 'reviews'
                  ? 'bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                รีวิว ({reviewCount})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-3 text-[#A21D21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    เกี่ยวกับหลักสูตร
                  </h3>
                  <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-100">
                    {course.description}
                  </div>
                </div>

                {course.objectives && (
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-[#A21D21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      วัตถุประสงค์การเรียน
                    </h4>
                    <div className="grid gap-3">
                      {course.objectives.map((obj, index) => (
                        <div key={index} className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                          <div className="w-8 h-8 bg-[#A21D21] text-white rounded-full flex items-center justify-center font-semibold mr-4">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 font-medium">{obj}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                    <div className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <p className="text-sm text-purple-600 font-medium mb-1">หมวดหมู่</p>
                    <p className="text-lg font-bold text-gray-900">{course.category}</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                    <div className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-sm text-green-600 font-medium mb-1">ระดับ</p>
                    <p className="text-lg font-bold text-gray-900">{course.level}</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <p className="text-sm text-blue-600 font-medium mb-1">ภาษา</p>
                    <p className="text-lg font-bold text-gray-900">{course.language}</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <p className="text-sm text-orange-600 font-medium mb-1">จำนวนบทเรียน</p>
                    <p className="text-lg font-bold text-gray-900">{lessons.length} บท</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lessons' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-[#A21D21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  บทเรียนทั้งหมด ({lessons.length})
                </h3>
                <div className="space-y-4">
                  {lessons.map((lesson, index) => (
                    <div key={lesson.id} className="group relative bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-[#A21D21]/30 hover:shadow-lg transition-all duration-300">
                      <div className="absolute top-6 left-6 w-12 h-12 bg-gradient-to-br from-[#A21D21] to-[#7A1818] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                        {lesson.id}
                      </div>
                      <div className="ml-20">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-3">
                              <h4 className="text-lg font-semibold text-gray-900 mr-3">{lesson.title}</h4>
                              {lesson.completed && (
                                <div className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  สำเร็จแล้ว
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center text-gray-500">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {lesson.duration}
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${lesson.type === 'video' ? 'bg-blue-100 text-blue-700' :
                                lesson.type === 'quiz' ? 'bg-purple-100 text-purple-700' :
                                  lesson.type === 'assignment' ? 'bg-orange-100 text-orange-700' :
                                    'bg-gray-100 text-gray-700'
                                }`}>
                                {lesson.type === 'video' ? 'วิดีโอ' :
                                  lesson.type === 'quiz' ? 'แบบทดสอบ' :
                                    lesson.type === 'assignment' ? 'งานมอบหมาย' :
                                      'เอกสาร'}
                              </span>
                            </div>
                          </div>
                          <Link
                            href={`/learn/${courseId}/${lesson.id}`}
                            className="px-6 py-3 bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white rounded-xl hover:from-[#7A1818] hover:to-[#A21D21] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                          >
                            {lesson.completed ? 'ดูอีกครั้ง' : 'เริ่มเรียน'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-[#A21D21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  รีวิวจากผู้เรียน ({reviewCount})
                </h3>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-100">
                      <div className="flex items-start">
                        <div className="relative">
                          {review.avatar ? (
                            <img src={review.avatar} alt={review.userName} className="w-12 h-12 rounded-full border-2 border-white shadow-lg" />
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-br from-[#A21D21] to-[#7A1818] rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-lg">
                              {review.userName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <span className="font-semibold text-gray-900 mr-3">{review.userName}</span>
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg key={star} className={`w-5 h-5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
