import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import donorRoutes from './routes/donorRoutes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS Configuration - Supports multiple origins (local + deployed)
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean); // filter out undefined

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// ✅ JSON parsing middleware
app.use(express.json());

// ✅ Routes
app.use('/api/donors', donorRoutes);

// ✅ Root test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
