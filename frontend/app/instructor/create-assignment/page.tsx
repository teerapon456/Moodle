'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

export default function InstructorCreateAssignmentPage() {
  const currentUser = getCurrentUser();
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    description: '',
    type: 'assignment',
    course: '',
    maxScore: 100,
    passingScore: 60,
    dueDate: '',
    dueTime: '23:59',
    allowLateSubmission: false,
    latePenalty: 10,

    // Settings
    attempts: 1,
    showCorrectAnswers: false,
    showScore: true,
    randomizeQuestions: false,
    timeLimit: 0,

    // Instructions
    instructions: '',
    attachments: [],

    // Grading
    rubric: {
      enabled: false,
      criteria: [] as Array<{
        id: number;
        name: string;
        description: string;
        maxScore: number;
        weight: number;
      }>
    },

    // Schedule
    availableFrom: '',
    availableUntil: '',

    // Notifications
    notifyStudents: true,
    notifyInstructors: false
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRubricChange = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      rubric: {
        ...prev.rubric,
        criteria: prev.rubric.criteria.map((c, i) =>
          i === index ? { ...c, [field]: value } : c
        )
      }
    }));
  };

  const addRubricCriteria = () => {
    const newCriteria = {
      id: Date.now(),
      name: '',
      description: '',
      maxScore: 10,
      weight: 100 / (formData.rubric.criteria.length + 1)
    };

    setFormData(prev => ({
      ...prev,
      rubric: {
        ...prev.rubric,
        criteria: [...prev.rubric.criteria, newCriteria]
      }
    }));
  };

  const removeRubricCriteria = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rubric: {
        ...prev.rubric,
        criteria: prev.rubric.criteria.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating assignment:', formData);
    alert('สร้างงานเรียบร้อยแล้ว!');
  };

  const cardClasses = "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm";

  return (
    <MainLayout userName={currentUser.name} userRole="instructor">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">สร้างงานใหม่</h1>
              <p className="text-gray-600 dark:text-gray-400">สร้างและตั้งค่างานหรือแบบทดสอบ</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold">
                บันทึกฉบับร่าง
              </button>
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                สร้างงาน
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'basic', label: 'ข้อมูลพื้นฐาน', icon: '📝' },
              { id: 'settings', label: 'การตั้งค่า', icon: '⚙️' },
              { id: 'grading', label: 'การให้เกรด', icon: '📊' },
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
                    ชื่องาน *
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
                    ประเภท *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="assignment">งาน</option>
                    <option value="quiz">แบบทดสอบ</option>
                    <option value="exam">การสอบ</option>
                    <option value="project">โปรเจคต์</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    หลักสูตร *
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => handleInputChange('course', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">เลือกหลักสูตร</option>
                    <option value="การจัดการทีมอย่างมีประสิทธิภาพ">การจัดการทีมอย่างมีประสิทธิภาพ</option>
                    <option value="การเขียนโปรแกรม Python">การเขียนโปรแกรม Python</option>
                    <option value="การตลาดดิจิทัล">การตลาดดิจิทัล</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    คะแนนเต็ม *
                  </label>
                  <input
                    type="number"
                    value={formData.maxScore}
                    onChange={(e) => handleInputChange('maxScore', e.target.value)}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    คะแนนผ่าน *
                  </label>
                  <input
                    type="number"
                    value={formData.passingScore}
                    onChange={(e) => handleInputChange('passingScore', e.target.value)}
                    min="0"
                    max={formData.maxScore}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    วันกำหนดส่ง *
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    เวลากำหนดส่ง
                  </label>
                  <input
                    type="time"
                    value={formData.dueTime}
                    onChange={(e) => handleInputChange('dueTime', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  คำอธิบายงาน *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  คำแนะนำในการทำงาน
                </label>
                <textarea
                  value={formData.instructions}
                  onChange={(e) => handleInputChange('instructions', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ใส่คำแนะนำ ขั้นตอน หรือรายละเอียดเพิ่มเติม..."
                />
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className={`${cardClasses} p-6`}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">การตั้งค่า</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      จำนวนครั้งที่ทำได้
                    </label>
                    <input
                      type="number"
                      value={formData.attempts}
                      onChange={(e) => handleInputChange('attempts', e.target.value)}
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
                    <p className="text-xs text-gray-500 mt-1">0 = ไม่จำกัดเวลา</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-50">แสดงคำตอบที่ถูกต้อง</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">แสดงคำตอบที่ถูกต้องหลังจากส่งงาน</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleInputChange('showCorrectAnswers', !formData.showCorrectAnswers)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.showCorrectAnswers ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.showCorrectAnswers ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-50">แสดงคะแนน</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">แสดงคะแนนทันทีหลังจากส่งงาน</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleInputChange('showScore', !formData.showScore)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.showScore ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.showScore ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-50">สุ่มลำดับคำถาม</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">สุ่มลำดับคำถามในแต่ละครั้งที่ทำ</p>
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
                      <h3 className="font-medium text-gray-900 dark:text-gray-50">อนุญาตส่งล่าช้า</h3>
                      <p className="text-sm-gray-600 dark:text-gray-400">อนุญาตให้ส่งงานหลังกำหนดการ</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleInputChange('allowLateSubmission', !formData.allowLateSubmission)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.allowLateSubmission ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.allowLateSubmission ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>
                </div>

                {formData.allowLateSubmission && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      หักคะแนนส่งล่าช้า (%)
                    </label>
                    <input
                      type="number"
                      value={formData.latePenalty}
                      onChange={(e) => handleInputChange('latePenalty', e.target.value)}
                      min="0"
                      max="100"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Grading */}
          {activeTab === 'grading' && (
            <div className={`${cardClasses} p-6`}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">การให้เกรด</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-50">ใช้เกณฑ์การให้เกรด (Rubric)</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">กำหนดเกณฑ์การให้เกรดโดยละเอียด</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInputChange('rubric', { ...formData.rubric, enabled: !formData.rubric.enabled })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.rubric.enabled ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.rubric.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>

                {formData.rubric.enabled && (
                  <div className="space-y-4">
                    {formData.rubric.criteria.map((criteria, index) => (
                      <div key={criteria.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-900 dark:text-gray-50">เกณฑ์ที่ {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeRubricCriteria(index)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            ลบ
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              ชื่อเกณฑ์
                            </label>
                            <input
                              type="text"
                              value={criteria.name}
                              onChange={(e) => handleRubricChange(index, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              placeholder="เช่น ความสมบูรณ์ของเนื้อหา"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              คะแนนสูงสุด
                            </label>
                            <input
                              type="number"
                              value={criteria.maxScore}
                              onChange={(e) => handleRubricChange(index, 'maxScore', e.target.value)}
                              min="1"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            คำอธิบาย
                          </label>
                          <textarea
                            value={criteria.description}
                            onChange={(e) => handleRubricChange(index, 'description', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="อธิบายรายละเอียดเกณฑ์การให้เกรด..."
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addRubricCriteria}
                      className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-gray-600 hover:text-gray-700"
                    >
                      + เพิ่มเกณฑ์ใหม่
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Schedule */}
          {activeTab === 'schedule' && (
            <div className={`${cardClasses} p-6`}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">กำหนดการ</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    เริ่มตั้งแต่
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.availableFrom}
                    onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    สิ้นสุด
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.availableUntil}
                    onChange={(e) => handleInputChange('availableUntil', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-50">แจ้งเตือนนักเรียน</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ส่งการแจ้งเตือนเมื่อมีงานใหม่</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInputChange('notifyStudents', !formData.notifyStudents)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.notifyStudents ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.notifyStudents ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-50">แจ้งเตือนผู้สอนอื่น</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">แจ้งเตือนผู้สอนคนอื่นในหลักสูตรเดียวกัน</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInputChange('notifyInstructors', !formData.notifyInstructors)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.notifyInstructors ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.notifyInstructors ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>
              </div>
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
              สร้างงาน
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
