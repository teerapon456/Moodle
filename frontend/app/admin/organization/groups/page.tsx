'use client';

import React, { useState } from 'react';
import { AdminCard, AdminBadge, AdminButton, AdminInput, AdminModal } from '@/components/ui/admin';
import {
  Users,
  Search,
  Plus,
  LayoutGrid,
  List,
  MoreHorizontal,
  Settings,
  BookOpen
} from 'lucide-react';

const mockGroups = [
  { id: 1, name: 'Executive Team', type: 'Static', members: 20, courses: 5 },
  { id: 2, name: 'New Hires 2026', type: 'Dynamic', members: 50, courses: 3 },
  { id: 3, name: 'IT Security Team', type: 'Static', members: 8, courses: 10 },
  { id: 4, name: 'Remote Workers', type: 'Dynamic', members: 120, courses: 1 },
  { id: 5, name: 'Safety Committee', type: 'Static', members: 15, courses: 4 },
];

export default function GroupsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Groups Management</h1>
          <p className="text-gray-500 text-sm">Manage static and dynamic user groups for course assignments.</p>
        </div>
        <AdminButton icon={<Plus className="w-4 h-4" />} onClick={() => setModalOpen(true)}>
          Create Group
        </AdminButton>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search groups..."
            className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon/50"
          />
        </div>

        <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-maroon/10 text-maroon' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-maroon/10 text-maroon' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGroups.map((group) => (
            <AdminCard key={group.id} className="hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${group.type === 'Dynamic' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                  <Users className="w-6 h-6" />
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{group.name}</h3>
              <div className="flex items-center gap-2 mb-4">
                <AdminBadge variant={group.type === 'Dynamic' ? 'info' : 'default'} className="text-xs">
                  {group.type}
                </AdminBadge>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs text-gray-500 font-medium">
                      U{i + 1}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white dark:border-gray-800 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500 font-medium">
                    +{group.members - 4}
                  </div>
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {group.courses}
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      ) : (
        <AdminCard>
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 font-medium border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3">Group Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Members</th>
                <th className="px-4 py-3">Courses</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockGroups.map((group) => (
                <tr key={group.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{group.name}</td>
                  <td className="px-4 py-3">
                    <AdminBadge variant={group.type === 'Dynamic' ? 'info' : 'default'}>{group.type}</AdminBadge>
                  </td>
                  <td className="px-4 py-3">{group.members} Users</td>
                  <td className="px-4 py-3">{group.courses} Courses</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-gray-400 hover:text-maroon">
                      <Settings className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminCard>
      )}

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Create New Group"
        footer={
          <>
            <AdminButton variant="ghost" onClick={() => setModalOpen(false)}>Cancel</AdminButton>
            <AdminButton onClick={() => setModalOpen(false)}>Create Group</AdminButton>
          </>
        }
      >
        <div className="space-y-4">
          <AdminInput label="Group Name" placeholder="e.g. Interns 2026" />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Group Type</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-maroon bg-maroon/5 p-4 rounded-lg cursor-pointer">
                <div className="font-semibold text-maroon mb-1">Static</div>
                <p className="text-xs text-gray-500">Manually add specific users.</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:border-maroon/50 cursor-pointer">
                <div className="font-semibold text-gray-900 dark:text-white mb-1">Dynamic</div>
                <p className="text-xs text-gray-500">Auto-add based on rules.</p>
              </div>
            </div>
          </div>

          <AdminInput label="Description" placeholder=" Optional description" />
        </div>
      </AdminModal>
    </div>
  );
}
