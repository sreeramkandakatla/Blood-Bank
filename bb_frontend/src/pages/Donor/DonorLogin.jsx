import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DonorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      return false;
    }

    if (!password) {
      setError('Password is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      const response = await axios.post(`${backendUrl}/api/donors/login`, {
        email,
        password,
      });

      localStorage.setItem('donorToken', response.data.token);

      setShowSuccessModal(true);

      setTimeout(() => {
        navigate('/donor/dashboard');
      }, 2000);
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-6 relative">
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
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border mb-4 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
        >
          Login
        </button>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="text-green-600 text-4xl mb-4 animate-bounce">✔</div>
            <p className="text-lg font-semibold">Login Successful!</p>
            <p className="text-sm text-gray-600">Redirecting to dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorLogin;
