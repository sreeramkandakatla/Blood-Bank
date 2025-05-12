// routes/donorRoutes.js

import express from 'express';
import {
  signupDonor,
  loginDonor,
  getDonorProfile,
} from '../controllers/donorController.js';

import { protectDonor } from '../middlewares/protectDonor.js'; // ✅ fixed import

const router = express.Router();

router.post('/signup', signupDonor);
router.post('/login', loginDonor);
router.get('/profile', protectDonor, getDonorProfile); // ✅ Protected route

export default router;
