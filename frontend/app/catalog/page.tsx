'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/MainLayout';
import { mockCourses } from '@/app/database/mockData';
import { getCategories, getLevels, getDepartments, getDivisions } from '@/app/database/constants';
import { colors, spacing, typography, borderRadius, shadows, transitions } from '@/app/lib/design-tokens';

// Use centralized mock data
const courses = mockCourses;

// Original mock data kept for reference (can be removed after verification)
const _oldCourses = [
  {
    id: 1,
    title: 'Leadership & Management Excellence',
    description: 'พัฒนาทักษะความเป็นผู้นำและการจัดการทีมสำหรับหัวหน้างานและผู้บริหาร เพื่อสร้างทีมที่มีประสิทธิภาพสูง',
    category: 'Leadership',
    instructor: 'ดร.สมชาย ใจดี',
    enrolled: 245,
    duration: 16,
    level: 'L4',
    department: 'ทั้งหมด',
    division: 'ทั้งหมด',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    startDate: '1 มี.ค. 2568',
    courseCode: 'LDR-2024-001',
    year: 2024,
  },
  {
    id: 2,
    title: 'Digital Transformation & Innovation',
    description: 'เรียนรู้การนำเทคโนโลยีดิจิทัลมาใช้ในองค์กร พัฒนานวัตกรรม และปรับตัวสู่ยุคดิจิทัล',
    category: 'Digital Skills',
    instructor: 'คุณวิไล เทคโนโลยี',
    enrolled: 189,
    duration: 12,
    level: 'L3',
    department: 'ไอที (IT)',
    division: 'ICT',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    startDate: '15 มี.ค. 2568',
    courseCode: 'DIG-2024-005',
    year: 2024,
  },
  {
    id: 3,
    title: 'Effective Communication & Presentation',
    description: 'พัฒนาทักษะการสื่อสาร การนำเสนอ และการเจรจาต่อรองในสถานการณ์ทางธุรกิจ',
    category: 'Soft Skills',
    instructor: 'อ.สมหญิง รักงาน',
    enrolled: 312,
    duration: 8,
    level: 'L1',
    department: 'ทั้งหมด',
    division: 'ทั้งหมด',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    startDate: '1 เม.ย. 2568',
    courseCode: 'COM-2024-012',
    year: 2024,
  },
  {
    id: 4,
    title: 'Data Analytics for Business Decision',
    description: 'เรียนรู้การวิเคราะห์ข้อมูลเพื่อการตัดสินใจทางธุรกิจ ใช้ Excel, Power BI และเครื่องมือวิเคราะห์ข้อมูล',
    category: 'Technical Skills',
    instructor: 'ดร.ประเสริฐ ดาต้า',
    enrolled: 156,
    duration: 20,
    level: 'L3',
    department: 'การเงินและบัญชี (Finance & Accounting)',
    division: 'Finance & Accounting',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    startDate: '10 เม.ย. 2568',
    courseCode: 'DAT-2024-008',
    year: 2024,
  },
  {
    id: 5,
    title: 'Project Management Professional (PMP)',
    description: 'หลักสูตรการบริหารโครงการมืออาชีพ ตามมาตรฐาน PMI เพื่อเตรียมสอบ PMP Certification',
    category: 'Professional Development',
    instructor: 'คุณสมศักดิ์ โปรเจค',
    enrolled: 98,
    duration: 40,
    level: 'L5',
    department: 'ทั้งหมด',
    division: 'ทั้งหมด',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    startDate: '1 พ.ค. 2568',
    courseCode: 'PMP-2024-003',
    year: 2024,
  },
  {
    id: 6,
    title: 'Workplace Safety & Compliance',
    description: 'ความปลอดภัยในการทำงาน กฎหมายแรงงาน และการปฏิบัติตามข้อกำหนดขององค์กร',
    category: 'Compliance',
    instructor: 'คุณอรุณ ปลอดภัย',
    enrolled: 428,
    duration: 6,
    level: 'L0',
    department: 'ทั้งหมด',
    division: 'ทั้งหมด',
    thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    startDate: '5 มี.ค. 2568',
    courseCode: 'SAF-2024-015',
    year: 2024,
  },
  {
    id: 7,
    title: 'Customer Service Excellence',
    description: 'พัฒนาทักษะการบริการลูกค้าระดับมืออาชีพ การจัดการข้อร้องเรียน และสร้างความพึงพอใจสูงสุด',
    category: 'Soft Skills',
    instructor: 'คุณนภา บริการดี',
    enrolled: 267,
    duration: 10,
    level: 'L2',
    department: 'การตลาดและขาย (Marketing & Sales)',
    division: 'Marketing & Sales',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    startDate: '20 มี.ค. 2568',
    courseCode: 'CUS-2024-007',
    year: 2024,
  },
  {
    id: 8,
    title: 'Financial Management for Non-Finance',
    description: 'การบริหารการเงินสำหรับผู้ที่ไม่ใช่สายงานการเงิน เข้าใจงบการเงิน และการวิเคราะห์ทางการเงิน',
    category: 'Professional Development',
    instructor: 'ดร.เงินดี การเงิน',
    enrolled: 134,
    duration: 14,
    level: 'L4',
    department: 'ทั้งหมด',
    division: 'ทั้งหมด',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    startDate: '15 เม.ย. 2568',
    courseCode: 'FIN-2024-011',
    year: 2024,
  },
  {
    id: 9,
    title: 'Agile & Scrum Fundamentals',
    description: 'เรียนรู้หลักการทำงานแบบ Agile และ Scrum Framework สำหรับการพัฒนาผลิตภัณฑ์และบริการ',
    category: 'Technical Skills',
    instructor: 'คุณชัยวัฒน์ อไจล์',
    enrolled: 178,
    duration: 12,
    level: 'L2',
    department: 'วิศวกรรม (Engineering)',
    division: 'Engineering',
    thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop',
    startDate: '1 มี.ค. 2568',
    courseCode: 'AGL-2024-004',
    year: 2024,
  },
  {
    id: 10,
    title: 'Emotional Intelligence at Work',
    description: 'พัฒนาความฉลาดทางอารมณ์ การจัดการอารมณ์ และการสร้างความสัมพันธ์ที่ดีในที่ทำงาน',
    category: 'Soft Skills',
    instructor: 'ดร.จิตรา อารมณ์ดี',
    enrolled: 289,
    duration: 8,
    level: 'L1',
    department: 'ทั้งหมด',
    division: 'ทั้งหมด',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
    startDate: '25 มี.ค. 2568',
    courseCode: 'EIQ-2024-009',
    year: 2024,
  },
  {
    id: 11,
    title: 'Cybersecurity Awareness',
    description: 'ความรู้พื้นฐานด้านความปลอดภัยทางไซเบอร์ การป้องกันภัยคุกคาม และการปกป้องข้อมูลองค์กร',
    category: 'Compliance',
    instructor: 'คุณเทพ ไซเบอร์',
    enrolled: 512,
    duration: 4,
    level: 'L0',
    department: 'ทั้งหมด',
    division: 'ทั้งหมด',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
    startDate: '10 มี.ค. 2568',
    courseCode: 'CYB-2024-018',
    year: 2024,
  },
  {
    id: 12,
    title: 'Change Management & Organizational Development',
    description: 'การบริหารการเปลี่ยนแปลง การพัฒนาองค์กร และการสร้างวัฒนธรรมองค์กรที่เข้มแข็ง',
    category: 'Leadership',
    instructor: 'ดร.พัฒนา องค์กร',
    enrolled: 167,
    duration: 18,
    level: 'L6',
    department: 'ทั้งหมด',
    division: 'ทั้งหมด',
    thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
    startDate: '1 มิ.ย. 2568',
    courseCode: 'CHG-2024-002',
    year: 2024,
  },
];

// Use centralized filter options
const categories = ['ทั้งหมด', ...getCategories()];
const levels = [{ value: 'ทั้งหมด', label: 'ทุกระดับ' }, ...getLevels().map(l => ({ value: l, label: l }))];
const divisions = ['ทั้งหมด', ...getDivisions()];
const departments = ['ทั้งหมด', ...getDepartments()];

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [selectedLevel, setSelectedLevel] = useState('ทั้งหมด');
  const [selectedDivision, setSelectedDivision] = useState('ทั้งหมด');
  const [selectedDepartment, setSelectedDepartment] = useState('ทั้งหมด');

  const filteredCourses = useMemo(() => courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'ทั้งหมด' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'ทั้งหมด' || course.level === selectedLevel;
    const matchesDivision = selectedDivision === 'ทั้งหมด' || course.division === selectedDivision;
    const matchesDepartment = selectedDepartment === 'ทั้งหมด' || course.department === selectedDepartment || course.department === 'ทั้งหมด';
    return matchesSearch && matchesCategory && matchesLevel && matchesDivision && matchesDepartment;
  }), [searchQuery, selectedCategory, selectedLevel, selectedDivision, selectedDepartment]);

  return (
    <MainLayout userName="สมชาย ใจดี" userRole="learner">
      <div className="mb-6 pt-4">
        <h1
          className="text-3xl font-bold mb-2"
          style={{
            fontSize: typography.fontSize['3xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.text.primary,
            marginBottom: spacing.sm,
          }}
        >
          Learning & Development Catalog
        </h1>
        <p
          className="mt-1"
          style={{
            color: colors.text.secondary,
            marginTop: spacing.xs,
          }}
        >
          หลักสูตรพัฒนาทักษะและความรู้สำหรับพนักงาน - เลือกหลักสูตรที่เหมาะกับเส้นทางการเติบโตของคุณ
        </p>
      </div>

      {/* Search and Filters */}
      <div
        className="rounded-xl shadow-sm border p-4 mb-6"
        style={{
          backgroundColor: colors.background.primary,
          border: `1px solid ${colors.border.primary}`,
          borderRadius: borderRadius.xl,
          boxShadow: shadows.sm,
          padding: spacing.lg,
          marginBottom: spacing.xl,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" style={{ gap: spacing.md }}>
          <div className="lg:col-span-1">
            <label
              className="block text-sm font-semibold mb-2"
              style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginBottom: spacing.sm,
              }}
            >
              ค้นหาหลักสูตร
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: colors.text.tertiary }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="ค้นหาหลักสูตร..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{
                  paddingLeft: `calc(${spacing.lg} + ${spacing.sm})`,
                  paddingRight: spacing.lg,
                  paddingTop: spacing.sm,
                  paddingBottom: spacing.sm,
                  border: `1px solid ${colors.border.primary}`,
                  borderRadius: borderRadius.lg,
                  fontSize: typography.fontSize.base,
                  color: colors.text.primary,
                  backgroundColor: colors.background.primary,
                  transition: transitions.default,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary.main;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primary.main}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border.primary;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginBottom: spacing.sm,
              }}
            >
              ประเภทหลักสูตร
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{
                paddingLeft: spacing.lg,
                paddingRight: spacing.lg,
                paddingTop: spacing.sm,
                paddingBottom: spacing.sm,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.base,
                color: colors.text.primary,
                backgroundColor: colors.background.primary,
                transition: transitions.default,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary.main;
                e.target.style.boxShadow = `0 0 0 3px ${colors.primary.main}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.border.primary;
                e.target.style.boxShadow = 'none';
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginBottom: spacing.sm,
              }}
            >
              ระดับ (Job Level)
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{
                paddingLeft: spacing.lg,
                paddingRight: spacing.lg,
                paddingTop: spacing.sm,
                paddingBottom: spacing.sm,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.base,
                color: colors.text.primary,
                backgroundColor: colors.background.primary,
                transition: transitions.default,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary.main;
                e.target.style.boxShadow = `0 0 0 3px ${colors.primary.main}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.border.primary;
                e.target.style.boxShadow = 'none';
              }}
            >
              {levels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginBottom: spacing.sm,
              }}
            >
              ฝ่าย (Division)
            </label>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{
                paddingLeft: spacing.lg,
                paddingRight: spacing.lg,
                paddingTop: spacing.sm,
                paddingBottom: spacing.sm,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.base,
                color: colors.text.primary,
                backgroundColor: colors.background.primary,
                transition: transitions.default,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary.main;
                e.target.style.boxShadow = `0 0 0 3px ${colors.primary.main}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.border.primary;
                e.target.style.boxShadow = 'none';
              }}
            >
              {divisions.map(div => (
                <option key={div} value={div}>{div}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.primary,
                marginBottom: spacing.sm,
              }}
            >
              แผนก (Department)
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{
                paddingLeft: spacing.lg,
                paddingRight: spacing.lg,
                paddingTop: spacing.sm,
                paddingBottom: spacing.sm,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: borderRadius.lg,
                fontSize: typography.fontSize.base,
                color: colors.text.primary,
                backgroundColor: colors.background.primary,
                transition: transitions.default,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary.main;
                e.target.style.boxShadow = `0 0 0 3px ${colors.primary.main}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.border.primary;
                e.target.style.boxShadow = 'none';
              }}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Course Grid - 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ gap: spacing.lg }}>
        {filteredCourses.map((course) => (
          <Link key={course.id} href={`/catalog/${course.id}`} className="group">
            <div
              className="rounded-xl shadow-sm border overflow-hidden hover:shadow-xl transition-all h-full flex flex-col"
              style={{
                backgroundColor: colors.background.primary,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: borderRadius.xl,
                boxShadow: shadows.sm,
                transition: transitions.default,
              }}
            >
              {/* Thumbnail */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      color: colors.text.secondary,
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.semibold,
                    }}
                  >
                    {course.level}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <span
                    className="px-2 py-1 rounded-full text-[10px] font-semibold"
                    style={{
                      backgroundColor: `${colors.primary.main}e6`,
                      color: colors.text.inverse,
                      fontSize: '10px',
                      fontWeight: typography.fontWeight.semibold,
                    }}
                  >
                    {course.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow" style={{ padding: spacing.lg }}>
                {/* Category */}
                <div className="mb-2" style={{ marginBottom: spacing.sm }}>
                  <span
                    className="text-xs font-semibold truncate block"
                    style={{
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.semibold,
                      color: colors.primary.main,
                    }}
                  >
                    {course.category}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-base font-bold mb-3 line-clamp-2 leading-tight transition-colors"
                  style={{
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.bold,
                    color: colors.text.primary,
                    marginBottom: spacing.sm,
                  }}
                >
                  {course.title}
                </h3>

                {/* Instructor */}
                <div className="mb-3" style={{ marginBottom: spacing.sm }}>
                  <div
                    className="flex items-center text-sm"
                    style={{
                      fontSize: typography.fontSize.sm,
                      color: colors.text.secondary,
                    }}
                  >
                    <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="truncate">{course.instructor}</span>
                  </div>
                </div>

                {/* Start Date & Duration */}
                <div className="space-y-2 mb-3" style={{ marginBottom: spacing.sm }}>
                  <div
                    className="flex items-center text-sm"
                    style={{
                      fontSize: typography.fontSize.sm,
                      color: colors.text.secondary,
                    }}
                  >
                    <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">เริ่ม: {course.startDate}</span>
                  </div>
                  <div
                    className="flex items-center text-sm"
                    style={{
                      fontSize: typography.fontSize.sm,
                      color: colors.text.secondary,
                    }}
                  >
                    <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="truncate">{course.duration} ชั่วโมง</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                  <button
                    className="w-full px-3 py-2 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5 transition-all"
                    style={{
                      width: '100%',
                      padding: `${spacing.sm} ${spacing.md}`,
                      backgroundColor: colors.primary.main,
                      color: colors.text.inverse,
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.semibold,
                      borderRadius: borderRadius.lg,
                      transition: transitions.default,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primary.dark;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primary.main;
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div
          className="text-center py-16 rounded-xl border"
          style={{
            padding: '64px 0',
            backgroundColor: colors.background.primary,
            border: `1px solid ${colors.border.primary}`,
            borderRadius: borderRadius.xl,
          }}
        >
          <svg
            className="w-20 h-20 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{
              width: '80px',
              height: '80px',
              margin: `0 auto ${spacing.lg} auto`,
              color: colors.text.tertiary,
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3
            className="text-lg font-semibold mb-2"
            style={{
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text.primary,
              marginBottom: spacing.sm,
            }}
          >
            ไม่พบหลักสูตร
          </h3>
          <p
            className="mb-4"
            style={{
              color: colors.text.secondary,
              marginBottom: spacing.md,
            }}
          >
            ลองเปลี่ยนเงื่อนไขการค้นหาหรือตัวกรอง
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ทั้งหมด');
              setSelectedLevel('ทั้งหมด');
              setSelectedDivision('ทั้งหมด');
              setSelectedDepartment('ทั้งหมด');
            }}
            className="px-6 py-2 text-white rounded-lg font-medium transition-all"
            style={{
              paddingLeft: spacing.lg,
              paddingRight: spacing.lg,
              paddingTop: spacing.sm,
              paddingBottom: spacing.sm,
              backgroundColor: colors.primary.main,
              color: colors.text.inverse,
              fontWeight: typography.fontWeight.medium,
              borderRadius: borderRadius.lg,
              transition: transitions.default,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary.dark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary.main;
            }}
          >
            ล้างตัวกรอง
          </button>
        </div>
      )}
    </MainLayout>
  );
}
