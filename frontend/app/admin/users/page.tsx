'use client';

import React, { useState } from 'react';
import { AdminCard, AdminBadge, AdminButton, AdminInput } from '@/components/ui/admin';
import { Users, UserPlus, Upload, Search, Filter, MoreHorizontal, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

const users = [
  { id: 1, name: 'Somchai Jaidee', email: 'somchai@company.com', role: 'Learner', department: 'Production', position: 'Staff', status: 'Active', lastActive: '2h ago' },
  { id: 2, name: 'Somying Rakngan', email: 'somying@company.com', role: 'Instructor', department: 'HR', position: 'Trainer', status: 'Active', lastActive: '1d ago' },
  { id: 3, name: 'Arjan Sorndee', email: 'teacher@company.com', role: 'Creator', department: 'HR', position: 'Curriculum Dev', status: 'Active', lastActive: '5m ago' },
  { id: 4, name: 'Admin User', email: 'admin@company.com', role: 'Admin', department: 'IT', position: 'System Admin', status: 'Active', lastActive: 'Just now' },
  { id: 5, name: 'Manee Sukjai', email: 'manee@company.com', role: 'Learner', department: 'Marketing', position: 'Marketer', status: 'Inactive', lastActive: '1 week ago' },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-500 text-sm">Manage user accounts, roles, and status.</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/admin/users/bulk-import">
            <AdminButton variant="outline" icon={<Upload className="w-4 h-4" />}>
              Import
            </AdminButton>
          </Link>
          <Link href="/admin/users/create">
            <AdminButton icon={<UserPlus className="w-4 h-4" />}>
              Add User
            </AdminButton>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AdminCard className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">1,250</h4>
          </div>
        </AdminCard>
        <AdminCard className="flex items-center space-x-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active</p>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">890</h4>
          </div>
        </AdminCard>
        <AdminCard className="flex items-center space-x-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Instructors</p>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">45</h4>
          </div>
        </AdminCard>
        <AdminCard className="flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Learners</p>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">1,150</h4>
          </div>
        </AdminCard>
      </div>

      <AdminCard>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon/50"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon">
              <option>All Roles</option>
              <option>Admin</option>
              <option>Instructor</option>
              <option>Learner</option>
            </select>
            <select className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-750 text-gray-500 font-medium border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <AdminBadge variant={
                      user.role === 'Admin' ? 'error' :
                        user.role === 'Instructor' ? 'success' :
                          user.role === 'Creator' ? 'warning' : 'info'
                    }>
                      {user.role}
                    </AdminBadge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900 dark:text-white">{user.department}</div>
                    <div className="text-xs text-gray-500">{user.position}</div>
                  </td>
                  <td className="px-6 py-4">
                    <AdminBadge variant={user.status === 'Active' ? 'success' : 'default'} className="rounded-full">
                      {user.status}
                    </AdminBadge>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-maroon p-2 rounded hover:bg-maroon/5">
                      <MoreHorizontal className="w-4 h-4" />
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
