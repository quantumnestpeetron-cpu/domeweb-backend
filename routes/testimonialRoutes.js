// import express from "express";
// import Testimonial from "../models/Testimonial.js";

// const router = express.Router();

// /* =========================
//    GET ALL TESTIMONIALS
// ========================= */
// router.get("/", async (req, res) => {
//   try {
//     const testimonials = await Testimonial.find().sort({
//       createdAt: -1,
//     });

//     res.json(testimonials);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// /* =========================
//    ADD TESTIMONIAL
// ========================= */
// router.post("/", async (req, res) => {
//   try {
//     const { name, role, image, text, rating } = req.body;

//     const testimonial = new Testimonial({
//       name,
//       role,
//       image,
//       text,
//       rating,
//     });

//     await testimonial.save();

//     res.status(201).json({
//       success: true,
//       message: "Review submitted successfully",
//       testimonial,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;


// routes/testimonialRoutes.js

// import express from "express";
// import Testimonial from "../models/Testimonial.js";

// const router = express.Router();

// /* =========================
//    GET TESTIMONIALS
// ========================= */
// router.get("/", async (req, res) => {
//   try {
//     const testimonials = await Testimonial.find().sort({
//       createdAt: -1,
//     });

//     res.json(testimonials);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// /* =========================
//    ADD TESTIMONIAL
// ========================= */
// router.post("/", async (req, res) => {
//   try {
//     const { name, role, text, img, rating } = req.body;

//     const testimonial = new Testimonial({
//       name,
//       role,
//       text,
//       img,
//       rating,
//     });

//     await testimonial.save();

//     res.status(201).json({
//       success: true,
//       message: "Review Added Successfully",
//       testimonial,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// export default router;

import express from "express";
import rateLimit from "express-rate-limit";
import Testimonial from "../models/Testimonial.js";

const router = express.Router();

/* =========================
   RATE LIMITING
========================= */

const testimonialLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 reviews
  message: {
    success: false,
    message:
      "Too many reviews submitted. Please try again later.",
  },
});

/* =========================
   GET TESTIMONIALS
========================= */

router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({
      createdAt: -1,
    });

    res.json(testimonials);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   ADD TESTIMONIAL
========================= */

router.post(
  "/",
  testimonialLimiter,
  async (req, res) => {
    try {
      const {
        name,
        role,
        text,
        img,
        rating,
      } = req.body;

      // VALIDATION
      if (!name || !role || !text) {
        return res.status(400).json({
          success: false,
          message: "All fields required",
        });
      }

      // SAFE RATING
      const safeRating =
        Number(rating) >= 1 &&
        Number(rating) <= 5
          ? Number(rating)
          : 5;

      // CREATE REVIEW
      const testimonial = new Testimonial({
        name: name.trim(),
        role: role.trim(),
        text: text.trim(),
        img:
          img?.trim() ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        rating: safeRating,
      });

      await testimonial.save();

      res.status(201).json({
        success: true,
        message: "Review Added Successfully",
        testimonial,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

export default router;