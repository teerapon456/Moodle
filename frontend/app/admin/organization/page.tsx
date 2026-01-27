'use client';

import React, { useState } from 'react';
import { AdminCard, AdminBadge, AdminButton, AdminInput } from '@/components/ui/admin';
import {
  Building2,
  Users,
  Briefcase,
  MapPin,
  Search,
  ChevronRight,
  ChevronDown,
  MoreVertical,
  Plus
} from 'lucide-react';
import Link from 'next/link';

// Mock Data for Tree
const orgTreeData = {
  id: '1',
  name: 'CEO Office',
  type: 'Executive',
  head: 'Dr. Somchai',
  members: 5,
  children: [
    {
      id: '2',
      name: 'Human Resources',
      type: 'Department',
      head: 'Suda Jai',
      members: 25,
      children: [
        { id: '2.1', name: 'Recruitment', type: 'Team', head: 'John Doe', members: 10 },
        { id: '2.2', name: 'HRD', type: 'Team', head: 'Jane Smith', members: 15 },
      ]
    },
    {
      id: '3',
      name: 'Technology',
      type: 'Department',
      head: 'Vira Tech',
      members: 40,
      children: [
        {
          id: '3.1',
          name: 'Software Development',
          type: 'Division',
          head: 'Mana Dev',
          members: 15,
          children: [
            { id: '3.1.1', name: 'Frontend Team', type: 'Team', head: 'A', members: 8 },
            { id: '3.1.2', name: 'Backend Team', type: 'Team', head: 'B', members: 7 },
          ]
        },
        { id: '3.2', name: 'IT Support', type: 'Team', head: 'Manee Fix', members: 10 },
        { id: '3.3', name: 'Infrastructure', type: 'Team', head: 'Piti Ops', members: 15 },
      ]
    },
    {
      id: '4',
      name: 'Marketing',
      type: 'Department',
      head: 'Chujai Market',
      members: 30,
      children: []
    }
  ]
};

const TreeNode = ({ node, level = 0 }: { node: any, level?: number }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="relative">
      <div
        className={`flex items-center p-3 mb-2 rounded-lg border transition-all hover:shadow-md ${level === 0
            ? 'bg-maroon/5 border-maroon/20'
            : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 ml-6'
          }`}
      >
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mr-2 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        )}
        {!hasChildren && <div className="w-6 mr-2" />}

        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${level === 0 ? 'bg-maroon text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
              {node.name.substring(0, 1)}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{node.name}</h4>
              <p className="text-xs text-gray-500">{node.type} • Head: {node.head}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full flex items-center">
              <Users className="w-3 h-3 mr-1" />
              {node.members}
            </span>
            <button className="text-gray-400 hover:text-maroon">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="relative">
          {/* Vertical line connecting children */}
          <div className="absolute left-[1.6rem] top-0 bottom-4 w-px bg-gray-200 dark:bg-gray-700"></div>
          {node.children.map((child: any) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function OrganizationOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Organization Overview</h1>
          <p className="text-gray-500 dark:text-gray-400">Structure, departments and workforce distribution.</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search org..."
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-maroon/50 focus:outline-none"
            />
          </div>

          <AdminButton icon={<Plus className="w-4 h-4" />}>Add Unit</AdminButton>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/organization/departments" className="transition-transform hover:scale-105">
          <AdminCard className="h-full border-l-4 border-l-maroon">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Departments</p>
                <h3 className="text-2xl font-bold mt-1">10</h3>
              </div>
              <div className="p-2 bg-maroon/10 rounded-lg text-maroon">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
          </AdminCard>
        </Link>

        <Link href="/admin/organization/positions" className="transition-transform hover:scale-105">
          <AdminCard className="h-full border-l-4 border-l-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Positions</p>
                <h3 className="text-2xl font-bold mt-1">25</h3>
              </div>
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>
          </AdminCard>
        </Link>

        <Link href="/admin/organization/groups" className="transition-transform hover:scale-105">
          <AdminCard className="h-full border-l-4 border-l-orange-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Groups</p>
                <h3 className="text-2xl font-bold mt-1">8</h3>
              </div>
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </AdminCard>
        </Link>

        <Link href="/admin/organization/locations" className="transition-transform hover:scale-105">
          <AdminCard className="h-full border-l-4 border-l-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Locations</p>
                <h3 className="text-2xl font-bold mt-1">4</h3>
              </div>
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
          </AdminCard>
        </Link>
      </div>

      {/* Main Content Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Organization Chart */}
        <div className="lg:col-span-2">
          <AdminCard title="Organization Structure" action={<AdminButton variant="outline" size="sm">Export</AdminButton>}>
            <div className="mt-2">
              <TreeNode node={orgTreeData} />
            </div>
          </AdminCard>
        </div>

        {/* Quick Info / Stats */}
        <div className="lg:col-span-1 space-y-6">
          <AdminCard title="Workforce Distribution">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Technology</span>
                  <span className="font-medium text-gray-900 dark:text-white">40%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                  <div className="bg-maroon h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Marketing</span>
                  <span className="font-medium text-gray-900 dark:text-white">30%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">HR</span>
                  <span className="font-medium text-gray-900 dark:text-white">25%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Quick Actions">
            <div className="space-y-2">
              <AdminButton variant="ghost" className="w-full justify-start text-left" icon={<Building2 className="w-4 h-4" />}>
                Create New Department
              </AdminButton>
              <AdminButton variant="ghost" className="w-full justify-start text-left" icon={<Users className="w-4 h-4" />}>
                Assign Group Leader
              </AdminButton>
              <AdminButton variant="ghost" className="w-full justify-start text-left" icon={<Briefcase className="w-4 h-4" />}>
                Update Position Level
              </AdminButton>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
