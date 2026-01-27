'use client';

import React from 'react';
import { CreatorCard, CreatorInput, CreatorButton } from '@/components/ui/creator';
import { Image as ImageIcon, Users, Star, Clock, BarChart } from 'lucide-react';

export default function CourseOverviewPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Form Column */}
      <div className="lg:col-span-2 space-y-6">
        <CreatorCard title="Course Information">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course Image</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-full mb-3 shadow-sm group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-[#A21D21]" />
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
            </div>

            <CreatorInput label="Course Title" defaultValue="Advanced React Design Patterns" placeholder="e.g. Master Web Development" />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Short Description</label>
              <textarea
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#A21D21]/20 focus:border-[#A21D21] transition-all"
                placeholder="Brief summary of your course..."
                rows={3}
                defaultValue="Learn advanced patterns and best practices for building scalable React applications."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Description</label>
              <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 p-2 flex gap-2">
                  <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xs font-bold">B</button>
                  <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xs italic">I</button>
                  <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xs underline">U</button>
                  <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1 self-center"></div>
                  <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-xs">List</button>
                </div>
                <textarea
                  className="w-full p-4 bg-white dark:bg-gray-800 text-sm focus:outline-none min-h-[200px]"
                  defaultValue="In this comprehensive course, we will dive deep into..."
                />
              </div>
            </div>
          </div>
        </CreatorCard>

        <CreatorCard title="Course Settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <select className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2.5 bg-white dark:bg-gray-800 text-sm">
                <option>Development</option>
                <option>Design</option>
                <option>Business</option>
                <option>Marketing</option>
              </select>

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Level</label>
              <div className="flex gap-2">
                {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                  <button key={level} className={`flex-1 py-2 text-xs font-medium rounded-lg border ${level === 'Advanced' ? 'bg-[#A21D21]/10 border-[#A21D21] text-[#A21D21]' : 'border-gray-200 dark:border-gray-700 text-gray-500'}`}>
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <CreatorInput label="Duration (Estimate)" placeholder="e.g. 10 hours" defaultValue="12h 30m" />
              <CreatorInput label="Tags" placeholder="e.g. React, JavaScript, Frontend" defaultValue="React, Transitions, Hooks" />
            </div>
          </div>
        </CreatorCard>
      </div>

      {/* Sidebar Info Column */}
      <div className="space-y-6">
        <CreatorCard title="Quick Stats">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Users className="w-4 h-4 mr-2" /> Active Learners
              </div>
              <span className="font-bold text-gray-900 dark:text-white">1,240</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Star className="w-4 h-4 mr-2 text-amber-500" /> Rating
              </div>
              <span className="font-bold text-gray-900 dark:text-white">4.8/5.0</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4 mr-2" /> Completion Rate
              </div>
              <span className="font-bold text-gray-900 dark:text-white">68%</span>
            </div>
          </div>
          <div className="mt-4 pt-4 bg-gray-50 dark:bg-gray-800/50 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Performance</span>
              <span className="text-green-600 font-bold">+12% vs last month</span>
            </div>
            <div className="h-24 flex items-end gap-1 mt-2">
              {[40, 60, 45, 80, 55, 70, 65].map((h, i) => (
                <div key={i} className="flex-1 bg-[#A21D21]/20 hover:bg-[#A21D21] rounded-t-sm transition-colors" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
        </CreatorCard>

        <div className="bg-indigo-600 rounded-xl p-5 text-white">
          <h4 className="font-bold mb-2">Need Help?</h4>
          <p className="text-sm text-indigo-100 mb-4">Check out our guide on creating engaging content.</p>
          <button className="w-full py-2 bg-white text-indigo-600 text-sm font-bold rounded-lg hover:bg-indigo-50 transition-colors">
            View Creator Guide
          </button>
        </div>
      </div>
    </div>
  );
}
