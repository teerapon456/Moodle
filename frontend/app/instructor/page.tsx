'use client';

import React, { useState, useEffect } from 'react';
import InstructorLayout from '@/components/InstructorLayout';
import InstructorCalendar from '@/components/InstructorCalendar';
import { Button, Skeleton } from '@/components/ui';
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

export default function InstructorDashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    assignments: any[];
    activities: any[];
    classes: any[];
  }>({ assignments: [], activities: [], classes: [] });
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');

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
      setData({
        assignments: mockAssignments,
        activities: mockRecentActivities,
        classes: mockUpcomingClasses
      });
    }, 1000);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment_gradaded': return '📝';
      case 'class_completed': return '✅';
      case 'student_message': return '💬';
      default: return '📋';
    }
  };

  // Calendar functions
  const navigateMonth = (direction: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
  };

  const getFilteredData = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (selectedPeriod) {
      case 'day':
        return {
          courses: mockCourses.filter(c => c.nextClass === 'Today'),
          assignments: mockAssignments.filter(a => a.dueDate === 'Today'),
          activities: mockRecentActivities.filter(a => a.timestamp.includes('Today')),
          classes: mockUpcomingClasses.filter(c => c.time.includes('Today'))
        };
      case 'week':
        const weekFromNow = new Date(today);
        weekFromNow.setDate(weekFromNow.getDate() + 7);
        return {
          courses: mockCourses.slice(0, 3),
          assignments: mockAssignments.slice(0, 3),
          activities: mockRecentActivities.slice(0, 3),
          classes: mockUpcomingClasses.slice(0, 3)
        };
      case 'month':
        return {
          courses: mockCourses.slice(0, 4),
          assignments: mockAssignments.slice(0, 4),
          activities: mockRecentActivities.slice(0, 4),
          classes: mockUpcomingClasses.slice(0, 4)
        };
      case 'year':
        return {
          courses: mockCourses,
          assignments: mockAssignments,
          activities: mockRecentActivities,
          classes: mockUpcomingClasses
        };
      default:
        return {
          courses: mockCourses,
          assignments: mockAssignments,
          activities: mockRecentActivities,
          classes: mockUpcomingClasses
        };
    }
  };

  const filteredData = getFilteredData();

  if (!mounted) return null;

  if (loading) {
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

  if (!Object.keys(data).length || (data.assignments.length === 0 && data.activities.length === 0 && data.classes.length === 0)) {
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
    <InstructorLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#A21D21] dark:text-[#C92828] mb-4">
                Instructor Dashboard
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Welcome back! Here's what's happening with your courses today.
              </p>
            </div>

            {/* Period Selector */}
            <div className="flex items-center gap-4">
              <div className="inline-flex rounded-2xl border border-gray-200/60 dark:border-gray-700/60 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-1.5 shadow-xl">
                {['day', 'week', 'month', 'year'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${selectedPeriod === period
                      ? 'bg-[#A21D21] text-white shadow-lg scale-105 hover:bg-[#7A1818]'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
                      }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Teaching Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {mockTeachingStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#A21D21]/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl text-gray-600 dark:text-gray-400">
                    {stat.icon}
                  </span>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' :
                    stat.change.startsWith('-') ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800' :
                      'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Courses & Deadlines */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Teaching Courses */}
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 rounded-3xl p-8 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-heading-2 text-gray-900 dark:text-gray-50 mb-2">
                    My Courses
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage and track your active courses
                  </p>
                </div>
                <a href="#" className="text-sm font-semibold text-[#A21D21] dark:text-[#C92828] hover:text-[#7A1818] dark:hover:text-[#E53E3E] flex items-center gap-2 group">
                  View all
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div className="space-y-4">
                {mockCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-heading-4 text-gray-900 dark:text-gray-50 mb-3 group-hover:text-[#A21D21] dark:group-hover:text-[#C92828] transition-colors">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800">
                            👥 {course.students} students
                          </span>
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800">
                            📅 {course.nextClass}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Progress
                            </span>
                            <span className="text-sm font-bold text-gray-900 dark:text-gray-50">
                              {course.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-[#A21D21] h-2 rounded-full transition-all duration-500 hover:bg-[#7A1818]"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${course.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                        }`}>
                        {course.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 rounded-3xl p-8 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-heading-2 text-gray-900 dark:text-gray-50 mb-2">
                    Upcoming Deadlines
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Assignment due dates and priorities
                  </p>
                </div>
                <a href="#" className="text-sm font-semibold text-[#A21D21] dark:text-[#C92828] hover:text-[#7A1818] dark:hover:text-[#E53E3E] flex items-center gap-2 group">
                  View all
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div className="space-y-4">
                {filteredData.assignments.slice(0, 3).map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${assignment.priority === 'high' ? 'bg-[#A21D21] hover:bg-[#7A1818]' : assignment.priority === 'medium' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'} transition-colors`}>
                        {assignment.title.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-50 mb-1 group-hover:text-[#A21D21] dark:group-hover:text-[#C92828] transition-colors">
                          {assignment.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {assignment.course}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-gray-50 mb-2">
                        {assignment.dueDate}
                      </p>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getPriorityColor(assignment.priority)}`}>
                        {assignment.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Activity & Schedule */}
          <div className="space-y-8">
            {/* Recent Activities */}
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 rounded-3xl p-8 shadow-xl">
              <div className="mb-8 sm:mb-12">
                <h2 className="text-heading-2 text-gray-900 dark:text-gray-50 mb-2">
                  Recent Activity
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Latest teaching activities
                </p>
              </div>
              <div className="space-y-4">
                {filteredData.activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl hover:shadow-md transition-all duration-300"
                  >
                    <div className="text-2xl text-gray-600 dark:text-gray-400">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-gray-50 mb-1">
                        {activity.description}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Classes */}
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 rounded-3xl p-8 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-heading-2 text-gray-900 dark:text-gray-50 mb-2">
                    Today's Classes
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Scheduled teaching sessions
                  </p>
                </div>
                <a href="#" className="text-sm font-semibold text-[#A21D21] dark:text-[#C92828] hover:text-[#7A1818] dark:hover:text-[#E53E3E] flex items-center gap-2 group">
                  Schedule
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div className="space-y-4">
                {filteredData.classes.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="mb-4 sm:mb-6">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">
                        {classItem.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {classItem.course}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        ⏰ {classItem.time}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        ⏱️ {classItem.duration}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        👥 {classItem.students} students
                      </span>
                    </div>
                    <button className="w-full px-4 py-2.5 bg-[#A21D21] hover:bg-[#7A1818] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                      Start Class
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Tab Content */}
        {activeTab === 'schedule' && (
          <InstructorCalendar
            currentDate={currentDate}
            onMonthChange={navigateMonth}
            calendarView={calendarView}
            onViewChange={setCalendarView}
          />
        )}
      </div>
    </InstructorLayout>
  );
}
