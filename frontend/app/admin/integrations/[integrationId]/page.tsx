'use client';

import React, { use } from 'react';
import { AdminCard, AdminButton, AdminInput, AdminBadge } from '@/components/ui/admin';
import { Save, RefreshCw, ChevronLeft, Activity, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function IntegrationConfigPage({ params }: { params: Promise<{ integrationId: string }> }) {
  const { integrationId } = use(params);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/integrations">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configure Integration</h1>
          <p className="text-gray-500 text-sm">Managing settings for ID: <span className="font-mono">{integrationId}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AdminCard title="Connection Settings">
            <div className="space-y-4">
              <AdminInput label="Service URL" placeholder="https://moodle.example.com" />
              <AdminInput label="API Key / Token" type="password" placeholder="••••••••••••••••" />
              <AdminInput label="Callback URL (Webhook)" defaultValue="https://api.inteqc.com/hooks/moodle" readOnly className="bg-gray-50 text-gray-500 cursor-not-allowed" />

              <div className="pt-4 flex justify-between">
                <AdminButton variant="outline" icon={<RefreshCw className="w-4 h-4" />}>Test Connection</AdminButton>
                <AdminButton icon={<Save className="w-4 h-4" />}>Save Configuration</AdminButton>
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Sync Preferences">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Auto-Sync Users</div>
                  <div className="text-xs text-gray-500">Create users when added in source</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-maroon transition-all peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Grade Push</div>
                  <div className="text-xs text-gray-500">Send completion data back to source</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-maroon transition-all peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </AdminCard>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <AdminCard title="Connection Status">
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center p-4 bg-green-100 text-green-600 rounded-full mb-3">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-green-600 mb-1">Operational</h3>
              <p className="text-xs text-gray-500">Last heartbeat: 2 mins ago</p>
            </div>
          </AdminCard>

          <AdminCard title="Recent Logs" className="p-0 overflow-hidden">
            <div className="bg-gray-900 text-gray-300 p-4 font-mono text-xs overflow-y-auto max-h-60">
              <div className="text-green-400 mb-1">[10:30:05] Connection verified</div>
              <div className="text-gray-400 mb-1">[10:30:00] Sending handshake...</div>
              <div className="text-blue-400 mb-1">[10:00:00] Sync started (Job #442)</div>
              <div className="text-blue-400 mb-1">[10:01:23] Sync completed: 45 records</div>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
