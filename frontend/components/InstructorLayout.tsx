'use client';

import React from 'react';
import InstructorSidebar from './InstructorSidebar';
import Navbar from './Navbar';

interface InstructorLayoutProps {
  children: React.ReactNode;
  userName?: string;
}

const InstructorLayout: React.FC<InstructorLayoutProps> = ({
  children,
  userName = 'ผู้สอน'
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <InstructorSidebar userRole="instructor" />
      <div className="ml-64">
        <Navbar userName={userName} userRole="instructor" />
        <main className="pt-24 px-8 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default InstructorLayout;
