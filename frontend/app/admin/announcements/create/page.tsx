'use client';

import React, { useState } from 'react';
import { AdminCard, AdminButton, AdminInput } from '@/components/ui/admin';
import { Save, Eye, Calendar, Users, Type, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateAnnouncementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/announcements">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Announcement</h1>
          <p className="text-gray-500 text-sm">Compose message and schedule broadcast.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <AdminCard title="Announcement Details">
            <div className="space-y-4">
              <AdminInput label="Title" placeholder="e.g. System Maintenance Update" />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
                <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 p-2 flex space-x-2">
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xs font-bold">B</button>
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xs italic">I</button>
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xs underline">U</button>
                  </div>
                  <textarea
                    className="w-full h-48 p-3 text-sm focus:outline-none dark:bg-gray-900 dark:text-white"
                    placeholder="Write your announcement here..."
                  ></textarea>
                </div>
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <option>Normal</option>
                  <option>Important (Orange highlight)</option>
                  <option>Critical (Red Banner)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Display Type</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="radio" name="type" className="text-maroon focus:ring-maroon" defaultChecked />
                    <span>Banner</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="radio" name="type" className="text-maroon focus:ring-maroon" />
                    <span>Popup Modal</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
                <input type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
                <input type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Audience</label>
                <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  <option>All Users</option>
                  <option>Instructors Only</option>
                  <option>Department: Technology</option>
                </select>
              </div>
            </div>
          </AdminCard>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <div className="sticky top-6">
            <AdminCard title="Publishing">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">Draft</span>
                </div>
                <div className="flex flex-col gap-2">
                  <AdminButton variant="primary" icon={<Save className="w-4 h-4" />}>Publish Now</AdminButton>
                  <AdminButton variant="outline" icon={<Eye className="w-4 h-4" />}>Preview</AdminButton>
                  <AdminButton variant="ghost" className="text-gray-500">Save as Draft</AdminButton>
                </div>
              </div>
            </AdminCard>
          </div>
        </div>
      </div>
    </div>
  );
}
