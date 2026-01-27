'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const courses = [
  { id: 1, title: 'การจัดการทีมอย่างมีประสิทธิภาพ', category: 'การจัดการ', enrolled: 1250, status: 'active', createdAt: '2024-01-01' },
  { id: 2, title: 'การเขียนโปรแกรม Python', category: 'เทคโนโลยี', enrolled: 2100, status: 'active', createdAt: '2024-01-02' },
  { id: 3, title: 'การตลาดดิจิทัล', category: 'การตลาด', enrolled: 890, status: 'active', createdAt: '2024-01-03' },
  { id: 4, title: 'การเงินส่วนบุคคล', category: 'การเงิน', enrolled: 650, status: 'pending', createdAt: '2024-01-04' },
];

export default function HRTrainingCoursesPage() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">จัดการหลักสูตร</h1>
          <p className="text-gray-600 mt-1">จัดการและตรวจสอบหลักสูตรทั้งหมดในระบบ</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="ค้นหาหลักสูตร..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
          >
            <option value="all">ทุกสถานะ</option>
            <option value="active">ใช้งาน</option>
            <option value="pending">รออนุมัติ</option>
          </select>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">หลักสูตร</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">หมวดหมู่</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผู้เรียน</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่สร้าง</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{course.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.enrolled.toLocaleString()} คน
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      course.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {course.status === 'active' ? 'ใช้งาน' : 'รออนุมัติ'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link href={`/courses/${course.id}`} className="text-[#A21D21] hover:text-[#7A1818]">
                        ดู
                      </Link>
                      <button className="text-blue-600 hover:text-blue-800">แก้ไข</button>
                      {course.status === 'pending' && (
                        <button className="text-green-600 hover:text-green-800">อนุมัติ</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600">ไม่พบหลักสูตรที่ค้นหา</p>
        </div>
      )}
    </div>
  );
}
