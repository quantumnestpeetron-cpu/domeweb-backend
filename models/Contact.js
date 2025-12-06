import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  company: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Contact", contactSchema);
