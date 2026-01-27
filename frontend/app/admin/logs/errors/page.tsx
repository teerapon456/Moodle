'use client';

import React, { useState } from 'react';
import { AdminCard, AdminBadge, AdminButton, AdminInput } from '@/components/ui/admin';
import {
  AlertTriangle,
  XCircle,
  Info,
  Trash2,
  ChevronDown,
  ChevronRight,
  Terminal
} from 'lucide-react';

const mockErrors = [
  {
    id: 1,
    type: 'Critical',
    message: 'Database connection timeout',
    path: '/api/courses/list',
    time: '10:30:45 AM',
    stack: `Error: Connection lost
    at PoolConnection.onClose (/node_modules/mysql2/lib/pool_connection.js:150:12)
    at Socket.<anonymous> (/node_modules/mysql2/lib/connection.js:140:15)
    at TCP.onStreamEnd (internal/stream_base_commons.js:205:23)`
  },
  {
    id: 2,
    type: 'Warning',
    message: 'Rate limit exceeded for user U-555',
    path: '/api/auth/login',
    time: '10:28:12 AM',
    stack: 'RateLimitError: Too many requests from IP 203.111.222.33'
  },
  {
    id: 3,
    type: 'Info',
    message: 'Deprecation warning for legacy API',
    path: '/api/v1/user',
    time: '09:15:00 AM',
    stack: 'Warning: Use /api/v2/user instead.'
  },
];

const SeverityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'Critical': return <XCircle className="w-5 h-5 text-red-500" />;
    case 'Warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    default: return <Info className="w-5 h-5 text-blue-500" />;
  }
};

const SeverityBadge = ({ type }: { type: string }) => {
  switch (type) {
    case 'Critical': return <AdminBadge variant="error">Critical</AdminBadge>;
    case 'Warning': return <AdminBadge variant="warning">Warning</AdminBadge>;
    default: return <AdminBadge variant="info">Info</AdminBadge>;
  }
};

export default function ErrorLogsPage() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Errors</h1>
          <p className="text-gray-500 text-sm">Review exceptions and system anomalies.</p>
        </div>
        <AdminButton variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" icon={<Trash2 className="w-4 h-4" />}>
          Clear Logs
        </AdminButton>
      </div>

      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-750 text-gray-500 font-medium border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="w-10"></th>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockErrors.map((err) => (
                <React.Fragment key={err.id}>
                  <tr
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                    onClick={() => setExpandedRow(expandedRow === err.id ? null : err.id)}
                  >
                    <td className="px-4 py-4 text-center text-gray-400">
                      {expandedRow === err.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <SeverityIcon type={err.type} />
                        <SeverityBadge type={err.type} />
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white truncate max-w-xs">
                      {err.message}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                      {err.path}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {err.time}
                    </td>
                  </tr>
                  {expandedRow === err.id && (
                    <tr className="bg-gray-50 dark:bg-gray-900/50">
                      <td colSpan={5} className="px-10 py-4">
                        <div className="bg-gray-900 text-gray-300 rounded-lg p-4 font-mono text-xs overflow-x-auto border border-gray-700 shadow-inner">
                          <div className="flex items-center text-gray-500 mb-2 pb-2 border-b border-gray-800">
                            <Terminal className="w-3 h-3 mr-2" />
                            Stack Trace
                          </div>
                          <pre>{err.stack}</pre>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
