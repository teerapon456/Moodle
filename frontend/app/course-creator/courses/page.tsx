'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const courses = [
  { id: 1, title: 'การจัดการทีมอย่างมีประสิทธิภาพ', category: 'การจัดการ', enrolled: 1250, rating: 4.5, status: 'published', createdAt: '2024-01-01' },
  { id: 2, title: 'การเขียนโปรแกรม Python', category: 'เทคโนโลยี', enrolled: 2100, rating: 4.8, status: 'published', createdAt: '2024-01-02' },
  { id: 3, title: 'การตลาดดิจิทัล', category: 'การตลาด', enrolled: 890, rating: 4.2, status: 'draft', createdAt: '2024-01-03' },
];

export default function CourseCreatorCoursesPage() {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredCourses = courses.filter(course => 
    selectedStatus === 'all' || course.status === selectedStatus
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">หลักสูตรที่สร้าง</h1>
          <p className="text-gray-600 mt-1">จัดการหลักสูตรที่คุณสร้าง</p>
        </div>
        <Link href="/course-creator/create" className="px-6 py-3 bg-[#A21D21] text-white rounded-lg hover:bg-[#7A1818] transition-colors font-medium">
          + สร้างหลักสูตรใหม่
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
        >
          <option value="all">ทุกสถานะ</option>
          <option value="published">เผยแพร่</option>
          <option value="draft">แบบร่าง</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{course.category}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">{course.enrolled.toLocaleString()} ผู้เรียน</span>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href={`/courses/${course.id}`} className="flex-1 px-4 py-2 text-center text-sm text-[#A21D21] border border-[#A21D21] rounded-lg hover:bg-[#A21D21]/10 transition-colors">
                ดู
              </Link>
              <button className="flex-1 px-4 py-2 text-center text-sm bg-[#A21D21] text-white rounded-lg hover:bg-[#7A1818] transition-colors">
                แก้ไข
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
