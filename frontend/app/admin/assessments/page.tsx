'use client';

import React from 'react';
import { AdminCard, AdminButton } from '@/components/ui/admin';
import { Plus, Construction } from 'lucide-react';
import Link from 'next/link';

export default function AdminAssessmentsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assessments</h1>
          <p className="text-gray-500 text-sm">Manage quizzes, exams, and assignments.</p>
        </div>
        <AdminButton icon={<Plus className="w-4 h-4" />}>
          Create Assessment
        </AdminButton>
      </div>

      <AdminCard className="flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <Construction className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Module Under Construction</h3>
        <p className="text-gray-500 max-w-md mb-8">
          The Assessment Management module is being set up. This will allow you to create quizzes, manage question banks, and grade assignments.
        </p>
        <div className="flex gap-4">
          <AdminButton variant="outline">View Roadmap</AdminButton>
          <Link href="/admin">
            <AdminButton>Return to Dashboard</AdminButton>
          </Link>
        </div>
      </AdminCard>
    </div>
  );
}
