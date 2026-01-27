'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateCoursePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    duration: '',
    language: 'ไทย',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock: redirect to course edit page
    alert('สร้างหลักสูตรสำเร็จ! (Mock)');
    router.push('/course-creator/courses');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">สร้างหลักสูตรใหม่</h1>
        <p className="text-gray-600 mt-1">กรอกข้อมูลพื้นฐานของหลักสูตร</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ชื่อหลักสูตร <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
              placeholder="เช่น การจัดการทีมอย่างมีประสิทธิภาพ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              คำอธิบายหลักสูตร <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
              placeholder="อธิบายเกี่ยวกับหลักสูตรนี้..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                หมวดหมู่ <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
              >
                <option value="">เลือกหมวดหมู่</option>
                <option value="การจัดการ">การจัดการ</option>
                <option value="เทคโนโลยี">เทคโนโลยี</option>
                <option value="การตลาด">การตลาด</option>
                <option value="การเงิน">การเงิน</option>
                <option value="ภาษา">ภาษา</option>
                <option value="การออกแบบ">การออกแบบ</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ระดับ <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
              >
                <option value="beginner">เริ่มต้น</option>
                <option value="intermediate">ปานกลาง</option>
                <option value="advanced">ขั้นสูง</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ระยะเวลา (ชั่วโมง) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
                placeholder="8"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ภาษา
              </label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
              >
                <option value="ไทย">ไทย</option>
                <option value="English">English</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#A21D21] text-white rounded-lg hover:bg-[#7A1818] transition-colors font-medium"
          >
            สร้างหลักสูตร
          </button>
        </div>
      </form>
    </div>
  );
}
