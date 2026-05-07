// import mongoose from "mongoose";

// const jobApplicationSchema = new mongoose.Schema(
//   {
//     type: {
//       type: String,
//       enum: ["job", "hire"],
//       required: true,
//     },

//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       lowercase: true,
//     },

//     phone: {
//       type: String,
//       required: true,
//     },
//     jobField: {
//       type: String,
//       required: true,
//     },
//     resumeUrl: {
//       type: String, // Cloudinary URL
//     },
//   },
//   { timestamps: true },
// );

// export default mongoose.model("JobApplication", jobApplicationSchema);


import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["job", "hire"],
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    jobField: {
      type: String,
      required: true,
    },

    resumeUrl: {
      type: String,
    },

    // ✅ ADD THIS
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // ✅ ADD THIS
    adminNotes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "JobApplication",
  jobApplicationSchema
);