// models/Donor.js

import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Donor name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // ensures no duplicate donors
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  bloodGroup: {
    type: String,
    required: [true, 'Blood group is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  address: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // automatically adds createdAt & updatedAt
});

const Donor = mongoose.model('Donor', donorSchema);

export default Donor;
