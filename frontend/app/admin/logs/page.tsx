'use client';

import React from 'react';
import { AdminCard, AdminBadge, AdminButton, AdminInput } from '@/components/ui/admin';
import { Search, Filter, Download } from 'lucide-react';

const mockLogs = [
  { id: 1, user: 'Somchai', action: 'Login', desc: 'Logged in successfully', ip: '192.168.1.1', status: 'Success', time: '10:30 AM' },
  { id: 2, user: 'Admin', action: 'Create User', desc: 'Created user: Manee', ip: '10.0.0.55', status: 'Success', time: '10:25 AM' },
  { id: 3, user: 'Vira', action: 'Update Course', desc: 'Updated course: Communication', ip: '192.168.1.12', status: 'Success', time: '10:20 AM' },
  { id: 4, user: 'System', action: 'Backup', desc: 'Daily backup failed', ip: 'localhost', status: 'Failed', time: '03:00 AM' },
];

export default function ActivityLogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activity Logs</h1>
          <p className="text-gray-500 text-sm">Monitor system usage and user actions.</p>
        </div>
        <AdminButton variant="outline" icon={<Download className="w-4 h-4" />}>
          Export CSV
        </AdminButton>
      </div>

      <AdminCard>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon/50"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon">
              <option value="all">All Actions</option>
              <option value="login">Login</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
            </select>
            <AdminButton variant="secondary" icon={<Filter className="w-4 h-4" />}>Filter</AdminButton>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-750 text-gray-500 font-medium border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">IP Address</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                    2026-01-26 <br /> {log.time}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {log.user}
                  </td>
                  <td className="px-6 py-4">
                    <AdminBadge variant="outline">{log.action}</AdminBadge>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    {log.desc}
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                    {log.ip}
                  </td>
                  <td className="px-6 py-4">
                    <AdminBadge variant={log.status === 'Success' ? 'success' : 'error'}>
                      {log.status}
                    </AdminBadge>
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
