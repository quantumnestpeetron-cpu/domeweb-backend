// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cors from "cors";
// import { connectDB } from "./config/db.js";
// import contactRoutes from "./routes/contactRoutes.js";
// import scheduleRoutes from "./routes/scheduleRoutes.js";
// import rateLimit from "express-rate-limit";

// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 10, // limit each IP to 10 requests per minute
//   message: { success: false, error: "Too many requests. Try again later." },
// });

// const app = express();
// app.use(express.static("public"));
// app.use(cors({ origin: "http://localhost:3000", methods: "GET,POST" }))
// app.use(express.json());
// app.use(limiter);

// // connect database
// connectDB();

// // routes
// app.use("/api/contact", contactRoutes);
// app.use("/api/schedule", scheduleRoutes);

// // app.listen(process.env.PORT, () =>
// //   console.log(`🚀 Backend running at http://localhost:${process.env.PORT}`)
// // );

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { success: false, error: "Too many requests. Try again later." },
});

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS FIX
app.use(cors({
  origin: ["http://localhost:3000", "https://qnpeetron.com","https://quantumnestpeetron.onrender.com"],
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options(/.*/, cors());

// Rate limiter AFTER CORS
app.use(limiter);

connectDB();

app.use("/api/contact", contactRoutes);
app.use("/api/schedule", scheduleRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
