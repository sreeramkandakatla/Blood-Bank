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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      const response = await axios.post(`${backendUrl}/api/donors/signup`, formData);

      const token = response.data.token;
      localStorage.setItem('donorToken', token);

      // Redirect to login page after successful signup
      navigate('/donor/login');
    } catch (error) {
      const msg = error.response?.data?.message || 'Signup failed';
      setErrorMessage(msg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Donor Signup</h2>

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        {['name', 'email', 'password', 'bloodGroup', 'phone', 'address'].map((field) => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block mb-1 capitalize font-medium text-gray-700">
              {field === 'bloodGroup' ? 'Blood Group' : field}
            </label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default DonorSignup;
