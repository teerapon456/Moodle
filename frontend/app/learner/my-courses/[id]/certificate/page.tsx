'use client';

import React, { useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/MainLayout';

// Mock certificate data
const getCertificateData = (id: string) => {
  const certificates: Record<string, any> = {
    '6': {
      certificateId: 'CERT-2024-001',
      courseTitle: 'Lean Manufacturing Fundamentals',
      courseCode: 'LM-2023-025',
      studentName: 'สมชาย ใจดี',
      studentId: 'EMP-2024-12345',
      completedDate: '15 มกราคม 2568',
      issuedDate: '16 มกราคม 2568',
      instructor: 'อ.ลีน ประสิทธิภาพ',
      duration: '15 ชั่วโมง',
      score: 91.25,
      grade: 'A',
      organization: 'INTEQC Learning & Development Center',
      organizationLogo: '/logo.png',
    },
    '7': {
      certificateId: 'CERT-2024-002',
      courseTitle: 'Effective Communication Skills',
      courseCode: 'HR-2024-012',
      studentName: 'สมชาย ใจดี',
      studentId: 'EMP-2024-12345',
      completedDate: '10 มกราคม 2568',
      issuedDate: '11 มกราคม 2568',
      instructor: 'อ.สื่อสาร ชัดเจน',
      duration: '10 ชั่วโมง',
      score: 91.67,
      grade: 'A',
      organization: 'INTEQC Learning & Development Center',
      organizationLogo: '/logo.png',
    },
  };

  return certificates[id] || null;
};

export default function CertificatePage() {
  const params = useParams();
  const courseId = params?.id as string;
  const certificate = getCertificateData(courseId);
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!certificate) {
    return (
      <MainLayout userName="สมชาย ใจดี" userRole="learner">
        <div className="pt-4 text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">ไม่พบใบประกาศนียบัตร</h1>
          <Link href="/learner/my-courses" className="text-[#A21D21] hover:underline">
            กลับไปหน้าหลักสูตรของฉัน
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real application, this would generate a PDF
    alert('ฟีเจอร์ดาวน์โหลด PDF จะพร้อมใช้งานในเร็วๆ นี้');
  };

  return (
    <MainLayout userName="สมชาย ใจดี" userRole="learner">
      <div className="mb-4 pt-4">
        <Link href={`/learner/my-courses/${courseId}`} className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-[#A21D21] dark:hover:text-[#C92828] mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          กลับไปรายละเอียดหลักสูตร
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">ใบประกาศนียบัตร</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">เลขที่: {certificate.certificateId}</p>
          </div>
          <div className="flex gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              พิมพ์
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-[#A21D21] text-white rounded-lg hover:bg-[#8A1919] transition-colors font-semibold"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              ดาวน์โหลด PDF
            </button>
          </div>
        </div>

        {/* Certificate */}
        <div className="max-w-5xl mx-auto">
          <div 
            ref={certificateRef}
            className="bg-white rounded-lg shadow-2xl overflow-hidden print:shadow-none"
            style={{
              aspectRatio: '1.414/1', // A4 ratio
            }}
          >
            {/* Decorative Border */}
            <div className="relative p-8 h-full" style={{
              background: 'linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%)',
              border: '16px solid',
              borderImage: 'linear-gradient(135deg, #A21D21 0%, #7A1818 50%, #A21D21 100%) 1',
            }}>
              {/* Inner Decorative Border */}
              <div className="absolute inset-12 border-2 border-[#A21D21]/20"></div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-between py-8">
                {/* Header */}
                <div className="text-center">
                  <div className="mb-4">
                    <div className="w-24 h-24 mx-auto mb-4 bg-[#A21D21] rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold text-[#A21D21] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    {certificate.organization}
                  </h1>
                  <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#A21D21] to-transparent mx-auto mb-6"></div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-8">ใบประกาศนียบัตร</h2>
                </div>

                {/* Body */}
                <div className="text-center max-w-2xl">
                  <p className="text-lg text-gray-700 mb-4">ขอแสดงว่า</p>
                  
                  <h3 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    {certificate.studentName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">รหัสพนักงาน: {certificate.studentId}</p>
                  
                  <p className="text-lg text-gray-700 mb-4">ได้ผ่านการอบรมหลักสูตร</p>
                  
                  <h4 className="text-2xl font-bold text-[#A21D21] mb-2">
                    {certificate.courseTitle}
                  </h4>
                  <p className="text-sm text-gray-600 mb-6">รหัสหลักสูตร: {certificate.courseCode}</p>
                  
                  <div className="grid grid-cols-3 gap-6 mb-6 max-w-xl mx-auto">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">ระยะเวลา</p>
                      <p className="text-lg font-semibold text-gray-900">{certificate.duration}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">คะแนน</p>
                      <p className="text-lg font-semibold text-gray-900">{certificate.score}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">เกรด</p>
                      <p className="text-lg font-semibold text-gray-900">{certificate.grade}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700">
                    เมื่อวันที่ {certificate.completedDate}
                  </p>
                </div>

                {/* Footer */}
                <div className="w-full max-w-2xl">
                  <div className="grid grid-cols-2 gap-12 mb-6">
                    <div className="text-center">
                      <div className="border-t-2 border-gray-800 pt-2 mb-2">
                        <p className="font-semibold text-gray-900">{certificate.instructor}</p>
                      </div>
                      <p className="text-xs text-gray-600">วิทยากร</p>
                    </div>
                    <div className="text-center">
                      <div className="border-t-2 border-gray-800 pt-2 mb-2">
                        <p className="font-semibold text-gray-900">ผู้อำนวยการ L&D</p>
                      </div>
                      <p className="text-xs text-gray-600">ผู้อนุมัติ</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      ออกเมื่อวันที่ {certificate.issuedDate} | เลขที่: {certificate.certificateId}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      ตรวจสอบความถูกต้องได้ที่ www.inteqc.com/verify/{certificate.certificateId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-[#A21D21]"></div>
              <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-[#A21D21]"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-[#A21D21]"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-[#A21D21]"></div>
            </div>
          </div>

          {/* Certificate Info */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 print:hidden">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="font-semibold mb-1">หมายเหตุ:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>ใบประกาศนียบัตรนี้สามารถตรวจสอบความถูกต้องได้ผ่านระบบออนไลน์</li>
                  <li>คุณสามารถดาวน์โหลดเป็นไฟล์ PDF หรือพิมพ์เพื่อเก็บเป็นหลักฐาน</li>
                  <li>หากพบข้อผิดพลาด กรุณาติดต่อฝ่าย L&D</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          
          nav, header, footer, .print\\:hidden {
            display: none !important;
          }
          
          @page {
            size: A4 landscape;
            margin: 0;
          }
        }
      `}</style>
    </MainLayout>
  );
}
