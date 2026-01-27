'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileInfo from '@/components/profile/ProfileInfo';
import ProfileStats from '@/components/profile/ProfileStats';
import ProfileActivity from '@/components/profile/ProfileActivity';
import ProfileCertificates from '@/components/profile/ProfileCertificates';
import ProfileEditModal from '@/components/profile/ProfileEditModal';

// Import from centralized database
import {
  getCurrentUser,
  getUserStats,
  getRecentActivities,
  getCertificatesByUserId,
} from '@/app/database/mockData';

export default function ProfilePage() {
  // Load data from centralized database
  const initialUser = getCurrentUser();
  const stats = getUserStats(initialUser.id);
  const activities = getRecentActivities(5);
  const certificates = getCertificatesByUserId(initialUser.id);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    ...initialUser,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop',
  });

  const handleSaveProfile = (data: any) => {
    setUserData({
      ...userData,
      name: data.name || userData.name,
      email: data.email || userData.email,
      phone: data.phone || userData.phone,
      dateOfBirth: data.dateOfBirth || userData.dateOfBirth,
      gender: data.gender || userData.gender,
      address: data.address || userData.address,
      emergencyContact: {
        name: data.emergencyContactName || userData.emergencyContact?.name,
        phone: data.emergencyContactPhone || userData.emergencyContact?.phone,
        relationship: data.emergencyContactRelationship || userData.emergencyContact?.relationship,
      },
    });
    // In real app: API call to save data
    alert('บันทึกข้อมูลเรียบร้อยแล้ว');
  };

  return (
    <MainLayout userName={userData.name} userRole={userData.role as any}>
      <div className="pt-4 space-y-4">
        {/* Profile Header */}
        <ProfileHeader
          name={userData.name}
          email={userData.email}
          role={userData.roleDisplay}
          employeeId={userData.employeeId}
          department={userData.department}
          position={userData.position}
          avatar={userData.avatar}
          coverImage={userData.coverImage}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Personal Info */}
            <ProfileInfo
              email={userData.email}
              phone={userData.phone}
              dateOfBirth={userData.dateOfBirth}
              gender={userData.gender}
              address={userData.address}
              emergencyContact={userData.emergencyContact}
              joinDate={userData.joinDate}
              employeeType={userData.employeeType}
              onEdit={() => setIsEditModalOpen(true)}
            />

            {/* Recent Activity */}
            <ProfileActivity activities={activities} />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Stats */}
            <ProfileStats stats={stats} />

            {/* Certificates */}
            <ProfileCertificates certificates={certificates} userRole={userData.role} />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
        initialData={{
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          dateOfBirth: userData.dateOfBirth,
          gender: userData.gender,
          address: userData.address,
          emergencyContactName: userData.emergencyContact.name,
          emergencyContactPhone: userData.emergencyContact.phone,
          emergencyContactRelationship: userData.emergencyContact.relationship,
        }}
      />
    </MainLayout>
  );
}
