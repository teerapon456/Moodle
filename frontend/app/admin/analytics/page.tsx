'use client';

import React, { useState } from 'react';
import { AdminCard, AdminButton, AdminBadge } from '@/components/ui/admin';
import { Download, TrendingUp, Users, BookOpen, Clock, Calendar } from 'lucide-react';

const analyticsData = {
  overview: {
    totalUsers: 1250,
    activeUsers: 890,
    completionRate: 72,
    averageRating: 4.6,
  },
  userGrowth: [
    { month: 'Jan', users: 850, new: 45 },
    { month: 'Feb', users: 920, new: 70 },
    { month: 'Mar', users: 1050, new: 130 },
    { month: 'Apr', users: 1180, new: 130 },
    { month: 'May', users: 1250, new: 70 },
  ],
  coursePerformance: [
    { title: 'Effective Team Management', enrollments: 1250, completions: 890, rating: 4.8 },
    { title: 'Python Programming', enrollments: 2100, completions: 1680, rating: 4.9 },
    { title: 'Digital Marketing', enrollments: 890, completions: 623, rating: 4.5 },
    { title: 'Personal Finance', enrollments: 650, completions: 455, rating: 4.6 },
  ]
};

export default function AdminAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-500 text-sm">System performance and usage statistics.</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <AdminButton icon={<Download className="w-4 h-4" />}>
            Export Report
          </AdminButton>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminCard>
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-500">Total Users</p>
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{analyticsData.overview.totalUsers.toLocaleString()}</h3>
          <p className="text-xs text-green-500 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +12% vs last month
          </p>
        </AdminCard>

        <AdminCard>
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-500">Active Learners</p>
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{analyticsData.overview.activeUsers.toLocaleString()}</h3>
          <p className="text-xs text-gray-400">
            71.2% of total users
          </p>
        </AdminCard>

        <AdminCard>
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-500">Completion Rate</p>
            <div className="p-2 bg-maroon/10 text-maroon rounded-lg">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{analyticsData.overview.completionRate}%</h3>
          <p className="text-xs text-green-500 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +5% improvement
          </p>
        </AdminCard>

        <AdminCard>
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-gray-500">Avg. Rating</p>
            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{analyticsData.overview.averageRating}</h3>
          <div className="flex text-yellow-400 text-xs">★★★★★</div>
        </AdminCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart Placeholder */}
        <AdminCard title="User Growth">
          <div className="h-64 flex items-end space-x-4 px-4 pb-2 border-b border-gray-100 dark:border-gray-700">
            {analyticsData.userGrowth.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-t-lg relative h-full flex items-end overflow-hidden">
                  <div
                    className="w-full bg-maroon/80 group-hover:bg-maroon transition-all duration-500 rounded-t-sm"
                    style={{ height: `${(item.users / 1300) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{item.month}</span>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Top Courses List */}
        <AdminCard title="Top Performing Courses">
          <div className="space-y-4">
            {analyticsData.coursePerformance.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">{course.title}</h4>
                  <p className="text-xs text-gray-500">{course.enrollments.toLocaleString()} enrolled</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{course.rating} ⭐</div>
                  <p className="text-xs text-green-600">{course.completions} completed</p>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
