'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Settings,
  Users,
  FileText,
  Bell,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LogOut,
  Search,
  Activity,
  Megaphone,
  Network,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
  isActive?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, subItems, isActive }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(isActive);
  const pathname = usePathname();
  const hasSubItems = subItems && subItems.length > 0;
  const isCurrent = pathname === href || (hasSubItems && subItems.some(sub => pathname === sub.href));

  return (
    <div className="mb-1">
      {hasSubItems ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isCurrent
            ? 'bg-maroon/10 text-maroon dark:bg-maroon/20 dark:text-red-400'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
        >
          <div className="flex items-center">
            <Icon className={`w-5 h-5 mr-3 ${isCurrent ? 'text-maroon dark:text-red-400' : 'text-gray-400'}`} />
            {label}
          </div>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      ) : (
        <Link
          href={href}
          className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${pathname === href
            ? 'bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white shadow-md'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
        >
          <Icon className={`w-5 h-5 mr-3 ${pathname === href ? 'text-white' : 'text-gray-400'}`} />
          {label}
        </Link>
      )}

      {hasSubItems && isOpen && (
        <div className="mt-1 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700 space-y-1">
          {subItems.map((sub, idx) => (
            <Link
              key={idx}
              href={sub.href}
              className={`block px-4 py-2 text-sm rounded-lg transition-colors ${pathname === sub.href
                ? 'text-maroon font-medium bg-maroon/5 dark:text-red-400 dark:bg-maroon/10'
                : 'text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
            <div className="w-8 h-8 bg-maroon rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <span className="text-lg font-bold text-gray-800 dark:text-white">INTEQC Admin</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4 mt-2">Analytics</div>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/admin" />
          <SidebarItem icon={Activity} label="Reports" href="/admin/reports"
            subItems={[
              { label: 'Learner Progress', href: '/admin/reports/learners' },
              { label: 'Course Insights', href: '/admin/reports/courses' },
              { label: 'Assessment Scores', href: '/admin/reports/assessments' },
              { label: 'System Usage', href: '/admin/reports/usage' }
            ]}
          />

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4 mt-6">Learning Content</div>
          <SidebarItem icon={BookOpen} label="Courses" href="/admin/courses"
            subItems={[
              { label: 'All Courses', href: '/admin/courses' },
              { label: 'Categories', href: '/admin/courses/categories' },
              { label: 'Bundles', href: '/admin/courses/bundles' }
            ]}
          />
          <SidebarItem icon={FileText} label="Assessments" href="/admin/assessments"
            subItems={[
              { label: 'Quizzes', href: '/admin/assessments/quizzes' },
              { label: 'Assignments', href: '/admin/assessments/assignments' },
              { label: 'Question Bank', href: '/admin/assessments/questions' }
            ]}
          />
          <SidebarItem icon={Users} label="Live Sessions" href="/admin/live-sessions" />

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4 mt-6">People & Organization</div>
          <SidebarItem icon={Users} label="Users" href="/admin/users"
            subItems={[
              { label: 'All Users', href: '/admin/users' },
              { label: 'Instructors', href: '/admin/users/instructors' },
              { label: 'Learners', href: '/admin/users/learners' },
              { label: 'Admins', href: '/admin/users/admins' }
            ]}
          />
          <SidebarItem icon={Building2} label="Organization" href="/admin/organization"
            subItems={[
              { label: 'Structure', href: '/admin/organization' },
              { label: 'Departments', href: '/admin/organization/departments' },
              { label: 'Groups', href: '/admin/organization/groups' },
              { label: 'Positions', href: '/admin/organization/positions' },
            ]}
          />
          <SidebarItem icon={ShieldCheck} label="Access Control" href="/admin/roles" />

          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4 mt-6">System & Config</div>
          <SidebarItem icon={Settings} label="Configuration" href="/admin/settings"
            subItems={[
              { label: 'General Settings', href: '/admin/settings/general' },
              { label: 'Appearance', href: '/admin/settings/appearance' },
              { label: 'Notifications', href: '/admin/settings/notifications' },
              { label: 'Localization', href: '/admin/settings/localization' }
            ]}
          />
          <SidebarItem icon={Megaphone} label="Announcements" href="/admin/announcements" />
          <SidebarItem icon={Network} label="Integrations" href="/admin/integrations" />
          <SidebarItem icon={Activity} label="Logs & Audit" href="/admin/logs" />
          <SidebarItem icon={Building2} label="Maintenance" href="/admin/maintenance" />
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
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 bg-gray-100 dark:bg-gray-700 border-none rounded-full text-sm focus:ring-2 focus:ring-maroon/50"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
              <div className="w-8 h-8 rounded-full bg-maroon/10 flex items-center justify-center text-maroon font-semibold">
                A
              </div>
              <div className="hidden md:block text-sm">
                <div className="font-medium text-gray-700 dark:text-gray-200">Admin User</div>
                <div className="text-xs text-gray-500">Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
