'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Input } from '@/components/ui';

export default function ImportMembersPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importData, setImportData] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Simulate file processing
      const mockData = [
        { name: 'สมชาย ใจดี', email: 'somchai@company.com', position: 'Marketing Manager', department: 'การตลาด' },
        { name: 'มานี รักดี', email: 'manee@company.com', position: 'Digital Marketing Specialist', department: 'การตลาด' },
        { name: 'วีระ มุ่งมั่น', email: 'veera@company.com', position: 'Brand Manager', department: 'การตลาด' },
        { name: 'สมศรี มีสุข', email: 'somsri@company.com', position: 'Sales Manager', department: 'การขาย' },
        { name: 'ประสิทธิ์ มีชัย', email: 'prasit@company.com', position: 'HR Manager', department: 'บุคคล' }
      ];
      setImportData(mockData);
      setCurrentStep(2);
    }
  };

  const handleProcessImport = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCurrentStep(3);
    setIsProcessing(false);
  };

  const handleDownloadTemplate = () => {
    // Create CSV template
    const csvContent = "ชื่อ,อีเมล,ตำแหน่ง,แผนก\nสมชาย ใจดี,somchai@company.com,Marketing Manager,การตลาด";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'import_template.csv';
    link.click();
  };

  const handleComplete = () => {
    window.location.href = '/instructor/groups';
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
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                นำเข้าสมาชิก
              </h1>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                นำเข้าสมาชิกจากไฟล์ Excel/CSV เพื่อเพิ่มลงในกลุ่ม
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? 'bg-[#A21D21] text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                1
              </div>
              <span className={`ml-2 text-sm ${currentStep >= 1 ? 'text-[#A21D21]' : 'text-gray-500'}`}>
                เลือกไฟล์
              </span>
            </div>
            <div className={`w-16 h-1 mx-4 ${currentStep >= 2 ? 'bg-[#A21D21]' : 'bg-gray-300'}`}></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2 ? 'bg-[#A21D21] text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <span className={`ml-2 text-sm ${currentStep >= 2 ? 'text-[#A21D21]' : 'text-gray-500'}`}>
                ตรวจสอบข้อมูล
              </span>
            </div>
            <div className={`w-16 h-1 mx-4 ${currentStep >= 3 ? 'bg-[#A21D21]' : 'bg-gray-300'}`}></div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 3 ? 'bg-[#A21D21] text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                3
              </div>
              <span className={`ml-2 text-sm ${currentStep >= 3 ? 'text-[#A21D21]' : 'text-gray-500'}`}>
                นำเข้าสำเร็จ
              </span>
            </div>
          </div>
        </div>

        {/* Step 1: File Selection */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                อัพโหลดไฟล์
              </h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📁</span>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
                  ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์
                </p>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-4 py-2 bg-[#A21D21] text-white rounded-lg cursor-pointer hover:bg-[#7A1818]"
                >
                  เลือกไฟล์
                </label>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-4`}>
                  รองรับไฟล์ .csv, .xlsx, .xls
                </p>
              </div>
            </Card>

            <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                ดาวน์โหลดเทมเพลต
              </h3>
              <div className="space-y-4">
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  ดาวน์โหลดเทมเพลตไฟล์เพื่อให้แน่ใจว่าข้อมูลมีรูปแบบถูกต้อง
                </p>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    รูปแบบไฟล์ที่ต้องการ:
                  </h4>
                  <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>• ชื่อ (จำเป็น)</li>
                    <li>• อีเมล (จำเป็น)</li>
                    <li>• ตำแหน่ง (ไม่จำเป็น)</li>
                    <li>• แผนก (ไม่จำเป็น)</li>
                  </ul>
                </div>
                <Button
                  onClick={handleDownloadTemplate}
                  variant="outline"
                  className="w-full border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white"
                >
                  ดาวน์โหลดเทมเพลต CSV
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: Data Review */}
        {currentStep === 2 && (
          <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                ตรวจสอบข้อมูล ({importData.length} รายการ)
              </h3>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white"
                >
                  เลือกไฟล์ใหม่
                </Button>
                <Button
                  onClick={handleProcessImport}
                  disabled={isProcessing}
                  className="bg-[#A21D21] hover:bg-[#7A1818] text-white"
                >
                  {isProcessing ? 'กำลังนำเข้า...' : 'นำเข้าข้อมูล'}
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>ชื่อ</th>
                    <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>อีเมล</th>
                    <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>ตำแหน่ง</th>
                    <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>แผนก</th>
                    <th className={`text-left py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {importData.map((member, index) => (
                    <tr key={index} className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <td className={`py-3 px-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {member.name}
                      </td>
                      <td className={`py-3 px-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {member.email}
                      </td>
                      <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {member.position}
                      </td>
                      <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {member.department}
                      </td>
                      <td className={`py-3 px-4`}>
                        <span className="text-sm text-green-600">✅ พร้อมนำเข้า</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Step 3: Success */}
        {currentStep === 3 && (
          <Card className={`p-8 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} text-center`}>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              นำเข้าข้อมูลสำเร็จ!
            </h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
              นำเข้าสมาชิก {importData.length} รายการเข้าสู่ระบบเรียบร้อยแล้ว
            </p>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-6`}>
              <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                สรุปการนำเข้า:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className={`block font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {importData.length}
                  </span>
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>นำเข้าสำเร็จ</span>
                </div>
                <div>
                  <span className={`block font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>0</span>
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>มีข้อผิดพลาด</span>
                </div>
                <div>
                  <span className={`block font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {importData.length}
                  </span>
                  <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>ทั้งหมด</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white"
              >
                นำเข้าเพิ่มเติม
              </Button>
              <Button
                onClick={handleComplete}
                className="bg-[#A21D21] hover:bg-[#7A1818] text-white"
              >
                ดูกลุ่มทั้งหมด
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
