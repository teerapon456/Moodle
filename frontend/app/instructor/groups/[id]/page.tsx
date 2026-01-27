'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Input } from '@/components/ui';

// Mock Data
const mockGroupDetails = {
  '1': {
    id: '1',
    name: 'ฝ่ายการตลาด',
    type: 'department',
    description: 'พนักงานฝ่ายการตลาดทุกตำแหน่ง รวมถึง Digital Marketing, Brand Management, และ Market Research',
    memberCount: 25,
    courseCount: 5,
    isActive: true,
    createdAt: '2024-01-15',
    lastActivity: '2024-01-26',
    settings: {
      allowSelfEnrollment: false,
      requireApproval: true,
      maxMembers: 30
    },
    members: [
      { id: '1', name: 'สมชาย ใจดี', email: 'somchai@company.com', position: 'Marketing Manager', joinedAt: '2024-01-15', lastActive: '2024-01-26' },
      { id: '2', name: 'มานี รักดี', email: 'manee@company.com', position: 'Digital Marketing Specialist', joinedAt: '2024-01-16', lastActive: '2024-01-25' },
      { id: '3', name: 'วีระ มุ่งมั่น', email: 'veera@company.com', position: 'Brand Manager', joinedAt: '2024-01-17', lastActive: '2024-01-24' }
    ],
    courses: [
      { id: '1', name: 'Digital Marketing Fundamentals', enrolledCount: 20, completionRate: 75 },
      { id: '2', name: 'Social Media Strategy', enrolledCount: 18, completionRate: 60 },
      { id: '3', name: 'Content Marketing Mastery', enrolledCount: 15, completionRate: 45 }
    ]
  }
};

const groupTypes = {
  department: { label: 'แผนก/ฝ่าย', color: 'bg-blue-500' },
  position: { label: 'ตำแหน่ง', color: 'bg-green-500' },
  course: { label: 'หลักสูตร', color: 'bg-purple-500' },
  custom: { label: 'กำหนดเอง', color: 'bg-orange-500' }
};

export default function GroupDetailPage() {
  const params = useParams();
  const groupId = params.id as string;
  const [group, setGroup] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }

    // Load group data
    const groupData = mockGroupDetails[groupId as keyof typeof mockGroupDetails];
    if (groupData) {
      setGroup(groupData);
    }
  }, [groupId]);

  if (!group) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              ไม่พบข้อมูลกลุ่ม
            </h3>
            <Button
              onClick={() => window.location.href = '/instructor/groups'}
              className="bg-[#A21D21] hover:bg-[#7A1818] text-white"
            >
              กลับไปหน้าจัดการกลุ่ม
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const groupTypeInfo = groupTypes[group.type as keyof typeof groupTypes];

  const handleAddMember = () => {
    setShowAddMemberModal(true);
  };

  const handleRemoveMember = (memberId: string) => {
    if (confirm('คุณต้องการลบสมาชิกนี้จากกลุ่มใช่หรือไม่?')) {
      setGroup(prev => ({
        ...prev,
        members: prev.members.filter((m: any) => m.id !== memberId),
        memberCount: prev.memberCount - 1
      }));
    }
  };

  const handleAssignCourse = () => {
    window.location.href = `/instructor/groups/${groupId}/courses`;
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => window.location.href = '/instructor/groups'}
              className="border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white"
            >
              ← กลับ
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {group.name}
                </h1>
                <Badge className={`${groupTypeInfo.color} text-white`}>
                  {groupTypeInfo.label}
                </Badge>
                <div className={`w-3 h-3 rounded-full ${group.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>
                {group.description}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => window.location.href = `/instructor/groups/${groupId}/edit`}
                className="border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white"
              >
                แก้ไขกลุ่ม
              </Button>
              <Button
                onClick={handleAssignCourse}
                className="bg-[#A21D21] hover:bg-[#7A1818] text-white"
              >
                มอบหมายคอร์ส
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className={`p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">👥</span>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {group.memberCount}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>สมาชิก</p>
                </div>
              </div>
            </Card>

            <Card className={`p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600">📚</span>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {group.courseCount}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>คอร์ส</p>
                </div>
              </div>
            </Card>

            <Card className={`p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600">📊</span>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    68%
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>เสร็จสิ้นเฉลี่ย</p>
                </div>
              </div>
            </Card>

            <Card className={`p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600">📅</span>
                </div>
                <div>
                  <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {group.lastActivity}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>ใช้งานล่าสุด</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'members', 'courses', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-[#A21D21] text-[#A21D21]'
                    : `border-transparent ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                }`}
              >
                {tab === 'overview' && 'ภาพรวม'}
                {tab === 'members' && 'สมาชิก'}
                {tab === 'courses' && 'คอร์ส'}
                {tab === 'analytics' && 'วิเคราะห์'}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                  ข้อมูลกลุ่ม
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>ประเภท:</span>
                    <Badge className={`${groupTypeInfo.color} text-white`}>
                      {groupTypeInfo.label}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>สถานะ:</span>
                    <span className={`text-sm ${group.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                      {group.isActive ? 'ใช้งานอยู่' : 'ไม่ใช้งาน'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>จำนวนสมาชิกสูงสุด:</span>
                    <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {group.settings.maxMembers || 'ไม่จำกัด'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>สร้างเมื่อ:</span>
                    <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {group.createdAt}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                  การตั้งค่า
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>ลงทะเบียนเอง:</span>
                    <span className={`text-sm ${group.settings.allowSelfEnrollment ? 'text-green-600' : 'text-gray-500'}`}>
                      {group.settings.allowSelfEnrollment ? 'เปิดใช้' : 'ปิดใช้'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>ต้องการอนุมัติ:</span>
                    <span className={`text-sm ${group.settings.requireApproval ? 'text-orange-600' : 'text-gray-500'}`}>
                      {group.settings.requireApproval ? 'ต้องการ' : 'ไม่ต้องการ'}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'members' && (
            <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  สมาชิกในกลุ่ม ({group.members.length})
                </h3>
                <Button
                  onClick={handleAddMember}
                  className="bg-[#A21D21] hover:bg-[#7A1818] text-white"
                >
                  เพิ่มสมาชิก
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>ชื่อ</th>
                      <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>ตำแหน่ง</th>
                      <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>เข้าร่วม</th>
                      <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>ใช้งานล่าสุด</th>
                      <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.members.map((member: any) => (
                      <tr key={member.id} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className={`py-3 px-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{member.email}</div>
                          </div>
                        </td>
                        <td className={`py-3 px-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{member.position}</td>
                        <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{member.joinedAt}</td>
                        <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{member.lastActive}</td>
                        <td className={`py-3 px-4`}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRemoveMember(member.id)}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            ลบ
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === 'courses' && (
            <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  คอร์สที่มอบหมาย ({group.courses.length})
                </h3>
                <Button
                  onClick={handleAssignCourse}
                  className="bg-[#A21D21] hover:bg-[#7A1818] text-white"
                >
                  มอบหมายคอร์ส
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.courses.map((course: any) => (
                  <Card key={course.id} className={`p-4 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50'}`}>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                      {course.name}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>ลงทะเบียน:</span>
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {course.enrolledCount} คน
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>เสร็จสิ้น:</span>
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {course.completionRate}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#A21D21] h-2 rounded-full"
                          style={{ width: `${course.completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                  สถิติการเรียน
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>อัตราการเข้าเรียน</span>
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>อัตราการเสร็จสิ้น</span>
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>คะแนนเฉลี่ย</span>
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                  กิจกรรมล่าสุด
                </h3>
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          สมชาย ทำแบบทดสอบสำเร็จ
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Digital Marketing Fundamentals
                        </p>
                      </div>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        2 ชั่วโมงที่แล้ว
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          มานี เข้าร่วมคอร์สใหม่
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Social Media Strategy
                        </p>
                      </div>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        5 ชั่วโมงที่แล้ว
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
