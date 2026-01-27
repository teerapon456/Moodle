'use client';

import React from 'react';
import { AdminCard, AdminButton, AdminInput, AdminBadge } from '@/components/ui/admin';
import { Save, Mail, Edit2, Play } from 'lucide-react';

const mockTemplates = [
  { id: 1, name: 'Welcome Email', subject: 'Welcome to INTEQC Learning', lastUpdated: '2 days ago' },
  { id: 2, name: 'Password Reset', subject: 'Reset your password', lastUpdated: '1 month ago' },
  { id: 3, name: 'Course Enrollment', subject: 'You have been enrolled in {course_name}', lastUpdated: '1 week ago' },
  { id: 4, name: 'Certificate Earned', subject: 'Congratulations! You earned a certificate', lastUpdated: '3 months ago' },
];

export default function EmailSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Email Settings</h1>
        <p className="text-sm text-gray-500">Configure outbound email server and message templates.</p>
      </div>

      <AdminCard title="SMTP Configuration">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AdminInput label="SMTP Host" placeholder="smtp.office365.com" />
          <AdminInput label="SMTP Port" placeholder="587" />
          <AdminInput label="Username" placeholder="notifications@company.com" />
          <AdminInput label="Password" type="password" placeholder="••••••••" />

          <div className="md:col-span-2 flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <input type="checkbox" id="tls" className="rounded text-maroon focus:ring-maroon" defaultChecked />
                <label htmlFor="tls" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Use TLS/SSL</label>
              </div>
            </div>
            <AdminButton variant="outline" size="sm" icon={<Play className="w-3 h-3" />}>Test Connection</AdminButton>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminInput label="Sender Email" defaultValue="noreply@inteqc.com" />
            <AdminInput label="Sender Name" defaultValue="INTEQC Learning System" />
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Email Templates">
        <div className="space-y-4">
          {mockTemplates.map((template) => (
            <div key={template.id} className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">{template.name}</h4>
                  <p className="text-xs text-gray-500">Subject: {template.subject}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-400 hidden sm:block">{template.lastUpdated}</span>
                <button className="text-blue-600 hover:text-blue-800 p-1.5 hover:bg-blue-50 rounded">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </AdminCard>

      <div className="flex justify-end space-x-3">
        <AdminButton icon={<Save className="w-4 h-4" />}>Save Settings</AdminButton>
      </div>
    </div>
  );
}
