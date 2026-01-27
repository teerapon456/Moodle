'use client';

import React, { useState } from 'react';
import { AdminCard, AdminBadge, AdminButton } from '@/components/ui/admin';
import { BookOpen, Plus, Search, Users, Star, Edit, Trash2, LayoutGrid, List as ListIcon } from 'lucide-react';
import Link from 'next/link';
import { useAdminCourses } from '@/hooks/useAdminCourses';

export default function AdminCoursesPage() {
  const { courses, initialized, deleteCourse } = useAdminCourses();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  if (!initialized) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A21D21]"></div>
      </div>
    );
  }

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Course Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage curriculum, track enrollments, and update content.</p>
        </div>
        <Link href="/admin/courses/create">
          <AdminButton icon={<Plus className="w-5 h-5" />} size="md">
            Create Course
          </AdminButton>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sticky top-20 z-10 backdrop-blur-xl bg-opacity-80">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-2.5 w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#A21D21]/20 focus:border-[#A21D21] transition-all"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#A21D21]/20 focus:border-[#A21D21] cursor-pointer">
              <option>All Categories</option>
              <option>Management</option>
              <option>Technology</option>
              <option>Marketing</option>
            </select>
            <div className="border-l border-gray-200 dark:border-gray-700 mx-2 h-10"></div>
            <div className="flex bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-800 shadow text-[#A21D21]' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <ListIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-800 shadow text-[#A21D21]' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No courses found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or create a new course.</p>
        </div>
      ) : viewMode === 'list' ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/50 dark:bg-gray-700/50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Course Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Instructor</th>
                  <th className="px-6 py-4">Performance</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#A21D21] to-[#7A1818] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                          {course.title.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white group-hover:text-[#A21D21] transition-colors">{course.title}</div>
                          <div className="text-xs text-gray-500">{course.level || 'All Levels'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                        {course.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        {course.instructor}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="w-3 h-3 mr-1" /> {course.enrolled.toLocaleString()} enrolled
                        </div>
                        {course.rating > 0 && (
                          <div className="flex items-center text-xs text-amber-500 font-medium">
                            <Star className="w-3 h-3 mr-1 fill-current" /> {course.rating}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <AdminBadge variant={course.status === 'Published' ? 'success' : course.status === 'Draft' ? 'warning' : 'default'}>
                        {course.status}
                      </AdminBadge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-100 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/courses/${course.id}`}>
                          <button className="p-2 text-gray-500 hover:text-[#A21D21] hover:bg-[#A21D21]/10 rounded-lg transition-all" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this course?')) {
                              deleteCourse(course.id);
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <AdminCard key={course.id} className="flex flex-col h-full group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A21D21] to-[#7A1818] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                  {course.title.charAt(0)}
                </div>
                <AdminBadge variant={course.status === 'Published' ? 'success' : course.status === 'Draft' ? 'warning' : 'default'}>
                  {course.status}
                </AdminBadge>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#A21D21] transition-colors line-clamp-1">{course.title}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{course.description || 'No description available for this course.'}</p>

              <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-100 dark:border-gray-700 pt-4 mb-4">
                <span className="flex items-center"><Users className="w-3 h-3 mr-1" /> {course.enrolled}</span>
                <span className="flex items-center"><Star className="w-3 h-3 mr-1 text-amber-500" /> {course.rating}</span>
                <span className="ml-auto bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{course.category}</span>
              </div>

              <div className="flex gap-2 mt-auto">
                <Link href={`/admin/courses/${course.id}`} className="flex-1">
                  <button className="w-full py-2 px-3 bg-gray-50 hover:bg-white border border-gray-200 hover:border-[#A21D21] text-gray-700 hover:text-[#A21D21] rounded-lg text-sm font-medium transition-all shadow-sm">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => {
                    if (confirm('Delete course?')) deleteCourse(course.id);
                  }}
                  className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-transparent hover:border-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
