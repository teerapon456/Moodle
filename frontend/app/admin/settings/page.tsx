'use client';

import React from 'react';
import { AdminCard, AdminBadge } from '@/components/ui/admin';
import {
  Settings,
  Palette,
  Mail,
  Bell,
  ShieldCheck,
  Network,
  ChevronRight,
  Globe,
  Database,
  Lock,
  Smartphone,
  CreditCard
} from 'lucide-react';
import Link from 'next/link';

const settingsSections = [
  {
    category: 'System',
    items: [
      {
        title: 'General Settings',
        description: 'Site identity, extensive localization, and global preferences.',
        icon: Settings,
        href: '/admin/settings/general',
        color: 'bg-gray-100 text-gray-600',
        status: null
      },
      {
        title: 'Localization',
        description: 'Languages, timezones, and number formats.',
        icon: Globe,
        href: '/admin/settings/localization',
        color: 'bg-blue-100 text-blue-600',
        status: 'EN/TH'
      },
      {
        title: 'Storage & Database',
        description: 'Manage file storage limits, CDN, and database connections.',
        icon: Database,
        href: '/admin/settings/storage',
        color: 'bg-indigo-100 text-indigo-600',
        status: 'Healthy'
      }
    ]
  },
  {
    category: 'Experience',
    items: [
      {
        title: 'Appearance & Branding',
        description: 'Customize themes, logos, colors, and layout options.',
        icon: Palette,
        href: '/admin/settings/appearance',
        color: 'bg-pink-100 text-pink-600',
        status: null
      },
      {
        title: 'Notifications',
        description: 'Configure email templates, push alerts, and digests.',
        icon: Bell,
        href: '/admin/settings/notifications',
        color: 'bg-yellow-100 text-yellow-600',
        status: 'Active'
      },
      {
        title: 'Mobile App',
        description: 'Mobile settings, push certificates, and version control.',
        icon: Smartphone,
        href: '/admin/settings/mobile',
        color: 'bg-purple-100 text-purple-600',
        status: null
      }
    ]
  },
  {
    category: 'Security & Access',
    items: [
      {
        title: 'Security Policy',
        description: 'Password rules, session timeouts, and extensive firewall logs.',
        icon: ShieldCheck,
        href: '/admin/settings/security',
        color: 'bg-green-100 text-green-600',
        status: 'High'
      },
      {
        title: 'SSO & Authentication',
        description: 'Configure LDAP, SAML, OAuth2 providers.',
        icon: Lock,
        href: '/admin/settings/auth',
        color: 'bg-red-100 text-red-600',
        status: '2 Active'
      },
      {
        title: 'Integrations & API',
        description: 'Manage API keys, webhooks, and third-party apps.',
        icon: Network,
        href: '/admin/integrations',
        color: 'bg-cyan-100 text-cyan-600',
        status: '5 Connected'
      }
    ]
  }
];

export default function SettingsDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Configuration</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage global system settings and integrations.</p>
        </div>
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-100 dark:border-blue-800">
          Environment: <span className="font-bold">Production</span>
        </div>
      </div>

      {settingsSections.map((group) => (
        <div key={group.category}>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 pl-1 border-l-4 border-[#A21D21]">{group.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {group.items.map((section) => (
              <Link key={section.title} href={section.href}>
                <AdminCard className="h-full hover:shadow-lg transition-all group cursor-pointer relative overflow-hidden border-t-0 border-l-0 border-r-0 border-b-2 border-b-transparent hover:border-b-[#A21D21]">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${section.color} group-hover:scale-110 transition-transform shadow-sm`}>
                      <section.icon className="w-6 h-6" />
                    </div>
                    {section.status && (
                      <AdminBadge variant={section.status === 'Active' || section.status === 'Healthy' || section.status === 'High' ? 'success' : 'info'}>
                        {section.status}
                      </AdminBadge>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#A21D21] transition-colors flex items-center">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {section.description}
                  </p>

                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                    <ChevronRight className="w-5 h-5 text-[#A21D21]" />
                  </div>
                </AdminCard>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Quick Info */}
      <div className="mt-8">
        <AdminCard title="System Information">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <span className="text-gray-500 block mb-1">Version</span>
              <span className="font-semibold text-gray-900 dark:text-white">v2.5.0 Enterprise</span>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <span className="text-gray-500 block mb-1">Node Status</span>
              <span className="font-semibold text-emerald-600 flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                Online (99.99%)
              </span>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <span className="text-gray-500 block mb-1">Last Backup</span>
              <span className="font-semibold text-gray-900 dark:text-white">Jan 26, 2026 04:00 AM</span>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <span className="text-gray-500 block mb-1">Database Size</span>
              <span className="font-semibold text-gray-900 dark:text-white">45.2 GB / 100 GB</span>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
