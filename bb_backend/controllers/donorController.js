import Donor from '../models/donorModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Donor Signup
export const signupDonor = async (req, res) => {
  const { name, email, password, bloodGroup, phone, address } = req.body;

  // Basic field check
  if (!name || !email || !password || !bloodGroup || !phone || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Additional Validations
  const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ message: 'Phone number must be exactly 10 digits' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!validBloodGroups.includes(bloodGroup)) {
    return res.status(400).json({ message: 'Invalid blood group' });
  }

  try {
    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
      return res.status(400).json({ message: 'Donor already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const donor = new Donor({
      name,
      email,
      password: hashedPassword,
      bloodGroup,
      phone,
      address,
    });

    await donor.save();

    const token = jwt.sign({ donorId: donor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Donor created successfully', token });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Donor Login
export const loginDonor = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const donor = await Donor.findOne({ email });
    if (!donor) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ donorId: donor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      donor: {
        id: donor._id,
        name: donor.name,
        email: donor.email,
        bloodGroup: donor.bloodGroup,
        phone: donor.phone,
        address: donor.address,
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
