import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone:{type:String,required: true},
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Schedule", scheduleSchema);
