import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { connectDB } from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

/* ------------------ CORS (MUST BE FIRST) ------------------ */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://qnpeetron.com",
    "https://admin.qnpeetron.com",
    "https://quantumnestpeetron.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Handle preflight
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

/* ------------------ BODY PARSER ------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* ------------------ RATE LIMITER (AFTER CORS) ------------------ */
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,   // login requires multiple attempts
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

/* ------------------ DATABASE ------------------ */
connectDB();

/* ------------------ ROUTES ------------------ */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/schedule", scheduleRoutes);

/* ------------------ SERVER ------------------ */
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
