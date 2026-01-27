'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Input } from '@/components/ui';
import { Select } from '@/components/ui';

// Mock Data
const mockGroups = [
  {
    id: '1',
    name: 'ฝ่ายการตลาด',
    type: 'department',
    description: 'พนักงานฝ่ายการตลาดทุกตำแหน่ง',
    memberCount: 25,
    courseCount: 5,
    isActive: true,
    createdAt: '2024-01-15',
    lastActivity: '2024-01-26'
  },
  {
    id: '2',
    name: 'ทีมผู้จัดการ',
    type: 'position',
    description: 'ผู้จัดการทุกแผนก',
    memberCount: 12,
    courseCount: 8,
    isActive: true,
    createdAt: '2024-01-10',
    lastActivity: '2024-01-25'
  },
  {
    id: '3',
    name: 'Leadership Development 2024',
    type: 'course',
    description: 'กลุ่มเรียนหลักสูตร Leadership รุ่นที่ 1',
    memberCount: 15,
    courseCount: 3,
    isActive: true,
    createdAt: '2024-01-20',
    lastActivity: '2024-01-26'
  },
  {
    id: '4',
    name: 'Digital Transformation',
    type: 'custom',
    description: 'กลุ่มข้ามฝ่ายสำหรับโปรเจกต์ Digital',
    memberCount: 8,
    courseCount: 4,
    isActive: false,
    createdAt: '2024-01-05',
    lastActivity: '2024-01-20'
  }
];

const groupTypes = [
  { value: 'department', label: 'แผนก/ฝ่าย', color: 'bg-blue-500' },
  { value: 'position', label: 'ตำแหน่ง', color: 'bg-green-500' },
  { value: 'course', label: 'หลักสูตร', color: 'bg-purple-500' },
  { value: 'custom', label: 'กำหนดเอง', color: 'bg-orange-500' }
];

export default function InstructorGroupsPage() {
  const [groups, setGroups] = useState(mockGroups);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  // Filter groups based on search and type
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || group.type === filterType;
    return matchesSearch && matchesType;
  });

  const getGroupTypeColor = (type: string) => {
    const groupType = groupTypes.find(gt => gt.value === type);
    return groupType ? groupType.color : 'bg-gray-500';
  };

  const getGroupTypeLabel = (type: string) => {
    const groupType = groupTypes.find(gt => gt.value === type);
    return groupType ? groupType.label : 'อื่นๆ';
  };

  const handleCreateGroup = () => {
    setShowCreateModal(true);
  };

  const handleViewGroup = (group: any) => {
    setSelectedGroup(group);
    // Navigate to group details
    window.location.href = `/instructor/groups/${group.id}`;
  };

  const handleEditGroup = (group: any) => {
    setSelectedGroup(group);
    // Navigate to edit group
    window.location.href = `/instructor/groups/${group.id}/edit`;
  };

  const handleDeleteGroup = (groupId: string) => {
    if (confirm('คุณต้องการลบกลุ่มนี้ใช่หรือไม่?')) {
      setGroups(groups.filter(g => g.id !== groupId));
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                จัดการกลุ่มผู้เรียน
              </h1>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                สร้างและจัดการกลุ่มผู้เรียนสำหรับหลักสูตรต่างๆ
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => window.location.href = '/instructor/groups/import'}
                variant="outline"
                className="border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white"
              >
                นำเข้าสมาชิก
              </Button>
              <Button
                onClick={handleCreateGroup}
                className="bg-[#A21D21] hover:bg-[#7A1818] text-white"
              >
                สร้างกลุ่มใหม่
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>กลุ่มทั้งหมด</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {groups.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
            </div>
          </Card>

          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>สมาชิกทั้งหมด</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {groups.reduce((sum, g) => sum + g.memberCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">👤</span>
              </div>
            </div>
          </Card>

          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>กลุ่มที่ใช้งาน</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {groups.filter(g => g.isActive).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">✅</span>
              </div>
            </div>
          </Card>

          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>หลักสูตรที่เชื่อม</p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {groups.reduce((sum, g) => sum + g.courseCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-xl">📚</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="ค้นหากลุ่ม..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}`}
            />
          </div>
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={`w-full md:w-48 ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : ''}`}
          >
            <option value="all">ทุกประเภท</option>
            {groupTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </Select>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card
              key={group.id}
              className={`p-6 hover:shadow-lg transition-shadow cursor-pointer ${
                isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {group.name}
                  </h3>
                  <Badge className={`${getGroupTypeColor(group.type)} text-white text-xs mb-2`}>
                    {getGroupTypeLabel(group.type)}
                  </Badge>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                    {group.description}
                  </p>
                </div>
                <div className={`w-3 h-3 rounded-full ${group.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {group.memberCount}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>สมาชิก</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {group.courseCount}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>คอร์ส</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewGroup(group)}
                  className="flex-1 border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white"
                >
                  ดูรายละเอียด
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditGroup(group)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  แก้ไข
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteGroup(group.id)}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  ลบ
                </Button>
              </div>

              <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  สร้างเมื่อ: {group.createdAt} | ใช้งานล่าสุด: {group.lastActivity}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              ไม่พบกลุ่มที่ค้นหา
            </h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              ลองปรับเงื่อนไขการค้นหาหรือสร้างกลุ่มใหม่
            </p>
            <Button
              onClick={handleCreateGroup}
              className="bg-[#A21D21] hover:bg-[#7A1818] text-white"
            >
              สร้างกลุ่มใหม่
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
