'use client';

import React, { useState } from 'react';
import { AdminCard, AdminBadge, AdminButton, AdminInput, AdminModal } from '@/components/ui/admin';
import {
  MapPin,
  Search,
  Plus,
  MoreVertical,
  Navigation
} from 'lucide-react';

const mockLocations = [
  { id: 1, name: 'Headquarters Bangkok', address: '123 Sukhumvit Rd, Bangkok', employees: 300, type: 'HQ' },
  { id: 2, name: 'Chiang Mai Branch', address: '45 Nimman Rd, Chiang Mai', employees: 80, type: 'Branch' },
  { id: 3, name: 'Khon Kaen Hub', address: '88 Mittraphap Rd, Khon Kaen', employees: 60, type: 'Hub' },
  { id: 4, name: 'Phuket Office', address: '99 Patong, Phuket', employees: 50, type: 'Branch' },
];

export default function LocationsPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Locations</h1>
          <p className="text-gray-500 text-sm">Manage physical office locations and branches.</p>
        </div>
        <AdminButton icon={<Plus className="w-4 h-4" />} onClick={() => setModalOpen(true)}>
          Add Location
        </AdminButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {mockLocations.map((loc) => (
            <AdminCard key={loc.id} className="hover:shadow-md transition-all group">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{loc.name}</h3>
                    <p className="text-gray-500 text-sm flex items-center mb-2">
                      <Navigation className="w-3 h-3 mr-1" />
                      {loc.address}
                    </p>
                    <div className="flex gap-2">
                      <AdminBadge variant="outline">{loc.type}</AdminBadge>
                      <AdminBadge variant="success">{loc.employees} Employees</AdminBadge>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </AdminCard>
          ))}
        </div>

        <div className="lg:col-span-1">
          <AdminCard className="h-full min-h-[400px] p-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 font-medium">Map View Placeholder</p>
                <p className="text-xs text-gray-400">Google Maps Integration</p>
              </div>
            </div>
            {/* Simulated Pins */}
            <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-maroon rounded-full border-2 border-white shadow-lg transform -translate-x-1/2"></div>
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-maroon rounded-full border-2 border-white shadow-lg"></div>
            <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-maroon rounded-full border-2 border-white shadow-lg"></div>
          </AdminCard>
        </div>
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Location"
        footer={
          <>
            <AdminButton variant="ghost" onClick={() => setModalOpen(false)}>Cancel</AdminButton>
            <AdminButton onClick={() => setModalOpen(false)}>Add Location</AdminButton>
          </>
        }
      >
        <div className="space-y-4">
          <AdminInput label="Location Name" placeholder="e.g. Rayong Plant" />
          <AdminInput label="Full Address" placeholder="123 Industrial Estate..." />
          <div className="grid grid-cols-2 gap-4">
            <AdminInput label="Type" placeholder="Branch" />
            <AdminInput label="City" placeholder="Rayong" />
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
