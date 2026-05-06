// export default upload;

// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../utils/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const ext = file.originalname.split(".").pop().toLowerCase();

//     let folder = "quantumnest-banners";
//     let resource_type = "image";

//     // ✅ PDF / DOC files
//     if (["pdf", "doc", "docx"].includes(ext)) {
//       folder = "quantumnest-resumes";
//       resource_type = "raw"; // 🔥 VERY IMPORTANT
//     }

//     return {
//       folder,
//       resource_type,
//       public_id: Date.now() + "-" + file.originalname,
//       use_filename: true,
//       unique_filename: false,
//     };
//   },
// });

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024,
//   },

//   fileFilter: (req, file, cb) => {
//     const allowedTypes = [
//       "image/jpeg",
//       "image/png",
//       "image/jpg",
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ];

//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only images and resume files allowed"));
//     }
//   },
// });

// export default upload;


import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = file.originalname.split(".").pop().toLowerCase();

    // ================= RESUME FILES =================
    if (["pdf", "doc", "docx"].includes(ext)) {
      return {
        folder: "quantumnest-resumes",
        resource_type: "raw", // ✅ FIX (important)
        public_id: Date.now() + "-" + file.originalname,
      };
    }

    // ================= IMAGE FILES =================
    return {
      folder: "quantumnest-banners",
      resource_type: "image",
      public_id: Date.now() + "-" + file.originalname,
    };
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      // images
      "image/jpeg",
      "image/png",
      "image/jpg",

      // resume files
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image & resume files allowed"));
    }
  },
});

export default upload;