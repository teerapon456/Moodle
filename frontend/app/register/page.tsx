'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeId: '',
    password: '',
    confirmPassword: '',
    department: '',
    position: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock registration
    setTimeout(() => {
      alert('สมัครสมาชิกสำเร็จ! (Mock)');
      router.push('/login');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-4 py-6 sm:py-12">
      <div className="w-full max-w-[600px]">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
          {/* Logo & Title */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#A21D21] to-[#8B1538] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-105 transition-transform">
              <svg className="w-9 h-9 sm:w-11 sm:h-11 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#A21D21] to-[#8B1538] bg-clip-text text-transparent mb-2">สร้างบัญชีใหม่</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">เริ่มต้นการเดินทางพัฒนาทักษะของคุณวันนี้</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  ชื่อ-นามสกุล <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-[#A21D21] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-500"
                    placeholder="สมชาย ใจดี"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  รหัสพนักงาน <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-[#A21D21] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  <input
                    type="text"
                    required
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-500"
                    placeholder="EMP001"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  อีเมล <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-[#A21D21] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-500"
                    placeholder="user@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  แผนก <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none group-focus-within:text-[#A21D21] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <select
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all appearance-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:border-gray-300 dark:hover:border-gray-500"
                  >
                    <option value="">เลือกแผนก</option>
                    <option value="ฝ่ายผลิต">ฝ่ายผลิต</option>
                    <option value="ฝ่ายขาย">ฝ่ายขาย</option>
                    <option value="ฝ่ายพัฒนาบุคลากร">ฝ่ายพัฒนาบุคลากร</option>
                    <option value="ฝ่าย IT">ฝ่าย IT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  ตำแหน่ง <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-500"
                  placeholder="พนักงาน"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  รหัสผ่าน <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-[#A21D21] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  ยืนยันรหัสผ่าน <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-[#A21D21] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-gradient-to-r from-[#A21D21] to-[#8B1538] text-white rounded-lg hover:from-[#8B1538] hover:to-[#A21D21] transition-all font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  กำลังสมัครสมาชิก...
                </span>
              ) : 'สมัครสมาชิก'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              มีบัญชีอยู่แล้ว?{' '}
              <Link href="/login" className="text-[#A21D21] dark:text-[#C92828] hover:text-[#7A1818] dark:hover:text-[#A21D21] font-bold transition-colors hover:underline">
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
