'use client';

import React, { useState } from 'react';
import { CreatorCard, CreatorButton, CreatorBadge, CreatorModal, CreatorInput } from '@/components/ui/creator';
import {
  GripVertical,
  ChevronDown,
  ChevronRight,
  Plus,
  Video,
  FileText,
  File,
  HelpCircle,
  ClipboardList,
  Box,
  MoreVertical,
  Trash2,
  Copy,
  Edit
} from 'lucide-react';
import Link from 'next/link';

// Mock Data for Modules
const initialModules = [
  {
    id: 1,
    title: 'Introduction & Setup',
    duration: '15 mins',
    lessons: [
      { id: 101, title: 'Course Overview', type: 'video', duration: '5:00', status: 'Ready' },
      { id: 102, title: 'Learning Objectives', type: 'text', duration: '5:00', status: 'Draft' },
      { id: 103, title: 'Pre-course Knowledge Check', type: 'quiz', duration: '5:00', status: 'Ready' },
    ]
  },
  {
    id: 2,
    title: 'Core Concepts',
    duration: '45 mins',
    lessons: [
      { id: 201, title: 'Understanding the DOM', type: 'video', duration: '15:00', status: 'Ready' },
      { id: 202, title: 'Cheatsheet: Selectors', type: 'pdf', duration: '0:00', status: 'Ready' },
      { id: 203, title: 'Event Bubbling Explained', type: 'video', duration: '20:00', status: 'Draft' },
      { id: 204, title: 'Practice: DOM Manipulation', type: 'assignment', duration: '10:00', status: 'Draft' },
    ]
  }
];

const LessonIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'video': return <Video className="w-4 h-4 text-blue-500" />;
    case 'text': return <FileText className="w-4 h-4 text-gray-500" />;
    case 'pdf': return <File className="w-4 h-4 text-red-500" />;
    case 'quiz': return <HelpCircle className="w-4 h-4 text-purple-500" />;
    case 'assignment': return <ClipboardList className="w-4 h-4 text-amber-500" />;
    case 'scorm': return <Box className="w-4 h-4 text-green-500" />;
    default: return <FileText className="w-4 h-4" />;
  }
};

export default function ModuleManagerPage({ params }: { params: { courseId: string } }) {
  const [modules, setModules] = useState(initialModules);
  const [expandedModules, setExpandedModules] = useState<number[]>([1, 2]);
  const [showAddModule, setShowAddModule] = useState(false);

  const toggleExpand = (id: number) => {
    setExpandedModules(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Course Curriculum</h2>
          <p className="text-sm text-gray-500">Organize your course into modules and lessons.</p>
        </div>
        <CreatorButton icon={<Plus className="w-4 h-4" />} onClick={() => setShowAddModule(true)}>
          Add New Module
        </CreatorButton>
      </div>

      <div className="space-y-4">
        {modules.map((module, index) => (
          <div key={module.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all shadow-sm hover:shadow-md">
            {/* Module Header */}
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 select-none">
              <div className="cursor-grab text-gray-400 hover:text-gray-600">
                <GripVertical className="w-5 h-5" />
              </div>
              <button onClick={() => toggleExpand(module.id)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                {expandedModules.includes(module.id) ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  Module {index + 1}: {module.title}
                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-opacity">
                    <Edit className="w-3 h-3 text-gray-500" />
                  </button>
                </h3>
                <div className="text-xs text-gray-500 flex gap-3 mt-1">
                  <span>{module.lessons.length} Lessons</span>
                  <span>•</span>
                  <span>{module.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lessons List */}
            {expandedModules.includes(module.id) && (
              <div className="p-2 space-y-1 bg-gray-50/30 dark:bg-gray-900/10">
                {module.lessons.map((lesson) => (
                  <div key={lesson.id} className="group flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg hover:border-[#A21D21]/50 hover:shadow-sm transition-all">
                    <div className="cursor-grab text-gray-300 hover:text-gray-500">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <LessonIcon type={lesson.type} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-[#A21D21] transition-colors">{lesson.title}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <CreatorBadge variant={lesson.status === 'Ready' ? 'success' : 'default'} className="text-[10px] px-1.5 py-0 h-4">{lesson.status}</CreatorBadge>
                        <span className="text-xs text-gray-500">{lesson.type === 'video' ? lesson.duration : lesson.type.toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                      <Link href={`/course-creator/${params.courseId}/content/${lesson.id}`}>
                        <button className="p-1.5 text-gray-500 hover:text-[#A21D21] hover:bg-[#A21D21]/10 rounded transition-colors" title="Edit Content">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors" title="Duplicate">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-500 hover:text-[#A21D21] hover:border-[#A21D21] hover:bg-[#A21D21]/5 transition-all flex items-center justify-center gap-2 mt-2">
                  <Plus className="w-4 h-4" /> Add Lesson
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State / Add Module at bottom */}
      <div className="flex justify-center py-8">
        <button onClick={() => setShowAddModule(true)} className="flex items-center text-gray-500 hover:text-[#A21D21] transition-colors font-medium">
          <Plus className="w-5 h-5 mr-2" /> Add Another Module
        </button>
      </div>

      {/* Add Module Modal */}
      <CreatorModal
        isOpen={showAddModule}
        onClose={() => setShowAddModule(false)}
        title="Add New Module"
        footer={
          <>
            <CreatorButton variant="secondary" onClick={() => setShowAddModule(false)}>Cancel</CreatorButton>
            <CreatorButton onClick={() => setShowAddModule(false)}>Create Module</CreatorButton>
          </>
        }
      >
        <div className="space-y-4">
          <CreatorInput label="Module Title" placeholder="e.g. Advanced State Management" autoFocus />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#A21D21]/20" rows={3}></textarea>
          </div>
        </div>
      </CreatorModal>
    </div>
  );
}
