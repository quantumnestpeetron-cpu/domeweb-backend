// import Banner from "../models/Banner.js";
// import cloudinary from "../utils/cloudinary.js";

// // ✅ GET
// export const getBanners = async (req, res) => {
//   try {
//     const banners = await Banner.find().sort({ createdAt: -1 });
//     res.json(banners);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching banners" });
//   }
// };

// // ✅ CREATE
// export const createBanner = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Image required" });
//     }

//     const banner = new Banner({
//       image: req.file.path, // ✅ Cloudinary URL
//       public_id: req.file.filename,
//     });

//     await banner.save();

//     res.json(banner);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error uploading banner" });
//   }
// };

// // ✅ UPDATE
// export const updateBanner = async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id);

//     if (!banner) {
//       return res.status(404).json({ message: "Banner not found" });
//     }

//     // delete old image
//     if (req.file && banner.public_id) {
//       await cloudinary.uploader.destroy(banner.public_id);
//     }

//     const updated = await Banner.findByIdAndUpdate(
//       req.params.id,
//       {
//         image: req.file ? req.file.path : banner.image,
//         public_id: req.file ? req.file.filename : banner.public_id,
//       },
//       { new: true }
//     );

//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating banner" });
//   }
// };

// // ✅ DELETE
// export const deleteBanner = async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id);

//     if (!banner) {
//       return res.status(404).json({ message: "Banner not found" });
//     }

//     // delete from cloudinary
//     if (banner.public_id) {
//       await cloudinary.uploader.destroy(banner.public_id);
//     }

//     await Banner.findByIdAndDelete(req.params.id);

//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting banner" });
//   }
// };



// import Banner from "../models/Banner.js";
// import cloudinary from "../utils/cloudinary.js";

// // ✅ GET ALL BANNERS
// export const getBanners = async (req, res) => {
//   try {
//     const banners = await Banner.find().sort({ createdAt: -1 });
//     res.json(banners);
//   } catch (error) {
//     console.error("❌ GET ERROR:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ✅ CREATE BANNER
// export const createBanner = async (req, res) => {
//   try {
//      console.log("ENV CHECK:", process.env.CLOUDINARY_CLOUD_NAME); // ✅ ADD HERE
//     console.log("📂 FILE RECEIVED:", req.file);
    

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Image required",
//       });
//     }

//     const banner = new Banner({
//       image: req.file.path,
//       public_id: req.file.filename,
//     });

//     await banner.save();

//     console.log("✅ Banner Saved:", banner);

//     res.status(201).json({
//       success: true,
//       message: "Banner uploaded",
//       data: banner,
//     });
//   } catch (error) {
//     console.error("❌ CREATE ERROR FULL:", error); // 🔥 FULL ERROR
//     res.status(500).json({
//       success: false,
//       message: error.message || "Server error",
//     });
//   }
// };

// // ✅ UPDATE BANNER
// export const updateBanner = async (req, res) => {
//   try {
//     console.log("📂 UPDATE FILE:", req.file);

//     const banner = await Banner.findById(req.params.id);

//     if (!banner) {
//       return res.status(404).json({
//         success: false,
//         message: "Banner not found",
//       });
//     }

//     // delete old image
//     if (req.file && banner.public_id) {
//       await cloudinary.uploader.destroy(banner.public_id);
//     }

//     const updated = await Banner.findByIdAndUpdate(
//       req.params.id,
//       {
//         image: req.file ? req.file.path : banner.image,
//         public_id: req.file ? req.file.filename : banner.public_id,
//       },
//       { new: true }
//     );

//     console.log("✅ Banner Updated:", updated);

//     res.json({
//       success: true,
//       message: "Banner updated",
//       data: updated,
//     });
//   } catch (error) {
//     console.error("❌ UPDATE ERROR FULL:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ✅ DELETE BANNER
// export const deleteBanner = async (req, res) => {
//   try {
//     const banner = await Banner.findById(req.params.id);

//     if (!banner) {
//       return res.status(404).json({
//         success: false,
//         message: "Banner not found",
//       });
//     }

//     if (banner.public_id) {
//       await cloudinary.uploader.destroy(banner.public_id);
//     }

//     await Banner.findByIdAndDelete(req.params.id);

//     console.log("🗑 Banner Deleted:", req.params.id);

//     res.json({
//       success: true,
//       message: "Banner deleted",
//     });
//   } catch (error) {
//     console.error("❌ DELETE ERROR FULL:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


import Banner from "../models/Banner.js";
import cloudinary from "../utils/cloudinary.js";

// ✅ GET ALL BANNERS
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: banners,
    });
  } catch (error) {
    console.log("❌ GET ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Error fetching banners",
    });
  }
};

// ✅ CREATE BANNER (UPLOAD)
export const createBanner = async (req, res) => {
  try {
    console.log("📂 FILE RECEIVED:", req.file);

    // ❌ if no file OR file too large
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image required or file too large (Max 10MB)",
      });
    }

    const banner = new Banner({
      image: req.file.path,
      public_id: req.file.filename,
    });

    await banner.save();

    console.log("✅ Banner Saved:", banner);

    res.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    console.log("❌ CREATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Upload failed",
    });
  }
};

// ✅ UPDATE BANNER
export const updateBanner = async (req, res) => {
  try {
    console.log("🟡 UPDATE REQUEST ID:", req.params.id);
    console.log("📂 UPDATE FILE:", req.file);

    const imageUrl = req.file?.path;

    // ✅ Check if banner exists FIRST
    const existingBanner = await Banner.findById(req.params.id);

    if (!existingBanner) {
      console.log("❌ Banner not found");
      return res.status(404).json({ message: "Banner not found" });
    }

    // ✅ Update only (DO NOT DELETE)
    existingBanner.image = imageUrl || existingBanner.image;

    await existingBanner.save();

    console.log("✅ Banner Updated Successfully");

    res.status(200).json({
      success: true,
      data: existingBanner,
    });

  } catch (error) {
    console.error("❌ UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ DELETE BANNER
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    // 🔥 delete from cloudinary
    if (banner.public_id) {
      await cloudinary.uploader.destroy(banner.public_id);
    }

    await Banner.findByIdAndDelete(req.params.id);

    console.log("🗑 Banner Deleted:", req.params.id);

    res.json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.log("❌ DELETE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};