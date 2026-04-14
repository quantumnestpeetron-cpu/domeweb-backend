import express from "express";
import upload from "../middleware/upload.js";
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../controllers/bannerController.js";

const router = express.Router();

// ✅ GET
router.get("/", getBanners);

// ✅ CREATE (Cloudinary upload)
router.post("/", upload.single("image"), createBanner);

// ✅ UPDATE
router.put("/:id", upload.single("image"), updateBanner);

// ✅ DELETE
router.delete("/:id", deleteBanner);

export default router;