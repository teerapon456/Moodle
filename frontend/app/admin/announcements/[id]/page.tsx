'use client';

import React, { use } from 'react';
import { AdminCard, AdminButton, AdminInput, AdminBadge } from '@/components/ui/admin';
import { Save, Eye, Trash2, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

export default function EditAnnouncementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/announcements">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Announcement</h1>
          <p className="text-gray-500 text-sm">Update content for ID: <span className="font-mono">{id}</span></p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <AdminCard title="Announcement Details">
            <div className="space-y-4">
              <AdminInput label="Title" defaultValue="System Maintenance" />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
                <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 p-2 flex space-x-2">
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xs font-bold">B</button>
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xs italic">I</button>
                  </div>
                  <textarea
                    className="w-full h-48 p-3 text-sm focus:outline-none dark:bg-gray-900 dark:text-white"
                    defaultValue="We will be performing scheduled maintenance on Sunday at 2:00 AM. Please save your work."
                  ></textarea>
                </div>
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Target & Schedule">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white" defaultValue="Critical">
                  <option>Normal</option>
                  <option>Important</option>
                  <option>Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Audience</label>
                <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <option>All Users</option>
                  <option>Instructors Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
                <input type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" defaultValue="2026-01-28" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
                <input type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" defaultValue="2026-01-29" />
              </div>
            </div>
          </AdminCard>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <AdminCard title="Status">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Current Status</span>
                <AdminBadge variant="success">Active</AdminBadge>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Posted by:</span>
                <span>Admin</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Views:</span>
                <span>1,245</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <AdminButton icon={<Save className="w-4 h-4" />}>Update Changes</AdminButton>
                <AdminButton variant="secondary" icon={<Send className="w-4 h-4" />}>Resend Notification</AdminButton>
                <AdminButton variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50" icon={<Trash2 className="w-4 h-4" />}>Delete Announcement</AdminButton>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
