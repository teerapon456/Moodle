'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Input } from '@/components/ui';

// Mock Templates Data
const mockGroupTemplates = [
  {
    id: '1',
    name: 'ฝ่ายการตลาด',
    type: 'department',
    description: 'พนักงานฝ่ายการตลาดทุกตำแหน่ง',
    isSystem: true,
    isReusable: true,
    memberCount: 0,
    settings: {
      allowSelfEnrollment: false,
      requireApproval: true,
      maxMembers: null
    },
    autoAssignRules: [
      { field: 'department', value: 'การตลาด', operator: 'equals' }
    ]
  },
  {
    id: '2',
    name: 'ฝ่ายการขาย',
    type: 'department',
    description: 'พนักงานฝ่ายการขายทุกตำแหน่ง',
    isSystem: true,
    isReusable: true,
    memberCount: 0,
    settings: {
      allowSelfEnrollment: false,
      requireApproval: true,
      maxMembers: null
    },
    autoAssignRules: [
      { field: 'department', value: 'การขาย', operator: 'equals' }
    ]
  },
  {
    id: '3',
    name: 'ผู้จัดการ',
    type: 'position',
    description: 'ผู้จัดการทุกแผนก',
    isSystem: true,
    isReusable: true,
    memberCount: 0,
    settings: {
      allowSelfEnrollment: false,
      requireApproval: true,
      maxMembers: null
    },
    autoAssignRules: [
      { field: 'position', value: 'Manager', operator: 'contains' }
    ]
  },
  {
    id: '4',
    name: 'พนักงานใหม่',
    type: 'custom',
    description: 'พนักงานที่เพิ่งเข้าทำงานไม่เกิน 3 เดือน',
    isSystem: true,
    isReusable: true,
    memberCount: 0,
    settings: {
      allowSelfEnrollment: true,
      requireApproval: false,
      maxMembers: null
    },
    autoAssignRules: [
      { field: 'hireDate', value: '3', operator: 'lessThanMonths' }
    ]
  },
  {
    id: '5',
    name: 'ทีม Digital Transformation',
    type: 'custom',
    description: 'กลุ่มข้ามฝ่ายสำหรับโปรเจกต์ Digital',
    isSystem: false,
    isReusable: false,
    memberCount: 8,
    settings: {
      allowSelfEnrollment: false,
      requireApproval: true,
      maxMembers: 15
    },
    autoAssignRules: []
  }
];

const groupTypes = {
  department: { label: 'แผนก/ฝ่าย', color: 'bg-blue-500', icon: '🏢' },
  position: { label: 'ตำแหน่ง', color: 'bg-green-500', icon: '💼' },
  course: { label: 'หลักสูตร', color: 'bg-purple-500', icon: '📚' },
  custom: { label: 'กำหนดเอง', color: 'bg-orange-500', icon: '⚙️' }
};

export default function GroupTemplatesPage() {
  const [templates, setTemplates] = useState(mockGroupTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || template.type === filterType;
    return matchesSearch && matchesType;
  });

  const getGroupTypeInfo = (type: string) => {
    return groupTypes[type as keyof typeof groupTypes] || { label: 'อื่นๆ', color: 'bg-gray-500', icon: '📁' };
  };

  const handleCreateFromTemplate = (template: any) => {
    setSelectedTemplate(template);
    // Navigate to create group with template data
    window.location.href = `/instructor/groups/create?template=${template.id}`;
  };

  const handleEditTemplate = (template: any) => {
    setSelectedTemplate(template);
    window.location.href = `/instructor/groups/templates/${template.id}/edit`;
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (confirm('คุณต้องการลบเทมเพลตนี้ใช่หรือไม่?')) {
      setTemplates(templates.filter(t => t.id !== templateId));
    }
  };

  const handleCreateNewTemplate = () => {
    setShowCreateModal(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                เทมเพลตกลุ่มผู้เรียน
              </h1>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                สร้างและจัดการเทมเพลตกลุ่มเพื่อใช้ซ้ำได้
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => window.location.href = '/instructor/groups'}
                className="border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white"
              >
                กลับไปจัดการกลุ่ม
              </Button>
              <Button
                onClick={handleCreateNewTemplate}
                className="bg-[#A21D21] hover:bg-[#7A1818] text-white"
              >
                สร้างเทมเพลตใหม่
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>เทมเพลตทั้งหมด</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {templates.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📋</span>
              </div>
            </div>
          </Card>

          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>เทมเพลตระบบ</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {templates.filter(t => t.isSystem).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">🏢</span>
              </div>
            </div>
          </Card>

          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>ใช้ซ้ำได้</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {templates.filter(t => t.isReusable).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">🔄</span>
              </div>
            </div>
          </Card>

          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>เทมเพลตฝ่าย</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {templates.filter(t => t.type === 'department').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-xl">🏢</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="ค้นหาเทมเพลต..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}`}
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={`w-full md:w-48 p-3 border rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          >
            <option value="all">ทุกประเภท</option>
            {Object.entries(groupTypes).map(([value, info]) => (
              <option key={value} value={value}>{info.label}</option>
            ))}
          </select>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const typeInfo = getGroupTypeInfo(template.type);
            return (
              <Card
                key={template.id}
                className={`p-6 hover:shadow-lg transition-shadow ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {template.name}
                      </h3>
                      {template.isSystem && (
                        <Badge className="bg-blue-500 text-white text-xs">ระบบ</Badge>
                      )}
                      {template.isReusable && (
                        <Badge className="bg-green-500 text-white text-xs">ใช้ซ้ำ</Badge>
                      )}
                    </div>
                    <Badge className={`${typeInfo.color} text-white text-xs mb-2`}>
                      {typeInfo.icon} {typeInfo.label}
                    </Badge>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                      {template.description}
                    </p>
                  </div>
                </div>

                {/* Auto Assign Rules */}
                {template.autoAssignRules.length > 0 && (
                  <div className={`mb-4 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      🔄 กฎการมอบหมายอัตโนมัติ:
                    </p>
                    {template.autoAssignRules.map((rule: any, index: number) => (
                      <p key={index} className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {rule.field} {rule.operator} "{rule.value}"
                      </p>
                    ))}
                  </div>
                )}

                {/* Settings */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>ลงทะเบียนเอง:</span>
                    <span className={template.settings.allowSelfEnrollment ? 'text-green-600' : 'text-gray-500'}>
                      {template.settings.allowSelfEnrollment ? 'เปิด' : 'ปิด'}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>ต้องอนุมัติ:</span>
                    <span className={template.settings.requireApproval ? 'text-orange-600' : 'text-gray-500'}>
                      {template.settings.requireApproval ? 'ต้องการ' : 'ไม่ต้องการ'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleCreateFromTemplate(template)}
                    className="flex-1 bg-[#A21D21] hover:bg-[#7A1818] text-white"
                  >
                    สร้างจากเทมเพลต
                  </Button>
                  {!template.isSystem && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditTemplate(template)}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        แก้ไข
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        ลบ
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📋</span>
            </div>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              ไม่พบเทมเพลตที่ค้นหา
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              ลองปรับเงื่อนไขการค้นหาหรือสร้างเทมเพลตใหม่
            </p>
            <Button
              onClick={handleCreateNewTemplate}
              className="bg-[#A21D21] hover:bg-[#7A1818] text-white"
            >
              สร้างเทมเพลตใหม่
            </Button>
          </div>
        )}

        {/* Info Section */}
        <Card className={`mt-8 p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            💡 ข้อมูลเกี่ยวกับเทมเพลตกลุ่ม
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                🏢 เทมเพลตระบบ
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                เทมเพลตที่สร้างโดยระบบสำหรับกลุ่มที่ใช้บ่อย เช่น แผนกต่างๆ ตำแหน่งงาน ไม่สามารถลบได้
              </p>
            </div>
            <div>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                🔄 เทมเพลตที่ใช้ซ้ำได้
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                เทมเพลตที่สามารถนำไปสร้างกลุ่มใหม่ได้หลายครั้ง เหมาะสำหรับโครงสร้างองค์กรที่คงที่
              </p>
            </div>
            <div>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                🤖 การมอบหมายอัตโนมัติ
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                กำหนดกฎให้ระบบจัดเข้ากลุ่มอัตโนมัติตามเงื่อนไขที่กำหนด เช่น แผนก ตำแหน่ง วันที่เข้าทำงาน
              </p>
            </div>
            <div>
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                ⚙️ การตั้งค่าเริ่มต้น
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                บันทึกการตั้งค่าที่ใช้บ่อยเพื่อไม่ต้องตั้งค่าใหม่ทุกครั้งเมื่อสร้างกลุ่ม
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
