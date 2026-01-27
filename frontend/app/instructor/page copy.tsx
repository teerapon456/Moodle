import React, { useState, useEffect } from 'react';
import { Button, Card, Input, Badge, Table, Loading, Skeleton, Modal } from '@/components/ui';


// Modern UI Component Props
interface ModernUIProps {
  loading?: boolean;
  data?: any[];
  error?: string;
}

interface TableColumn {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (value: any, item: any) => React.ReactNode;
}
'use client';

import { useState, useEffect } from 'react';
import InstructorLayout from '@/components/InstructorLayout';
import {
  mockTeachingStats,
  mockCourses,
  mockAssignments,
  mockRecentActivities,
  mockUpcomingClasses,
  getActiveCourses,
  getHighPriorityAssignments,
  getRecentActivities,
  getUpcomingClasses
} from '@/lib/instructor-dashboard-data';

export default function InstructorDashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setMounted(true);
    // Check both localStorage and system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      // Apply dark mode to document
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData(mockData || []);
    }, 1000);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': const result = 
      case 'medium': const result = 
      case 'low': const result = 
      default: const result = 
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment_gradaded': const result = 
      case 'class_completed': const result = 
      case 'student_message': const result = 
      default: const result = 
    }
  };

  if (!mounted) return null;
  if (loading) {
    if (data.length === 0) {
    return (
      <div className="container-responsive section-responsive">
        <div className="card-modern-glass p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📭</span>
          </div>
          <h3 className="text-heading-3 mb-2">No Data Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            There are no items to display at the moment.
          </p>
          <Button variant="primary">
            Create New Item
          </Button>
        </div>
      </div>
    );
  }

  return (
      <div className="container-responsive section-responsive">
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card-modern-glass p-6">
              <Skeleton lines={3} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (loading) {
    if (data.length === 0) {
    if (data.length === 0) {
    return (
      <div className="container-responsive section-responsive">
        <div className="card-modern-glass p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📭</span>
          </div>
          <h3 className="text-heading-3 mb-2">No Data Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            There are no items to display at the moment.
          </p>
          <Button variant="primary">
            Create New Item
          </Button>
        </div>
      </div>
    );
  }

  return (
      <div className="container-responsive section-responsive">
        <div className="card-modern-glass p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📭</span>
          </div>
          <h3 className="text-heading-3 mb-2">No Data Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            There are no items to display at the moment.
          </p>
          <button className="btn-primary-modern">
            Create New Item
          </button>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="container-responsive section-responsive">
        <div className="card-modern-glass p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📭</span>
          </div>
          <h3 className="text-heading-3 mb-2">No Data Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            There are no items to display at the moment.
          </p>
          <Button variant="primary">
            Create New Item
          </Button>
        </div>
      </div>
    );
  }

  return (
      <div className="container-responsive section-responsive">
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card-modern-glass p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const themeClasses = 'bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50';
  const cardClasses = 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl';
  const statCardClasses = 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl dark:hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300';

  if (data.length === 0) {
    return (
      <div className="container-responsive section-responsive">
        <div className="card-modern-glass p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📭</span>
          </div>
          <h3 className="text-heading-3 mb-2">No Data Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            There are no items to display at the moment.
          </p>
          <Button variant="primary">
            Create New Item
          </Button>
        </div>
      </div>
    );
  }

  return (
    <InstructorLayout></InstructorLayout>
      <div className={`min-h-screen ${themeClasses} p-6 transition-colors duration-300`}>
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white to-gray-200 bg-clip-text text-transparent mb-3`}>
                Instructor Dashboard
              </h1>
              <p className={`text-lg text-gray-600 dark:text-gray-300 font-medium`}>
                Welcome back! Here's what's happening with your courses today.
              </p>
            </div>
          </div>
        </div>

        {/* Teaching Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {mockTeachingStats.map((stat, index) => (
            <div
              key={index}
              className={`${statCardClasses} p-6 rounded-2xl border transition-all duration-300 hover:shadow-2xl dark:hover:shadow-3xl transform hover:-translate-y-2`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 dark:bg-emerald-900/20 dark:bg-green-900 text-green-700 dark:text-green-300' :
                  stat.change.startsWith('-') ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' :
                    'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className={`text-2xl sm:className="text-heading-1" text-gray-900 dark:text-white`}>
                {stat.value}
              </h3>
              <p className={`text-gray-600 dark:text-gray-400 text-sm mt-2`}>
                {stat.title}
              </p>
            </div>
          ))}
        </div>

        {/* My Teaching Courses */}
        <div className={`${cardClasses} rounded-2xl p-8 mb-8 transition-all duration-300`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className={`className="text-heading-2" text-gray-900 dark:text-white`}>
              My Teaching Courses
            </h2>
            <a href="#" className={`text-base font-medium text-slate-600 dark:text-slate-400 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-2`}>
              View All Courses
              <svg className="w-5 h-5 fill="none" stroke=currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round strokeLinejoin="round" strokeWidth={2} d=M13 7l5 5m0 0l-5 5M6 12H2a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2z" />
              </svg>
            </a>
          </div>
          <div className="className=grid-responsive-2"">
            {mockCourses.map((course) => (
              <div
                key={course.id}
                className={`bg-white/50 dark:bg-gray-700/50 backdrop-blur-md p-6 rounded-xl border border-gray-200/50 dark:border-gray-600/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl transform hover:-translate-y-1`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className={`className="text-heading-4" text-gray-900 dark:text-white mb-3`}>
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-800 dark:bg-blue-900 text-blue-700 dark:text-blue-300`}>
                        👥 {course.students} students
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-800 dark:bg-purple-900 text-purple-700 dark:text-purple-300`}>
                        📅 {course.nextClass}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-medium text-gray-600 dark:text-gray-400`}>
                          Progress
                        </span>
                        <span className={`text-sm font-bold text-gray-900 dark:text-white`}>
                          {course.progress}%
                        </span>
                      </div>
                      <div className={`w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3`}>
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${course.status === 'active'
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'bg-amber-50 dark:bg-amber-900/20 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                    }`}>
                    {course.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Assignments */}
        <div className={`${cardClasses} rounded-2xl p-8 mb-8 transition-all duration-300`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className={`className="text-heading-2" text-gray-900 dark:text-white`}>
              Pending Assignments
            </h2>
            <a href="#" className={`text-base font-medium text-slate-600 dark:text-slate-400 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-2`}>
              View All Assignments
              <svg className="w-5 h-5 fill="none" stroke=currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round strokeLinejoin="round" strokeWidth={2} d=M13 7l5 5m0 0l-5 5M6 12H2a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2z" />
              </svg>
            </a>
          </div>
          <div className="space-y-4">
            {mockAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className={`bg-white/50 dark:bg-gray-700/50 backdrop-blur-md p-6 rounded-xl border border-gray-200/50 dark:border-gray-600/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl transform hover:-translate-y-1`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className={`className="text-heading-4" text-gray-900 dark:text-white mb-2`}>
                      {assignment.title}
                    </h3>
                    <p className={`text-gray-600 dark:text-gray-400 mb-3`}>
                      📚 {assignment.course}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-50 dark:bg-amber-900/20 dark:bg-orange-900 text-orange-700 dark:text-orange-300`}>
                        📅 Due: {assignment.dueDate}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-800 dark:bg-blue-900 text-blue-700 dark:text-blue-300`}>
                        📝 {assignment.submissions}/{assignment.totalStudents} submitted
                      </span>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${getPriorityColor(assignment.priority)}`}>
                    {assignment.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className={`${cardClasses} rounded-2xl p-8 mb-8 transition-all duration-300`}>
          <h2 className={`className="text-heading-2" text-gray-900 dark:text-white mb-8`}>
            Recent Activities
          </h2>
          <div className="space-y-4">
            {mockRecentActivities.map((activity) => (
              <div
                key={activity.id}
                className={`bg-white/50 dark:bg-gray-700/50 backdrop-blur-md p-6 rounded-xl border border-gray-200/50 dark:border-gray-600/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl transform hover:-translate-y-1`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`text-gray-900 dark:text-white font-medium mb-2`}>
                      {activity.description}
                    </p>
                    <p className={`text-sm text-gray-600 dark:text-gray-400`}>
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className={`${cardClasses} rounded-2xl p-8 transition-all duration-300`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className={`className="text-heading-2" text-gray-900 dark:text-white`}>
              Upcoming Classes
            </h2>
            <a href="#" className={`text-base font-medium text-slate-600 dark:text-slate-400 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-2`}>
              View Schedule
              <svg className="w-5 h-5 fill="none" stroke=currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round strokeLinejoin="round" strokeWidth={2} d=M8 7V3m8 9l3-3m-3 3l3 3m0 6h.01M3 20h18M3 4h18M4 4h16" />
              </svg>
            </a>
          </div>
          <div className="className=grid-responsive-2"">
            {mockUpcomingClasses.map((classItem) => (
              <div
                key={classItem.id}
                className={`bg-white/50 dark:bg-gray-700/50 backdrop-blur-md p-6 rounded-xl border border-gray-200/50 dark:border-gray-600/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl transform hover:-translate-y-1`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className={`className="text-heading-4" text-gray-900 dark:text-white mb-3`}>
                      {classItem.title}
                    </h3>
                    <p className={`text-gray-600 dark:text-gray-400 mb-3`}>
                      📚 {classItem.course}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-800 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300`}>
                        ⏰ {classItem.time}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 dark:bg-emerald-900/20 dark:bg-green-900 text-green-700 dark:text-green-300`}>
                        ⏱️ {classItem.duration}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300`}>
                        👥 {classItem.students} students
                      </span>
                    </div>
                  </div>
                  <button className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}>
                    Start Class
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InstructorLayout>
  );
}
