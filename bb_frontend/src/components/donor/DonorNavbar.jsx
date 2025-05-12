import React from 'react';
import { useNavigate } from 'react-router-dom';

const DonorNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('donorToken');
    navigate('/');
  };

  return (
    <nav className="bg-red-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/donor/dashboard')}>
        Blood Bank Dashboard
      </h1>
      <button
        onClick={handleLogout}
        className="bg-white text-red-600 px-4 py-2 rounded hover:bg-red-100 font-medium"
      >
        Logout
      </button>
    </nav>
  );
};

export default DonorNavbar;
