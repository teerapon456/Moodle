'use client';

import React, { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import { getCurrentUser } from '@/app/database/mockData';
import { Button } from '@/components/ui';

// Mock data for students
const studentsData = [
  {
    id: 1,
    studentId: '64012345',
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    email: 'somchai.jai@example.com',
    phone: '081-234-5678',
    department: 'ฝ่ายการตลาด',
    position: 'พนักงานการตลาด',
    level: 'ระดับ 3',
    joinDate: '2022-01-15',
    avatar: null,
    status: 'active',
    courses: [
      {
        id: 1,
        title: 'การจัดการทีมอย่างมีประสิทธิภาพ',
        progress: 78.5,
        status: 'in-progress',
        enrolledDate: '2024-01-01',
        lastActivity: '2024-01-22',
        grade: null
      },
      {
        id: 2,
        title: 'การตลาดดิจิทัล',
        progress: 92.3,
        status: 'completed',
        enrolledDate: '2023-12-01',
        lastActivity: '2024-01-20',
        grade: 'A'
      }
    ],
    totalCourses: 5,
    completedCourses: 2,
    inProgressCourses: 2,
    averageGrade: 85.5,
    totalHours: 120
  },
  {
    id: 2,
    studentId: '64012346',
    firstName: 'มานี',
    lastName: 'สุขใจ',
    email: 'mani.suk@example.com',
    phone: '082-345-6789',
    department: 'ฝ่ายบุคคล',
    position: 'เจ้าหน้าที่บุคคล',
    level: 'ระดับ 2',
    joinDate: '2023-03-20',
    avatar: null,
    status: 'active',
    courses: [
      {
        id: 3,
        title: 'การเขียนโปรแกรม Python',
        progress: 65.8,
        status: 'in-progress',
        enrolledDate: '2024-01-05',
        lastActivity: '2024-01-21',
        grade: null
      }
    ],
    totalCourses: 3,
    completedCourses: 1,
    inProgressCourses: 1,
    averageGrade: 78.2,
    totalHours: 85
  },
  {
    id: 3,
    studentId: '64012347',
    firstName: 'วิชัย',
    lastName: 'รัตน์',
    email: 'vichai.rat@example.com',
    phone: '083-456-7890',
    department: 'ฝ่ายไอที',
    position: 'โปรแกรมเมอร์',
    level: 'ระดับ 4',
    joinDate: '2021-06-10',
    avatar: null,
    status: 'active',
    courses: [
      {
        id: 3,
        title: 'การเขียนโปรแกรม Python',
        progress: 95.2,
        status: 'completed',
        enrolledDate: '2023-11-01',
        lastActivity: '2024-01-22',
        grade: 'A+'
      },
      {
        id: 4,
        title: 'การพัฒนาเว็บแอปพลิเคชัน',
        progress: 45.0,
        status: 'in-progress',
        enrolledDate: '2024-01-10',
        lastActivity: '2024-01-19',
        grade: null
      }
    ],
    totalCourses: 8,
    completedCourses: 4,
    inProgressCourses: 2,
    averageGrade: 91.3,
    totalHours: 200
  },
  {
    id: 4,
    studentId: '64012348',
    firstName: 'สมศรี',
    lastName: 'เจริญ',
    email: 'somsri.jer@example.com',
    phone: '084-567-8901',
    department: 'ฝ่ายการเงิน',
    position: 'นักบัญชี',
    level: 'ระดับ 3',
    joinDate: '2022-09-05',
    avatar: null,
    status: 'inactive',
    courses: [
      {
        id: 5,
        title: 'การวิเคราะห์ข้อมูลทางการเงิน',
        progress: 30.0,
        status: 'paused',
        enrolledDate: '2023-12-15',
        lastActivity: '2024-01-10',
        grade: null
      }
    ],
    totalCourses: 2,
    completedCourses: 0,
    inProgressCourses: 1,
    averageGrade: 0,
    totalHours: 25
  },
  {
    id: 5,
    studentId: '64012349',
    firstName: 'ประสิทธิ์',
    lastName: 'โชคดี',
    email: 'prasit.chok@example.com',
    phone: '085-678-9012',
    department: 'ฝ่ายขาย',
    position: 'พนักงานขาย',
    level: 'ระดับ 2',
    joinDate: '2023-01-15',
    avatar: null,
    status: 'active',
    courses: [
      {
        id: 6,
        title: 'เทคนิคการขายขั้นสูง',
        progress: 88.7,
        status: 'in-progress',
        enrolledDate: '2024-01-08',
        lastActivity: '2024-01-22',
        grade: null
      }
    ],
    totalCourses: 4,
    completedCourses: 2,
    inProgressCourses: 1,
    averageGrade: 82.6,
    totalHours: 95
  }
];

export default function InstructorStudentsPage() {
  const currentUser = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedStudent, setSelectedStudent] = useState<typeof studentsData[0] | null>(null);

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    let filtered = studentsData.filter(student => {
      const matchesSearch = student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
      const matchesDepartment = filterDepartment === 'all' || student.department === filterDepartment;
      const matchesLevel = filterLevel === 'all' || student.level === filterLevel;

      return matchesSearch && matchesStatus && matchesDepartment && matchesLevel;
    });

    // Sort students
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.firstName.localeCompare(b.firstName);
        case 'studentId':
          return a.studentId.localeCompare(b.studentId);
        case 'department':
          return a.department.localeCompare(b.department);
        case 'level':
          return b.level.localeCompare(a.level);
        case 'courses':
          return b.totalCourses - a.totalCourses;
        case 'completed':
          return b.completedCourses - a.completedCourses;
        case 'grade':
          return b.averageGrade - a.averageGrade;
        case 'joinDate':
          return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterStatus, filterDepartment, filterLevel, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = studentsData.length;
    const active = studentsData.filter(s => s.status === 'active').length;
    const inactive = studentsData.filter(s => s.status === 'inactive').length;
    const totalCourses = studentsData.reduce((sum, s) => sum + s.totalCourses, 0);
    const completedCourses = studentsData.reduce((sum, s) => sum + s.completedCourses, 0);
    const avgGrade = studentsData.filter(s => s.averageGrade > 0).reduce((sum, s) => sum + s.averageGrade, 0) / studentsData.filter(s => s.averageGrade > 0).length || 0;
    const totalHours = studentsData.reduce((sum, s) => sum + s.totalHours, 0);

    return {
      total,
      active,
      inactive,
      totalCourses,
      completedCourses,
      avgGrade,
      totalHours
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'suspended':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCourseStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'dropped':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getGradeColor = (grade: string | null) => {
    if (!grade) return 'text-gray-400';
    if (grade === 'A+' || grade === 'A') return 'text-emerald-600';
    if (grade === 'B+' || grade === 'B') return 'text-blue-600';
    if (grade === 'C+' || grade === 'C') return 'text-yellow-600';
    if (grade === 'D') return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-emerald-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">นักเรียน</h1>
              <p className="text-gray-600 dark:text-gray-400">จัดการข้อมูลนักเรียนและติดตามความคืบหน้า</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  เพิ่มนักเรียน
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">นักเรียนทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.active}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">กำลังเรียน</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">⏸️</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.inactive}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">พักการเรียน</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.totalCourses}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">หลักสูตรทั้งหมด</p>
          </div>

          <div className={`${cardClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6-6" />
                </svg>
              </div>
              <span className={`text-2xl font-bold ${getGradeColor(stats.avgGrade >= 90 ? 'A' : stats.avgGrade >= 80 ? 'B' : stats.avgGrade >= 70 ? 'C' : 'D')}`}>
                {stats.avgGrade.toFixed(1)}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">เกรดเฉลี่ย</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="ค้นหาชื่อ, รหัสนักศึกษา, อีเมล..."
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
              <option value="active">กำลังเรียน</option>
              <option value="inactive">พักการเรียน</option>
              <option value="suspended">ระงับ</option>
            </select>

            {/* Department Filter */}
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">แผนกทั้งหมด</option>
              <option value="ฝ่ายการตลาด">ฝ่ายการตลาด</option>
              <option value="ฝ่ายบุคคล">ฝ่ายบุคคล</option>
              <option value="ฝ่ายไอที">ฝ่ายไอที</option>
              <option value="ฝ่ายการเงิน">ฝ่ายการเงิน</option>
              <option value="ฝ่ายขาย">ฝ่ายขาย</option>
            </select>

            {/* Level Filter */}
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">ระดับทั้งหมด</option>
              <option value="ระดับ 1">ระดับ 1</option>
              <option value="ระดับ 2">ระดับ 2</option>
              <option value="ระดับ 3">ระดับ 3</option>
              <option value="ระดับ 4">ระดับ 4</option>
              <option value="ระดับ 5">ระดับ 5</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">ชื่อนักเรียน</option>
              <option value="studentId">รหัสนักศึกษา</option>
              <option value="department">แผนก</option>
              <option value="level">ระดับ</option>
              <option value="courses">จำนวนหลักสูตร</option>
              <option value="completed">หลักสูตรที่เสร็จ</option>
              <option value="grade">เกรดเฉลี่ย</option>
              <option value="joinDate">วันที่เข้าทำงาน</option>
            </select>
          </div>
        </div>

        {/* Students List */}
        {filteredStudents.length > 0 ? (
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className={`${cardClasses} p-6 hover:shadow-lg transition-all duration-300`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">
                        {student.firstName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                        {student.firstName} {student.lastName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {student.studentId} • {student.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(student.status)}`}>
                      {student.status === 'active' ? '✅ กำลังเรียน' :
                        student.status === 'inactive' ? '⏸️ พักการเรียน' :
                          student.status === 'suspended' ? '🚫 ระงับ' : student.status}
                    </span>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getGradeColor(student.averageGrade >= 90 ? 'A' : student.averageGrade >= 80 ? 'B' : student.averageGrade >= 70 ? 'C' : 'D')}`}>
                        {student.averageGrade > 0 ? student.averageGrade.toFixed(1) : '-'}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">เกรดเฉลี่ย</p>
                    </div>
                  </div>
                </div>

                {/* Student Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      {student.totalCourses}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">หลักสูตรทั้งหมด</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {student.completedCourses}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">เสร็จสิ้น</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {student.inProgressCourses}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">กำลังเรียน</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {student.totalHours}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">ชั่วโมงเรียน</p>
                  </div>
                </div>

                {/* Current Courses */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-3">หลักสูตรที่กำลังเรียน</h4>
                  <div className="space-y-2">
                    {student.courses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-2 h-2 rounded-full ${course.status === 'completed' ? 'bg-green-500' : course.status === 'in-progress' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{course.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCourseStatusColor(course.status)}`}>
                            {course.status === 'completed' ? 'เสร็จสิ้น' :
                              course.status === 'in-progress' ? 'กำลังเรียน' :
                                course.status === 'paused' ? 'พักชั่วคราว' :
                                  course.status === 'dropped' ? 'ถอน' : course.status}
                          </span>
                          <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 ${getProgressColor(course.progress)} rounded-full`}
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                            {course.progress}%
                          </span>
                          {course.grade && (
                            <span className={`text-sm font-medium ${getGradeColor(course.grade)}`}>
                              {course.grade}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>🏢 {student.department}</span>
                    <span>💼 {student.position}</span>
                    <span>📊 {student.level}</span>
                    <span>📅 เข้าทำงาน: {formatDate(student.joinDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      ดูรายละเอียด
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      แก้ไข
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      ติดต่อ
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">ไม่พบนักเรียน</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">ลองปรับเปลี่ยนเงื่อนไขการค้นหาหรือกรองข้อมูล</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterDepartment('all');
              setFilterLevel('all');
            }}>
              ล้างตัวกรอง
            </Button>
          </div>
        )}

        {/* Export Options */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707H19a2 2 0 012 2v1z" />
              </svg>
              ส่งออกรายงาน
            </span>
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m3-2H7a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v8m3-2h6m-6-4h6m2 2v10a2 2 0 002 2H9a2 2 0 00-2-2V6a2 2 0 00-2 2h6a2 2 0 002 2v2m2 4h10a2 2 0 002-2H9a2 2 0 00-2-2V8a2 2 0 00-2-2h6a2 2 0 00-2 2v2z" />
              </svg>
              ส่งออกเป็น Excel
            </span>
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002 2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4z" />
              </svg>
              พิมพิมพรายงาน
            </span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
