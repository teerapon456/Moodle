'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock send reset email
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-4 py-6 sm:py-12">
      <div className="w-full max-w-[420px]">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
          {/* Logo & Title */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#A21D21] to-[#8B1538] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-105 transition-transform">
              <svg className="w-9 h-9 sm:w-11 sm:h-11 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#A21D21] to-[#8B1538] bg-clip-text text-transparent mb-2">ลืมรหัสผ่าน?</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">ไม่ต้องกังวล เราจะช่วยคุณรีเซ็ตรหัสผ่าน</p>
          </div>
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  อีเมลหรือรหัสพนักงาน
                </label>
                <div className="relative group">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-[#A21D21] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-500"
                    placeholder="user@company.com หรือ EMP001"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-start">
                  <svg className="w-3.5 h-3.5 mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  เราจะส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณ
                </p>
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
                    กำลังส่ง...
                  </span>
                ) : 'ส่งลิงก์รีเซ็ตรหัสผ่าน'}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-9 h-9 sm:w-11 sm:h-11 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">ส่งอีเมลสำเร็จ!</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  เราได้ส่งลิงก์รีเซ็ตรหัสผ่านไปยัง
                </p>
                <p className="text-gray-900 dark:text-gray-100 font-bold text-sm">{email}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <p className="text-xs text-blue-800 dark:text-blue-300">
                  <strong>คำแนะนำ:</strong> กรุณาตรวจสอบอีเมลของคุณและคลิกลิงก์เพื่อรีเซ็ตรหัสผ่าน ลิงก์จะหมดอายุใน 24 ชั่วโมง
                </p>
              </div>
              <div className="pt-3 space-y-2.5">
                <button
                  onClick={() => {
                    setSent(false);
                    setEmail('');
                  }}
                  className="w-full px-4 py-2.5 text-sm border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all font-bold shadow-sm hover:shadow-md"
                >
                  ส่งอีกครั้ง
                </button>
                <Link
                  href="/login"
                  className="block w-full px-4 py-2.5 bg-gradient-to-r from-[#A21D21] to-[#8B1538] text-white rounded-lg hover:from-[#8B1538] hover:to-[#A21D21] transition-all font-bold text-sm text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  กลับไปหน้าเข้าสู่ระบบ
                </Link>
              </div>
            </div>
          )}

          {!sent && (
            <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700 text-center">
              <Link href="/login" className="text-xs text-[#A21D21] dark:text-[#C92828] hover:text-[#7A1818] dark:hover:text-[#A21D21] font-bold transition-colors inline-flex items-center hover:underline">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                กลับไปหน้าเข้าสู่ระบบ
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
