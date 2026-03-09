import express from "express";
import {
  getAllContacts,
  deleteContact,
  getAllSchedules,
  deleteSchedule
} from "../controllers/adminController.js";

import { adminAuth } from "../middleware/adminAuth.js"; 

const router = express.Router();

router.get("/contact", adminAuth, getAllContacts);
router.delete("/contact/:id", adminAuth, deleteContact);

router.get("/schedule", adminAuth, getAllSchedules);
router.delete("/schedule/:id", adminAuth, deleteSchedule);




export default router;

