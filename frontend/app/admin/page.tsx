'use client';

import React from 'react';
import { AdminCard, AdminBadge, AdminButton } from '@/components/ui/admin';
import {
  Users, BookOpen, HardDrive, TrendingUp, UserPlus,
  FileCheck, LifeBuoy, ChevronRight, Activity,
  Clock, ShieldCheck, ArrowUpRight, Award, GraduationCap, ClipboardCheck
} from 'lucide-react';
import Link from 'next/link';

// Enhanced Stat Card with Gradient
const StatCard = ({ title, value, change, icon: Icon, gradient, iconColor }: any) => (
  <div className={`rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700`}>
    {/* Background Decorative Gradient */}
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110`}></div>

    <div className="flex items-start justify-between relative z-10">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg text-white`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>

    <div className="mt-4 flex items-center text-sm relative z-10">
      <span className="text-emerald-500 font-bold flex items-center bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
        <TrendingUp className="w-3 h-3 mr-1" />
        {change}
      </span>
      <span className="text-gray-400 ml-2 text-xs">vs last month</span>
    </div>
  </div>
);

// Quick Action Card
const QuickAction = ({ icon: Icon, title, desc, color }: any) => (
  <button className="flex items-start p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#A21D21] dark:hover:border-[#A21D21] hover:shadow-md transition-all text-left group w-full">
    <div className={`p-3 rounded-lg ${color} text-white mr-4 shadow-md group-hover:scale-110 transition-transform`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#A21D21] transition-colors">{title}</h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{desc}</p>
    </div>
  </button>
);

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            L&D Overview
            <span className="text-3xl animate-wave inline-block">👋</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track employee development, compliance, and training impact.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/users">
            <AdminButton variant="outline" icon={<Users className="w-4 h-4" />}>Employees</AdminButton>
          </Link>
          <Link href="/admin/courses/create">
            <AdminButton icon={<BookOpen className="w-4 h-4" />}>Assign Training</AdminButton>
          </Link>
        </div>
      </div>

      {/* Stats Grid - FOCUSED ON L&D */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Learning Hours"
          value="12,543"
          change="+15.2%"
          icon={Clock}
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Active Learners"
          value="892"
          change="+24 new"
          icon={GraduationCap}
          gradient="from-purple-500 to-purple-600"
        />
        <StatCard
          title="Compliance Rate"
          value="94.5%"
          change="+1.2%"
          icon={ShieldCheck}
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Skill Certifications"
          value="342"
          change="+18 issued"
          icon={Award}
          gradient="from-orange-500 to-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area - 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions Grid - HR CENTRIC */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <div className="w-1 bg-[#A21D21] h-6 rounded-full mr-3"></div>
              Training Management
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <QuickAction
                icon={ClipboardCheck}
                title="Assign Mandatory Training"
                desc="Safety & Compliance modules"
                color="bg-gradient-to-br from-indigo-500 to-indigo-600"
              />
              <QuickAction
                icon={FileCheck}
                title="Review Skill Assessments"
                desc="12 employee evaluations pending"
                color="bg-gradient-to-br from-pink-500 to-pink-600"
              />
              <QuickAction
                icon={Users}
                title="Onboarding Progress"
                desc="Check new hire learning paths"
                color="bg-gradient-to-br from-cyan-500 to-cyan-600"
              />
              <QuickAction
                icon={Award}
                title="Issue Certificates"
                desc="Approve completed certifications"
                color="bg-gradient-to-br from-amber-500 to-amber-600"
              />
            </div>
          </div>

          {/* Recent Activity Table - EMPLOYEE FOCUSED */}
          <AdminCard title="Recent Training Activity">
            <div className="space-y-6">
              {[
                { user: 'Somchai Jaidee (Marketing)', action: 'Completed "Data Privacy Fundamentals"', time: '10 mins ago', icon: Award, color: 'bg-green-100 text-green-600' },
                { user: 'IT Department', action: 'Enrolled in "Cybersecurity 2024"', time: '1 hour ago', icon: Users, color: 'bg-blue-100 text-blue-600' },
                { user: 'Sarah Wilson (HR)', action: 'Published new "Onboarding Path"', time: '3 hours ago', icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
                { user: 'System', action: 'Sent compliance reminders to 45 users', time: 'Yesterday', icon: ShieldCheck, color: 'bg-orange-100 text-orange-600' },
                { user: 'Engineering Team', action: 'Average skill score increased by 5%', time: 'Yesterday', icon: TrendingUp, color: 'bg-emerald-100 text-emerald-600' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start group">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0 border-b border-gray-100 dark:border-gray-700 pb-4 group-last:border-0 group-last:pb-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {item.user} <span className="text-gray-400 font-normal">• {item.time}</span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{item.action}</p>
                  </div>
                  <div className="self-center">
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#A21D21] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button className="w-full text-center text-sm font-semibold text-[#A21D21] hover:text-[#7A1818] transition-colors flex items-center justify-center">
                View Full Training Report <ArrowUpRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </AdminCard>
        </div>

        {/* Sidebar / Secondary Content - 1/3 width */}
        <div className="lg:col-span-1 space-y-8">
          {/* Organizational Health */}
          <div className="bg-[#1e293b] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-[#A21D21]/50 rounded-full blur-2xl"></div>

            <h3 className="text-lg font-bold mb-6 relative z-10 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-emerald-400" /> Organization Health
            </h3>

            <div className="space-y-6 relative z-10">
              <div>
                <div className="flex justify-between text-sm mb-2 text-gray-300">
                  <span>Mandatory Training</span>
                  <span className="font-mono text-emerald-400">92%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2 text-gray-300">
                  <span>Skill Gap Closure</span>
                  <span className="font-mono text-blue-400">65%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2 text-gray-300">
                  <span>Learning Budget</span>
                  <span className="font-mono text-orange-400">45% Used</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Reviews */}
          <AdminCard title="Pending Approvals">
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {[
                { title: 'Advanced Excel Workshop', type: 'Course Approval' },
                { title: 'Graphic Design Basics', type: 'Course Approval' },
                { title: 'Conflict Resolution', type: 'Trainer Request' }
              ].map((item, i) => (
                <div key={i} className="py-3 flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-[#A21D21] transition-colors">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.type}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">2h</div>
                </div>
              ))}
            </div>
            <AdminButton variant="secondary" className="w-full mt-4" size="sm">Go to Approvals</AdminButton>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
