'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/MainLayout';
import { getCourseById, getCurrentUser } from '@/app/database/mockData';
import { colors, spacing, typography, borderRadius, shadows, transitions } from '@/app/lib/design-tokens';

// ========================================
// COURSE DETAIL PAGE
// หน้ารายละเอียดหลักสูตรสำหรับลงทะเบียน
// ========================================

interface CourseDetailProps { }

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = parseInt(params.courseId as string);

  const [activeTab, setActiveTab] = useState('overview');
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Get course details
  const course = useMemo(() => getCourseById(courseId), [courseId]);
  const currentUser = useMemo(() => getCurrentUser(), []);

  // Loading state
  if (!course) {
    return (
      <MainLayout userName={currentUser?.name || 'ผู้ใช้'} userRole="learner">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p style={{ color: colors.text.secondary }}>กำลังโหลดข้อมูลหลักสูตร...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Handle enrollment
  const handleEnrollment = async () => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    setIsEnrolling(true);

    // Simulate enrollment process
    setTimeout(() => {
      setIsEnrolled(true);
      setIsEnrolling(false);

      // Redirect to learning page
      setTimeout(() => {
        router.push(`/learn/${courseId}`);
      }, 1500);
    }, 2000);
  };

  // Format duration
  const formatDuration = (duration: string) => {
    return duration;
  };

  // Calculate course stats
  const courseStats = {
    enrolled: course.enrolled || 0,
    rating: 4.8,
    reviews: 1247,
    completionRate: 85,
    level: course.level,
    language: course.language,
    category: course.category,
  };

  // Tab content
  const tabs = [
    { id: 'overview', label: 'ภาพรวม' },
    { id: 'curriculum', label: 'หลักสูตร' },
    { id: 'instructor', label: 'วิทยากร' },
    { id: 'reviews', label: 'รีวิว' },
  ];

  return (
    <MainLayout userName={currentUser?.name || 'ผู้ใช้'} userRole="learner">
      {/* Course Header */}
      <div className="relative">
        {/* Hero Image */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img
            src={course.thumbnail || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop'}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          {/* Back Button */}
          <div className="absolute top-4 left-4">
            <Link
              href="/catalog"
              className="inline-flex items-center px-3 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all"
              style={{
                borderRadius: borderRadius.lg,
                transition: transitions.default,
              }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              กลับไปหน้าคอร์ส
            </Link>
          </div>

          {/* Course Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className="px-3 py-1 text-white text-sm font-medium rounded-full"
                  style={{
                    backgroundColor: colors.primary.main,
                    fontSize: typography.fontSize.sm,
                  }}
                >
                  {course.category}
                </span>
                <span
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full"
                >
                  {course.level}
                </span>
                <span
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full"
                >
                  {formatDuration(course.duration)}
                </span>
              </div>

              <h1
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                style={{
                  fontSize: typography.fontSize['3xl'],
                  fontWeight: typography.fontWeight.bold,
                }}
              >
                {course.title}
              </h1>

              <p
                className="text-white/90 text-lg max-w-3xl"
                style={{
                  fontSize: typography.fontSize.lg,
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                {course.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              style={{ gap: spacing.md }}
            >
              <div
                className="text-center p-4 rounded-xl border"
                style={{
                  backgroundColor: colors.background.primary,
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: borderRadius.xl,
                  padding: spacing.md,
                }}
              >
                <div
                  className="text-2xl font-bold mb-1"
                  style={{
                    fontSize: typography.fontSize['2xl'],
                    fontWeight: typography.fontWeight.bold,
                    color: colors.primary.main,
                  }}
                >
                  {courseStats.enrolled.toLocaleString()}
                </div>
                <div
                  className="text-sm"
                  style={{
                    fontSize: typography.fontSize.sm,
                    color: colors.text.secondary,
                  }}
                >
                  ผู้เรียน
                </div>
              </div>

              <div
                className="text-center p-4 rounded-xl border"
                style={{
                  backgroundColor: colors.background.primary,
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: borderRadius.xl,
                  padding: spacing.md,
                }}
              >
                <div
                  className="text-2xl font-bold mb-1 flex items-center justify-center gap-1"
                  style={{
                    fontSize: typography.fontSize['2xl'],
                    fontWeight: typography.fontWeight.bold,
                    color: colors.warning[500],
                  }}
                >
                  ⭐ {courseStats.rating}
                </div>
                <div
                  className="text-sm"
                  style={{
                    fontSize: typography.fontSize.sm,
                    color: colors.text.secondary,
                  }}
                >
                  {courseStats.reviews.toLocaleString()} รีวิว
                </div>
              </div>

              <div
                className="text-center p-4 rounded-xl border"
                style={{
                  backgroundColor: colors.background.primary,
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: borderRadius.xl,
                  padding: spacing.md,
                }}
              >
                <div
                  className="text-2xl font-bold mb-1"
                  style={{
                    fontSize: typography.fontSize['2xl'],
                    fontWeight: typography.fontWeight.bold,
                    color: colors.success[500],
                  }}
                >
                  {courseStats.completionRate}%
                </div>
                <div
                  className="text-sm"
                  style={{
                    fontSize: typography.fontSize.sm,
                    color: colors.text.secondary,
                  }}
                >
                  อัตราสำเร็จ
                </div>
              </div>

              <div
                className="text-center p-4 rounded-xl border"
                style={{
                  backgroundColor: colors.background.primary,
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: borderRadius.xl,
                  padding: spacing.md,
                }}
              >
                <div
                  className="text-2xl font-bold mb-1"
                  style={{
                    fontSize: typography.fontSize['2xl'],
                    fontWeight: typography.fontWeight.bold,
                    color: colors.info[500],
                  }}
                >
                  {course.language}
                </div>
                <div
                  className="text-sm"
                  style={{
                    fontSize: typography.fontSize.sm,
                    color: colors.text.secondary,
                  }}
                >
                  ภาษา
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div
              className="border-b mb-8"
              style={{
                borderBottom: `1px solid ${colors.border.primary}`,
                marginBottom: spacing.xl,
              }}
            >
              <nav className="flex space-x-8" style={{ gap: spacing.xl }}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="py-2 px-1 border-b-2 font-medium text-sm transition-colors"
                    style={{
                      paddingTop: spacing.sm,
                      paddingBottom: spacing.sm,
                      paddingLeft: spacing.xs,
                      paddingRight: spacing.xs,
                      borderBottomWidth: '2px',
                      borderBottomStyle: 'solid',
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.medium,
                      transition: transitions.default,
                      ...(activeTab === tab.id
                        ? {
                          borderBottomColor: colors.primary.main,
                          color: colors.primary.main,
                        }
                        : {
                          borderBottomColor: 'transparent',
                          color: colors.text.tertiary,
                        }
                      ),
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
              {activeTab === 'overview' && (
                <div className="space-y-8" style={{ gap: spacing.xl }}>
                  {/* What you'll learn */}
                  <div>
                    <h2
                      className="text-2xl font-bold mb-4"
                      style={{
                        fontSize: typography.fontSize['2xl'],
                        fontWeight: typography.fontWeight.bold,
                        marginBottom: spacing.md,
                      }}
                    >
                      สิ่งที่คุณจะได้เรียนรู้
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.objectives?.map((objective, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3"
                          style={{ gap: spacing.sm }}
                        >
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                            style={{
                              backgroundColor: colors.primary.main,
                              borderRadius: '50%',
                              width: '24px',
                              height: '24px',
                            }}
                          >
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p
                            className="text-gray-700 dark:text-gray-300"
                            style={{ color: colors.text.secondary }}
                          >
                            {objective}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Course Description */}
                  <div>
                    <h2
                      className="text-2xl font-bold mb-4"
                      style={{
                        fontSize: typography.fontSize['2xl'],
                        fontWeight: typography.fontWeight.bold,
                        marginBottom: spacing.md,
                      }}
                    >
                      เกี่ยวกับหลักสูตรนี้
                    </h2>
                    <div
                      className="prose prose-gray dark:prose-invert max-w-none"
                      style={{ color: colors.text.secondary }}
                    >
                      <p>{course.description}</p>
                      <p>
                        หลักสูตรนี้ได้รับการออกแบบมาเพื่อให้ผู้เรียนได้รับความรู้และทักษะที่จำเป็นในการประยุกต์ใช้ในงานจริง
                        ด้วยเนื้อหาที่ครอบคลุมและทันสมัย พร้อมการอ้างอิงตัวอย่างและกรณีศึกษาที่เกี่ยวข้องกับอุตสาหกรรมปัจจุบัน
                      </p>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h2
                      className="text-2xl font-bold mb-4"
                      style={{
                        fontSize: typography.fontSize['2xl'],
                        fontWeight: typography.fontWeight.bold,
                        marginBottom: spacing.md,
                      }}
                    >
                      ข้อกำหนดและเงื่อนไข
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3" style={{ gap: spacing.sm }}>
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: colors.info[100],
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                          }}
                        >
                          <svg className="w-3 h-3 text-info-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p style={{ color: colors.text.secondary }}>
                          ไม่ต้องการประสบการณ์พิเศษ เหมาะสำหรับผู้เริ่มต้น
                        </p>
                      </div>
                      <div className="flex items-center gap-3" style={{ gap: spacing.sm }}>
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: colors.info[100],
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                          }}
                        >
                          <svg className="w-3 h-3 text-info-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p style={{ color: colors.text.secondary }}>
                          คอมพิวเตอร์ที่เชื่อมต่ออินเทอร์เน็ต
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div>
                  <h2
                    className="text-2xl font-bold mb-6"
                    style={{
                      fontSize: typography.fontSize['2xl'],
                      fontWeight: typography.fontWeight.bold,
                      marginBottom: spacing.lg,
                    }}
                  >
                    หลักสูตรการเรียน
                  </h2>
                  <div className="space-y-4">
                    {course.syllabus?.map((module, index) => (
                      <div
                        key={index}
                        className="border rounded-xl p-6"
                        style={{
                          border: `1px solid ${colors.border.primary}`,
                          borderRadius: borderRadius.xl,
                          padding: spacing.lg,
                        }}
                      >
                        <h3
                          className="text-lg font-semibold mb-3"
                          style={{
                            fontSize: typography.fontSize.lg,
                            fontWeight: typography.fontWeight.semibold,
                            marginBottom: spacing.sm,
                            color: colors.primary.main,
                          }}
                        >
                          {module.module}
                        </h3>
                        <ul className="space-y-2">
                          {module.topics.map((topic, topicIndex) => (
                            <li
                              key={topicIndex}
                              className="flex items-center gap-2"
                              style={{ gap: spacing.sm }}
                            >
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                  backgroundColor: colors.primary.main,
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                }}
                              ></div>
                              <span style={{ color: colors.text.secondary }}>
                                {topic}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'instructor' && (
                <div>
                  <h2
                    className="text-2xl font-bold mb-6"
                    style={{
                      fontSize: typography.fontSize['2xl'],
                      fontWeight: typography.fontWeight.bold,
                      marginBottom: spacing.lg,
                    }}
                  >
                    วิทยากรผู้สอน
                  </h2>
                  <div
                    className="flex items-start gap-6 p-6 rounded-xl border"
                    style={{
                      gap: spacing.lg,
                      padding: spacing.lg,
                      border: `1px solid ${colors.border.primary}`,
                      borderRadius: borderRadius.xl,
                    }}
                  >
                    <div
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-2xl font-bold"
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: colors.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: colors.text.inverse,
                        fontSize: typography.fontSize['2xl'],
                        fontWeight: typography.fontWeight.bold,
                      }}
                    >
                      {course.instructor.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-xl font-semibold mb-2"
                        style={{
                          fontSize: typography.fontSize.xl,
                          fontWeight: typography.fontWeight.semibold,
                          marginBottom: spacing.sm,
                        }}
                      >
                        {course.instructor}
                      </h3>
                      <p
                        className="text-gray-600 dark:text-gray-400 mb-4"
                        style={{
                          color: colors.text.secondary,
                          marginBottom: spacing.md,
                        }}
                      >
                        วิทยากรผู้เชี่ยวชาญด้าน{course.category} ประสบการณ์การสอนมากกว่า 10 ปี
                        พร้อมประสบการณ์การทำงานจริงในอุตสาหกรรมมากกว่า 15 ปี
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2" style={{ gap: spacing.sm }}>
                          <span className="font-semibold">คอร์ส:</span>
                          <span style={{ color: colors.text.secondary }}>12 คอร์ส</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ gap: spacing.sm }}>
                          <span className="font-semibold">ผู้เรียน:</span>
                          <span style={{ color: colors.text.secondary }}>5,234 คน</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ gap: spacing.sm }}>
                          <span className="font-semibold">คะแนน:</span>
                          <span style={{ color: colors.warning[500] }}>⭐ 4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h2
                    className="text-2xl font-bold mb-6"
                    style={{
                      fontSize: typography.fontSize['2xl'],
                      fontWeight: typography.fontWeight.bold,
                      marginBottom: spacing.lg,
                    }}
                  >
                    รีวิวจากผู้เรียน
                  </h2>
                  <div className="space-y-6">
                    {/* Rating Summary */}
                    <div
                      className="p-6 rounded-xl border"
                      style={{
                        padding: spacing.lg,
                        border: `1px solid ${colors.border.primary}`,
                        borderRadius: borderRadius.xl,
                      }}
                    >
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <div
                            className="text-4xl font-bold mb-2"
                            style={{
                              fontSize: typography.fontSize['4xl'],
                              fontWeight: typography.fontWeight.bold,
                              marginBottom: spacing.sm,
                              color: colors.warning[500],
                            }}
                          >
                            {courseStats.rating}
                          </div>
                          <div className="flex gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className="text-xl"
                                style={{ color: star <= Math.floor(courseStats.rating) ? colors.warning[500] : colors.gray[300] }}
                              >
                                ⭐
                              </span>
                            ))}
                          </div>
                          <div
                            className="text-sm"
                            style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}
                          >
                            {courseStats.reviews.toLocaleString()} รีวิว
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center gap-3">
                              <span className="text-sm w-12">{rating} ⭐</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full"
                                  style={{
                                    width: `${rating === 5 ? 60 : rating === 4 ? 25 : rating === 3 ? 10 : rating === 2 ? 3 : 2}%`,
                                    backgroundColor: colors.warning[500],
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm w-12 text-right">
                                {rating === 5 ? '60%' : rating === 4 ? '25%' : rating === 3 ? '10%' : rating === 2 ? '3%' : '2%'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Sample Reviews */}
                    <div className="space-y-4">
                      {[
                        {
                          name: 'สมชาย ใจดี',
                          rating: 5,
                          date: '2 สัปดาห์ที่แล้ว',
                          comment: 'หลักสูตรดีมากครับ วิทยากรสอนเข้าใจง่าย เนื้อหาครอบคลุมครับ'
                        },
                        {
                          name: 'สุดา พูดเก่ง',
                          rating: 5,
                          date: '1 เดือนที่แล้ว',
                          comment: 'ได้ความรู้มากมายเลยค่ะ สามารถนำไปประยุกต์ใช้กับงานจริงได้เลยค่ะ'
                        },
                      ].map((review, index) => (
                        <div
                          key={index}
                          className="p-6 rounded-xl border"
                          style={{
                            padding: spacing.lg,
                            border: `1px solid ${colors.border.primary}`,
                            borderRadius: borderRadius.xl,
                          }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold"
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '50%',
                                  backgroundColor: colors.primary.main,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: colors.text.inverse,
                                  fontWeight: typography.fontWeight.bold,
                                }}
                              >
                                {review.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-semibold">{review.name}</div>
                                <div
                                  className="text-sm"
                                  style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}
                                >
                                  {review.date}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  className="text-sm"
                                  style={{ color: star <= review.rating ? colors.warning[500] : colors.gray[300] }}
                                >
                                  ⭐
                                </span>
                              ))}
                            </div>
                          </div>
                          <p style={{ color: colors.text.secondary }}>
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Enrollment Card */}
            <div
              className="sticky top-4 p-6 rounded-xl border shadow-lg"
              style={{
                position: 'sticky',
                top: spacing.md,
                padding: spacing.lg,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: borderRadius.xl,
                boxShadow: shadows.lg,
                backgroundColor: colors.background.primary,
              }}
            >
              {/* Price */}
              <div className="text-center mb-6">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{
                    fontSize: typography.fontSize['3xl'],
                    fontWeight: typography.fontWeight.bold,
                    marginBottom: spacing.sm,
                    color: colors.primary.main,
                  }}
                >
                  ฟรี
                </div>
                <div
                  className="text-sm"
                  style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}
                >
                  สำหรับพนักงาน INTEQC
                </div>
              </div>

              {/* Course Info */}
              <div className="space-y-4 mb-6" style={{ marginBottom: spacing.lg }}>
                <div className="flex items-center gap-3" style={{ gap: spacing.sm }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.text.tertiary }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}>
                    {formatDuration(course.duration)}
                  </span>
                </div>
                <div className="flex items-center gap-3" style={{ gap: spacing.sm }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.text.tertiary }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}>
                    {course.syllabus?.length || 0} โมดูล
                  </span>
                </div>
                <div className="flex items-center gap-3" style={{ gap: spacing.sm }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.text.tertiary }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}>
                    {courseStats.enrolled.toLocaleString()} ผู้เรียน
                  </span>
                </div>
                <div className="flex items-center gap-3" style={{ gap: spacing.sm }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.text.tertiary }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary }}>
                    ใบรับรองเมื่อเสร็จสิ้น
                  </span>
                </div>
              </div>

              {/* Enrollment Button */}
              {!isEnrolled ? (
                <button
                  onClick={handleEnrollment}
                  disabled={isEnrolling}
                  className="w-full py-3 text-white rounded-lg font-semibold transition-all mb-4"
                  style={{
                    width: '100%',
                    padding: spacing.md,
                    backgroundColor: isEnrolling ? colors.gray[400] : colors.primary.main,
                    color: colors.text.inverse,
                    fontWeight: typography.fontWeight.semibold,
                    borderRadius: borderRadius.lg,
                    transition: transitions.default,
                    marginBottom: spacing.md,
                    cursor: isEnrolling ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isEnrolling ? 'กำลังลงทะเบียน...' : 'ลงทะเบียนเรียน'}
                </button>
              ) : (
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg mb-4">
                  <div className="text-green-600 dark:text-green-400 font-semibold mb-2">
                    ✅ ลงทะเบียนเรียบร้อยแล้ว!
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    กำลังนำทางไปยังหน้าเรียน...
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="text-center">
                <p
                  className="text-sm"
                  style={{ fontSize: typography.fontSize.sm, color: colors.text.tertiary }}
                >
                  ไม่มีค่าใช้จ่ายเพิ่มเติม
                </p>
                <p
                  className="text-xs mt-2"
                  style={{
                    fontSize: typography.fontSize.xs,
                    color: colors.text.tertiary,
                    marginTop: spacing.sm,
                  }}
                >
                  เข้าเรียนได้ทันทีหลังลงทะเบียน
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
