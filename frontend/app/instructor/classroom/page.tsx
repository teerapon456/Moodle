'use client';

import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

// Mock data for classrooms
const classroomsData = [
  {
    id: 1,
    name: 'ห้องเรียน 101',
    building: 'อาคาร A',
    floor: 'ชั้น 1',
    capacity: 30,
    currentOccupancy: 25,
    status: 'available',
    equipment: ['โปรเจคเตอร์', 'จอภาพ', 'ไมค์โฟน', 'ลำโพง', 'อินเทอร์เน็ต'],
    schedule: [
      { day: 'จันทร์', time: '09:00-12:00', course: 'การจัดการทีม', instructor: 'ผู้สอน' },
      { day: 'พุธ', time: '13:00-16:00', course: 'การตลาดดิจิทัล', instructor: 'ผู้สอน' }
    ],
    maintenance: null,
    lastUsed: '2024-01-22',
    bookingRate: 85
  },
  {
    id: 2,
    name: 'ห้องเรียน 102',
    building: 'อาคาร A',
    floor: 'ชั้น 1',
    capacity: 25,
    currentOccupancy: 0,
    status: 'maintenance',
    equipment: ['โปรเจคเตอร์', 'จอภาพ', 'ไมค์โฟน'],
    schedule: [],
    maintenance: {
      type: 'แอร์',
      description: 'ซ่อมแอร์เสีย',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      contractor: 'บริษัท ABC'
    },
    lastUsed: '2024-01-19',
    bookingRate: 92
  },
  {
    id: 3,
    name: 'ห้องคอมพิวเตอร์ 201',
    building: 'อาคาร B',
    floor: 'ชั้น 2',
    capacity: 20,
    currentOccupancy: 18,
    status: 'occupied',
    equipment: ['คอมพิวเตอร์ 20 เครื่อง', 'โปรเจคเตอร์', 'จอภาพ', 'อินเทอร์เน็ต'],
    schedule: [
      { day: 'อังคาร', time: '09:00-12:00', course: 'การเขียนโปรแกรม Python', instructor: 'ผู้สอน' },
      { day: 'พฤหัสบดี', time: '13:00-16:00', course: 'การเขียนโปรแกรม Python', instructor: 'ผู้สอน' }
    ],
    maintenance: null,
    lastUsed: '2024-01-22',
    bookingRate: 95
  },
  {
    id: 4,
    name: 'ห้องประชุม 301',
    building: 'อาคาร C',
    floor: 'ชั้น 3',
    capacity: 50,
    currentOccupancy: 0,
    status: 'reserved',
    equipment: ['โปรเจคเตอร์', 'จอภาพขนาดใหญ่', 'ไมค์โฟน', 'ลำโพง', 'ระบบวิดีโอคอนเฟอเรนซ์'],
    schedule: [
      { day: 'ศุกร์', time: '14:00-17:00', course: 'สัมมนาผู้ประกอบการ', instructor: 'ผู้สอน' }
    ],
    maintenance: null,
    lastUsed: '2024-01-20',
    bookingRate: 78
  },
  {
    id: 5,
    name: 'ห้องแล็บ 401',
    building: 'อาคาร D',
    floor: 'ชั้น 4',
    capacity: 15,
    currentOccupancy: 0,
    status: 'available',
    equipment: ['อุปกรณ์ทดลอง', 'คอมพิวเตอร์', 'ไมโครสโคป', 'เครื่องวัด'],
    schedule: [
      { day: 'จันทร์', time: '13:00-16:00', course: 'การทดลองทางวิทยาศาสตร์', instructor: 'ผู้สอน' }
    ],
    maintenance: null,
    lastUsed: '2024-01-21',
    bookingRate: 88
  }
];

export default function InstructorClassroomPage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBuilding, setFilterBuilding] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedClassroom, setSelectedClassroom] = useState<typeof classroomsData[0] | null>(null);

  // Filter and sort classrooms
  const filteredClassrooms = useMemo(() => {
    let filtered = classroomsData.filter(classroom => {
      const matchesSearch = classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classroom.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classroom.equipment.some(eq => eq.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = filterStatus === 'all' || classroom.status === filterStatus;
      const matchesBuilding = filterBuilding === 'all' || classroom.building === filterBuilding;

      return matchesSearch && matchesStatus && matchesBuilding;
    });

    // Sort classrooms
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'building':
          return a.building.localeCompare(b.building);
        case 'capacity':
          return b.capacity - a.capacity;
        case 'bookingRate':
          return b.bookingRate - a.bookingRate;
        case 'lastUsed':
          return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterStatus, filterBuilding, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = classroomsData.length;
    const available = classroomsData.filter(c => c.status === 'available').length;
    const occupied = classroomsData.filter(c => c.status === 'occupied').length;
    const maintenance = classroomsData.filter(c => c.status === 'maintenance').length;
    const reserved = classroomsData.filter(c => c.status === 'reserved').length;
    const avgBookingRate = classroomsData.reduce((sum, c) => sum + c.bookingRate, 0) / total;
    const totalCapacity = classroomsData.reduce((sum, c) => sum + c.capacity, 0);
    const currentOccupancy = classroomsData.reduce((sum, c) => sum + c.currentOccupancy, 0);

    return {
      total,
      available,
      occupied,
      maintenance,
      reserved,
      avgBookingRate,
      totalCapacity,
      currentOccupancy
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'occupied':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'maintenance':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return '✅';
      case 'occupied':
        return '👥';
      case 'maintenance':
        return '🔧';
      case 'reserved':
        return '📅';
      default:
        return '🏫';
    }
  };

  const getOccupancyColor = (occupancy: number, capacity: number) => {
    const percentage = (occupancy / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const cardClasses = "bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow";

  return (
    <MainLayout userName={currentUser.name} userRole="instructor">
      <div className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">ห้องเรียนและสถานที่</h1>
              <p className="text-gray-600 dark:text-gray-400">จัดการห้องเรียน ห้องประชุม และสถานที่อื่นๆ</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  จองห้อง
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ห้องทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.available}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ว่าง</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl">👥</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.occupied}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">กำลังใช้</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <span className="text-2xl">🔧</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.maintenance}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ซ่อมบำรุง</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6-6" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.avgBookingRate.toFixed(1)}%</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">อัตราจอง</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="ค้นหาชื่อห้อง, อาคาร, อุปกรณ์..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">สถานะทั้งหมด</option>
              <option value="available">ว่าง</option>
              <option value="occupied">กำลังใช้</option>
              <option value="maintenance">ซ่อมบำรุง</option>
              <option value="reserved">จองแล้ว</option>
            </select>

            {/* Building Filter */}
            <select
              value={filterBuilding}
              onChange={(e) => setFilterBuilding(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">อาคารทั้งหมด</option>
              <option value="อาคาร A">อาคาร A</option>
              <option value="อาคาร B">อาคาร B</option>
              <option value="อาคาร C">อาคาร C</option>
              <option value="อาคาร D">อาคาร D</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">ชื่อห้อง</option>
              <option value="building">อาคาร</option>
              <option value="capacity">ความจุ</option>
              <option value="bookingRate">อัตราจอง</option>
              <option value="lastUsed">ใช้ล่าสุด</option>
            </select>
          </div>
        </div>

        {/* Classrooms List */}
        {filteredClassrooms.length > 0 ? (
          <div className="space-y-4">
            {filteredClassrooms.map((classroom) => (
              <div key={classroom.id} className={`${cardClasses} p-6 hover:shadow-lg transition-all duration-300`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                        {classroom.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {classroom.building} • {classroom.floor}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(classroom.status)}`}>
                      {getStatusIcon(classroom.status)} {classroom.status === 'available' ? 'ว่าง' :
                        classroom.status === 'occupied' ? 'กำลังใช้' :
                          classroom.status === 'maintenance' ? 'ซ่อมบำรุง' :
                            classroom.status === 'reserved' ? 'จองแล้ว' : classroom.status}
                    </span>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getOccupancyColor(classroom.currentOccupancy, classroom.capacity)}`}>
                        {classroom.currentOccupancy}/{classroom.capacity}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">คน/ความจุ</p>
                    </div>
                  </div>
                </div>

                {/* Classroom Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      {classroom.capacity}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">ความจุสูงสุด</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {classroom.bookingRate}%
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">อัตราจอง</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {classroom.equipment.length}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">อุปกรณ์</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      {classroom.schedule.length}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">ตารางเรียน</p>
                  </div>
                </div>

                {/* Equipment */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-2">อุปกรณ์</h4>
                  <div className="flex flex-wrap gap-2">
                    {classroom.equipment.map((item, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Schedule */}
                {classroom.schedule.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-2">ตารางเรียนวันนี้</h4>
                    <div className="space-y-1">
                      {classroom.schedule.map((item, index) => (
                        <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                          {item.day} {item.time} - {item.course} ({item.instructor})
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Maintenance Info */}
                {classroom.maintenance && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h4 className="font-medium text-red-700 dark:text-red-400 mb-1">กำลังซ่อมบำรุง</h4>
                    <p className="text-sm text-red-600 dark:text-red-300">
                      {classroom.maintenance.description} ({formatDate(classroom.maintenance.startDate)} - {formatDate(classroom.maintenance.endDate)})
                    </p>
                  </div>
                )}

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>📅 ใช้ล่าสุด: {formatDate(classroom.lastUsed)}</span>
                    <span>📊 อัตราจอง: {classroom.bookingRate}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedClassroom(classroom)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      ดูรายละเอียด
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                      จองห้อง
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      แก้ไข
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">ไม่พบห้องเรียน</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือกรองข้อมูล</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterBuilding('all');
            }}>
              ล้างตัวกรอง
            </Button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              จองห้องใหม่
            </span>
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              ดูปฏิทินห้อง
            </span>
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756-.426 1.756-2.924 0-3.35a1.724 1.724 0 00-1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.1.724 1.724 0 2.573-1.066c1.543.94 3.31.826 2.37.826zm1.06-2.829a.756.756 0 01.649.66c.774-.18 1.633-.54 2.11-.826.48-.286.856-.54 1.11-.826.756 0 1.293.54 1.633.66a.756.756 0 01.66-.649c.18-.774.54-1.633.826-2.11.286-.48.54-.856.826-1.11.826-.756 0-1.293-.54-1.633-.66a.756.756 0 01-.649.66c-.774.18-1.633.54-2.11.826-.48.286-.856.54-1.11.826-.756 0-1.293-.54-1.633-.66z" />
              </svg>
              จัดการอุปกรณ์
            </span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
