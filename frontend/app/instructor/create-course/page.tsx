'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

export default function InstructorCreateCoursePage() {
  const currentUser = getCurrentUser();
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    description: '',
    category: '',
    level: '',
    language: 'th',
    duration: '',
    price: '',
    maxStudents: '',
    startDate: '',
    endDate: '',

    // Course Content
    modules: [
      {
        id: 1,
        title: '',
        description: '',
        order: 1,
        lessons: [
          {
            id: 1,
            title: '',
            type: 'video',
            duration: '',
            content: '',
            order: 1
          }
        ]
      }
    ],

    // Settings
    allowComments: true,
    allowDownloads: true,
    certificateEnabled: true,
    autoApprove: false,
    requireApproval: false,

    // Assessment
    passingScore: 70,
    maxAttempts: 3,
    timeLimit: 60,
    randomizeQuestions: false,
    showResults: true,

    // Resources
    materials: [],
    links: [],

    // Schedule
    schedule: {
      type: 'flexible',
      days: [] as number[],
      startTime: '',
      endTime: '',
      timezone: 'Asia/Bangkok'
    }
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleModuleChange = (moduleId: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map(module =>
        module.id === moduleId ? { ...module, [field]: value } : module
      )
    }));
  };

  const handleLessonChange = (moduleId: number, lessonId: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map(module =>
        module.id === moduleId
          ? {
            ...module,
            lessons: module.lessons.map(lesson =>
              lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
            )
          }
          : module
      )
    }));
  };

  const addModule = () => {
    const newModule = {
      id: Date.now(),
      title: '',
      description: '',
      order: formData.modules.length + 1,
      lessons: [
        {
          id: Date.now(),
          title: '',
          type: 'video',
          duration: '',
          content: '',
          order: 1
        }
      ]
    };
    setFormData(prev => ({
      ...prev,
      modules: [...prev.modules, newModule]
    }));
  };

  const removeModule = (moduleId: number) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.filter(module => module.id !== moduleId)
    }));
  };

  const addLesson = (moduleId: number) => {
    const module = formData.modules.find(m => m.id === moduleId);
    if (!module) return;

    const newLesson = {
      id: Date.now(),
      title: '',
      type: 'video',
      duration: '',
      content: '',
      order: module.lessons.length + 1
    };

    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map(m =>
        m.id === moduleId
          ? { ...m, lessons: [...m.lessons, newLesson] }
          : m
      )
    }));
  };

  const removeLesson = (moduleId: number, lessonId: number) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map(module =>
        module.id === moduleId
          ? { ...module, lessons: module.lessons.filter(lesson => lesson.id !== lessonId) }
          : module
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating course:', formData);
    alert('สร้างหลักสูตรเรียบร้อยแล้ว!');
  };

  const cardClasses = "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm";

  return (
    <MainLayout userName={currentUser.name} userRole="instructor">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">สร้างหลักสูตรใหม่</h1>
              <p className="text-gray-600 dark:text-gray-400">สร้างและตั้งค่าหลักสูตรการเรียน</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold">
                บันทึกฉบับร่าง
              </button>
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                สร้างหลักสูตร
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'basic', label: 'ข้อมูลพื้นฐาน', icon: '📝' },
              { id: 'content', label: 'เนื้อหา', icon: '📚' },
              { id: 'assessment', label: 'การประเมิน', icon: '📊' },
              { id: 'settings', label: 'การตั้งค่า', icon: '⚙️' },
              { id: 'schedule', label: 'กำหนดการ', icon: '📅' }
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

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          {activeTab === 'basic' && (
            <div className={`${cardClasses} p-6`}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">ข้อมูลพื้นฐาน</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ชื่อหลักสูตร *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    หมวดหมู่ *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">เลือกหมวดหมู่</option>
                    <option value="management">การจัดการ</option>
                    <option value="technology">เทคโนโลยี</option>
                    <option value="marketing">การตลาด</option>
                    <option value="finance">การเงิน</option>
                    <option value="hr">ทรัพยากรบุคคล</option>
                    <option value="communication">การสื่อสาร</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ระดับ *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => handleInputChange('level', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">เลือกระดับ</option>
                    <option value="beginner">เริ่มต้น</option>
                    <option value="intermediate">กลาง</option>
                    <option value="advanced">ขั้นสูง</option>
                    <option value="expert">ผู้เชี่ยวชาญ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ภาษา
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="th">ไทย</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ระยะเวลา (ชั่วโมง)
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    จำนวนนักเรียนสูงสุด
                  </label>
                  <input
                    type="number"
                    value={formData.maxStudents}
                    onChange={(e) => handleInputChange('maxStudents', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    วันที่เริ่ม
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    วันที่สิ้นสุด
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  คำอธิบายหลักสูตร *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          )}

          {/* Course Content */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              {formData.modules.map((module, moduleIndex) => (
                <div key={module.id} className={`${cardClasses} p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                      โมดูลที่ {module.order}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeModule(module.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      ลบโมดูล
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ชื่อโมดูล
                      </label>
                      <input
                        type="text"
                        value={module.title}
                        onChange={(e) => handleModuleChange(module.id, 'title', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        คำอธิบายโมดูล
                      </label>
                      <textarea
                        value={module.description}
                        onChange={(e) => handleModuleChange(module.id, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900 dark:text-gray-50">บทเรียน</h4>
                        <button
                          type="button"
                          onClick={() => addLesson(module.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          เพิ่มบทเรียน
                        </button>
                      </div>

                      <div className="space-y-3">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lesson.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                บทเรียนที่ {lesson.order}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeLesson(module.id, lesson.id)}
                                className="text-red-600 hover:text-red-700 text-sm"
                              >
                                ลบ
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  ชื่อบทเรียน
                                </label>
                                <input
                                  type="text"
                                  value={lesson.title}
                                  onChange={(e) => handleLessonChange(module.id, lesson.id, 'title', e.target.value)}
                                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  ประเภท
                                </label>
                                <select
                                  value={lesson.type}
                                  onChange={(e) => handleLessonChange(module.id, lesson.id, 'type', e.target.value)}
                                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                >
                                  <option value="video">วิดีโอ</option>
                                  <option value="text">ข้อความ</option>
                                  <option value="quiz">แบบทดสอบ</option>
                                  <option value="assignment">งาน</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  ระยะเวลา (นาที)
                                </label>
                                <input
                                  type="number"
                                  value={lesson.duration}
                                  onChange={(e) => handleLessonChange(module.id, lesson.id, 'duration', e.target.value)}
                                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  เนื้อหา
                                </label>
                                <textarea
                                  value={lesson.content}
                                  onChange={(e) => handleLessonChange(module.id, lesson.id, 'content', e.target.value)}
                                  rows={2}
                                  className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addModule}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-gray-600 hover:text-gray-700"
              >
                + เพิ่มโมดูลใหม่
              </button>
            </div>
          )}

          {/* Assessment */}
          {activeTab === 'assessment' && (
            <div className={`${cardClasses} p-6`}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">การตั้งค่าการประเมิน</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    คะแนนผ่าน (%)
                  </label>
                  <input
                    type="number"
                    value={formData.passingScore}
                    onChange={(e) => handleInputChange('passingScore', e.target.value)}
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    จำนวนครั้งที่ทำได้สูงสุด
                  </label>
                  <input
                    type="number"
                    value={formData.maxAttempts}
                    onChange={(e) => handleInputChange('maxAttempts', e.target.value)}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    จำกัดเวลา (นาที)
                  </label>
                  <input
                    type="number"
                    value={formData.timeLimit}
                    onChange={(e) => handleInputChange('timeLimit', e.target.value)}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-50">สุ่มคำถาม</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">สุ่มลำดับคำถามในแต่ละครั้ง</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInputChange('randomizeQuestions', !formData.randomizeQuestions)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.randomizeQuestions ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.randomizeQuestions ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-50">แสดงผลลัพธ์</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">แสดงผลลัพธ์หลังทำแบบทดสอบ</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInputChange('showResults', !formData.showResults)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.showResults ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.showResults ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className={`${cardClasses} p-6`}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">การตั้งค่าหลักสูตร</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-50">อนุญาตความคิดเห็น</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">อนุญาตให้นักเรียนแสดงความคิดเห็น</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInputChange('allowComments', !formData.allowComments)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.allowComments ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.allowComments ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-50">อนุญาตการดาวน์โหลด</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">อนุญาตให้ดาวน์โหลดเนื้อหา</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInputChange('allowDownloads', !formData.allowDownloads)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.allowDownloads ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.allowDownloads ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-50">ใบประกาศนียบัตร</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ออกใบประกาศนียบัตรเมื่อเสร็จสิ้นหลักสูตร</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInputChange('certificateEnabled', !formData.certificateEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.certificateEnabled ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.certificateEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-50">อนุมัติอัตโนมัติ</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">อนุมัติการลงทะเบียนอัตโนมัติ</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInputChange('autoApprove', !formData.autoApprove)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.autoApprove ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.autoApprove ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-50">ต้องการการอนุมัติ</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ต้องการการอนุมัติก่อนเข้าเรียน</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInputChange('requireApproval', !formData.requireApproval)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.requireApproval ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.requireApproval ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Schedule */}
          {activeTab === 'schedule' && (
            <div className={`${cardClasses} p-6`}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">กำหนดการเรียน</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ประเภทกำหนดการ
                  </label>
                  <select
                    value={formData.schedule.type}
                    onChange={(e) => handleInputChange('schedule', { ...formData.schedule, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="flexible">ยืดหยุ่น</option>
                    <option value="fixed">กำหนดเวลา</option>
                    <option value="live">สด</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    โซนเวลา
                  </label>
                  <select
                    value={formData.schedule.timezone}
                    onChange={(e) => handleInputChange('schedule', { ...formData.schedule, timezone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Asia/Bangkok">เอเชีย/กรุงเทพฯ</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>

                {formData.schedule.type === 'fixed' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        เวลาเริ่ม
                      </label>
                      <input
                        type="time"
                        value={formData.schedule.startTime}
                        onChange={(e) => handleInputChange('schedule', { ...formData.schedule, startTime: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        เวลาสิ้นสุด
                      </label>
                      <input
                        type="time"
                        value={formData.schedule.endTime}
                        onChange={(e) => handleInputChange('schedule', { ...formData.schedule, endTime: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </>
                )}
              </div>

              {formData.schedule.type === 'fixed' && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    วันที่เรียน
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'].map((day, index) => (
                      <label key={day} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.schedule.days.includes(index)}
                          onChange={(e) => {
                            const days = e.target.checked
                              ? [...formData.schedule.days, index]
                              : formData.schedule.days.filter((d: number) => d !== index);
                            handleInputChange('schedule', { ...formData.schedule, days });
                          }}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => console.log('Save draft')}
            >
              บันทึกฉบับร่าง
            </Button>
            <Button type="submit" className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              สร้างหลักสูตร
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
