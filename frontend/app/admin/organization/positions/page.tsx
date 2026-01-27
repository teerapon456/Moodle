'use client';

import React, { useState } from 'react';
import { AdminCard, AdminBadge, AdminButton, AdminInput, AdminModal } from '@/components/ui/admin';
import {
  Briefcase,
  Search,
  Plus,
  Edit2,
  Trash2,
  Award,
  BookOpen
} from 'lucide-react';

const mockPositions = [
  { id: 1, name: 'Director', level: 5, courses: 3, count: 2 },
  { id: 2, name: 'Manager', level: 4, courses: 5, count: 15 },
  { id: 3, name: 'Team Lead', level: 3, courses: 3, count: 30 },
  { id: 4, name: 'Senior Staff', level: 2, courses: 2, count: 100 },
  { id: 5, name: 'Staff', level: 1, courses: 2, count: 350 },
];

const LevelBadge = ({ level }: { level: number }) => {
  const colors = {
    5: 'bg-purple-100 text-purple-700 border-purple-200',
    4: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    3: 'bg-blue-100 text-blue-700 border-blue-200',
    2: 'bg-teal-100 text-teal-700 border-teal-200',
    1: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  // @ts-ignore
  const colorClass = colors[level] || colors[1];

  return (
    <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${colorClass}`}>
      Level {level}
    </span>
  );
}

export default function PositionsPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPos, setSelectedPos] = useState<any>(null);

  const handleEdit = (pos: any) => {
    setSelectedPos(pos);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Positions & Levels</h1>
          <p className="text-gray-500 text-sm">Define job titles, hierarchy levels, and required competencies.</p>
        </div>
        <AdminButton icon={<Plus className="w-4 h-4" />} onClick={() => { setSelectedPos(null); setModalOpen(true); }}>
          New Position
        </AdminButton>
      </div>

      <AdminCard>
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search positions..."
              className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon/50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-750 text-gray-500 font-medium border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4">Position Name</th>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4">Required Courses</th>
                <th className="px-6 py-4">Employees</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockPositions.map((pos) => (
                <tr key={pos.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-maroon/5 rounded-lg text-maroon mr-3">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{pos.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <LevelBadge level={pos.level} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {pos.courses} tracks
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <AdminBadge>{pos.count} People</AdminBadge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(pos)} className="text-gray-400 hover:text-blue-600 mr-3 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
        title={selectedPos ? "Edit Position" : "Create Position"}
        footer={
          <>
            <AdminButton variant="ghost" onClick={() => setModalOpen(false)}>Cancel</AdminButton>
            <AdminButton onClick={() => setModalOpen(false)}>Save Position</AdminButton>
          </>
        }
      >
        <div className="space-y-4">
          <AdminInput label="Position Title" defaultValue={selectedPos?.name} placeholder="e.g. Sales Manager" />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Level (Tier)</label>
            <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white" defaultValue={selectedPos?.level || "1"}>
              <option value="1">Level 1 - Entry</option>
              <option value="2">Level 2 - Senior</option>
              <option value="3">Level 3 - Lead</option>
              <option value="4">Level 4 - Manager</option>
              <option value="5">Level 5 - Director/Excecutive</option>
            </select>
          </div>

          <AdminInput label="Required Course Tracks" placeholder="Select courses..." />
        </div>
      </AdminModal>
    </div>
  );
}
