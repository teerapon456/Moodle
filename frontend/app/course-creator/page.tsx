'use client';

import React from 'react';
import Link from 'next/link';
import { CreatorCard, CreatorButton, CreatorBadge } from '@/components/ui/creator';
import {
  BookOpen,
  Plus,
  FileText,
  Archive,
  CheckCircle,
  Clock,
  Layout,
  MoreHorizontal,
  Edit,
  Eye,
  BarChart2,
  ArrowRight
} from 'lucide-react';

export default function CreatorDashboard() {
  const stats = [
    { label: 'Total Courses', value: 12, icon: BookOpen, color: 'text-blue-600 bg-blue-100' },
    { label: 'Published', value: 8, icon: CheckCircle, color: 'text-green-600 bg-green-100' },
    { label: 'Drafts', value: 3, icon: FileText, color: 'text-yellow-600 bg-yellow-100' },
    { label: 'Archived', value: 1, icon: Archive, color: 'text-gray-600 bg-gray-100' },
  ];

  const recentCourses = [
    {
      id: 101,
      title: 'Advanced React Design Patterns',
      status: 'Published',
      enrolled: 1240,
      updated: '2 hours ago',
      thumbnail: 'RP'
    },
    {
      id: 102,
      title: 'UI/UX Principles for Developers',
      status: 'Draft',
      enrolled: 0,
      updated: '1 day ago',
      thumbnail: 'UX'
    },
    {
      id: 103,
      title: 'Next.js 14 Full Course',
      status: 'Published',
      enrolled: 856,
      updated: '3 days ago',
      thumbnail: 'NJ'
    }
  ];

  const recentActivity = [
    { action: 'Published module "Hooks Deep Dive"', course: 'Advanced React Design Patterns', time: '2 hours ago' },
    { action: 'Updated description', course: 'UI/UX Principles', time: '5 hours ago' },
    { action: 'Created new draft', course: 'TypeScript Mastery', time: '1 day ago' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            Welcome, Jane!
            <span className="text-3xl animate-wave inline-block">👋</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Ready to share your knowledge? You have 3 drafts pending.</p>
        </div>
        <Link href="/course-creator/courses/create">
          <CreatorButton icon={<Plus className="w-5 h-5" />} size="lg">Create New Course</CreatorButton>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Recent Courses */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#A21D21]" /> Recent Courses
              </h2>
              <Link href="/course-creator/courses" className="text-sm text-[#A21D21] font-medium hover:underline flex items-center">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentCourses.map((course) => (
                <CreatorCard key={course.id} className="group flex flex-col h-full hover:border-[#A21D21] hover:scale-[1.01] cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#A21D21] to-[#7A1818] text-white flex items-center justify-center font-bold text-lg shadow-md">
                      {course.thumbnail}
                    </div>
                    <div className="flex gap-2">
                      <CreatorBadge variant={course.status === 'Published' ? 'success' : 'warning'}>{course.status}</CreatorBadge>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-[#A21D21] transition-colors">{course.title}</h3>
                  <div className="text-xs text-gray-500 flex items-center gap-3 mb-4">
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {course.updated}</span>
                    {course.status === 'Published' && <span className="flex items-center text-blue-600"><Eye className="w-3 h-3 mr-1" /> {course.enrolled} joined</span>}
                  </div>

                  <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex gap-2">
                    <Link href={`/course-creator/${course.id}`} className="flex-1">
                      <button className="w-full py-1.5 px-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1">
                        <Edit className="w-3 h-3" /> Edit
                      </button>
                    </Link>
                    <button className="flex-1 py-1.5 px-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1">
                      <Eye className="w-3 h-3" /> Preview
                    </button>
                  </div>
                </CreatorCard>
              ))}

              {/* Create New Card */}
              <Link href="/course-creator/courses/create" className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-[#A21D21] hover:text-[#A21D21] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer h-full min-h-[180px]">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-2 group-hover:bg-[#A21D21]/10">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="font-semibold">Create New Course</span>
              </Link>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold mb-1">💡 Creator Tip of the Day</h3>
                <p className="text-indigo-100 max-w-lg">Engage your students by adding a Quiz after every major module. Courses with quizzes have 40% higher completion rates!</p>
              </div>
              <CreatorButton className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-none border-0 hidden sm:flex">
                Read Best Practices
              </CreatorButton>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* Recent Activity */}
          <CreatorCard title="Recent Activity" className="h-fit">
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex gap-3 pb-3 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                  <div className="mt-1 min-w-[8px] h-2 rounded-full bg-[#A21D21]"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-xs text-gray-500 mb-1">{activity.course}</p>
                    <p className="text-[10px] text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-center text-xs font-semibold text-[#A21D21] hover:underline">View All History</button>
          </CreatorCard>

          {/* Templates */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Quick Start Templates</h3>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 hover:border-[#A21D21] cursor-pointer transition-colors flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Layout className="w-4 h-4" /></div>
              <div>
                <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200">Standard Course</h4>
                <p className="text-xs text-gray-500">Video + Quiz structure</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 hover:border-[#A21D21] cursor-pointer transition-colors flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><FileText className="w-4 h-4" /></div>
              <div>
                <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200">Assessment Only</h4>
                <p className="text-xs text-gray-500">Exam based structure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
