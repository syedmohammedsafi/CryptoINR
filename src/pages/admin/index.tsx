import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AdminDashboard } from './Dashboard';

export function AdminPage() {
  const { user } = useAuth();

  if (!user?.email || user.email !== 'safi22052004@gmail.com') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-900/50 p-6 rounded-lg text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-gray-300">This area is restricted to admin users only.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
      <AdminDashboard />
    </div>
  );
}