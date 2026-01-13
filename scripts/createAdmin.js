import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();   // 🔥 THIS loads MONGO_URI

const create = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await Admin.findOne({ email: "admin@quantumnestpeetron.com" });
    if (existing) {
      console.log("❌ Admin already exists");
      process.exit();
    }

    const hash = await bcrypt.hash("Adminravi@123", 10);

    await Admin.create({
      email: "admin@quantumnestpeetron.com",
      password: hash
    });

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};

create();
