'use client';

import React, { useState } from 'react';
import { AdminCard, AdminButton, AdminBadge, AdminInput } from '@/components/ui/admin';
import {
  Database,
  Server,
  HardDrive,
  Users,
  Power,
  Trash2,
  Clock,
  Play,
  Download,
  RotateCcw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function MaintenancePage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Maintenance</h1>
        <p className="text-gray-500 text-sm">Monitor health, manage backups, and control system state.</p>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminCard className="flex items-center space-x-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Server Status</p>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              Online <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
            </h4>
          </div>
        </AdminCard>

        <AdminCard className="flex items-center space-x-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Database</p>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              Healthy <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
            </h4>
          </div>
        </AdminCard>

        <AdminCard className="flex items-center space-x-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Storage</p>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
              45% Used
            </h4>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 dark:bg-gray-700">
              <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </AdminCard>

        <AdminCard className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Sessions</p>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
              52 Users
            </h4>
          </div>
        </AdminCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backup & Restore */}
        <AdminCard title="Backup & Restore">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Last Backup</h4>
                <p className="text-xs text-gray-500">Jan 25, 2026 03:00 AM • 4.2 GB</p>
              </div>
              <div className="flex space-x-2">
                <AdminButton className="bg-maroon hover:bg-maroon-dark text-white" icon={<Download className="w-4 h-4" />}>Backup Now</AdminButton>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Backup History</h4>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <span className="text-gray-600 dark:text-gray-400">Jan {26 - i}, 2026 03:00 AM</span>
                    <div className="flex items-center space-x-3">
                      <AdminBadge variant="success">Complete</AdminBadge>
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center">
                        <RotateCcw className="w-3 h-3 mr-1" /> Restore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AdminCard>

        {/* Maintenance Mode & Cache */}
        <div className="space-y-6">
          <AdminCard title="Maintenance Mode" className={`${maintenanceMode ? 'border-red-500 ring-1 ring-red-500' : ''}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Site Status</h4>
                  <p className="text-xs text-gray-500">Prevent user access during updates.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={maintenanceMode}
                    onChange={() => setMaintenanceMode(!maintenanceMode)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-red-600 transition-all peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              {maintenanceMode && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm rounded-lg flex items-start">
                  <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <div>
                    <strong>Maintenance Mode Active</strong>
                    <p className="text-xs mt-1">Only Administrators and allowed IPs can access the system.</p>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Maintenance Message</label>
                <textarea className="w-full rounded-lg border border-gray-300 p-2 text-sm dark:bg-gray-800 dark:border-gray-700" rows={2} defaultValue="We are currently performing scheduled maintenance. We will be back shortly."></textarea>
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Cache Management">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">System Cache</h4>
                <p className="text-xs text-gray-500">Clear temporary files and compiled templates.</p>
              </div>
              <AdminButton variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" icon={<Trash2 className="w-4 h-4" />}>
                Clear All Cache
              </AdminButton>
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Scheduled Tasks */}
      <AdminCard title="Scheduled Tasks (Cron Jobs)">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-750 text-gray-500 font-medium border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4">Task Name</th>
                <th className="px-6 py-4">Schedule</th>
                <th className="px-6 py-4">Last Run</th>
                <th className="px-6 py-4">Next Run</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 font-medium">Daily Backup</td>
                <td className="px-6 py-4 font-mono text-xs">0 3 * * *</td>
                <td className="px-6 py-4 text-green-600">Success (5h ago)</td>
                <td className="px-6 py-4 text-gray-500">Tomorrow 03:00</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 flex items-center justify-end ml-auto">
                    <Play className="w-3 h-3 mr-1" /> Run Now
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 font-medium">Email Digest</td>
                <td className="px-6 py-4 font-mono text-xs">0 8 * * *</td>
                <td className="px-6 py-4 text-green-600">Success (10h ago)</td>
                <td className="px-6 py-4 text-gray-500">Tomorrow 08:00</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 flex items-center justify-end ml-auto">
                    <Play className="w-3 h-3 mr-1" /> Run Now
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
