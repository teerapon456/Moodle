'use client';

import React from 'react';
import { AdminCard, AdminBadge, AdminButton, AdminInput } from '@/components/ui/admin';
import { Search, Monitor, Smartphone, Globe, AlertOctagon } from 'lucide-react';

const mockLogins = [
  { id: 1, user: 'Somchai', time: '2026-01-26 10:30', status: 'Success', ip: '192.168.1.1', device: 'Desktop (Chrome)', location: 'Bangkok, TH' },
  { id: 2, user: 'unknown', time: '2026-01-26 10:28', status: 'Failed', ip: '203.111.44.2', device: 'Unknown', location: 'Moscow, RU' },
  { id: 3, user: 'Suda', time: '2026-01-26 09:45', status: 'Success', ip: '192.168.1.55', device: 'Mobile (Safari)', location: 'Chiang Mai, TH' },
  { id: 4, user: 'Admin', time: '2026-01-26 08:00', status: 'Success', ip: '192.168.1.10', device: 'Desktop (Edge)', location: 'Bangkok, TH' },
];

const DeviceIcon = ({ device }: { device: string }) => {
  if (device.includes('Mobile')) return <Smartphone className="w-4 h-4 text-gray-500" />;
  if (device.includes('Desktop')) return <Monitor className="w-4 h-4 text-gray-500" />;
  return <Globe className="w-4 h-4 text-gray-500" />;
};

export default function LoginHistoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Login History</h1>
          <p className="text-gray-500 text-sm">Audit authentication events and access locations.</p>
        </div>
        <AdminButton variant="danger" icon={<AlertOctagon className="w-4 h-4" />}>
          Block IP Address
        </AdminButton>
      </div>

      <AdminCard>
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search user or IP..."
              className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon/50"
            />
          </div>
          <div className="flex items-center space-x-2">
            <AdminBadge variant="outline" className="cursor-pointer hover:bg-gray-100">All</AdminBadge>
            <AdminBadge variant="success" className="cursor-pointer hover:bg-green-100">Success</AdminBadge>
            <AdminBadge variant="error" className="cursor-pointer hover:bg-red-100">Failed</AdminBadge>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-750 text-gray-500 font-medium border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">IP Address</th>
                <th className="px-6 py-4">Device</th>
                <th className="px-6 py-4">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockLogins.map((login) => (
                <tr key={login.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {login.user}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {login.time}
                  </td>
                  <td className="px-6 py-4">
                    <AdminBadge variant={login.status === 'Success' ? 'success' : 'error'}>
                      {login.status}
                    </AdminBadge>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-600 dark:text-gray-300">
                    {login.ip}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <DeviceIcon device={login.device} />
                      {login.device}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {login.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
