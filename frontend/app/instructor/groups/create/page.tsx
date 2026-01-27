'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Input } from '@/components/ui';

const groupTypes = [
  { value: 'department', label: 'แผนก/ฝ่าย', color: 'bg-blue-500', description: 'จัดกลุ่มตามแผนกหรือฝ่ายในองค์กร' },
  { value: 'position', label: 'ตำแหน่ง', color: 'bg-green-500', description: 'จัดกลุ่มตามตำแหน่งงาน' },
  { value: 'course', label: 'หลักสูตร', color: 'bg-purple-500', description: 'จัดกลุ่มตามหลักสูตรที่เรียน' },
  { value: 'custom', label: 'กำหนดเอง', color: 'bg-orange-500', description: 'จัดกลุ่มตามความต้องการเฉพาะ' }
];

export default function CreateGroupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  const [formData, setFormData] = useState({
    name: '',
    type: 'department',
    description: '',
    maxMembers: '',
    allowSelfEnrollment: false,
    requireApproval: false,
    parentGroup: '',
    isReusable: false,
    autoAssignRules: [] as Array<{ field: string, value: string, operator: string }>
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [templateData, setTemplateData] = useState<any>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }

    // Load template data if template ID is provided
    if (templateId) {
      // Simulate loading template data
      const mockTemplateData = {
        '1': {
          name: 'ฝ่ายการตลาด',
          type: 'department',
          description: 'พนักงานฝ่ายการตลาดทุกตำแหน่ง',
          settings: {
            allowSelfEnrollment: false,
            requireApproval: true,
            maxMembers: null
          },
          autoAssignRules: [
            { field: 'department', value: 'การตลาด', operator: 'equals' }
          ]
        }
      };

      const template = mockTemplateData[templateId as keyof typeof mockTemplateData];
      if (template) {
        setTemplateData(template);
        setFormData(prev => ({
          ...prev,
          name: template.name,
          type: template.type,
          description: template.description,
          allowSelfEnrollment: template.settings.allowSelfEnrollment,
          requireApproval: template.settings.requireApproval,
          maxMembers: template.settings.maxMembers || '',
          autoAssignRules: template.autoAssignRules
        }));
      }
    }
  }, [templateId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message
      alert('สร้างกลุ่มสำเร็จแล้ว!');

      // Redirect to groups page
      window.location.href = '/instructor/groups';
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการสร้างกลุ่ม');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedGroupType = groupTypes.find(gt => gt.value === formData.type);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white"
            >
              ← กลับ
            </Button>
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                {templateData ? 'สร้างกลุ่มจากเทมเพลต' : 'สร้างกลุ่มผู้เรียนใหม่'}
              </h1>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {templateData ? `สร้างกลุ่มจากเทมเพลต: ${templateData.name}` : 'สร้างกลุ่มใหม่เพื่อจัดการผู้เรียนในหลักสูตรต่างๆ'}
              </p>
            </div>
          </div>
          {templateData && (
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
              <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                📋 กำลังสร้างจากเทมเพลต: คุณสามารถแก้ไขข้อมูลได้ตามต้องการ
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Group Name */}
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    ชื่อกลุ่ม *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="เช่น ฝ่ายการตลาด, ทีมผู้จัดการ"
                    required
                    className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                  />
                </div>

                {/* Group Type */}
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    ประเภทกลุ่ม *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  >
                    {groupTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {selectedGroupType && (
                    <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {selectedGroupType.description}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    คำอธิบายกลุ่ม
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="อธิบายวัตถุประสงค์และรายละเอียดของกลุ่ม"
                    rows={4}
                    className={`w-full p-3 border rounded-lg ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  />
                </div>

                {/* Max Members */}
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    จำนวนสมาชิกสูงสุด (ถ้ามี)
                  </label>
                  <Input
                    type="number"
                    name="maxMembers"
                    value={formData.maxMembers}
                    onChange={handleInputChange}
                    placeholder="เช่น 30"
                    min="1"
                    className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                  />
                </div>

              </div>
              ) : (
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                ยังไม่มีกฎการมอบหมายอัตโนมัติ
              </p>
                )}

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    autoAssignRules: [...prev.autoAssignRules, { field: 'department', value: '', operator: 'equals' }]
                  }));
                }}
                className="border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white"
              >
                + เพิ่มกฎอัตโนมัติ
              </Button>
              variant="outline"
              onClick={() => window.location.href = '/instructor/groups'}
              className="border-[#A21D21] text-[#A21D21] hover:bg-[#A21D21] hover:text-white"
                  >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.name}
              className="bg-[#A21D21] hover:bg-[#7A1818] text-white disabled:opacity-50"
            >
              {isSubmitting ? 'กำลังสร้าง...' : 'สร้างกลุ่ม'}
            </Button>
          </div>
        </form>
      </Card>
    </div>

          {/* Sidebar */ }
  <div className="space-y-6">
    {/* Group Type Preview */}
    <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
        ตัวอย่างประเภทกลุ่ม
      </h3>
      <div className="space-y-3">
        {groupTypes.map(type => (
          <div
            key={type.value}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${formData.type === type.value
              ? 'border-[#A21D21] bg-[#A21D21]/10'
              : isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
              }`}
            onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
          >
            <div className="flex items-center gap-2">
              <Badge className={`${type.color} text-white text-xs`}>
                {type.label}
              </Badge>
            </div>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {type.description}
            </p>
          </div>
        ))}
      </div>
    </Card>

    {/* Tips */}
    <Card className={`p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
        💡 เคล็ดลับ
      </h3>
      <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <li>• ตั้งชื่อกลุ่มให้ชัดเจนและเข้าใจง่าย</li>
        <li>• เลือกประเภทกลุ่มให้เหมาะกับวัตถุประสงค์</li>
        <li>• จำกัดจำนวนสมาชิกหากจำเป็น</li>
        <li>• ตั้งค่าการอนุมัติสำหรับกลุ่มพิเศษ</li>
        <li>• เขียนคำอธิบายให้ครบถ้วน</li>
      </ul>
    </Card>
  </div>
        </div >
      </div >
    </div >
  );
}
