import express from "express";
import JobApplication from "../models/JobApplication.js";

const router = express.Router();

/* =======================================================
   GET APPLICATIONS
======================================================= */

router.get("/applications", async (req, res) => {
  try {

    let {
      page = 1,
      limit = 10,
      search = "",
      status = "all",
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    let query = {};

    // SEARCH
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },

        {
          jobField: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // FILTER
    if (status !== "all") {
      query.status = status;
    }

    const total = await JobApplication.countDocuments(
      query
    );

    const applications =
      await JobApplication.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    res.json({
      success: true,
      data: applications,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

/* =======================================================
   UPDATE STATUS
======================================================= */

router.put(
  "/applications/:id/status",
  async (req, res) => {
    try {

      const { status } = req.body;

      const updated =
        await JobApplication.findByIdAndUpdate(
          req.params.id,
          { status },
          { new: true }
        );

      res.json({
        success: true,
        data: updated,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  }
);

/* =======================================================
   SAVE NOTES
======================================================= */

router.put(
  "/applications/:id/notes",
  async (req, res) => {
    try {

      const { adminNotes } = req.body;

      const updated =
        await JobApplication.findByIdAndUpdate(
          req.params.id,
          { adminNotes },
          { new: true }
        );

      res.json({
        success: true,
        data: updated,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  }
);

/* =======================================================
   DELETE
======================================================= */

router.delete(
  "/applications/:id",
  async (req, res) => {
    try {

      await JobApplication.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  }
);

export default router;