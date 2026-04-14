import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    public_id: String,
    isActive: { type: Boolean, default: true }, // ✅ ADD THIS
  },
  { timestamps: true }
);

export default mongoose.model("Banner",bannerSchema);