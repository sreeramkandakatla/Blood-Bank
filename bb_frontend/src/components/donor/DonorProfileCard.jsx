// src/components/donor/DonorProfileCard.jsx

import React, { useEffect, useState } from 'react';
import { getDonorProfile } from '../../services/donorService';

const DonorProfileCard = () => {
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getDonorProfile(); // ✅ using service
        setDonor(data); // data is donor object directly
      } catch (err) {
        setError('Failed to load profile.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center py-4">Loading profile...</div>;
  if (error) return <div className="text-center py-4 text-red-600">{error}</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-red-700 text-center">Donor Profile</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {donor.name}</p>
        <p><strong>Email:</strong> {donor.email}</p>
        <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
        <p><strong>Phone:</strong> {donor.phone}</p>
        <p><strong>Address:</strong> {donor.address}</p>
      </div>
    </div>
  );
};

export default DonorProfileCard;
