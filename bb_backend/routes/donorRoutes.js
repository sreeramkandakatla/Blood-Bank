// routes/donorRoutes.js

import express from 'express';
import { signupDonor, loginDonor } from '../controllers/donorController.js'; // Include loginDonor too

const router = express.Router();

// POST route for Donor Signup
router.post('/signup', signupDonor);

// POST route for Donor Login
router.post('/login', loginDonor);  // <-- New route for login

export default router;
