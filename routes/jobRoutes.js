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


// import express from "express";
// import upload from "../middleware/upload.js";
// import JobApplication from "../models/JobApplication.js";
// import { sendEmail } from "../config/email.js";
// import { sendWhatsApp } from "../config/whatsapp.js";

// const router = express.Router();

// router.post("/apply", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email, phone, type, jobField } = req.body;

//     // ================= VALIDATION =================
//     if (!name || !email || !phone || !type) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // ================= FILE HANDLE =================
//     let resumeUrl = "";

//     if (req.file) {
//       resumeUrl = req.file.path;

//       // ✅ FIX CLOUDINARY PDF OPEN ISSUE
//       if (req.file.mimetype === "application/pdf") {
//         resumeUrl = resumeUrl.replace("/upload/", "/upload/fl_attachment/");
//       }
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

//     // ================= EMAIL TO USER =================
//     const userHtml =
//       type === "job"
//         ? `
//         <div style="font-family: Arial;">
//           <h2>Hi ${name}, 👋</h2>
//           <p>Thank you for applying with us.</p>
//           <p><b>Position:</b> ${jobField || "N/A"}</p>
//           <p>Our team is reviewing your resume and will contact you shortly.</p>
//           <br/>
//           <p>Regards,<br/>Team QuantumNest</p>
//         </div>
//       `
//         : `
//         <div style="font-family: Arial;">
//           <h2>Hi ${name}, 👋</h2>
//           <p>Thank you for your hiring request.</p>
//           <p><b>Hiring For:</b> ${jobField || "N/A"}</p>
//           <p>Our team will connect you with suitable candidates soon.</p>
//           <br/>
//           <p>Regards,<br/>Team QuantumNest</p>
//         </div>
//       `;

//     try {
//       await sendEmail(email, "Request Received ✅", userHtml);
//     } catch (err) {
//       console.log("❌ User email failed:", err.message);
//     }

//     // ================= EMAIL TO ADMIN =================
//     const adminHtml = `
//       <div style="font-family: Arial;">
//         <h2>🔥 New ${type.toUpperCase()} Request</h2>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Phone:</b> ${phone}</p>
//         <p><b>Field:</b> ${jobField || "N/A"}</p>
//         ${
//           resumeUrl
//             ? `<p><b>Resume:</b> <a href="${resumeUrl}" target="_blank">View Resume</a></p>`
//             : ""
//         }
//       </div>
//     `;

//     try {
//       await sendEmail(
//         process.env.ADMIN_EMAIL,
//         `🔥 New ${type.toUpperCase()} Request`,
//         adminHtml
//       );
//     } catch (err) {
//       console.log("❌ Admin email failed:", err.message);
//     }

//     // ================= WHATSAPP USER =================
//     try {
//       if (phone) {
//         const msg =
//           type === "job"
//             ? `Hi ${name}, your job application is received. Our team will contact you soon.`
//             : `Hi ${name}, your hiring request is received. Our team will contact you soon.`;

//         await sendWhatsApp(phone, msg);
//       }
//     } catch (err) {
//       console.log("❌ WhatsApp user failed:", err.message);
//     }

//     // ================= WHATSAPP ADMIN =================
//     try {
//       if (process.env.ADMIN_WHATSAPP) {
//         await sendWhatsApp(
//           process.env.ADMIN_WHATSAPP,
//           `🔥 New ${type} request\nName: ${name}\nPhone: ${phone}\nField: ${jobField}`
//         );
//       }
//     } catch (err) {
//       console.log("❌ WhatsApp admin failed:", err.message);
//     }

//     // ================= FINAL RESPONSE =================
//     res.json({
//       success: true,
//       message: "Application submitted successfully",
//     });

//   } catch (error) {
//     console.error("🔥 JOB APPLY ERROR:", error);

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

// const router = express.Router();

// router.post("/apply", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email, phone, type, jobField } = req.body;

//     // ================= VALIDATION =================
//     if (!name || !email || !phone || !type) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // ================= RESUME URL =================
//     let resumeUrl = "";

//     if (req.file) {
//       resumeUrl = req.file.path;

//       // ✅ FIX PDF OPEN ISSUE (Cloudinary)
//       if (req.file.mimetype === "application/pdf") {
//         resumeUrl = resumeUrl.replace("/upload/", "/upload/fl_inline/");
//       }
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

//     // ================= FAST RESPONSE =================
//     res.json({
//       success: true,
//       message: "Application submitted successfully",
//     });

//     // ================= EMAIL PROCESS (BACKGROUND) =================
//     setImmediate(async () => {
//       try {
//         // ================= USER EMAIL =================
//         const userHtml = `
//           <div style="font-family: Arial;">
//             <h2>Hi ${name} 👋</h2>
//             <p>Your ${type} request has been successfully received.</p>

//             <p><b>Applied For:</b> ${jobField || "N/A"}</p>

//             <p>Our team will review your profile and contact you shortly.</p>

//             <br/>
//             <p style="color: green;">
//               ✔ Thank you for choosing us!
//             </p>

//             <p>— Team QuantumNest</p>
//           </div>
//         `;

//         await sendEmail(email, "Application Received ✅", userHtml);

//         // ================= ADMIN EMAIL =================
//         const adminHtml = `
//           <div style="font-family: Arial;">
//             <h2>🔥 New ${type.toUpperCase()} Application</h2>

//             <p><b>Name:</b> ${name}</p>
//             <p><b>Email:</b> ${email}</p>
//             <p><b>Phone:</b> ${phone}</p>
//             <p><b>Job Field:</b> ${jobField || "N/A"}</p>

//             ${
//               resumeUrl
//                 ? `<p><b>Resume:</b> <a href="${resumeUrl}" target="_blank">Open Resume</a></p>`
//                 : ""
//             }
//           </div>
//         `;

//         await sendEmail(
//           process.env.ADMIN_EMAIL,
//           `New ${type.toUpperCase()} Application`,
//           adminHtml
//         );

//       } catch (err) {
//         console.log("EMAIL BACKGROUND ERROR:", err.message);
//       }
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

// const router = express.Router();

// router.post("/apply", upload.single("resume"), async (req, res) => {
//   try {
//     const { name, email, phone, type, jobField } = req.body;

//     // ================= VALIDATION =================
//     if (!name || !email || !phone || !type) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // ================= CLOUDINARY FILE =================
//     // ⚠️ IMPORTANT: DO NOT MODIFY THIS URL
//     let resumeUrl = req.file ? req.file.path : "";

//     // ================= SAVE TO DATABASE =================
//     const application = await JobApplication.create({
//       name,
//       email,
//       phone,
//       type,
//       jobField,
//       resumeUrl,
//     });

//     // ================= RESPONSE FAST (IMPORTANT FOR PRODUCTION) =================
//     res.json({
//       success: true,
//       message: "Application submitted successfully",
//       data: application,
//     });

//     // ================= BACKGROUND EMAIL PROCESS =================
//     setImmediate(async () => {
//       try {
//         // ================= USER EMAIL =================
//         const userHtml = `
//           <div style="font-family: Arial; line-height:1.6;">
//             <h2>Hi ${name} 👋</h2>

//             <p>We have successfully received your <b>${type}</b> application.</p>

//             <p><b>Job Field:</b> ${jobField || "Not specified"}</p>

//             <p>Our HR team is reviewing your profile and will contact you soon.</p>

//             <br/>

//             <p style="color:green;">
//               ✔ Thank you for applying with us
//             </p>

//             <p>— Team QuantumNest</p>
//           </div>
//         `;

//         await sendEmail(email, "Application Received ✅", userHtml);

//         // ================= ADMIN EMAIL =================
//         const adminHtml = `
//           <div style="font-family: Arial; line-height:1.6;">
//             <h2>🔥 New ${type.toUpperCase()} Application</h2>

//             <p><b>Name:</b> ${name}</p>
//             <p><b>Email:</b> ${email}</p>
//             <p><b>Phone:</b> ${phone}</p>
//             <p><b>Job Field:</b> ${jobField || "Not specified"}</p>

//             ${
//               resumeUrl
//                 ? `<p><b>Resume:</b> <a href="${resumeUrl}" target="_blank">View Resume</a></p>`
//                 : "<p><b>Resume:</b> Not uploaded</p>"
//             }
//           </div>
//         `;

//         await sendEmail(
//           process.env.ADMIN_EMAIL,
//           `🔥 New ${type.toUpperCase()} Application`,
//           adminHtml
//         );
//       } catch (err) {
//         console.log("EMAIL ERROR (background):", err.message);
//       }
//     });

//   } catch (error) {
//     console.error("🔥 JOB APPLY ERROR:", error);

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

    // ================= RESUME HANDLING =================
    let resumeUrl = "";

    if (req.file) {
      resumeUrl = req.file.path;

      // Fix Cloudinary PDF view issue
      if (req.file.mimetype === "application/pdf") {
        resumeUrl = resumeUrl.replace("/upload/", "/upload/fl_attachment/");
      }
    }

    // ================= SAVE DB =================
    await JobApplication.create({
      name,
      email,
      phone,
      type,
      jobField,
      resumeUrl,
    });

    // ================= USER EMAIL =================
    const userHtml = `
      <div style="font-family:Arial;padding:10px">
        <h2>Hi ${name} 👋</h2>

        <p>Thank you for your ${type === "job" ? "job application" : "hiring request"}.</p>

        <p><b>Position:</b> ${jobField || "Not specified"}</p>

        <p>
          Our team will review your request and contact you soon.
        </p>

        <br/>

        <p>Regards,<br/>Team QuantumNest</p>
      </div>
    `;

    // ================= ADMIN EMAIL =================
    const adminHtml = `
      <div style="font-family:Arial;padding:10px">
        <h2>🔥 New ${type.toUpperCase()} Application</h2>

        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Field:</b> ${jobField || "N/A"}</p>

        ${
          resumeUrl
            ? `<p><b>Resume:</b> <a href="${resumeUrl}" target="_blank">View Resume</a></p>`
            : "<p><b>Resume:</b> Not uploaded</p>"
        }
      </div>
    `;

    // ================= SEND EMAILS (FAST NON-BLOCKING STYLE) =================
    const adminEmail = process.env.ADMIN_EMAIL;

    // send in background (faster API response)
    Promise.resolve().then(async () => {
      try {
        if (email) {
          await sendEmail(email, "Application Received ✅", userHtml);
        }

        if (adminEmail) {
          await sendEmail(adminEmail, `🔥 New ${type.toUpperCase()} Request`, adminHtml);
        } else {
          console.log("❌ ADMIN_EMAIL missing in environment variables");
        }
      } catch (err) {
        console.log("❌ EMAIL ERROR:", err.message);
      }
    });

    // ================= RESPONSE =================
    return res.json({
      success: true,
      message: "Application submitted successfully",
    });

  } catch (error) {
    console.error("🔥 JOB APPLY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;