import Contact from "../models/Contact.js";
import Schedule from "../models/Schedule.js";

// ---------- CONTACTS ----------
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to load contacts" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Delete failed" });
  }
};

// ---------- SCHEDULES ----------
export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ createdAt: -1 });
    res.json({ success: true, data: schedules });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to load schedules" });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Schedule deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Delete failed" });
  }
};
