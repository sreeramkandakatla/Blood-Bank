import React from 'react';
import { Link } from 'react-router-dom';

const DonorEntry = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-10 rounded-lg shadow-md text-center space-y-6">
        <h2 className="text-3xl font-bold text-red-600">Welcome Donor</h2>
        <p className="text-gray-600">Please choose an option to continue</p>
        <div className="flex justify-center space-x-6">
          <Link
            to="/donor/login"
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Login
          </Link>
          <Link
            to="/donor/signup"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonorEntry;
