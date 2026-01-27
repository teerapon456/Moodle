'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
  getProvinces,
  getDistrictsByProvince,
  getSubDistrictsByDistrict,
  getPostalCodeBySubDistrict,
  type Province,
  type District,
  type SubDistrict,
} from '@/app/database/thailand-address-data';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    address?: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactRelationship: string;
  };
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: ProfileEditModalProps) {
  // Parse existing address
  const parseAddress = (address: string) => {
    const parts = {
      houseNumber: '',
      road: '',
      subDistrict: '',
      district: '',
      province: '',
      postalCode: ''
    };

    if (address) {
      const match = address.match(/^(.+?)\s+ถ\.(.+?)\s+แขวง(.+?)\s+เขต(.+?)\s+(.+?)\s+(\d{5})$/);
      if (match) {
        parts.houseNumber = match[1];
        parts.road = match[2];
        parts.subDistrict = match[3];
        parts.district = match[4];
        parts.province = match[5];
        parts.postalCode = match[6];
      }
    }

    return parts;
  };

  const addressParts = parseAddress(initialData.address || '');

  const [formData, setFormData] = useState({
    ...initialData,
    houseNumber: addressParts.houseNumber,
    road: addressParts.road,
    subDistrict: addressParts.subDistrict,
    district: addressParts.district,
    province: addressParts.province || 'กรุงเทพมหานคร',
    postalCode: addressParts.postalCode,
  });

  // Dropdown options
  const [districtOptions, setDistrictOptions] = useState<{ value: string; label: string }[]>([]);
  const [subDistrictOptions, setSubDistrictOptions] = useState<{ value: string; label: string }[]>([]);

  // Load districts when province changes
  useEffect(() => {
    if (formData.province) {
      const districts = getDistrictsByProvince(formData.province);
      setDistrictOptions(districts.map(d => ({ value: d.value, label: d.label })));

      // Reset district and subdistrict if province changed
      if (!districts.find(d => d.value === formData.district)) {
        setFormData(prev => ({ ...prev, district: '', subDistrict: '', postalCode: '' }));
        setSubDistrictOptions([]);
      }
    } else {
      setDistrictOptions([]);
      setSubDistrictOptions([]);
    }
  }, [formData.province]);

  // Load sub-districts when district changes
  useEffect(() => {
    if (formData.province && formData.district) {
      const subDistricts = getSubDistrictsByDistrict(formData.province, formData.district);
      setSubDistrictOptions(subDistricts.map(sd => ({ value: sd.value, label: sd.label })));

      // Reset subdistrict if district changed
      if (!subDistricts.find(sd => sd.value === formData.subDistrict)) {
        setFormData(prev => ({ ...prev, subDistrict: '', postalCode: '' }));
      }
    } else {
      setSubDistrictOptions([]);
    }
  }, [formData.province, formData.district]);

  // Auto-fill postal code when sub-district changes
  useEffect(() => {
    if (formData.province && formData.district && formData.subDistrict) {
      const postalCode = getPostalCodeBySubDistrict(formData.province, formData.district, formData.subDistrict);
      if (postalCode) {
        setFormData(prev => ({ ...prev, postalCode }));
      }
    }
  }, [formData.province, formData.district, formData.subDistrict]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Combine address parts
    const fullAddress = `${formData.houseNumber} ถ.${formData.road} แขวง${formData.subDistrict} เขต${formData.district} ${formData.province} ${formData.postalCode}`;

    const dataToSave = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      address: fullAddress,
      emergencyContactName: formData.emergencyContactName,
      emergencyContactPhone: formData.emergencyContactPhone,
      emergencyContactRelationship: formData.emergencyContactRelationship,
    };

    onSave(dataToSave);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const provinceOptions = getProvinces().map(p => ({ value: p.value, label: p.label }));

  // Custom styles for react-select
  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      borderColor: state.isFocused ? '#A21D21' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(162, 29, 33, 0.2)' : 'none',
      '&:hover': {
        borderColor: '#A21D21',
      },
      minHeight: '38px',
      backgroundColor: 'white',
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? '#A21D21' : state.isFocused ? '#f3f4f6' : 'white',
      color: state.isSelected ? 'white' : '#111827',
      '&:hover': {
        backgroundColor: state.isSelected ? '#A21D21' : '#f3f4f6',
      },
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#A21D21] to-[#7A1818] px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">แก้ไขข้อมูลส่วนตัว</h3>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6">
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {/* Personal Information */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">ข้อมูลส่วนตัว</h4>
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ชื่อ-นามสกุล <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      อีเมล <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      placeholder="081-234-5678"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  {/* Date of Birth & Gender */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        วันเกิด
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        เพศ
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="">เลือกเพศ</option>
                        <option value="ชาย">ชาย</option>
                        <option value="หญิง">หญิง</option>
                        <option value="ไม่ระบุ">ไม่ระบุ</option>
                      </select>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="pt-2">
                    <label className="block text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">
                      ที่อยู่
                    </label>

                    {/* House Number & Road */}
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          บ้านเลขที่
                        </label>
                        <input
                          type="text"
                          name="houseNumber"
                          value={formData.houseNumber}
                          onChange={handleChange}
                          placeholder="123/45"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          ถนน
                        </label>
                        <input
                          type="text"
                          name="road"
                          value={formData.road}
                          onChange={handleChange}
                          placeholder="สุขุมวิท"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                        />
                      </div>
                    </div>

                    {/* Province - Searchable */}
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        จังหวัด <span className="text-red-500">*</span>
                      </label>
                      <Select
                        options={provinceOptions}
                        value={provinceOptions.find(option => option.value === formData.province)}
                        onChange={(option) => setFormData({ ...formData, province: option?.value || '' })}
                        placeholder="ค้นหาจังหวัด..."
                        isClearable
                        isSearchable
                        styles={customSelectStyles}
                        noOptionsMessage={() => 'ไม่พบข้อมูล'}
                        className="text-sm"
                      />
                    </div>

                    {/* District - Searchable (Locked by Province) */}
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        เขต/อำเภอ <span className="text-red-500">*</span>
                      </label>
                      <Select
                        options={districtOptions}
                        value={districtOptions.find(option => option.value === formData.district)}
                        onChange={(option) => setFormData({ ...formData, district: option?.value || '' })}
                        placeholder={formData.province ? "ค้นหาเขต/อำเภอ..." : "กรุณาเลือกจังหวัดก่อน"}
                        isClearable
                        isSearchable
                        isDisabled={!formData.province}
                        styles={customSelectStyles}
                        noOptionsMessage={() => 'ไม่พบข้อมูล'}
                        className="text-sm"
                      />
                    </div>

                    {/* Sub-District - Searchable (Locked by District) */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          แขวง/ตำบล <span className="text-red-500">*</span>
                        </label>
                        <Select
                          options={subDistrictOptions}
                          value={subDistrictOptions.find(option => option.value === formData.subDistrict)}
                          onChange={(option) => setFormData({ ...formData, subDistrict: option?.value || '' })}
                          placeholder={formData.district ? "ค้นหาแขวง/ตำบล..." : "กรุณาเลือกเขตก่อน"}
                          isClearable
                          isSearchable
                          isDisabled={!formData.district}
                          styles={customSelectStyles}
                          noOptionsMessage={() => 'ไม่พบข้อมูล'}
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          รหัสไปรษณีย์ <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          pattern="[0-9]{5}"
                          placeholder="10110"
                          maxLength={5}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm cursor-not-allowed"
                          title="รหัสไปรษณีย์จะถูกกรอกอัตโนมัติเมื่อเลือกแขวง/ตำบล"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">ผู้ติดต่อฉุกเฉิน</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ชื่อผู้ติดต่อ
                    </label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      เบอร์โทรศัพท์
                    </label>
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={handleChange}
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      placeholder="082-345-6789"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ความสัมพันธ์
                    </label>
                    <select
                      name="emergencyContactRelationship"
                      value={formData.emergencyContactRelationship}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#A21D21] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="">เลือกความสัมพันธ์</option>
                      <option value="พ่อ">พ่อ</option>
                      <option value="แม่">แม่</option>
                      <option value="สามี">สามี</option>
                      <option value="ภรรยา">ภรรยา</option>
                      <option value="พี่">พี่</option>
                      <option value="น้อง">น้อง</option>
                      <option value="ลูก">ลูก</option>
                      <option value="เพื่อน">เพื่อน</option>
                      <option value="อื่นๆ">อื่นๆ</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#A21D21] text-white rounded-lg hover:bg-[#8A1919] transition-colors font-semibold"
              >
                บันทึกการเปลี่ยนแปลง
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
