'use client';

import React, { useState } from 'react';
import { AdminCard, AdminButton, AdminInput } from '@/components/ui/admin';
import { Save, ArrowLeft, Upload, Layout, Settings, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function CreateCoursePage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Course</h1>
          <p className="text-gray-500 text-sm">Add a new curriculum to the platform.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('basic')}
          className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'basic'
              ? 'border-maroon text-maroon'
              : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
        >
          <Layout className="w-4 h-4 mr-2" />
          Basic Information
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'content'
              ? 'border-maroon text-maroon'
              : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Curriculum
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'settings'
              ? 'border-maroon text-maroon'
              : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          {activeTab === 'basic' && (
            <AdminCard title="Course Details">
              <div className="space-y-4">
                <AdminInput label="Course Title" placeholder="e.g. Advanced Leadership Skills" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                    <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                      <option>Select Category...</option>
                      <option>Management</option>
                      <option>Technology</option>
                      <option>Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level</label>
                    <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                      <option>All Levels</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                  <textarea
                    className="w-full h-32 p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="Course summary and objectives..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Thumbnail</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </div>
                </div>
              </div>
            </AdminCard>
          )}

          {activeTab === 'content' && (
            <AdminCard title="Course Structure">
              <div className="text-center py-12 text-gray-500">
                <p>Content editing is available after saving the basic information.</p>
                <AdminButton className="mt-4" icon={<Save className="w-4 h-4" />}>
                  Save & Continue
                </AdminButton>
              </div>
            </AdminCard>
          )}

          {activeTab === 'settings' && (
            <AdminCard title="Course Settings">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Enrollment Type</h4>
                    <p className="text-xs text-gray-500">How users can join this course.</p>
                  </div>
                  <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700">
                    <option>Open (Self-enrollment)</option>
                    <option>Approval Required</option>
                    <option>Manual Enrollment Only</option>
                  </select>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Certificate</h4>
                    <p className="text-xs text-gray-500">Award certificate upon completion.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:bg-maroon transition-all peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>
              </div>
            </AdminCard>
          )}
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <AdminCard title="Publishing">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Status:</span>
                <span className="font-semibold text-gray-500">Draft</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Visibility:</span>
                <span className="font-semibold text-gray-900 dark:text-white">Public</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <AdminButton icon={<Save className="w-4 h-4" />}>Save Draft</AdminButton>
                <AdminButton variant="outline">Preview</AdminButton>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
