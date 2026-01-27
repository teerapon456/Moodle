'use client';

import React, { useState } from 'react';

const reports = [
  { 
    id: 1, 
    title: 'รายงานการฝึกอบรมประจำเดือนมกราคม 2024', 
    period: 'มกราคม 2024',
    totalLearners: 120,
    completed: 85,
    inProgress: 35,
    completionRate: 71,
    createdAt: '2024-02-01',
    status: 'completed',
  },
  { 
    id: 2, 
    title: 'รายงานการฝึกอบรมประจำเดือนกุมภาพันธ์ 2024', 
    period: 'กุมภาพันธ์ 2024',
    totalLearners: 145,
    completed: 102,
    inProgress: 43,
    completionRate: 70,
    createdAt: '2024-03-01',
    status: 'completed',
  },
  { 
    id: 3, 
    title: 'รายงานการฝึกอบรมประจำเดือนมีนาคม 2024', 
    period: 'มีนาคม 2024',
    totalLearners: 168,
    completed: 125,
    inProgress: 43,
    completionRate: 74,
    createdAt: '2024-04-01',
    status: 'in-progress',
  },
];

const departmentBreakdown = [
  { department: 'ฝ่ายผลิต', total: 45, completed: 32, inProgress: 13, completionRate: 71 },
  { department: 'ฝ่ายขาย', total: 32, completed: 21, inProgress: 11, completionRate: 66 },
  { department: 'ฝ่ายพัฒนาบุคลากร', total: 28, completed: 22, inProgress: 6, completionRate: 79 },
  { department: 'ฝ่าย IT', total: 25, completed: 21, inProgress: 4, completionRate: 84 },
  { department: 'ฝ่ายบัญชี', total: 20, completed: 15, inProgress: 5, completionRate: 75 },
];

export default function HRTrainingReportsPage() {
  const [selectedReport, setSelectedReport] = useState(reports[2]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">รายงานการฝึกอบรม</h1>
        <p className="text-gray-600 mt-1">รายงานและสถิติการฝึกอบรมบุคลากร</p>
      </div>

      {/* Report Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">เลือกรายงาน</label>
        <select
          value={selectedReport.id}
          onChange={(e) => {
            const report = reports.find(r => r.id === parseInt(e.target.value));
            if (report) setSelectedReport(report);
          }}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent"
        >
          {reports.map(report => (
            <option key={report.id} value={report.id}>{report.title}</option>
          ))}
        </select>
      </div>

      {/* Report Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">ผู้เรียนทั้งหมด</p>
          <p className="text-3xl font-bold text-gray-900">{selectedReport.totalLearners}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">เรียนจบแล้ว</p>
          <p className="text-3xl font-bold text-green-600">{selectedReport.completed}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">กำลังเรียน</p>
          <p className="text-3xl font-bold text-yellow-600">{selectedReport.inProgress}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">อัตราเรียนจบ</p>
          <p className="text-3xl font-bold text-[#A21D21]">{selectedReport.completionRate}%</p>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">รายละเอียดตามแผนก</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">แผนก</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ผู้เรียนทั้งหมด</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เรียนจบ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">กำลังเรียน</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">อัตราเรียนจบ</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departmentBreakdown.map((dept, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{dept.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{dept.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">{dept.completed}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-yellow-600">{dept.inProgress}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-[#A21D21] h-2 rounded-full"
                          style={{ width: `${dept.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{dept.completionRate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-3">
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          ส่งออกรายงาน Excel
        </button>
        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          ส่งออกรายงาน PDF
        </button>
        <button className="px-6 py-2 bg-[#A21D21] text-white rounded-lg hover:bg-[#7A1818] transition-colors font-medium">
          สร้างรายงานใหม่
        </button>
      </div>
    </div>
  );
}
