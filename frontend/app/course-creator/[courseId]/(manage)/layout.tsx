'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, Eye, Settings as SettingsIcon, UploadCloud } from 'lucide-react';
import { CreatorButton, CreatorBadge } from '@/components/ui/creator';

export default function CourseManageLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  const pathname = usePathname();
  const basePath = `/course-creator/${params.courseId}`;

  const tabs = [
    { label: 'Overview', href: basePath },
    { label: 'Modules', href: `${basePath}/modules` },
    { label: 'Settings', href: `${basePath}/settings` },
    { label: 'Analytics', href: `${basePath}/analytics` },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center gap-4">
          <Link href="/course-creator" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Advanced React Patterns</h1>
              <CreatorBadge variant="warning">Draft</CreatorBadge>
            </div>
            <p className="text-sm text-gray-500">Last saved: 10 mins ago</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`${basePath}/preview`}>
            <CreatorButton variant="outline" size="sm" icon={<Eye className="w-4 h-4" />}>Preview</CreatorButton>
          </Link>
          <Link href={`${basePath}/settings`}>
            <CreatorButton variant="secondary" size="sm" icon={<SettingsIcon className="w-4 h-4" />}>Settings</CreatorButton>
          </Link>
          <Link href={`${basePath}/publish`}>
            <CreatorButton size="sm" icon={<UploadCloud className="w-4 h-4" />}>Publish</CreatorButton>
          </Link>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-8">
          {tabs.map((tab) => {
            // Exact match for Overview (basePath), startsWith for others
            const isActive = tab.href === basePath
              ? pathname === basePath
              : pathname.startsWith(tab.href);

            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`pb-4 text-sm font-medium transition-all relative ${isActive
                    ? 'text-[#A21D21] border-b-2 border-[#A21D21]'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[500px] animate-fade-in">
        {children}
      </div>
    </div>
  );
}
