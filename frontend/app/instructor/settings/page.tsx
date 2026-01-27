'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

export default function InstructorSettingsPage() {
  const currentUser = getCurrentUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    // Profile settings
    firstName: currentUser.name.split(' ')[0] || 'ผู้สอน',
    lastName: currentUser.name.split(' ')[1] || 'ทดสอบ',
    email: 'instructor@inteqc.com',
    phone: '081-234-5678',
    department: 'ฝ่ายพัฒนาทักษะ',
    position: 'ผู้สอนอาวุโส',
    bio: 'ผู้เชี่ยวชาญด้านการจัดการทีมและการพัฒนาทักษะองค์กร มีประสบการณ์มากกว่า 10 ปี',

    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    monthlyReports: true,
    newStudentAlerts: true,
    assignmentSubmissions: true,
    systemUpdates: false,

    // Privacy settings
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    showProfilePicture: true,

    // System settings
    language: 'th',
    timezone: 'Asia/Bangkok',
    dateFormat: 'dd/mm/yyyy',
    timeFormat: '24h',
    theme: 'light',
    autoSave: true,

    // Security settings
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30'
  });

  const handleInputChange = (category: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSimpleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (section: string) => {
    // Save logic here
    console.log(`Saving ${section}:`, formData);
    alert(`บันทึกข้อมูล${section === 'profile' ? 'โปรไฟล์' : section === 'notifications' ? 'การแจ้งเตือน' : section === 'privacy' ? 'ความเป็นส่วนตัว' : section === 'system' ? 'ระบบ' : 'ความปลอดภัย'}เรียบร้อยแล้ว`);
  };

  const cardClasses = "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm";

  return (
    <MainLayout userName={currentUser.name} userRole="instructor">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">การตั้งค่า</h1>
              <p className="text-gray-600 dark:text-gray-400">จัดการการตั้งค่าบัญชีและระบบ</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'profile', label: 'โปรไฟล์', icon: '👤' },
              { id: 'notifications', label: 'การแจ้งเตือน', icon: '🔔' },
              { id: 'privacy', label: 'ความเป็นส่วนตัว', icon: '🔒' },
              { id: 'system', label: 'ระบบ', icon: '⚙️' },
              { id: 'security', label: 'ความปลอดภัย', icon: '🛡️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <span className="flex items-center gap-2">
                  <span>{tab.icon}</span>
                  {tab.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <div className={`${cardClasses} p-6`}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">ข้อมูลโปรไฟล์</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ชื่อ
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleSimpleChange('firstName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  นามสกุล
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleSimpleChange('lastName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  อีเมล
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleSimpleChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleSimpleChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  แผนก
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => handleSimpleChange('department', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ฝ่ายพัฒนาทักษะ">ฝ่ายพัฒนาทักษะ</option>
                  <option value="ฝ่ายการตลาด">ฝ่ายการตลาด</option>
                  <option value="ฝ่ายบุคคล">ฝ่ายบุคคล</option>
                  <option value="ฝ่ายไอที">ฝ่ายไอที</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ตำแหน่ง
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleSimpleChange('position', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                เกี่ยวกับฉัน
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleSimpleChange('bio', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => handleSave('profile')} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                บันทึกข้อมูลโปรไฟล์
              </Button>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className={`${cardClasses} p-6`}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">การตั้งค่าการแจ้งเตือน</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-50">แจ้งเตือนทางอีเมล</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">รับการแจ้งเตือนผ่านอีเมล</p>
                </div>
                <button
                  onClick={() => handleSimpleChange('emailNotifications', !formData.emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.emailNotifications ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-50">แจ้งเตือนแบบ Push</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">รับการแจ้งเตือนแบบพุชบนเบราว์เซอร์</p>
                </div>
                <button
                  onClick={() => handleSimpleChange('pushNotifications', !formData.pushNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.pushNotifications ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-50">แจ้งเตือนทาง SMS</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">รับการแจ้งเตือนผ่านข้อความ SMS</p>
                </div>
                <button
                  onClick={() => handleSimpleChange('smsNotifications', !formData.smsNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.smsNotifications ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-50">รายงานประจำสัปดาห์</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">รับรายงานสรุปประจำสัปดาห์</p>
                </div>
                <button
                  onClick={() => handleSimpleChange('weeklyReports', !formData.weeklyReports)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.weeklyReports ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.weeklyReports ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-50">รายงานประจำเดือน</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">รับรายงานสรุปประจำเดือน</p>
                </div>
                <button
                  onClick={() => handleSimpleChange('monthlyReports', !formData.monthlyReports)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.monthlyReports ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.monthlyReports ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-50">แจ้งเตือนนักเรียนใหม่</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">รับการแจ้งเตือนเมื่อมีนักเรียนลงทะเบียนใหม่</p>
                </div>
                <button
                  onClick={() => handleSimpleChange('newStudentAlerts', !formData.newStudentAlerts)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.newStudentAlerts ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.newStudentAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-50">การส่งงาน</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">รับการแจ้งเตือนเมื่อนักเรียนส่งงาน</p>
                </div>
                <button
                  onClick={() => handleSimpleChange('assignmentSubmissions', !formData.assignmentSubmissions)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.assignmentSubmissions ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.assignmentSubmissions ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-50">อัปเดตระบบ</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">รับการแจ้งเตือนเมื่อมีการอัปเดตระบบ</p>
                </div>
                <button
                  onClick={() => handleSimpleChange('systemUpdates', !formData.systemUpdates)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.systemUpdates ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.systemUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => handleSave('notifications')} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                บันทึกการแจ้งเตือน
              </Button>
            </div>
          </div>
        )}

        {/* Privacy Settings */}
        {activeTab === 'privacy' && (
          <div className={`${cardClasses} p-6`}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">การตั้งค่าความเป็นส่วนตัว</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  การมองเห็นโปรไฟล์
                </label>
                <select
                  value={formData.profileVisibility}
                  onChange={(e) => handleSimpleChange('profileVisibility', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="public">สาธารณะ</option>
                  <option value="internal">ภายในองค์กรเท่านั้น</option>
                  <option value="private">ส่วนตัว</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-50">แสดงอีเมล</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">แสดงอีเมลในโปรไฟล์สาธารณะ</p>
                </div>
                <button
                  onClick={() => handleSimpleChange('showEmail', !formData.showEmail)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.showEmail ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.showEmail ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-50">แสดงเบอร์โทรศัพท์</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">แสดงเบอร์โทรศัพท์ในโปรไฟล์สาธารณะ</p>
                </div>
                <button
                  onClick={() => handleSimpleChange('showPhone', !formData.showPhone)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.showPhone ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.showPhone ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-50">อนุญาตให้ส่งข้อความ</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">อนุญาตให้ผู้อื่นส่งข้อความถึงได้</p>
                </div>
                <button
                  onClick={() => handleSimpleChange('allowMessages', !formData.allowMessages)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.allowMessages ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.allowMessages ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-50">แสดงรูปโปรไฟล์</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">แสดงรูปโปรไฟล์ในโปรไฟล์สาธารณะ</p>
                </div>
                <button
                  onClick={() => handleSimpleChange('showProfilePicture', !formData.showProfilePicture)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.showProfilePicture ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.showProfilePicture ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => handleSave('privacy')} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                บันทึกความเป็นส่วนตัว
              </Button>
            </div>
          </div>
        )}

        {/* System Settings */}
        {activeTab === 'system' && (
          <div className={`${cardClasses} p-6`}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">การตั้งค่าระบบ</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ภาษา
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => handleSimpleChange('language', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="th">ไทย</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  โซนเวลา
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => handleSimpleChange('timezone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Asia/Bangkok">เอเชีย/กรุงเทพฯ</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">อเมริกา/นิวยอร์ก</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  รูปแบบวันที่
                </label>
                <select
                  value={formData.dateFormat}
                  onChange={(e) => handleSimpleChange('dateFormat', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="dd/mm/yyyy">วัน/เดือน/ปี</option>
                  <option value="mm/dd/yyyy">เดือน/วัน/ปี</option>
                  <option value="yyyy-mm-dd">ปี-เดือน-วัน</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  รูปแบบเวลา
                </label>
                <select
                  value={formData.timeFormat}
                  onChange={(e) => handleSimpleChange('timeFormat', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="24h">24 ชั่วโมง</option>
                  <option value="12h">12 ชั่วโมง (AM/PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ธีม
                </label>
                <select
                  value={formData.theme}
                  onChange={(e) => handleSimpleChange('theme', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="light">สว่าง</option>
                  <option value="dark">มืด</option>
                  <option value="auto">ตามระบบ</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  หมดอายุเซสชัน (นาที)
                </label>
                <select
                  value={formData.sessionTimeout}
                  onChange={(e) => handleSimpleChange('sessionTimeout', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="15">15 นาที</option>
                  <option value="30">30 นาที</option>
                  <option value="60">1 ชั่วโมง</option>
                  <option value="120">2 ชั่วโมง</option>
                </select>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-50">บันทึกอัตโนมัติ</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">บันทึกข้อมูลอัตโนมัติขณะทำงาน</p>
                </div>
                <button
                  onClick={() => handleSimpleChange('autoSave', !formData.autoSave)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.autoSave ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.autoSave ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => handleSave('system')} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                บันทึกการตั้งค่าระบบ
              </Button>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className={`${cardClasses} p-6`}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">การตั้งค่าความปลอดภัย</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-50 mb-4">เปลี่ยนรหัสผ่าน</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      รหัสผ่านปัจจุบัน
                    </label>
                    <input
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) => handleSimpleChange('currentPassword', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      รหัสผ่านใหม่
                    </label>
                    <input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => handleSimpleChange('newPassword', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ยืนยันรหัสผ่านใหม่
                    </label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleSimpleChange('confirmPassword', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-50">การยืนยันตัวตน 2 ขั้นตอน</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">เพิ่มความปลอดภัยด้วยการยืนยันตัวตน 2 ขั้นตอน</p>
                  </div>
                  <button
                    onClick={() => handleSimpleChange('twoFactorAuth', !formData.twoFactorAuth)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.twoFactorAuth ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-50">แจ้งเตือนการเข้าสู่ระบบ</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">รับการแจ้งเตือนเมื่อมีการเข้าสู่ระบบบัญชีของคุณ</p>
                  </div>
                  <button
                    onClick={() => handleSimpleChange('loginAlerts', !formData.loginAlerts)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.loginAlerts ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => handleSave('security')} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                บันทึกการตั้งค่าความปลอดภัย
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
