'use client';

import React, { use, useState, useEffect } from 'react';
import { AdminCard, AdminButton, AdminInput, AdminBadge } from '@/components/ui/admin';
import { Save, ArrowLeft, Layout, Settings, BookOpen, Trash2, Plus, GripVertical } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminCourses, Course } from '@/hooks/useAdminCourses';

export default function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { getCourse, updateCourse, deleteCourse, initialized } = useAdminCourses();

  const [activeTab, setActiveTab] = useState('basic');
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (initialized) {
      const found = getCourse(parseInt(id));
      if (found) setCourse(found);
      else router.push('/admin/courses');
    }
  }, [id, initialized, getCourse, router]);

  if (!course) return <div className="p-6">Loading course...</div>;

  const handleUpdate = () => {
    updateCourse(course.id, course);
    alert('Course updated successfully!');
  };

  const handleDelete = () => {
    if (confirm('Delete this course?')) {
      deleteCourse(course.id);
      router.push('/admin/courses');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Course</h1>
          <p className="text-gray-500 text-sm">ID: <span className="font-mono">{id}</span></p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
        <button onClick={() => setActiveTab('basic')} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'basic' ? 'border-maroon text-maroon' : 'border-transparent text-gray-500'}`}>Basic Information</button>
        <button onClick={() => setActiveTab('content')} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'content' ? 'border-maroon text-maroon' : 'border-transparent text-gray-500'}`}>Curriculum</button>
        <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'settings' ? 'border-maroon text-maroon' : 'border-transparent text-gray-500'}`}>Settings</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          {activeTab === 'basic' && (
            <AdminCard title="Course Details">
              <div className="space-y-4">
                <AdminInput
                  label="Course Title"
                  value={course.title}
                  onChange={(e: any) => setCourse({ ...course, title: e.target.value })}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                    <select
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      value={course.category}
                      onChange={(e) => setCourse({ ...course, category: e.target.value })}
                    >
                      <option>Management</option>
                      <option>Technology</option>
                      <option>Marketing</option>
                      <option>Finance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level</label>
                    <select
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      value={course.level}
                      onChange={(e) => setCourse({ ...course, level: e.target.value })}
                    >
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
                    value={course.description || ''}
                    onChange={(e) => setCourse({ ...course, description: e.target.value })}
                  ></textarea>
                </div>
              </div>
            </AdminCard>
          )}

          {activeTab === 'content' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Modules</h3>
                <AdminButton size="sm" icon={<Plus className="w-3 h-3" />}>Add Module</AdminButton>
              </div>
              <AdminCard className="p-4">
                <p className="text-gray-500 text-sm">Module editor placeholder.</p>
              </AdminCard>
            </div>
          )}

          {activeTab === 'settings' && (
            <AdminCard title="Course Settings">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                  <button
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Course
                  </button>
                </div>
              </div>
            </AdminCard>
          )}
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <AdminCard title="Access Status">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Status:</span>
                <select
                  value={course.status}
                  onChange={(e) => setCourse({ ...course, status: e.target.value as any })}
                  className="border rounded text-sm p-1"
                >
                  <option>Draft</option>
                  <option>Published</option>
                  <option>Archived</option>
                </select>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <AdminButton icon={<Save className="w-4 h-4" />} onClick={handleUpdate}>Update Changes</AdminButton>
              </div>
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
