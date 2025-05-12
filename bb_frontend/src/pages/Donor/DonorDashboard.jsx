// src/pages/Donor/DonorDashboard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import DonorProfileCard from '../../components/donor/DonorProfileCard';

const DonorDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('donorToken');
    navigate('/donor/login'); // Redirect to donor login page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-red-700">Donor Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Donor Profile Card */}
      <DonorProfileCard />
    </div>
  );
};

export default DonorDashboard;
