'use client';

import React, { useState } from 'react';
import { AdminCard, AdminBadge, AdminButton, AdminInput, AdminModal } from '@/components/ui/admin';
import {
  Building2,
  Search,
  Plus,
  MoreHorizontal,
  Edit2,
  Trash2,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const departmentTree = [
  { id: 1, name: 'Human Resources', children: [] },
  {
    id: 2, name: 'Technology', children: [
      { id: 3, name: 'Software Development', children: [] },
      { id: 4, name: 'IT Support', children: [] },
    ]
  },
  { id: 5, name: 'Marketing', children: [] },
];

const mockDepartments = [
  { id: 101, name: 'Recruitment', parent: 'Human Resources', manager: 'Somchai', members: 12 },
  { id: 102, name: 'HRD', parent: 'Human Resources', manager: 'Suda', members: 8 },
  { id: 103, name: 'Frontend Team', parent: 'Software Development', manager: 'Mana', members: 15 },
  { id: 104, name: 'Backend Team', parent: 'Software Development', manager: 'Piti', members: 12 },
];

// Simple Tree Component for Sidebar
const SidebarTree = ({ nodes }: { nodes: any[] }) => {
  return (
    <ul className="space-y-1">
      {nodes.map((node) => (
        <li key={node.id}>
          <div className="flex items-center px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-200">
            {node.children && node.children.length > 0 ? <ChevronDown className="w-4 h-4 mr-1 text-gray-400" /> : <Building2 className="w-4 h-4 mr-1 text-gray-400" />}
            {node.name}
          </div>
          {node.children && node.children.length > 0 && (
            <div className="pl-4 border-l border-gray-200 dark:border-gray-700 ml-2">
              <SidebarTree nodes={node.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default function DepartmentsPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<any>(null);

  const handleEdit = (dept: any) => {
    setSelectedDept(dept);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedDept(null);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Sidebar Tree View */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <AdminCard className="h-full overflow-y-auto" title="Structure">
          <SidebarTree nodes={departmentTree} />
        </AdminCard>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Departments</h1>
            <p className="text-gray-500 text-sm">Manage department structure and details.</p>
          </div>
          <AdminButton icon={<Plus className="w-4 h-4" />} onClick={handleAdd}>Add Department</AdminButton>
        </div>

        <AdminCard className="flex-1 flex flex-col min-h-0">
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search departments..."
                className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon/50"
              />
            </div>
          </div>

          {/* Table */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex-1 overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Department Name</th>
                  <th className="px-6 py-3">Parent Dept</th>
                  <th className="px-6 py-3">Manager</th>
                  <th className="px-6 py-3 text-center">Members</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
                {mockDepartments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">{dept.name}</td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-300">{dept.parent}</td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                        {dept.manager.charAt(0)}
                      </div>
                      {dept.manager}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <AdminBadge variant="default">{dept.members} Users</AdminBadge>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button onClick={() => handleEdit(dept)} className="text-blue-600 hover:text-blue-800 mr-3 p-1 rounded hover:bg-blue-50">
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

      {/* Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedDept ? "Edit Department" : "New Department"}
        footer={
          <>
            <AdminButton variant="ghost" onClick={() => setModalOpen(false)}>Cancel</AdminButton>
            <AdminButton onClick={() => setModalOpen(false)}>Save Changes</AdminButton>
          </>
        }
      >
        <div className="space-y-4">
          <AdminInput label="Department Name" defaultValue={selectedDept?.name} placeholder="e.g. Creative Design" />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Department</label>
            <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <option value="">None (Top Level)</option>
              <option value="hr">Human Resources</option>
              <option value="tech">Technology</option>
            </select>
          </div>

          <AdminInput label="Manager Assignment" defaultValue={selectedDept?.manager} placeholder="Search user..." />
        </div>
      </AdminModal>
    </div>
  );
}
