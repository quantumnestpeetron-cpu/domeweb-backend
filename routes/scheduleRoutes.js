import express from "express";
import { submitSchedule } from "../controllers/scheduleController.js";

const router = express.Router();

router.post("/", submitSchedule);

export default router;
