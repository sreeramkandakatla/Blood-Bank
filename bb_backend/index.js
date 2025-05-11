import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import donorRoutes from './routes/donorRoutes.js'; // ✅ Step 1: Import donor routes

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Step 2: CORS Configuration - Allow from environment-defined frontend URL
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}));

// ✅ Step 3: Middleware to handle JSON request bodies
app.use(express.json());

// ✅ Step 4: Use donor routes
app.use('/api/donors', donorRoutes);

// ✅ Temporary route to test if server is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
