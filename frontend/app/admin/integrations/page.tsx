'use client';

import React, { useState } from 'react';
import { AdminCard, AdminBadge, AdminButton } from '@/components/ui/admin';
import {
  Network,
  Settings,
  Database,
  Video,
  MessageSquare,
  Lock,
  Cloud,
  CheckCircle,
  XCircle,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

const categories = ['All', 'Authentication', 'LMS', 'Communication', 'Storage'];

const mockIntegrations = [
  { id: 1, name: 'Moodle LMS', category: 'LMS', status: 'Connected', icon: Database, description: 'Sync courses and user grades.' },
  { id: 2, name: 'Google SSO', category: 'Authentication', status: 'Disconnected', icon: Lock, description: 'Enable Sign in with Google.' },
  { id: 3, name: 'Zoom', category: 'Communication', status: 'Connected', icon: Video, description: 'Auto-create meeting rooms.' },
  { id: 4, name: 'Microsoft Teams', category: 'Communication', status: 'Disconnected', icon: MessageSquare, description: 'Notifications via Teams bot.' },
  { id: 5, name: 'AWS S3', category: 'Storage', status: 'Connected', icon: Cloud, description: 'External file storage.' },
];

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? mockIntegrations
    : mockIntegrations.filter(i => i.category === activeTab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Integrations</h1>
        <p className="text-gray-500 text-sm">Connect with third-party tools and services.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-700">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${activeTab === cat
                ? 'bg-maroon text-white shadow-md'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <AdminCard key={item.id} className="h-full flex flex-col hover:shadow-lg transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl group-hover:bg-maroon/10 group-hover:text-maroon transition-colors">
                <item.icon className="w-8 h-8 text-gray-600 dark:text-gray-300 group-hover:text-maroon" />
              </div>
              <AdminBadge variant={item.status === 'Connected' ? 'success' : 'outline'}>
                {item.status === 'Connected' ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                {item.status}
              </AdminBadge>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <span className="text-xs text-gray-400 font-medium">{item.category}</span>
              <Link href={`/admin/integrations/${item.id}`}>
                <AdminButton size="sm" variant="outline" icon={<Settings className="w-3 h-3" />}>
                  Configure
                </AdminButton>
              </Link>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
