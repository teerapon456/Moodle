'use client';

import React, { useState } from 'react';
import { AdminCard, AdminBadge, AdminButton } from '@/components/ui/admin';
import { History, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';

const mockAudits = [
  {
    id: 1,
    entity: 'User',
    entityId: 'U-1025',
    action: 'Update Role',
    by: 'Super Admin',
    time: '2026-01-26 14:30',
    details: {
      field: 'role',
      before: 'Learner',
      after: 'Instructor'
    }
  },
  {
    id: 2,
    entity: 'Course',
    entityId: 'C-505',
    action: 'Change Status',
    by: 'Course Manager',
    time: '2026-01-26 11:15',
    details: {
      field: 'status',
      before: 'Draft',
      after: 'Published'
    }
  },
  {
    id: 3,
    entity: 'System',
    entityId: 'Config',
    action: 'Feature Toggle',
    by: 'DevOps',
    time: '2026-01-25 09:00',
    details: {
      field: 'maintenance_mode',
      before: 'false',
      after: 'true'
    }
  },
];

export default function AuditTrailPage() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Audit Trail</h1>
        <p className="text-gray-500 text-sm">Detailed record of critical data changes (Data-level events).</p>
      </div>

      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-750 text-gray-500 font-medium border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="w-10"></th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Entity</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Performed By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {mockAudits.map((audit) => (
                <React.Fragment key={audit.id}>
                  <tr
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                    onClick={() => setExpandedRow(expandedRow === audit.id ? null : audit.id)}
                  >
                    <td className="px-4 py-4 text-center text-gray-400">
                      {expandedRow === audit.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono">
                      {audit.time}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 dark:text-white">{audit.entity}</div>
                      <div className="text-xs text-gray-400">ID: {audit.entityId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <AdminBadge variant="warning">{audit.action}</AdminBadge>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {audit.by}
                    </td>
                  </tr>
                  {expandedRow === audit.id && (
                    <tr className="bg-gray-50 dark:bg-gray-800/30">
                      <td colSpan={5} className="px-10 py-4">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h4 className="text-xs font-semibold uppercase text-gray-400 mb-3 flex items-center">
                            <History className="w-3 h-3 mr-1" />
                            Change Details
                          </h4>
                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded border border-red-100 dark:border-red-900/20">
                              <div className="text-xs text-gray-500 mb-1">Before</div>
                              <div className="font-mono text-sm text-red-700 dark:text-red-400">{audit.details.before}</div>
                            </div>
                            <div className="flex justify-center text-gray-400">
                              <ArrowRight className="w-5 h-5" />
                            </div>
                            <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded border border-green-100 dark:border-green-900/20">
                              <div className="text-xs text-gray-500 mb-1">After</div>
                              <div className="font-mono text-sm text-green-700 dark:text-green-400">{audit.details.after}</div>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-400">
                            Field affected: <span className="font-mono text-gray-600 dark:text-gray-300">{audit.details.field}</span>
                          </div>
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
