'use client';

import React, { useState, use } from 'react';
import { AdminCard, AdminButton, AdminInput } from '@/components/ui/admin';
import { Save, ChevronLeft, Check } from 'lucide-react';
import Link from 'next/link';

const permissionsData = [
  {
    category: 'User Management',
    permissions: ['View Users', 'Create Users', 'Edit Users', 'Delete Users', 'Manage Groups']
  },
  {
    category: 'Course Management',
    permissions: ['View Courses', 'Create Courses', 'Edit Content', 'Publish Courses', 'Delete Courses']
  },
  {
    category: 'System',
    permissions: ['View Logs', 'Manage Settings', 'Manage Integrations', 'System Maintenance']
  }
];

// In Next.js 15+ async params are the default, but since this is a client component simplification
// we'll just mock it or assume simple usage. For strict Next 15 `params` is a Promise.
// We will use `use()` hook for params if we were fully rigorous, or just standard prop passing if pages setup differently.
// For this mockup, I'll cast it for simplicity or use React.use.

export default function RoleEditPage({ params }: { params: Promise<{ roleId: string }> }) {
  // Unwrap params using React.use() in Next.js 15/React 19 pattern
  const { roleId } = use(params);

  const [activeTab, setActiveTab] = useState<'permissions' | 'users'>('permissions');

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-2">
        <Link href="/admin/roles" className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800">
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configure Role</h1>
          <p className="text-gray-500 text-sm">Editing permissions for Role ID: <span className="font-mono">{roleId}</span></p>
        </div>
      </div>

      <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('permissions')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'permissions' ? 'border-maroon text-maroon' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Permissions
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'users' ? 'border-maroon text-maroon' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Assigned Users
        </button>
      </div>

      {activeTab === 'permissions' ? (
        <div className="space-y-6">
          {permissionsData.map((group) => (
            <AdminCard key={group.category} title={group.category} className="pb-2">
              <div className="space-y-3">
                {group.permissions.map((perm) => (
                  <div key={perm} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{perm}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-maroon"></div>
                    </label>
                  </div>
                ))}
              </div>
            </AdminCard>
          ))}

          <div className="flex justify-end p-4 bg-white dark:bg-gray-800 sticky bottom-0 border-t border-gray-100 shadow-lg">
            <AdminButton icon={<Save className="w-4 h-4" />}>Save Permissions</AdminButton>
          </div>
        </div>
      ) : (
        <AdminCard title="Users with this role">
          <div className="p-4 text-center text-gray-500">
            User assignment table placeholder.
          </div>
        </AdminCard>
      )}
    </div>
  );
}
