// server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";

const app = express();

// Connect to database
connectDB();

// Rate limiter (10 requests per minute per IP)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { success: false, error: "Too many requests. Try again later." },
});

// Middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(limiter);

// CORS configuration
// Allow requests from localhost (dev) and your Render backend URL
const allowedOrigins = [
  "http://localhost:3000", 
  "https://quantumnestpeetron.onrender.com"
];
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/schedule", scheduleRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT} or ${process.env.PORT} on Render`);
});
