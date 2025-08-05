import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import astrologerRoute from './Routes/astrologer.js';
import reviewRoute from './Routes/review.js';
import bookingRoute from './Routes/booking.js';
import muhuratRoute from './Routes/muhurat.js';
import contactRoutes from './Routes/contactRoutes.js';
import adminRoutes from "./Routes/adminRoutes.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: [process.env.CLIENT_URL, "http://localhost:3000", "http://localhost:5173"],
  credentials: true
}));



app.get('/', (req, res) => {
  res.send('API is running! Version 1.0');
});

app.get('/test', (req, res) => {
  res.send('Server is working');
});

// Database connection
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is not defined!');
      process.exit(1); // Exit if MONGO_URI is not provided
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is connected.");
  } catch (err) {
    console.log("MongoDB connection failed:", err.message);
    process.exit(1); // Exit if DB connection fails
  }
};

console.log("Mongo URI:", process.env.MONGO_URI);

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use('/api/proxy', async (req, res) => {
    try {
      const { url } = req.query;
      if (!url) return res.status(400).json({ error: 'Missing URL parameter' });
      
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Proxy error' });
    }
  });

// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/astrologers', astrologerRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/bookings', bookingRoute);
app.use('/api/v1/muhurat', muhuratRoute);
app.use(express.json());
app.use('/api', contactRoutes);
app.use("/api/v1/admin", adminRoutes);



// 404 error handling (If no matching route)
app.use((req, res, next) => {
  res.status(404).send({ error: "Route not found" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  connectDB();
  console.log('Server is running on port ' + port);
});
