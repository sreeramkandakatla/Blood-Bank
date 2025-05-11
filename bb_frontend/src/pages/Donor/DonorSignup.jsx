import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DonorSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bloodGroup: '',
    phone: '',
    address: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent non-numeric input for phone
    if (name === 'phone' && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, password, bloodGroup, phone, address } = formData;

    if (!name || !email || !password || !bloodGroup || !phone || !address) {
      setErrorMessage('All fields are required');
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      setErrorMessage('Phone number must be exactly 10 digits');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Invalid email format');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/api/donors/signup`, formData);

      const token = response.data.token;
      localStorage.setItem('donorToken', token);

      setShowSuccessModal(true);
      setTimeout(() => navigate('/donor/login'), 2000);
    } catch (error) {
      const msg = error.response?.data?.message || 'Signup failed';
      setErrorMessage(msg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg relative">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Donor Signup</h2>

      {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Blood Group Dropdown */}
        <div className="mb-4">
          <label htmlFor="bloodGroup" className="block mb-1 font-medium text-gray-700">Blood Group</label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength="10"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {/* Address */}
        <div className="mb-6">
          <label htmlFor="address" className="block mb-1 font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="text-green-600 text-4xl mb-4 animate-bounce">✔</div>
            <p className="text-lg font-semibold">Signup Successful!</p>
            <p className="text-sm text-gray-600">Redirecting to login...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorSignup;
