'use client';

import React, { useState } from 'react';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    email: 'user@company.com',
    phone: '081-234-5678',
    language: 'th',
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    theme: 'light',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('บันทึกการตั้งค่าสำเร็จ! (Mock)');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">การตั้งค่า</h1>
        <p className="text-gray-600 mt-1">จัดการการตั้งค่าบัญชีของคุณ</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
            <svg className="w-5 h-5 mr-2 text-[#A21D21]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            ข้อมูลส่วนตัว
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                อีเมล
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                เบอร์โทรศัพท์
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ภาษา
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all appearance-none bg-white"
                >
                  <option value="th">ไทย</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white rounded-lg hover:from-[#7A1818] hover:to-[#A21D21] transition-all font-semibold shadow-md hover:shadow-lg"
            >
              บันทึกการเปลี่ยนแปลง
            </button>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
            <svg className="w-5 h-5 mr-2 text-[#A21D21]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            การแจ้งเตือน
          </h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">อีเมลแจ้งเตือน</p>
                  <p className="text-sm text-gray-500">รับการแจ้งเตือนผ่านอีเมล</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.notifications.email}
                onChange={(e) => setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, email: e.target.checked }
                })}
                className="w-5 h-5 text-[#A21D21] border-gray-300 rounded focus:ring-[#A21D21] cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Push Notification</p>
                  <p className="text-sm text-gray-500">รับการแจ้งเตือนแบบ Push</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.notifications.push}
                onChange={(e) => setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, push: e.target.checked }
                })}
                className="w-5 h-5 text-[#A21D21] border-gray-300 rounded focus:ring-[#A21D21] cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">SMS แจ้งเตือน</p>
                  <p className="text-sm text-gray-500">รับการแจ้งเตือนผ่าน SMS</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.notifications.sms}
                onChange={(e) => setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, sms: e.target.checked }
                })}
                className="w-5 h-5 text-[#A21D21] border-gray-300 rounded focus:ring-[#A21D21] cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
            <svg className="w-5 h-5 mr-2 text-[#A21D21]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            ธีม
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <label className={`flex flex-col items-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
              formData.theme === 'light' ? 'border-[#A21D21] bg-[#A21D21]/5' : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input
                type="radio"
                name="theme"
                value="light"
                checked={formData.theme === 'light'}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                className="sr-only"
              />
              <svg className="w-8 h-8 text-yellow-500 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-gray-700">โหมดสว่าง</span>
            </label>
            <label className={`flex flex-col items-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
              formData.theme === 'dark' ? 'border-[#A21D21] bg-[#A21D21]/5' : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={formData.theme === 'dark'}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                className="sr-only"
              />
              <svg className="w-8 h-8 text-gray-700 mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
              <span className="font-semibold text-gray-700">โหมดมืด</span>
            </label>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
            <svg className="w-5 h-5 mr-2 text-[#A21D21]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            ความปลอดภัย
          </h2>
          <div className="space-y-3">
            <button className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              เปลี่ยนรหัสผ่าน
            </button>
            <button className="w-full px-6 py-3 border-2 border-red-300 text-red-700 rounded-lg hover:bg-red-50 hover:border-red-400 transition-all font-semibold flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              ลบบัญชี
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
