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
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
  },

  bloodGroup: {
    type: String,
    required: [true, 'Blood group is required'],
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: 'Invalid blood group',
    },
  },

  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'],
  },

  address: {
    type: String,
    required: [true, 'Address is required'],
  },
}, {
  timestamps: true,
});

const Donor = mongoose.model('Donor', donorSchema);

export default Donor;
