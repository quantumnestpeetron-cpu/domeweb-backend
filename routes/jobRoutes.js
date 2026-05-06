// import express from "express";
// import upload from "../middleware/upload.js";
// import JobApplication from "../models/JobApplication.js";
// import { sendEmail } from "../config/email.js";
// import { sendWhatsApp } from "../config/whatsapp.js";

// const router = express.Router();

// router.post("/apply", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email, phone, type } = req.body;

//     // ✅ VALIDATION
//     if (!name || !email || !phone || !type) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields required",
//       });
//     }

//     // ================= RESUME HANDLE =================
//     let resumeUrl = "";

//     if (req.file) {
//       resumeUrl = req.file.path;

//       // ✅ FIX PDF URL ISSUE
//       if (req.file.mimetype === "application/pdf") {
//         resumeUrl = resumeUrl.replace("/image/upload/", "/raw/upload/");
//       }
//     }

//     // ================= SAVE TO DB =================
//     await JobApplication.create({
//       name,
//       email,
//       phone,
//       type,
//       resumeUrl,
//     });

//     // ================= USER EMAIL =================
//     let userEmailHtml = "";

//     if (type === "job") {
//       userEmailHtml = `
//         <h2>Hello ${name},</h2>
//         <p>Thank you for applying 🚀</p>
//         <p>Your job application has been received successfully.</p>
//         <p>Our team is reviewing your resume and will contact you shortly.</p>
//         <br/>
//         <p><b>Stay connected with us!</b></p>
//       `;
//     } else {
//       userEmailHtml = `
//         <h2>Hello ${name},</h2>
//         <p>Thank you for your hiring request 💼</p>
//         <p>Your requirement has been received successfully.</p>
//         <p>Our team will connect you with suitable candidates soon.</p>
//       `;
//     }

//     await sendEmail(email, "Request Received ✅", userEmailHtml);

//     // ================= ADMIN EMAIL =================
//     await sendEmail(
//       process.env.ADMIN_EMAIL,
//       `🔥 New ${type.toUpperCase()} Request`,
//       `
//       <h2>New ${type} request received</h2>
//       <p><b>Name:</b> ${name}</p>
//       <p><b>Email:</b> ${email}</p>
//       <p><b>Phone:</b> ${phone}</p>
//       <p><b>Type:</b> ${type}</p>
//       ${
//         resumeUrl
//           ? `<p><b>Resume:</b> <a href="${resumeUrl}" target="_blank">View Resume</a></p>`
//           : ""
//       }
//       `
//     );

//     // ================= WHATSAPP USER =================
//     const safePhone = phone ? phone.toString() : "";

//     const userWhatsApp =
//       type === "job"
//         ? `Hi ${name}, your job application is received. Our team will contact you soon.`
//         : `Hi ${name}, your hiring request is received. Our team will contact you soon.`;

//     await sendWhatsApp(safePhone, userWhatsApp);

//     // ================= WHATSAPP ADMIN =================
//     if (process.env.ADMIN_PHONE) {
//       await sendWhatsApp(
//         process.env.ADMIN_PHONE,
//         `🔥 New ${type} request\nName: ${name}\nPhone: ${phone}`
//       );
//     }

//     // ================= RESPONSE =================
//     res.json({
//       success: true,
//       message: "Application submitted successfully",
//     });

//   } catch (error) {
//     console.error("JOB APPLY ERROR:", error);

//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// });

// export default router;

// import express from "express";
// import upload from "../middleware/upload.js";
// import JobApplication from "../models/JobApplication.js";
// import { sendEmail } from "../config/email.js";
// import { sendWhatsApp } from "../config/whatsapp.js";

// const router = express.Router();

// router.post("/apply", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email, phone, type,jobField } = req.body;

//     // ================= VALIDATION =================
//     if (!name || !email || !phone || !type || !jobField) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields required",
//       });
//     }

//     // ================= RESUME URL (FINAL FIX) =================
//     let resumeUrl = "";

//     if (req.file) {
//       // ✅ IMPORTANT: DO NOT MODIFY THIS URL
//       resumeUrl = req.file.path;
//     }

//     // ================= SAVE TO DB =================
//     await JobApplication.create({
//       name,
//       email,
//       phone,
//       type,
//       jobField,
//       resumeUrl,
//     });

//     // ================= USER EMAIL =================
//     let userEmailHtml = "";

//     if (type === "job") {
//       userEmailHtml = `
//         <h2>Hello ${name},</h2>
//         <p>✅ Your job application has been received.</p>
//         <p>Our team is reviewing your resume and will contact you shortly.</p>
//         <br/>
//         <p>Thank you for applying 🚀</p>
//       `;
//     } else {
//       userEmailHtml = `
//         <h2>Hello ${name},</h2>
//         <p>✅ Your hiring request has been received.</p>
//         <p>We will connect you with suitable candidates soon.</p>
//         <br/>
//         <p>Thank you 💼</p>
//       `;
//     }

//     await sendEmail(email, "Request Received ✅", userEmailHtml);

//     // ================= ADMIN EMAIL =================
//     await sendEmail(
//       process.env.ADMIN_EMAIL,
//       `🔥 New ${type.toUpperCase()} Request`,
//       `
//       <h2>New ${type} request</h2>

//       <p><b>Name:</b> ${name}</p>
//       <p><b>Email:</b> ${email}</p>
//       <p><b>Phone:</b> ${phone}</p>
//       <p><b>Job Field:</b> ${jobField}</p>
//       <p><b>Type:</b> ${type}</p>

//       ${
//         resumeUrl
//           ? `<p><b>Resume:</b> 
//                <a href="${resumeUrl}" target="_blank" style="color:blue;">
//                  👉 View Resume
//                </a>
//              </p>`
//           : "<p><b>Resume:</b> Not uploaded</p>"
//       }
//       `
//     );

//     // ================= WHATSAPP =================
//     try {
//       if (phone) {
//         const userMsg =
//           type === "job"
//             ? `Hi ${name}, your job application is received. Our team will contact you soon.`
//             : `Hi ${name}, your hiring request is received. Our team will contact you soon.`;

//         await sendWhatsApp(phone, userMsg);
//       }

//       if (process.env.ADMIN_PHONE) {
//         await sendWhatsApp(
//           process.env.ADMIN_PHONE,
//           `🔥 New ${type} request\nName: ${name}\nPhone: ${phone}`
//         );
//       }
//     } catch (err) {
//       console.log("WhatsApp error (ignored):", err.message);
//     }

//     // ================= RESPONSE =================
//     res.json({
//       success: true,
//       message: "Application submitted successfully",
//     });

//   } catch (error) {
//     console.error("JOB APPLY ERROR:", error);

//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// });

// export default router;


import express from "express";
import upload from "../middleware/upload.js";
import JobApplication from "../models/JobApplication.js";
import { sendEmail } from "../config/email.js";
import { sendWhatsApp } from "../config/whatsapp.js";

const router = express.Router();

router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, phone, type, jobField } = req.body;

    // ================= VALIDATION =================
    if (!name || !email || !phone || !type) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ================= FILE HANDLE =================
    let resumeUrl = "";

    if (req.file) {
      resumeUrl = req.file.path;

      // ✅ FIX CLOUDINARY PDF OPEN ISSUE
      if (req.file.mimetype === "application/pdf") {
        resumeUrl = resumeUrl.replace("/upload/", "/upload/fl_attachment/");
      }
    }

    // ================= SAVE TO DB =================
    await JobApplication.create({
      name,
      email,
      phone,
      type,
      jobField,
      resumeUrl,
    });

    // ================= EMAIL TO USER =================
    const userHtml =
      type === "job"
        ? `
        <div style="font-family: Arial;">
          <h2>Hi ${name}, 👋</h2>
          <p>Thank you for applying with us.</p>
          <p><b>Position:</b> ${jobField || "N/A"}</p>
          <p>Our team is reviewing your resume and will contact you shortly.</p>
          <br/>
          <p>Regards,<br/>Team QuantumNest</p>
        </div>
      `
        : `
        <div style="font-family: Arial;">
          <h2>Hi ${name}, 👋</h2>
          <p>Thank you for your hiring request.</p>
          <p><b>Hiring For:</b> ${jobField || "N/A"}</p>
          <p>Our team will connect you with suitable candidates soon.</p>
          <br/>
          <p>Regards,<br/>Team QuantumNest</p>
        </div>
      `;

    try {
      await sendEmail(email, "Request Received ✅", userHtml);
    } catch (err) {
      console.log("❌ User email failed:", err.message);
    }

    // ================= EMAIL TO ADMIN =================
    const adminHtml = `
      <div style="font-family: Arial;">
        <h2>🔥 New ${type.toUpperCase()} Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Field:</b> ${jobField || "N/A"}</p>
        ${
          resumeUrl
            ? `<p><b>Resume:</b> <a href="${resumeUrl}" target="_blank">View Resume</a></p>`
            : ""
        }
      </div>
    `;

    try {
      await sendEmail(
        process.env.ADMIN_EMAIL,
        `🔥 New ${type.toUpperCase()} Request`,
        adminHtml
      );
    } catch (err) {
      console.log("❌ Admin email failed:", err.message);
    }

    // ================= WHATSAPP USER =================
    try {
      if (phone) {
        const msg =
          type === "job"
            ? `Hi ${name}, your job application is received. Our team will contact you soon.`
            : `Hi ${name}, your hiring request is received. Our team will contact you soon.`;

        await sendWhatsApp(phone, msg);
      }
    } catch (err) {
      console.log("❌ WhatsApp user failed:", err.message);
    }

    // ================= WHATSAPP ADMIN =================
    try {
      if (process.env.ADMIN_WHATSAPP) {
        await sendWhatsApp(
          process.env.ADMIN_WHATSAPP,
          `🔥 New ${type} request\nName: ${name}\nPhone: ${phone}\nField: ${jobField}`
        );
      }
    } catch (err) {
      console.log("❌ WhatsApp admin failed:", err.message);
    }

    // ================= FINAL RESPONSE =================
    res.json({
      success: true,
      message: "Application submitted successfully",
    });

  } catch (error) {
    console.error("🔥 JOB APPLY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;