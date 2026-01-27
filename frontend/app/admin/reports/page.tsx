'use client';

import React, { useState } from 'react';
import { AdminCard, AdminBadge, AdminButton } from '@/components/ui/admin';
import { FileText, Download, Filter, ChevronRight, BarChart2 } from 'lucide-react';

const reportGroups = [
  {
    title: 'User Reports',
    description: 'Registration, activity, and engagement metrics.',
    reports: [
      { name: 'User Registration Summary', freq: 'Monthly', lastRun: '2 days ago' },
      { name: 'Active Users Detail', freq: 'Daily', lastRun: 'Today' },
      { name: 'Role Distribution', freq: 'On Demand', lastRun: 'Never' },
    ]
  },
  {
    title: 'Course Reports',
    description: 'Enrollment, completion, and revenue data.',
    reports: [
      { name: 'Course Enrollment Stats', freq: 'Weekly', lastRun: 'Yesterday' },
      { name: 'Course Completion Rates', freq: 'Monthly', lastRun: 'Jan 1, 2026' },
      { name: 'Quiz Performance Analysis', freq: 'On Demand', lastRun: 'Last week' },
    ]
  },
  {
    title: 'System Reports',
    description: 'Technical performance, errors, and audits.',
    reports: [
      { name: 'System Error Log', freq: 'Daily', lastRun: 'Today' },
      { name: 'Audit Trail Export', freq: 'Weekly', lastRun: 'Jan 20, 2026' },
    ]
  }
];

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports Center</h1>
          <p className="text-gray-500 text-sm">Generate and export system data.</p>
        </div>
        <div className="flex space-x-2">
          <AdminButton variant="outline" icon={<Filter className="w-4 h-4" />}>
            Filter
          </AdminButton>
          <AdminButton icon={<Download className="w-4 h-4" />}>
            Export All
          </AdminButton>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reportGroups.map((group) => (
          <AdminCard key={group.title} title={group.title} className="overflow-hidden">
            <p className="text-sm text-gray-500 mb-4 -mt-2">{group.description}</p>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {group.reports.map((report) => (
                <div key={report.name} className="py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-6 px-6 transition-colors group cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500 group-hover:text-maroon group-hover:bg-maroon/10 transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">{report.name}</h4>
                      <div className="flex items-center text-xs text-gray-500 mt-0.5">
                        <span className="mr-3">Frequency: {report.freq}</span>
                        <span>Last Run: {report.lastRun}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs font-medium text-maroon hover:underline">Run Now</button>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
