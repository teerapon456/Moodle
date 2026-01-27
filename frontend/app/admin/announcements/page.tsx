'use client';

import React, { useState } from 'react';
import { AdminCard, AdminBadge, AdminButton } from '@/components/ui/admin';
import { Megaphone, Plus, Calendar, Clock, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

const mockAnnouncements = [
  { id: 1, title: 'System Maintenance', status: 'Active', priority: 'Critical', full_date: 'Jan 28, 2026 - Jan 29, 2026' },
  { id: 2, title: 'New Course: Leadership 101', status: 'Draft', priority: 'Normal', full_date: 'Feb 01, 2026 (Scheduled)' },
  { id: 3, title: 'Security Policy Update', status: 'Active', priority: 'Important', full_date: 'Jan 15, 2026 - Feb 15, 2026' },
  { id: 4, title: 'Holiday Closure', status: 'Expired', priority: 'Normal', full_date: 'Dec 25, 2025 - Jan 01, 2026' },
];

export default function AnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Announcements</h1>
          <p className="text-gray-500 text-sm">Manage system-wide broadcasts and user notifications.</p>
        </div>
        <Link href="/admin/announcements/create">
          <AdminButton icon={<Plus className="w-4 h-4" />}>
            Create Announcement
          </AdminButton>
        </Link>
      </div>

      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-750 text-gray-500 font-medium border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockAnnouncements.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center font-medium text-gray-900 dark:text-white">
                      <Megaphone className="w-4 h-4 mr-3 text-gray-400" />
                      {item.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <AdminBadge variant={
                      item.status === 'Active' ? 'success' :
                        item.status === 'Draft' ? 'warning' : 'default'
                    }>
                      {item.status}
                    </AdminBadge>
                  </td>
                  <td className="px-6 py-4">
                    <AdminBadge variant={
                      item.priority === 'Critical' ? 'error' :
                        item.priority === 'Important' ? 'info' : 'outline'
                    }>
                      {item.priority}
                    </AdminBadge>
                  </td>
                  <td className="px-6 py-4 text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-2" />
                    {item.full_date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 mr-3 p-1 rounded hover:bg-blue-50">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
