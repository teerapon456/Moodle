'use client';

import React from 'react';
import { AdminCard, AdminButton, AdminInput } from '@/components/ui/admin';
import { Save, Upload } from 'lucide-react';

export default function GeneralSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">General Settings</h1>
        <p className="text-sm text-gray-500">Configure basic site information and localization.</p>
      </div>

      <form className="space-y-6">
        <AdminCard title="Site Identity">
          <div className="space-y-4">
            <AdminInput label="Site Name" defaultValue="INTEQC Learning Platform" />
            <AdminInput label="Organization Name" defaultValue="บริษัท อินเทคซ์ จำกัด" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Logo</label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                    <span className="text-xs text-gray-500">Preview</span>
                  </div>
                  <div className="flex-1">
                    <AdminButton variant="outline" size="sm" icon={<Upload className="w-3 h-3" />} type="button">
                      Upload Logo
                    </AdminButton>
                    <p className="text-xs text-gray-500 mt-1">Recommended: 200x50px PNG</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Favicon</label>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                    <span className="text-xs text-gray-500">Ic</span>
                  </div>
                  <div className="flex-1">
                    <AdminButton variant="outline" size="sm" icon={<Upload className="w-3 h-3" />} type="button">
                      Upload Favicon
                    </AdminButton>
                    <p className="text-xs text-gray-500 mt-1">ICO or PNG, 32x32px</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Localization">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default Language</label>
              <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <option value="th">Thai (ภาษาไทย)</option>
                <option value="en">English (US)</option>
              </select>
            </div>

            <div className="space-y-4">
              <AdminInput label="Timezone" defaultValue="Asia/Bangkok (GMT+7)" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Format</label>
              <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <option value="DD/MM/YYYY">DD/MM/YYYY (31/01/2026)</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY (01/31/2026)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (2026-01-31)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time Format</label>
              <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <option value="24">24-hour (14:30)</option>
                <option value="12">12-hour (02:30 PM)</option>
              </select>
            </div>
          </div>
        </AdminCard>

        <div className="flex justify-end space-x-3">
          <AdminButton variant="ghost" type="button">Discard Changes</AdminButton>
          <AdminButton icon={<Save className="w-4 h-4" />} type="button">Save Settings</AdminButton>
        </div>
      </form>
    </div>
  );
}
