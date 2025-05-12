// src/services/donorService.js

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Get Donor Profile
export const getDonorProfile = async () => {
  const token = localStorage.getItem('donorToken');

  if (!token) {
    throw new Error('No donor token found. Please login again.');
  }

  try {
    const response = await fetch(`${BASE_URL}/api/donors/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch donor profile');
    }

    const data = await response.json();
    return data; // You said backend sends donor object directly
  } catch (error) {
    console.error('Error fetching donor profile:', error.message);
    throw error;
  }
};
