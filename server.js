// import dotenv from "dotenv";
// import multer from "multer";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import rateLimit from "express-rate-limit";

// import { connectDB } from "./config/db.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import scheduleRoutes from "./routes/scheduleRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import bannerRoutes from "./routes/bannerRoutes.js";

// const app = express();

// /* ------------------ CORS (MUST BE FIRST) ------------------ */
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:3000",
//     "https://qnpeetron.com",
//     "https://admin.qnpeetron.com",
//     "https://quantumnestpeetron.onrender.com"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

// // Handle preflight
// app.use((req, res, next) => {
//   if (req.method === "OPTIONS") {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });

// /* ------------------ BODY PARSER ------------------ */
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

// /* ------------------ RATE LIMITER (AFTER CORS) ------------------ */
// const limiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 50,   // login requires multiple attempts
//   standardHeaders: true,
//   legacyHeaders: false,
// });
// app.use(limiter);

// /* ------------------ DATABASE ------------------ */
// connectDB();

// /* ------------------ ROUTES ------------------ */
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/schedule", scheduleRoutes);
// app.use("/api/banner", bannerRoutes);

// app.use((err, req, res, next) => {
//   console.error("🔥 GLOBAL ERROR:", err); // FULL ERROR PRINT

//   res.status(500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// });


// /* ------------------ SERVER ------------------ */
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`🚀 Server running on port ${port}`);
// });


// import dotenv from "dotenv";
// import multer from "multer";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import rateLimit from "express-rate-limit";

// import { connectDB } from "./config/db.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import scheduleRoutes from "./routes/scheduleRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import bannerRoutes from "./routes/bannerRoutes.js";
// import resellerRoutes from "./routes/resellerRoutes.js";


// const app = express();

// /* ------------------ CORS (MUST BE FIRST) ------------------ */
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:3000",
//     "https://qnpeetron.com",
//     "https://admin.qnpeetron.com",
//     "https://quantumnestpeetron.onrender.com"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

// // Handle preflight
// app.use((req, res, next) => {
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

// /* ------------------ BODY PARSER ------------------ */
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

// /* ------------------ RATE LIMITER ------------------ */
// const limiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 50,
//   standardHeaders: true,
//   legacyHeaders: false,
// });
// app.use(limiter);

// /* ------------------ DATABASE ------------------ */
// connectDB();

// /* ------------------ ROUTES ------------------ */
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/schedule", scheduleRoutes);
// app.use("/api/banner", bannerRoutes);
// app.use("/api/reseller", resellerRoutes);


// /* ------------------ GLOBAL ERROR HANDLER (FIXED) ------------------ */
// app.use((err, req, res, next) => {
//   console.error("🔥 GLOBAL ERROR:", err);

//   // ✅ HANDLE MULTER FILE SIZE ERROR
//   if (err instanceof multer.MulterError) {
//     if (err.code === "LIMIT_FILE_SIZE") {
//       return res.status(400).json({
//         success: false,
//         message: "File too large (Max 10MB allowed)",
//       });
//     }
//   }

//   // ✅ HANDLE OTHER ERRORS
//   res.status(500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// });

// /* ------------------ SERVER ------------------ */
// const port = process.env.PORT || 5000;
// app.listen(port,"0.0.0.0", () => {
//   console.log(`🚀 Server running on port ${port}`);
// });


import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { connectDB } from "./config/db.js";

import contactRoutes from "./routes/contactRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import resellerRoutes from "./routes/resellerRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import adminJobRoutes from "./routes/adminJobRoutes.js";

const app = express();

/* ------------------ DEBUG ENV ------------------ */
// console.log("ENV CHECK:", process.env.MONGO_URI);

console.log("ENV CHECK:", {
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS ? "OK" : "MISSING",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
});
/* ------------------ CORS ------------------ */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

/* ------------------ BODY ------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ------------------ RATE LIMIT ------------------ */
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});
app.use(limiter);

/* ------------------ CONNECT DB ------------------ */
connectDB();

/* ------------------ ROUTES ------------------ */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/reseller", resellerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/admin/jobs", adminJobRoutes);


/* ------------------ ERROR HANDLER ------------------ */
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ------------------ SERVER ------------------ */
const port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${port}`);
});