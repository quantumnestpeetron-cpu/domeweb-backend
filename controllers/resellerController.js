// // import jwt from "jsonwebtoken";
// // import Reseller from "../models/Reseller.js";
// // import bcrypt from "bcryptjs";

// // // 🔹 Register reseller
// // export const registerReseller = async (req, res) => {
// //   const { name, email, password } = req.body;

// //   const exist = await Reseller.findOne({ email });
// //   if (exist) {
// //     return res.status(400).json({ message: "Email already exists" });
// //   }

// //   const hashed = await bcrypt.hash(password, 10);

// //   const reseller = await Reseller.create({
// //     name,
// //     email,
// //     password: hashed
// //   });

// //   res.json({ success: true, reseller });
// // };

// // // 🔹 Login reseller
// // export const loginReseller = async (req, res) => {
// //   const { email, password } = req.body;

// //   const reseller = await Reseller.findOne({ email });
// //   if (!reseller) {
// //     return res.status(400).json({ message: "Invalid email" });
// //   }

// //   const isMatch = await bcrypt.compare(password, reseller.password);
// //   if (!isMatch) {
// //     return res.status(400).json({ message: "Invalid password" });
// //   }

// //   const token = jwt.sign({ id: reseller._id }, process.env.JWT_SECRET);

// //   res.json({
// //     success: true,
// //     token,
// //     user: reseller
// //   });
// // };

// // // 🔹 Reseller dashboard
// // export const getMyData = async (req, res) => {
// //   const reseller = await Reseller.findById(req.user._id).select("-password");
// //   res.json({ success: true, data: reseller });
// // };

// // // 🔹 Reseller update (own)
// // export const updateMyData = async (req, res) => {
// //   const updated = await Reseller.findByIdAndUpdate(
// //     req.user._id,
// //     req.body,
// //     { new: true }
// //   );

// //   res.json({ success: true, data: updated });
// // };

// // // 🔹 Admin get all
// // export const getAllResellers = async (req, res) => {
// //   const data = await Reseller.find().select("-password");
// //   res.json({ success: true, data });
// // };

// // // 🔹 Admin update
// // export const updateReseller = async (req, res) => {
// //   const updated = await Reseller.findByIdAndUpdate(
// //     req.params.id,
// //     req.body,
// //     { new: true }
// //   );

// //   res.json({ success: true, data: updated });
// // };

// // // 🔹 Admin delete
// // export const deleteReseller = async (req, res) => {
// //   await Reseller.findByIdAndDelete(req.params.id);
// //   res.json({ success: true, message: "Deleted" });
// // };

// import Reseller from "../models/Reseller.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// /* =========================
//    🔐 REGISTER RESELLER
// ========================= */
// export const registerReseller = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check existing user
//     const exist = await Reseller.findOne({ email });
//     if (exist) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await Reseller.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: "reseller",
//     });

//     res.json({
//       success: true,
//       message: "Registered successfully",
//       user,
//     });
//   } catch (error) {
//     console.error("Register Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error during registration",
//     });
//   }
// };

// /* =========================
//    🔐 LOGIN RESELLER
// ========================= */
// export const loginReseller = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await Reseller.findOne({ email });

//     // ❌ User not found
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // ❌ Wrong password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Incorrect password",
//       });
//     }

//     // ✅ Generate token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user,
//     });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error during login",
//     });
//   }
// };

// /* =========================
//    🔐 SEND OTP
// ========================= */
// export const sendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await Reseller.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Generate OTP (6 digit)
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.otp = otp;
//     user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min

//     await user.save();

//     // ⚠️ Replace this with email service later
//     console.log("🔑 OTP for", email, ":", otp);

//     res.json({
//       success: true,
//       message: "OTP sent successfully",
//     });
//   } catch (error) {
//     console.error("Send OTP Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while sending OTP",
//     });
//   }
// };

// /* =========================
//    🔐 RESET PASSWORD
// ========================= */
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     const user = await Reseller.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // ❌ Invalid OTP
//     if (user.otp !== otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP",
//       });
//     }

//     // ❌ Expired OTP
//     if (user.otpExpiry < Date.now()) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP expired",
//       });
//     }

//     // ✅ Update password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     user.password = hashedPassword;
//     user.otp = null;
//     user.otpExpiry = null;

//     await user.save();

//     res.json({
//       success: true,
//       message: "Password reset successful",
//     });
//   } catch (error) {
//     console.error("Reset Password Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while resetting password",
//     });
//   }
// };import Reseller from "../models/Reseller.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// /* =========================
//    🔐 REGISTER RESELLER
// ========================= */
// export const registerReseller = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check existing user
//     const exist = await Reseller.findOne({ email });
//     if (exist) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await Reseller.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: "reseller",
//     });

//     res.json({
//       success: true,
//       message: "Registered successfully",
//       user,
//     });
//   } catch (error) {
//     console.error("Register Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error during registration",
//     });
//   }
// };

// /* =========================
//    🔐 LOGIN RESELLER
// ========================= */
// export const loginReseller = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await Reseller.findOne({ email });

//     // ❌ User not found
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // ❌ Wrong password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Incorrect password",
//       });
//     }

//     // ✅ Generate token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user,
//     });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error during login",
//     });
//   }
// };

// /* =========================
//    🔐 SEND OTP
// ========================= */
// export const sendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await Reseller.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // Generate OTP (6 digit)
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.otp = otp;
//     user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min

//     await user.save();

//     // ⚠️ Replace this with email service later
//     console.log("🔑 OTP for", email, ":", otp);

//     res.json({
//       success: true,
//       message: "OTP sent successfully",
//     });
//   } catch (error) {
//     console.error("Send OTP Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while sending OTP",
//     });
//   }
// };

// /* =========================
//    🔐 RESET PASSWORD
// ========================= */
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     const user = await Reseller.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // ❌ Invalid OTP
//     if (user.otp !== otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP",
//       });
//     }

//     // ❌ Expired OTP
//     if (user.otpExpiry < Date.now()) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP expired",
//       });
//     }

//     // ✅ Update password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     user.password = hashedPassword;
//     user.otp = null;
//     user.otpExpiry = null;

//     await user.save();

//     res.json({
//       success: true,
//       message: "Password reset successful",
//     });
//   } catch (error) {
//     console.error("Reset Password Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while resetting password",
//     });
//   }
// }

// import Reseller from "../models/Reseller.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { sendEmailOTP } from "../utils/sendEmail.js";

// /* ================= REGISTER ================= */
// export const registerReseller = async (req, res) => {
//   try {
//     const { name, email,phone, password } = req.body;

//     const exist = await Reseller.findOne({ email });
//     if (exist) {
//       return res.json({ success: false, message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await Reseller.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//     });

//     res.json({
//       success: true,
//       message: "Registered successfully",
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: "Register error" });
//   }
// };

// /* ================= LOGIN ================= */
// export const loginReseller = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await Reseller.findOne({ email });

//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.json({ success: false, message: "Incorrect password" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       token,
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: "Login error" });
//   }
// };

// /* ================= SEND OTP ================= */
// export const sendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await Reseller.findOne({ email });

//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.otp = otp;
//     user.otpExpiry = Date.now() + 5 * 60 * 1000;

//     await user.save();

//     await sendEmailOTP(email, otp);

//     res.json({
//       success: true,
//       message: "OTP sent to email",
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to send OTP",
//     });
//   }
// };

// /* ================= RESET PASSWORD ================= */
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     const user = await Reseller.findOne({ email });

//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     if (user.otp !== otp) {
//       return res.json({ success: false, message: "Invalid OTP" });
//     }

//     if (user.otpExpiry < Date.now()) {
//       return res.json({ success: false, message: "OTP expired" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     user.password = hashedPassword;
//     user.otp = null;
//     user.otpExpiry = null;

//     await user.save();

//     res.json({
//       success: true,
//       message: "Password reset successful",
//     });

//   } catch (error) {
//     res.status(500).json({ success: false });
//   }
// };


// import Reseller from "../models/Reseller.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { sendEmailOTP } from "../utils/sendEmail.js";

// /* ================= REGISTER ================= */
// export const registerReseller = async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;

//     if (!name || !email || !phone || !password) {
//       return res.json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const exist = await Reseller.findOne({
//       $or: [{ email }, { phone }],
//     });

//     if (exist) {
//       return res.json({
//         success: false,
//         message: "Email or Phone already registered",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await Reseller.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//     });

//     res.json({
//       success: true,
//       message: "Registered successfully",
//     });

//   } catch (error) {
//     console.error("Register Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Register error",
//     });
//   }
// };

// /* ================= LOGIN (EMAIL OR PHONE) ================= */
// export const loginReseller = async (req, res) => {
//   try {
//     const { email, phone, password } = req.body;

//     if ((!email && !phone) || !password) {
//       return res.json({
//         success: false,
//         message: "Email/Phone and password required",
//       });
//     }

//     const user = await Reseller.findOne({
//       $or: [{ email }, { phone }],
//     });

//     if (!user) {
//       return res.json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.json({
//         success: false,
//         message: "Incorrect password",
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       token,
//     });

//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Login error",
//     });
//   }
// };

// /* ================= SEND OTP ================= */
// export const sendOTP = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.json({
//         success: false,
//         message: "Email is required",
//       });
//     }

//     const user = await Reseller.findOne({ email });

//     if (!user) {
//       return res.json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.otp = otp;
//     user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min

//     await user.save();

//     await sendEmailOTP(email, otp);

//     res.json({
//       success: true,
//       message: "OTP sent to email",
//     });

//   } catch (error) {
//     console.error("OTP Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send OTP",
//     });
//   }
// };

// /* ================= VERIFY OTP (OPTIONAL STEP) ================= */
// export const verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await Reseller.findOne({ email });

//     if (!user) {
//       return res.json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     if (user.otp !== otp) {
//       return res.json({
//         success: false,
//         message: "Invalid OTP",
//       });
//     }

//     if (user.otpExpiry < Date.now()) {
//       return res.json({
//         success: false,
//         message: "OTP expired",
//       });
//     }

//     res.json({
//       success: true,
//       message: "OTP verified",
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "OTP verification failed",
//     });
//   }
// };

// /* ================= RESET PASSWORD ================= */
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     if (!email || !otp || !newPassword) {
//       return res.json({
//         success: false,
//         message: "All fields required",
//       });
//     }

//     const user = await Reseller.findOne({ email });

//     if (!user) {
//       return res.json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     if (user.otp !== otp) {
//       return res.json({
//         success: false,
//         message: "Invalid OTP",
//       });
//     }

//     if (user.otpExpiry < Date.now()) {
//       return res.json({
//         success: false,
//         message: "OTP expired",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     user.password = hashedPassword;
//     user.otp = null;
//     user.otpExpiry = null;

//     await user.save();

//     res.json({
//       success: true,
//       message: "Password reset successful",
//     });

//   } catch (error) {
//     console.error("Reset Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Reset failed",
//     });
//   }
// };

import Reseller from "../models/Reseller.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmailOTP } from "../utils/sendEmail.js";

/* ================= REGISTER ================= */
export const registerReseller = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const exist = await Reseller.findOne({
      $or: [{ email }, { phone }],
    });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Email or Phone already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Reseller.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.json({
      success: true,
      message: "Registered successfully",
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Register error",
    });
  }
};


/* ================= LOGIN (FIXED) ================= */
export const loginReseller = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if ((!email && !phone) || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone and password required",
      });
    }

    const user = await Reseller.findOne({
      $or: [{ email }, { phone }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // ✅ FIXED TOKEN (VERY IMPORTANT)
    const token = jwt.sign(
      {
        id: user._id,
        role: "reseller", // ✅ HARDCODE ROLE (DON'T USE user.role)
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: "reseller",
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Login error",
    });
  }
};


/* ================= SEND OTP ================= */
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await Reseller.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendEmailOTP(email, otp);

    res.json({
      success: true,
      message: "OTP sent to email",
    });

  } catch (error) {
    console.error("OTP Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};


/* ================= VERIFY OTP ================= */
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await Reseller.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    res.json({
      success: true,
      message: "OTP verified",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
};


/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const user = await Reseller.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    console.error("Reset Error:", error);
    res.status(500).json({
      success: false,
      message: "Reset failed",
    });
  }
};