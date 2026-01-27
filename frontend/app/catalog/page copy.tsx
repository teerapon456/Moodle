'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/MainLayout';

// Mock courses data - Learning & Development for Corporate Employees
const courses = [
  {
    id: 1,
    title: 'Leadership & Management Excellence',
    description: 'พัฒนาทักษะความเป็นผู้นำและการจัดการทีมสำหรับหัวหน้างานและผู้บริหาร เพื่อสร้างทีมที่มีประสิทธิภาพสูง',
    category: 'Leadership',
    instructor: 'ดร.สมชาย ใจดี - Senior Leadership Coach',
    enrolled: 245,
    duration: 16,
    level: 'L4',
    department: 'ทั้งหมด',
    division: 'ทั้งหมด',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    title: 'Digital Transformation & Innovation',
    description: 'เรียนรู้การนำเทคโนโลยีดิจิทัลมาใช้ในองค์กร พัฒนานวัตกรรม และปรับตัวสู่ยุคดิจิทัล',
    category: 'Digital Skills',
    instructor: 'คุณวิไล เทคโนโลยี - Digital Transformation Lead',
    enrolled: 189,
    duration: 12,
    level: 'L3',
    department: 'ไอที (IT)',
    division: 'ICT',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    title: 'Effective Communication & Presentation',
    description: 'พัฒนาทักษะการสื่อสาร การนำเสนอ และการเจรจาต่อรองในสถานการณ์ทางธุรกิจ',
    category: 'Soft Skills',
    instructor: 'อ.สมหญิง รักงาน - Communication Expert',
    enrolled: 312,
    duration: 8,
    level: 'L1',
    department: 'ทั้งหมด',
    division: 'ทั้งหมด',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    title: 'Data Analytics for Business Decision',
    description: 'เรียนรู้การวิเคราะห์ข้อมูลเพื่อการตัดสินใจทางธุรกิจ ใช้ Excel, Power BI และเครื่องมือวิเคราะห์ข้อมูล',
    category: 'Technical Skills',
    instructor: 'ดร.ประเสริฐ ดาต้า - Data Science Manager',
    enrolled: 156,
    duration: 20,
    level: 'L3',
    department: 'การเงินและบัญชี (Finance & Accounting)',
    division: 'Finance & Accounting',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  },
  {
    id: 5,
    title: 'Project Management Professional (PMP)',
    description: 'หลักสูตรการบริหารโครงการมืออาชีพ ตามมาตรฐาน PMI เพื่อเตรียมสอบ PMP Certification',
    category: 'Professional Development',
    instructor: 'คุณสมศักดิ์ โปรเจค - PMP Certified',
    enrolled: 98,
    duration: 40,
    level: 'L5',
    department: 'ทั้งหมด',
    division: 'ทั้งหมด',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
  },
  {
    id: 6,
    title: 'Workplace Safety & Compliance',
    description: 'ความปลอดภัยในการทำงาน กฎหมายแรงงาน และการปฏิบัติตามข้อกำหนดขององค์กร',
    category: 'Compliance',
    instructor: 'คุณอรุณ ปลอดภัย - Safety Officer',
    enrolled: 428,
    duration: 6,
    level: 'L0',
    department: 'ทั้งหมด',
    division: 'ทั้งหมด',
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
  },
  {
    id: 7,
    title: 'Customer Service Excellence',
    description: 'พัฒนาทักษะการบริการลูกค้าระดับมืออาชีพ การจัดการข้อร้องเรียน และสร้างความพึงพอใจสูงสุด',
    category: 'Soft Skills',
    instructor: 'คุณนภา บริการดี - Customer Experience Manager',
    enrolled: 267,
    duration: 10,
    level: 'L2',
    department: 'การตลาดและขาย (Marketing & Sales)',
    division: 'Marketing & Sales',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
  },
  {
    id: 8,
    title: 'Financial Management for Non-Finance',
    description: 'การบริหารการเงินสำหรับผู้ที่ไม่ใช่สายงานการเงิน เข้าใจงบการเงิน และการวิเคราะห์ทางการเงิน',
    category: 'Professional Development',
    instructor: 'ดร.เงินดี การเงิน - CFO',
    enrolled: 134,
    duration: 14,
    level: 'L4',
    department: 'ทั้งหมด',
    division: 'ทั้งหมด',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
  },
  {
    id: 9,
    title: 'Agile & Scrum Fundamentals',
    description: 'เรียนรู้หลักการทำงานแบบ Agile และ Scrum Framework สำหรับการพัฒนาผลิตภัณฑ์และบริการ',
    category: 'Technical Skills',
    instructor: 'คุณชัยวัฒน์ อไจล์ - Certified Scrum Master',
    enrolled: 178,
    duration: 12,
    level: 'L2',
    department: 'วิศวกรรม (Engineering)',
    division: 'Engineering',
    thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop',
  },
  {
    id: 10,
    title: 'Emotional Intelligence at Work',
    description: 'พัฒนาความฉลาดทางอารมณ์ การจัดการอารมณ์ และการสร้างความสัมพันธ์ที่ดีในที่ทำงาน',
    category: 'Soft Skills',
    instructor: 'ดร.จิตรา อารมณ์ดี - Organizational Psychologist',
    enrolled: 289,
    duration: 8,
    level: 'L1',
    department: 'ทั้งหมด',
    division: 'ทั้งหมด',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
  },
  {
    id: 11,
    title: 'Cybersecurity Awareness',
    description: 'ความรู้พื้นฐานด้านความปลอดภัยทางไซเบอร์ การป้องกันภัยคุกคาม และการปกป้องข้อมูลองค์กร',
    category: 'Compliance',
    instructor: 'คุณเทพ ไซเบอร์ - IT Security Specialist',
    enrolled: 512,
    duration: 4,
    level: 'L0',
    department: 'ทั้งหมด',
    division: 'ทั้งหมด',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
  },
  {
    id: 12,
    title: 'Change Management & Organizational Development',
    description: 'การบริหารการเปลี่ยนแปลง การพัฒนาองค์กร และการสร้างวัฒนธรรมองค์กรที่เข้มแข็ง',
    category: 'Leadership',
    instructor: 'ดร.พัฒนา องค์กร - Change Management Consultant',
    enrolled: 167,
    duration: 18,
    level: 'L6',
    department: 'ทั้งหมด',
    division: 'ทั้งหมด',
    thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
  },
];

const categories = [
  'ทั้งหมด',
  'Leadership',
  'Soft Skills',
  'Technical Skills',
  'Digital Skills',
  'Professional Development',
  'Compliance'
];

// Job Levels - L0 to L6 (without position names)
const levels = [
  { value: 'ทั้งหมด', label: 'ทุกระดับ' },
  { value: 'L0', label: 'L0' },
  { value: 'L1', label: 'L1' },
  { value: 'L2', label: 'L2' },
  { value: 'L3', label: 'L3' },
  { value: 'L4', label: 'L4' },
  { value: 'L5', label: 'L5' },
  { value: 'L6', label: 'L6' },
  { value: 'L7', label: 'L7' },
  { value: 'L8', label: 'L8' },
  { value: 'L9', label: 'L9' },
  { value: 'L10', label: 'L10' },
  { value: 'L11', label: 'L11' },
  { value: 'L12', label: 'L12' },
  { value: 'L13', label: 'L13' },
];

// Departments
const departments = [
  'ทั้งหมด',
  'การผลิต (Production)',
  'วิศวกรรม (Engineering)',
  'คุณภาพ (Quality Assurance)',
  'บำรุงรักษา (Maintenance)',
  'โลจิสติกส์ (Logistics)',
  'ทรัพยากรบุคคล (HR)',
  'การเงินและบัญชี (Finance & Accounting)',
  'ไอที (IT)',
  'การตลาดและขาย (Marketing & Sales)',
];

const divisions = [
  'ทั้งหมด',
  'HR',
  'ICT',
  'Finance & Accounting',
  'Marketing & Sales',
  'Production',

  'Quality Assurance',
  'Maintenance',
  'Logistics',
  'Marketing',
  'Sales',
  'Supply Chain',
];

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [selectedLevel, setSelectedLevel] = useState('ทั้งหมด');
  const [selectedDepartment, setSelectedDepartment] = useState('ทั้งหมด');
  const [selectedDivision, setSelectedDivision] = useState('ทั้งหมด');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ทั้งหมด' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'ทั้งหมด' || course.level === selectedLevel;
    const matchesDepartment = selectedDepartment === 'ทั้งหมด' || course.department === selectedDepartment || course.department === 'ทั้งหมด';
    const matchesDivision = selectedDivision === 'ทั้งหมด' || course.division === selectedDivision || course.division === 'ทั้งหมด';
    return matchesSearch && matchesCategory && matchesLevel && matchesDepartment && matchesDivision;
  });

  return (
    <MainLayout userName="สมชาย ใจดี" userRole="learner">
      <div className="mb-4 pt-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Learning & Development Catalog</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">หลักสูตรพัฒนาทักษะและความรู้สำหรับพนักงาน - เลือกหลักสูตรที่เหมาะกับเส้นทางการเติบโตของคุณ</p>
      </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">ค้นหาหลักสูตร</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="ค้นหาหลักสูตร..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">ประเภทหลักสูตร</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">ระดับ (Job Level)</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  {levels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">แผนก (Department)</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">ฝ่าย (Division)</label>
                <select
                  value={selectedDivision}
                  onChange={(e) => setSelectedDivision(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-[#A21D21] transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  {divisions.map(div => (
                    <option key={div} value={div}>{div}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:border-[#A21D21]/30 dark:hover:border-[#A21D21]/50 transition-all cursor-pointer h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    {course.thumbnail ? (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-[#A21D21] to-[#7A1818] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <svg className="w-16 h-16 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-xs font-semibold text-gray-700 dark:text-gray-300 rounded-full shadow-sm">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-[#A21D21] dark:group-hover:text-[#C92828] transition-colors">{course.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">{course.description}</p>
                    <div className="mt-auto space-y-3">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {course.instructor}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          {course.enrolled.toLocaleString()} ผู้เรียน
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {course.duration} ชม.
                        </span>
                      </div>
                      <button className="w-full px-4 py-2.5 bg-gradient-to-r from-[#A21D21] to-[#7A1818] text-white rounded-lg hover:from-[#7A1818] hover:to-[#A21D21] transition-all text-sm font-semibold shadow-md hover:shadow-lg">
                        ดูรายละเอียด
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ไม่พบหลักสูตร</h3>
              <p className="text-gray-600 mb-4">ลองเปลี่ยนเงื่อนไขการค้นหาหรือตัวกรอง</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ทั้งหมด');
                  setSelectedLevel('ทั้งหมด');
                  setSelectedDepartment('ทั้งหมด');
                  setSelectedDivision('ทั้งหมด');
                }}
                className="px-6 py-2 bg-[#A21D21] text-white rounded-lg hover:bg-[#7A1818] transition-colors font-medium"
              >
                ล้างตัวกรอง
              </button>
            </div>
          )}
    </MainLayout>
  );
}
