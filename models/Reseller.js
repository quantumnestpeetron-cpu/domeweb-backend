// import mongoose from "mongoose";
// import { trim } from "validator";

// const resellerSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true, // ✅ better for login consistency
//       trim: true,
//     },

//     phone: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },

//     role: {
//       type: String,
//       default: "reseller",
//     },

//     companyName: String,
//     partnerCode: String,

//     target: {
//       type: Number,
//       default: 0,
//     },

//     totalSales: {
//       type: Number,
//       default: 0,
//     },

//     softwarePartner: {
//       type: String,
//       enum: ["Tally", "Busy", "Marg", "Vyapar"],
//     },

//     notes: String,

//     /* =========================
//      🔐 OTP SYSTEM FIELDS
//   ========================= */

//     otp: {
//       type: String,
//       default: null,
//     },

//     otpExpiry: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true },
// );

// export default mongoose.model("Reseller", resellerSchema);


import mongoose from "mongoose";

const resellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "reseller"
  },

  companyName: String,
  partnerCode: String,

  softwarePartner: {
    type: String,
    enum: ["Tally", "Busy", "Marg", "Vyapar"]
  },

  notes: String,

  /* SALES */
  sales: {
    tally: { type: Number, default: 0 },
    busy: { type: Number, default: 0 },
    marg: { type: Number, default: 0 },
    vyapar: { type: Number, default: 0 }
  },

  /* OTP */
  otp: String,
  otpExpiry: Date

}, { timestamps: true });

export default mongoose.model("Reseller", resellerSchema);