'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  BarChart2,
  Settings,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import { CreatorButton } from '@/components/ui/creator';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  // Check if current path starts with the href (to keep parent active for nested routes)
  // Strict equality for dashboard to avoid matching everything
  const isActive = href === '/course-creator'
    ? pathname === href
    : pathname.startsWith(href);

  return (
    <div className="mb-1">
      <Link
        href={href}
        className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive
          ? 'bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white shadow-md'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
      >
        <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} />
        {label}
      </Link>
    </div>
  );
};

export default function CourseCreatorLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex font-sans">
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#A21D21] to-[#7A1818] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-lg font-bold text-gray-800 dark:text-white">Creator Studio</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4 mt-2">Main</div>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/course-creator" />
          <SidebarItem icon={BookOpen} label="My Courses" href="/course-creator/courses" />
          <SidebarItem icon={FolderOpen} label="Content Library" href="/course-creator/library" />

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4 mt-6">Performance</div>
          <SidebarItem icon={BarChart2} label="Analytics" href="/course-creator/analytics" />

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4 mt-6">System</div>
          <SidebarItem icon={Settings} label="Settings" href="/course-creator/settings" />
          <SidebarItem icon={HelpCircle} label="Help & Resources" href="/course-creator/help" />
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10 rounded-lg transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Header */}
        <header className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex ml-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search your courses..."
                className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 border-none rounded-full text-sm focus:ring-2 focus:ring-[#A21D21]/50"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/course-creator/courses/create">
              <CreatorButton size="sm" icon={<Plus className="w-4 h-4" />}>Create Course</CreatorButton>
            </Link>
            <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
              <div className="w-8 h-8 rounded-full bg-[#A21D21]/10 flex items-center justify-center text-[#A21D21] font-semibold">
                JD
              </div>
              <div className="hidden md:block text-sm">
                <div className="font-medium text-gray-700 dark:text-gray-200">Jane Doe</div>
                <div className="text-xs text-gray-500">Instructor</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
