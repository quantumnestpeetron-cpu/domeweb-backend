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


import Banner from "../models/Banner.js";
import cloudinary from "../utils/cloudinary.js";

// ✅ GET ALL BANNERS
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    console.log("GET ERROR:", error);
    res.status(500).json({ message: "Error fetching banners" });
  }
};

// ✅ CREATE BANNER (UPLOAD)
export const createBanner = async (req, res) => {
  try {
    console.log("📂 FILE RECEIVED:", req.file); // 🔥 DEBUG

    // ❌ if file not coming
    if (!req.file) {
      return res.status(400).json({ message: "Image required (req.file missing)" });
    }

    const banner = new Banner({
      image: req.file.path,       // ✅ Cloudinary URL
      public_id: req.file.filename, // ✅ Cloudinary ID
    });

    await banner.save();

    console.log("✅ Banner Saved:", banner);

    res.json(banner);
  } catch (error) {
    console.log("❌ CREATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE BANNER
export const updateBanner = async (req, res) => {
  try {
    console.log("📂 UPDATE FILE:", req.file);

    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // 🔥 delete old image from cloudinary
    if (req.file && banner.public_id) {
      await cloudinary.uploader.destroy(banner.public_id);
    }

    const updated = await Banner.findByIdAndUpdate(
      req.params.id,
      {
        image: req.file ? req.file.path : banner.image,
        public_id: req.file ? req.file.filename : banner.public_id,
      },
      { new: true }
    );

    console.log("✅ Banner Updated:", updated);

    res.json(updated);
  } catch (error) {
    console.log("❌ UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE BANNER
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // 🔥 delete from cloudinary
    if (banner.public_id) {
      await cloudinary.uploader.destroy(banner.public_id);
    }

    await Banner.findByIdAndDelete(req.params.id);

    console.log("🗑 Banner Deleted:", req.params.id);

    res.json({ success: true });
  } catch (error) {
    console.log("❌ DELETE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};