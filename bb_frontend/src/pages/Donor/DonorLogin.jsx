import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DonorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      const response = await axios.post(`${backendUrl}/api/donors/login`, {
        email,
        password,
      });

      // Store token
      localStorage.setItem('donorToken', response.data.token);

      // ✅ Navigate to DonorDashboard
      navigate('/donor/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-red-700 text-center">Donor Login</h2>

        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border mb-4 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border mb-4 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default DonorLogin;
