'use client';

import React from 'react';
import { AdminCard, AdminButton, AdminBadge } from '@/components/ui/admin';
import { Save, Bell, Smartphone, Mail } from 'lucide-react';

const notificationTypes = [
  { id: 'course_new', label: 'New Course Available', email: true, push: true },
  { id: 'assignment_deadline', label: 'Assignment Deadlines', email: true, push: true },
  { id: 'quiz_result', label: 'Quiz Results Posted', email: true, push: false },
  { id: 'cert_issued', label: 'Certificate Issued', email: true, push: true },
  { id: 'announcement', label: 'System Announcements', email: true, push: true },
  { id: 'login_alert', label: 'Suspicious Login Alert', email: true, push: false },
];

export default function NotificationSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Notification Settings</h1>
        <p className="text-sm text-gray-500">Control what alerts users receive and how delivered.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminCard title="Channels">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                  <p className="text-xs text-gray-500">Send alerts to registered email.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-maroon"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</h4>
                  <p className="text-xs text-gray-500">Browser and mobile app alerts.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-maroon"></div>
              </label>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Digest Options">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Summary Frequency</label>
              <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon">
                <option>Real-time (Immediately)</option>
                <option>Daily Digest (8:00 AM)</option>
                <option>Weekly Digest (Monday)</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">Applies to non-critical notifications only.</p>
            </div>
          </div>
        </AdminCard>
      </div>

      <AdminCard title="Notification Events">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 font-medium border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3">Event Type</th>
              <th className="px-4 py-3 text-center">Email</th>
              <th className="px-4 py-3 text-center">Push</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {notificationTypes.map((type) => (
              <tr key={type.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{type.label}</td>
                <td className="px-4 py-3 text-center">
                  <input type="checkbox" defaultChecked={type.email} className="rounded text-maroon focus:ring-maroon" />
                </td>
                <td className="px-4 py-3 text-center">
                  <input type="checkbox" defaultChecked={type.push} className="rounded text-maroon focus:ring-maroon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminCard>

      <div className="flex justify-end space-x-3">
        <AdminButton icon={<Save className="w-4 h-4" />}>Save Settings</AdminButton>
      </div>
    </div>
  );
}
