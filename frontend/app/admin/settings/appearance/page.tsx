'use client';

import React, { useState } from 'react';
import { AdminCard, AdminButton, AdminInput } from '@/components/ui/admin';
import { Save, Upload, RefreshCw } from 'lucide-react';

export default function AppearanceSettingsPage() {
  const [primaryColor, setPrimaryColor] = useState('#A21D21');
  const [secondaryColor, setSecondaryColor] = useState('#7A1818');

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Appearance</h1>
          <p className="text-sm text-gray-500">Customize the look and feel of your learning platform.</p>
        </div>

        <AdminCard title="Brand Colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Primary Color</label>
                <p className="text-xs text-gray-500">Main brand color used for buttons and headers.</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-24 text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Secondary Color</label>
                <p className="text-xs text-gray-500">Used for accents and dark modes.</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-24 text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Typography & Assets">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Font Family</label>
              <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <option value="inter">Inter (Default)</option>
                <option value="roboto">Roboto</option>
                <option value="prompt">Prompt (Thai)</option>
                <option value="sarabun">Sarabun (Thai)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Login Page Background</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center hover:border-maroon/50 transition-colors">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <Upload className="w-full h-full" />
                </div>
                <p className="mt-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">JPG, PNG up to 5MB</p>
              </div>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Advanced">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Custom CSS</label>
            <textarea
              className="w-full h-32 rounded-lg border border-gray-300 p-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder=".custom-class { ... }"
            ></textarea>
          </div>
        </AdminCard>

        <div className="flex justify-end space-x-3">
          <AdminButton variant="ghost" onClick={() => { setPrimaryColor('#A21D21'); setSecondaryColor('#7A1818'); }} icon={<RefreshCw className="w-4 h-4" />}>
            Reset Defaults
          </AdminButton>
          <AdminButton icon={<Save className="w-4 h-4" />}>Save Changes</AdminButton>
        </div>
      </div>

      {/* Live Preview Panel */}
      <div className="w-80 hidden lg:block">
        <div className="sticky top-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Live Preview</h3>
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900">
            {/* Simulated Header */}
            <div className="h-12 border-b border-gray-200 dark:border-gray-700 flex items-center px-4" style={{ backgroundColor: '#fff' }}>
              <div className="w-6 h-6 rounded bg-current mr-2" style={{ color: primaryColor }}></div>
              <div className="h-2 w-20 bg-gray-200 rounded"></div>
            </div>
            {/* Simulated Content */}
            <div className="p-4 space-y-4">
              <div className="h-8 w-3/4 bg-gray-100 rounded"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-24 bg-gray-50 rounded border border-gray-100 p-2">
                  <div className="h-2 w-8 mb-2 rounded" style={{ backgroundColor: secondaryColor }}></div>
                  <div className="h-8 w-full bg-gray-200 rounded"></div>
                </div>
                <div className="h-24 bg-gray-50 rounded border border-gray-100 p-2">
                  <div className="h-2 w-8 mb-2 rounded" style={{ backgroundColor: secondaryColor }}></div>
                  <div className="h-8 w-full bg-gray-200 rounded"></div>
                </div>
              </div>
              <button className="w-full py-2 px-4 rounded text-white text-xs font-medium" style={{ backgroundColor: primaryColor }}>
                Primary Button
              </button>
              <button className="w-full py-2 px-4 rounded border text-xs font-medium" style={{ borderColor: primaryColor, color: primaryColor }}>
                Outline Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
