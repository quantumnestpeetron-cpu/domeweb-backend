import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    // ✅ Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid login",
      });
    }

    // ✅ Check password
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid login",
      });
    }

    // ❗ IMPORTANT FIX
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET missing in .env");
    }

    // ✅ Create token (FIXED)
    const token = jwt.sign(
      {
        id: admin._id,
        role: "admin", // ✅ REQUIRED
      },
      process.env.JWT_SECRET, // ✅ USE SAME SECRET
      { expiresIn: "2h" }
    );

    res.json({
      success: true,
      token,
    });

  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;