import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Home() {
  const navigate = useNavigate(); // Initialize navigate

  const handleDonorClick = () => {
    navigate('/donor'); // Navigate to the Donor page
  };

  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold text-red-700 mb-6 text-center">
        Welcome to the Blood Bank Management System
      </h1>
      <p className="text-lg text-red-600 max-w-2xl text-center">
        Donate blood, save lives! Our platform connects donors with hospitals and patients in need.
        Join us today and become a hero in someone's life. Your one pint of blood can save up to three lives.
      </p>
      <button
        onClick={handleDonorClick} // Add onClick handler
        className="mt-8 px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300"
      >
        Become a Donor
      </button>
    </div>
  );
}

export default Home;
