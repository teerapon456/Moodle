'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';

// Mock roadmap data
const mockRoadmap = {
  currentLevel: 'L2',
  currentLevelName: 'ระดับกลาง',
  nextLevel: 'L3',
  nextLevelName: 'ระดับสูง',
  progressToNextLevel: 65,
  totalLevels: [
    { level: 'L1', name: 'ระดับพื้นฐาน', completed: true, progress: 100 },
    { level: 'L2', name: 'ระดับกลาง', completed: false, progress: 65 },
    { level: 'L3', name: 'ระดับสูง', completed: false, progress: 0 },
    { level: 'L4', name: 'ระดับผู้เชี่ยวชาญ', completed: false, progress: 0 },
    { level: 'L5', name: 'ระดับผู้นำ', completed: false, progress: 0 }
  ],
  skills: [
    {
      category: 'ความปลอดภัย',
      currentLevel: 'L2',
      targetLevel: 'L3',
      progress: 70,
      requiredCourses: [
        { id: 1, title: 'มาตรฐานความปลอดภัยในโรงงาน', completed: true, level: 'L2' },
        { id: 2, title: 'การประเมินความเสี่ยงขั้นสูง', completed: false, level: 'L3' },
        { id: 3, title: 'การจัดการเหตุฉุกเฉิน', completed: false, level: 'L3' }
      ]
    },
    {
      category: 'คุณภาพ',
      currentLevel: 'L1',
      targetLevel: 'L2',
      progress: 45,
      requiredCourses: [
        { id: 4, title: 'พื้นฐานคุณภาพผลิตภัณฑ์', completed: true, level: 'L1' },
        { id: 5, title: 'การควบคุมคุณภาพขั้นสูง', completed: false, level: 'L2' },
        { id: 6, title: 'Six Sigma Green Belt', completed: false, level: 'L2' }
      ]
    },
    {
      category: 'การผลิต',
      currentLevel: 'L2',
      targetLevel: 'L3',
      progress: 80,
      requiredCourses: [
        { id: 7, title: 'การใช้งาน ERP System', completed: true, level: 'L2' },
        { id: 8, title: 'การวางแผนการผลิต', completed: false, level: 'L3' },
        { id: 9, title: 'การเพิ่มประสิทธิภาพการผลิต', completed: false, level: 'L3' }
      ]
    },
    {
      category: 'การพัฒนาบุคลากร',
      currentLevel: 'L1',
      targetLevel: 'L2',
      progress: 30,
      requiredCourses: [
        { id: 10, title: 'การสื่อสารเชิงธุรกิจ', completed: true, level: 'L1' },
        { id: 11, title: 'การจัดการทีมอย่างมีประสิทธิภาพ', completed: false, level: 'L2' },
        { id: 12, title: 'การพัฒนาผู้ใต้บังคับบัญชา', completed: false, level: 'L2' }
      ]
    }
  ],
  recommendedPath: [
    {
      phase: 'Phase 1: สร้างรากฐาน (3 เดือน)',
      description: 'เสริมสร้างพื้นฐานในพื้นที่ที่ยังอ่อน',
      courses: [
        { id: 5, title: 'การควบคุมคุณภาพขั้นสูง', priority: 'high', estimatedHours: 25 },
        { id: 11, title: 'การจัดการทีมอย่างมีประสิทธิภาพ', priority: 'high', estimatedHours: 20 }
      ]
    },
    {
      phase: 'Phase 2: พัฒนาทักษะ (6 เดือน)',
      description: 'พัฒนาทักษะขั้นสูงและเชี่ยวชาญ',
      courses: [
        { id: 2, title: 'การประเมินความเสี่ยงขั้นสูง', priority: 'medium', estimatedHours: 30 },
        { id: 8, title: 'การวางแผนการผลิต', priority: 'medium', estimatedHours: 35 },
        { id: 6, title: 'Six Sigma Green Belt', priority: 'medium', estimatedHours: 40 }
      ]
    },
    {
      phase: 'Phase 3: สู่ผู้เชี่ยวชาญ (9 เดือน)',
      description: 'ก้าวสู่ระดับผู้เชี่ยวชาญและผู้นำ',
      courses: [
        { id: 3, title: 'การจัดการเหตุฉุกเฉิน', priority: 'low', estimatedHours: 25 },
        { id: 9, title: 'การเพิ่มประสิทธิภาพการผลิต', priority: 'low', estimatedHours: 30 },
        { id: 12, title: 'การพัฒนาผู้ใต้บังคับบัญชา', priority: 'low', estimatedHours: 20 }
      ]
    }
  ],
  milestones: [
    {
      id: 1,
      title: 'ทบทวนความปลอดภัยรายไตรมาส',
      targetDate: '2024-03-31',
      description: 'ผ่านการทบทวนความปลอดภัยประจำไตรมาส',
      completed: false,
      type: 'assessment'
    },
    {
      id: 2,
      title: 'สอบ Six Sigma Green Belt',
      targetDate: '2024-06-30',
      description: 'สอบได้รับการรับรอง Six Sigma Green Belt',
      completed: false,
      type: 'certification'
    },
    {
      id: 3,
      title: 'โปรเจคปรับปรุงกระบวนการ',
      targetDate: '2024-09-30',
      description: 'นำโปรเจคปรับปรุงกระบวนการสู่เสร็จสิ้น',
      completed: false,
      type: 'project'
    },
    {
      id: 4,
      title: 'การประเมินประจำปี',
      targetDate: '2024-12-31',
      description: 'ผ่านการประเมินสมรรถนะประจำปี',
      completed: false,
      type: 'assessment'
    }
  ]
};

export default function RoadmapPage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const getLevelColor = (level: string) => {
    const colors = {
      'L1': 'bg-green-500',
      'L2': 'bg-blue-500',
      'L3': 'bg-purple-500',
      'L4': 'bg-orange-500',
      'L5': 'bg-red-500'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-500';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'high': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
      'medium': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
      'low': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800';
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      'high': 'สูง',
      'medium': 'กลาง',
      'low': 'ต่ำ'
    };
    return labels[priority as keyof typeof labels] || 'ปกติ';
  };

  return (
    <MainLayout userName="ผู้เรียน" userRole="learner">
      <div className="pt-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🎯 แผนการพัฒนา</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            วางแผนการเรียนรู้และพัฒนาทักษะเพื่อก้าวสู่ระดับถัดไป
          </p>
        </div>

        {/* Current Level Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">ภาพรวมระดับปัจจุบัน</h2>
            <span className={`px-4 py-2 ${getLevelColor(mockRoadmap.currentLevel)} text-white rounded-lg font-medium`}>
              {mockRoadmap.currentLevel} - {mockRoadmap.currentLevelName}
            </span>
          </div>

          {/* Progress to Next Level */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                ความคืบหน้าสู่ {mockRoadmap.nextLevel} - {mockRoadmap.nextLevelName}
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {mockRoadmap.progressToNextLevel}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-[#A21D21] to-[#7A1818] h-3 rounded-full transition-all duration-500"
                style={{ width: `${mockRoadmap.progressToNextLevel}%` }}
              ></div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="space-y-3">
            {mockRoadmap.totalLevels.map((level, index) => (
              <div key={level.level} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${getLevelColor(level.level)} flex items-center justify-center text-white font-bold`}>
                  {level.level}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {level.name}
                    </span>
                    {level.completed && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                        สำเร็จ
                      </span>
                    )}
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${level.completed ? 'bg-green-500' : getLevelColor(level.level)} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${level.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Development */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">การพัฒนาทักษะ</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockRoadmap.skills.map((skill) => (
              <div
                key={skill.category}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedSkill === skill.category
                    ? 'border-[#A21D21] dark:border-[#C92828] bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                onClick={() => setSelectedSkill(selectedSkill === skill.category ? null : skill.category)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {skill.category}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.currentLevel} → {skill.targetLevel}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ความคืบหน้า
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {skill.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#A21D21] to-[#7A1818] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {skill.requiredCourses.filter(c => c.completed).length}/{skill.requiredCourses.length} หลักสูตร
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${selectedSkill === skill.category ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Detailed Courses */}
                {selectedSkill === skill.category && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    {skill.requiredCourses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${course.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                            }`}></div>
                          <span className={`text-sm ${course.completed
                              ? 'text-gray-500 dark:text-gray-400 line-through'
                              : 'text-gray-700 dark:text-gray-300'
                            }`}>
                            {course.title}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {course.level}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Learning Path */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">เส้นทางการเรียนที่แนะนำ</h2>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-[#A21D21] dark:text-[#C92828] hover:underline"
            >
              {showDetails ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด'}
            </button>
          </div>

          <div className="space-y-4">
            {mockRoadmap.recommendedPath.map((phase, index) => (
              <div key={index} className="border-l-4 border-[#A21D21] pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {phase.phase}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {phase.courses.reduce((sum, course) => sum + course.estimatedHours, 0)} ชั่วโมง
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {phase.description}
                </p>

                {showDetails && (
                  <div className="space-y-2">
                    {phase.courses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {course.title}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                            ({course.estimatedHours} ชั่วโมง)
                          </span>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(course.priority)}`}>
                          {getPriorityLabel(course.priority)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">เป้าหมายสำคัญ</h2>

          <div className="space-y-4">
            {mockRoadmap.milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${milestone.type === 'assessment' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    milestone.type === 'certification' ? 'bg-purple-100 dark:bg-purple-900/30' :
                      'bg-green-100 dark:bg-green-900/30'
                  }`}>
                  {milestone.type === 'assessment' && (
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  )}
                  {milestone.type === 'certification' && (
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13C6.477 5 2 9.477 2 15c0 1.746.477 3.332 1.253 4.5m18.494 0C22.523 18.332 23 16.746 23 15c0-5.523-4.477-10-10-10" />
                    </svg>
                  )}
                  {milestone.type === 'project' && (
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {milestone.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      📅 {milestone.targetDate}
                    </span>
                    {milestone.completed && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                        สำเร็จแล้ว
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
