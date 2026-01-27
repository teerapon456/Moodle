'use client';

import React, { useState } from 'react';
import { AdminCard, AdminBadge, AdminButton, AdminInput, AdminModal } from '@/components/ui/admin';
import { Shield, Plus, Copy, Settings, Trash2, Edit2, Users } from 'lucide-react';
import Link from 'next/link';

const mockRoles = [
  { id: 1, name: 'Super Admin', description: 'Full access to all system resources.', count: 2, type: 'System', protected: true },
  { id: 2, name: 'Instructor', description: 'Can create and manage own courses.', count: 25, type: 'System', protected: true },
  { id: 3, name: 'Learner', description: 'Can enroll and view courses.', count: 500, type: 'System', protected: true },
  { id: 4, name: 'Department Manager', description: 'Can view department reports and users.', count: 12, type: 'Custom', protected: false },
  { id: 5, name: 'Content Creator', description: 'Can create content but needs approval.', count: 5, type: 'Custom', protected: false },
];

export default function RolesPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  const handleEdit = (role: any) => {
    // Navigate to permission edit or open modal for rename? 
    // Usually edit settings -> rename, click role -> detailed permissions
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Roles & Permissions</h1>
          <p className="text-gray-500 text-sm">Manage user roles and access control policies.</p>
        </div>
        <AdminButton icon={<Plus className="w-4 h-4" />} onClick={() => setModalOpen(true)}>
          Create Custom Role
        </AdminButton>
      </div>

      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-750 text-gray-500 font-medium border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4">Role Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Users</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockRoles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 mr-3">
                        <Shield className="w-4 h-4" />
                      </div>
                      <Link href={`/admin/roles/${role.id}`} className="font-medium text-gray-900 dark:text-white hover:text-maroon dark:hover:text-red-400">
                        {role.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 w-1/3">
                    {role.description}
                  </td>
                  <td className="px-6 py-4">
                    <AdminBadge variant="outline" className="flex items-center w-fit">
                      <Users className="w-3 h-3 mr-1" />
                      {role.count}
                    </AdminBadge>
                  </td>
                  <td className="px-6 py-4">
                    <AdminBadge variant={role.type === 'System' ? 'default' : 'info'}>
                      {role.type}
                    </AdminBadge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link href={`/admin/roles/${role.id}`}>
                        <button className="p-2 text-gray-400 hover:text-maroon hover:bg-maroon/5 rounded transition-colors" title="Configure Permissions">
                          <Settings className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Clone Role">
                        <Copy className="w-4 h-4" />
                      </button>
                      {!role.protected && (
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete Role">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Custom Role"
        footer={
          <>
            <AdminButton variant="ghost" onClick={() => setModalOpen(false)}>Cancel</AdminButton>
            <AdminButton onClick={() => setModalOpen(false)}>Create Role</AdminButton>
          </>
        }
      >
        <div className="space-y-4">
          <AdminInput label="Role Name" placeholder="e.g. Area Manager" />
          <AdminInput label="Description" placeholder="Briefly describe the role's purpose" />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Clone Permissions From</label>
            <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <option value="">(None - Start Empty)</option>
              <option value="1">Department Manager</option>
              <option value="2">Instructor</option>
            </select>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
