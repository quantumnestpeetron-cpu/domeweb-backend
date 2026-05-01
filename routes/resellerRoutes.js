import express from "express";

import {
  registerReseller,
  loginReseller,
  sendOTP,
  resetPassword,
  verifyOTP
} from "../controllers/resellerController.js";

import { protect, authorize } from "../middleware/adminAuth.js";
import Reseller from "../models/Reseller.js";

const router = express.Router();

/* =========================
   🔐 AUTH ROUTES
========================= */

// Register
router.post("/register", registerReseller);

// Login
router.post("/login", loginReseller);

// Send OTP (Forgot password)
router.post("/send-otp", sendOTP);

// Reset password
router.post("/reset-password", resetPassword);

// Verify OTP
router.post("/verify-otp", verifyOTP);

/* =========================
   👤 RESELLER ROUTES
========================= */

// Get own profile
router.get("/me", protect, authorize("reseller"), async (req, res) => {
  try {
    const user = await Reseller.findById(req.user._id)
      .select("-password -otp -otpExpiry");

    res.json({
      success: true,
      data: user,
    });

  } catch (error) {
    console.error("Fetch Reseller Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
    });
  }
});


/* =========================
   ✏️ UPDATE PROFILE (SAFE)
========================= */

router.put("/update", protect, authorize("reseller"), async (req, res) => {
  try {
    const allowedFields = [
      "phone",
      "companyName",
      "partnerCode",
      "softwarePartner",
      "notes"
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedUser = await Reseller.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true }
    ).select("-password -otp -otpExpiry");

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
});


/* =========================
   📊 UPDATE SALES (NEW)
========================= */

router.put("/sales", protect, authorize("reseller"), async (req, res) => {
  try {
    const { tally, busy, marg, vyapar } = req.body;

    const updates = {};

    if (tally !== undefined) updates["sales.tally"] = tally;
    if (busy !== undefined) updates["sales.busy"] = busy;
    if (marg !== undefined) updates["sales.marg"] = marg;
    if (vyapar !== undefined) updates["sales.vyapar"] = vyapar;

    const updatedUser = await Reseller.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true }
    );

    res.json({
      success: true,
      message: "Sales updated successfully",
      data: updatedUser.sales,
    });

  } catch (error) {
    console.error("Sales Update Error:", error);
    res.status(500).json({
      success: false,
      message: "Sales update failed",
    });
  }
});


/* =========================
   👑 ADMIN ROUTES
========================= */

// Get all resellers
router.get("/all", protect, authorize("admin"), async (req, res) => {
  try {
    const data = await Reseller.find().select("-password");

    res.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("Admin Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch resellers",
    });
  }
});


// Update reseller (admin)
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const updated = await Reseller.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Reseller updated by admin",
      data: updated,
    });

  } catch (error) {
    console.error("Admin Update Error:", error);
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
});


// Delete reseller (ONLY ADMIN)
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    await Reseller.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Reseller deleted",
    });

  } catch (error) {
    console.error("Admin Delete Error:", error);
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
});

export default router;