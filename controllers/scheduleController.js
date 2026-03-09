// import Schedule from "../models/Schedule.js";
// import { sendEmail } from "../config/email.js";
// import { sendWhatsApp } from "../config/whatsapp.js";

// export async function submitSchedule(req, res) {
//   try {
//     const info = req.body;

//     console.log("Received Info:", info);

//     await Schedule.create(info);

//     try {
//       await sendEmail(
//         // info.email,   // ✔ SEND TO USER NOW
//         process.env.ADMIN_EMAIL,
//         "Your Consultation Schedule is Confirmed!",
//         `
//         <div style="
//           width: 100%;
//           background: linear-gradient(135deg, #1e3c72, #2a5298);
//           padding: 40px 0;
//           font-family: Arial, sans-serif;
//         ">
        
//           <div style="
//             max-width: 550px;
//             background: #ffffff;
//             margin: auto;
//             padding: 30px 25px;
//             border-radius: 30px;
//             box-shadow: 0 8px 25px rgba(0,0,0,0.15);
//             text-align: center;
//           ">
            
//             <!-- Company Logo -->
//             <img 
//               src="http://localhost:3000/logo.png"
//               alt="QuantumNest Peetron"
//               style="width: 140px; margin-bottom: 20px;"
//             />

//             <h1 style="font-size: 26px; color: #222;">Hello
//             </h1>

//             <p style="color: #555; font-size: 16px; line-height: 1.6;">
//               Your consultation has been successfully scheduled with below detail;
//             </p>

//             <div style="
//               background: #f4f6ff;
//               padding: 20px;
//               margin: 25px 0;
//               border-radius: 20px;
//               border-left: 6px solid #2a5298;
//               text-align: left;
//             ">
//               <p><b>Name:</b>${info.fullName}</p>
//               <p><b>Phone:</b>${info.phone}</p>
//               <p><b>Email:</b>${info.email}</p>
//               <p><b>Date:</b> ${info.date}</p>
//               <p><b>Time:</b> ${info.time}</p>
//               <p><b>Message:</b> ${info.message || "No message provided"}</p>
//             </div>

//             <a href="https://quantumnestpeetron.com"
//               style="
//                 display: inline-block;
//                 padding: 12px 25px;
//                 background: #2a5298;
//                 color: white;
//                 border-radius: 50px;
//                 text-decoration: none;
//                 font-size: 16px;
//                 font-weight: bold;
//                 box-shadow: 0 4px 10px rgba(0,0,0,0.2);
//               ">
//               Visit Our Website
//             </a>

//             <p style="color: #777; margin-top: 25px; font-size: 14px;">
//               If you want to modify your appointment, simply reply to this email.
//             </p>

//           </div>
//         </div>
//         `
//       );
//     } catch (emailErr) {
//       console.log("EMAIL ERROR:", emailErr);
//     }

//     try {
//       await sendWhatsApp(
       
//             `📅 *NEW SCHEDULE REQUEST*
//                  ──────────────────
//             👤 *Name:* ${info.fullName}
//             📧 *Email:* ${info.email}
//             📞 *Phone:*${info.phone}
//             📆 *Date:* ${info.date}
//             ⏰ *Time:* ${info.time}
//             💬 *Message:* ${info.message || "No message"}
//             `,
//             process.env.ADMIN_WHATSAPP_TO
//       );
//     } catch (waErr) {
//       console.log("WHATSAPP ERROR:", waErr);
//     }

//     return res.json({ success: true, message: "Schedule saved successfully!" });
//   } catch (err) {
//     console.error("SERVER ERROR ===>", err);
//     return res.status(500).json({ success: false, error: err.message });
//   }
// }


// import validator from "validator";
// import Schedule from "../models/Schedule.js";
// import { sendEmail } from "../config/email.js";
// import { sendWhatsApp } from "../config/whatsapp.js";

// export const submitSchedule = async (req, res) => {
//   try {
//     console.log("📅 Incoming Schedule:", req.body);

//     const info = {
//       fullName: validator.trim(req.body.fullName || ""),
//       email: validator.trim(req.body.email || ""),
//       phone: validator.trim(req.body.phone || ""),
//       date: validator.trim(req.body.date || ""),
//       time: validator.trim(req.body.time || ""),
//       message: validator.escape(req.body.message || "")
//     };

//     // ---------- VALIDATION ----------
//     if (!info.fullName || !info.phone || !info.date || !info.time) {
//       return res.status(400).json({ success: false, error: "Missing required fields" });
//     }

//     if (info.email && !validator.isEmail(info.email)) {
//       return res.status(400).json({ success: false, error: "Invalid email" });
//     }

//     if (!validator.isMobilePhone(info.phone, "en-IN")) {
//       return res.status(400).json({ success: false, error: "Invalid phone number" });
//     }

//     // ---------- SAVE TO MONGODB ----------
//     let saved;
//     try {
//       saved = await Schedule.create(info);
//       console.log("✅ Schedule saved:", saved._id);
//     } catch (dbErr) {
//       console.error("❌ MongoDB error:", dbErr);
//       return res.status(500).json({ success: false, error: "Database error" });
//     }

//     // ---------- SEND RESPONSE FIRST ----------
//     res.status(201).json({
//       success: true,
//       message: "Schedule booked successfully",
//       id: saved._id
//     });

//     // ---------- EMAIL (Background) ----------
//     if (process.env.ADMIN_EMAIL) {
//       sendEmail(
//         process.env.ADMIN_EMAIL,
//         "New Consultation Scheduled",
//         `
//          Name: ${info.fullName}
//          Phone: ${info.phone}
//          Email: ${info.email || "N/A"}
//          Date: ${info.date}
//          Time: ${info.time}
//          Message: ${info.message || "None"}
//         `
//       ).catch(err => console.log("📧 Email failed:", err.message));
//     }

//     // ---------- WHATSAPP (Background) ----------
//     sendWhatsApp(
//       `New Schedule:
//         Name: ${info.fullName}
//         Phone: ${info.phone}
//         Date: ${info.date}
//         Time: ${info.time}`
//     ).catch(err => console.log("📲 WhatsApp failed:", err.message));

//   } catch (err) {
//     console.error("🔥 SCHEDULE API CRASH:", err);
//     res.status(500).json({ success: false, error: "Server crashed" });
//   }
// };


// import validator from "validator";
// import Schedule from "../models/Schedule.js";
// import { sendEmail } from "../config/email.js";
// import { sendWhatsApp } from "../config/whatsapp.js";

// export const submitSchedule = async (req, res) => {
//   try {
//     console.log("📅 Incoming Schedule:", req.body);

//     const info = {
//       fullName: validator.trim(req.body.fullName || ""),
//       email: validator.trim(req.body.email || ""),
//       phone: validator.trim(req.body.phone || ""),
//       date: validator.trim(req.body.date || ""),
//       time: validator.trim(req.body.time || ""),
//       message: validator.escape(req.body.message || "")
//     };

//     // ---------- VALIDATION ----------
//     if (!info.fullName || !info.phone || !info.date || !info.time) {
//       return res.status(400).json({ success: false, error: "Missing required fields" });
//     }

//     if (info.email && !validator.isEmail(info.email)) {
//       return res.status(400).json({ success: false, error: "Invalid email" });
//     }

//     if (!validator.isMobilePhone(info.phone, "en-IN")) {
//       return res.status(400).json({ success: false, error: "Invalid phone number" });
//     }

//     // ---------- SAVE TO MONGODB ----------
//     let saved;
//     try {
//       saved = await Schedule.create(info);
//       console.log("✅ Schedule saved:", saved._id);
//     } catch (dbErr) {
//       console.error("❌ MongoDB error:", dbErr);
//       return res.status(500).json({ success: false, error: "Database error" });
//     }

//     // ---------- SEND RESPONSE FIRST ----------
//     res.status(201).json({
//       success: true,
//       message: "Schedule booked successfully",
//       id: saved._id
//     });

//     // ---------- EMAIL (Background) ----------
//     if (process.env.ADMIN_EMAIL) {
//       sendEmail(
//         process.env.ADMIN_EMAIL,
//         "New Consultation Scheduled",
//         `
// Name: ${info.fullName}
// Phone: ${info.phone}
// Email: ${info.email || "N/A"}
// Date: ${info.date}
// Time: ${info.time}
// Message: ${info.message || "None"}
//         `
//       ).catch(err => console.log("📧 Email failed:", err.message));
//     }

//     // ---------- WHATSAPP USER CONFIRMATION ----------
//     sendWhatsApp(
//       info.phone,
//       `Hello ${info.fullName} 👋

// ✅ Your consultation with QuantumNest Peetron has been scheduled.

// 📅 Date: ${info.date}
// ⏰ Time: ${info.time}

// Our team will contact you shortly.`
//     ).catch(err => console.log("📲 WhatsApp user failed:", err.message));

//     // ---------- WHATSAPP ADMIN ALERT ----------
//     sendWhatsApp(
//       process.env.ADMIN_WHATSAPP,
//       `📅 New Consultation Scheduled

// Name: ${info.fullName}
// Phone: ${info.phone}
// Email: ${info.email || "N/A"}

// Date: ${info.date}
// Time: ${info.time}

// Message:
// ${info.message || "None"}`
//     ).catch(err => console.log("📲 WhatsApp admin failed:", err.message));

//   } catch (err) {
//     console.error("🔥 SCHEDULE API CRASH:", err);
//     res.status(500).json({ success: false, error: "Server crashed" });
//   }
// };

// import validator from "validator";
// import Schedule from "../models/Schedule.js";
// import { sendEmail } from "../config/email.js";
// import { sendWhatsApp } from "../config/whatsapp.js";

// export const submitSchedule = async (req, res) => {
//   try {

//     console.log("📅 Incoming Schedule:", req.body);

//     const info = {
//       fullName: validator.trim(req.body.fullName || ""),
//       email: validator.trim(req.body.email || ""),
//       phone: validator.trim(req.body.phone || ""),
//       date: validator.trim(req.body.date || ""),
//       time: validator.trim(req.body.time || ""),
//       message: validator.escape(req.body.message || "")
//     };

//     if (!info.fullName || !info.phone || !info.date || !info.time) {
//       return res.status(400).json({ success: false, error: "Missing required fields" });
//     }

//     if (info.email && !validator.isEmail(info.email)) {
//       return res.status(400).json({ success: false, error: "Invalid email" });
//     }

//     if (!validator.isMobilePhone(info.phone, "en-IN")) {
//       return res.status(400).json({ success: false, error: "Invalid phone number" });
//     }

//     const saved = await Schedule.create(info);

//     console.log("✅ Schedule saved:", saved._id);

//     // USER CONFIRMATION
//     await sendWhatsApp(
//       info.phone,
//       `Hello ${info.fullName} 👋

// ✅ Your consultation has been scheduled.

// 📅 Date: ${info.date}
// ⏰ Time: ${info.time}

// Our team will contact you shortly.`
//     );

//     // ADMIN ALERT
//     await sendWhatsApp(
//       process.env.ADMIN_WHATSAPP,
//       `📅 New Consultation Scheduled

// Name: ${info.fullName}
// Phone: ${info.phone}
// Email: ${info.email || "N/A"}

// Date: ${info.date}
// Time: ${info.time}

// Message:
// ${info.message || "None"}`
//     );

//     res.status(201).json({
//       success: true,
//       message: "Schedule booked successfully",
//       id: saved._id
//     });

//   } catch (err) {
//     console.error("🔥 SCHEDULE API CRASH:", err);
//     res.status(500).json({ success: false, error: "Server crashed" });
//   }
// };

// import validator from "validator";
// import Schedule from "../models/Schedule.js";
// import { sendEmail } from "../config/email.js";
// import { sendWhatsApp } from "../config/whatsapp.js";

// export const submitSchedule = async (req, res) => {
//   try {

//     console.log("📅 Incoming Schedule:", req.body);

//     const info = {
//       fullName: validator.trim(req.body.fullName || ""),
//       email: validator.trim(req.body.email || ""),
//       phone: validator.trim(req.body.phone || ""),
//       date: validator.trim(req.body.date || ""),
//       time: validator.trim(req.body.time || ""),
//       message: validator.escape(req.body.message || "")
//     };

//     // Required fields
//     if (!info.fullName || !info.phone || !info.date || !info.time) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required fields"
//       });
//     }

//     // Email validation
//     if (info.email && !validator.isEmail(info.email)) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid email"
//       });
//     }

//     // Phone validation
//     if (!validator.isMobilePhone(info.phone, "en-IN")) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid phone number"
//       });
//     }

//     // Save in MongoDB
//     const saved = await Schedule.create(info);

//     console.log("✅ Schedule saved:", saved._id);

//     /* ----------------------------------
//        USER WHATSAPP MESSAGE
//     ---------------------------------- */

//     try {
//       await sendWhatsApp(
//         info.phone,
// `Hello ${info.fullName} 👋

// ✅ Your consultation has been scheduled.

// 📅 Date: ${info.date}
// ⏰ Time: ${info.time}

// Our team will contact you shortly.`
//       );
//     } catch (err) {
//       console.log("⚠️ User WhatsApp failed:", err.message);
//     }

//     /* ----------------------------------
//        ADMIN WHATSAPP MESSAGE
//     ---------------------------------- */

//     try {
//       await sendWhatsApp(
//         process.env.ADMIN_WHATSAPP,
// `📅 New Consultation Scheduled

// Name: ${info.fullName}
// Phone: ${info.phone}
// Email: ${info.email || "N/A"}

// Date: ${info.date}
// Time: ${info.time}

// Message:
// ${info.message || "None"}`
//       );
//     } catch (err) {
//       console.log("⚠️ Admin WhatsApp failed:", err.message);
//     }

//     /* ----------------------------------
//        OPTIONAL EMAIL NOTIFICATION
//     ---------------------------------- */

//     if (process.env.ADMIN_EMAIL) {
//       sendEmail(
//         process.env.ADMIN_EMAIL,
//         "New Consultation Scheduled",
// `Name: ${info.fullName}
// Phone: ${info.phone}
// Email: ${info.email || "N/A"}

// Date: ${info.date}
// Time: ${info.time}

// Message:
// ${info.message || "None"}`
//       );
//     }

//     res.status(201).json({
//       success: true,
//       message: "Schedule booked successfully",
//       id: saved._id
//     });

//   } catch (err) {

//     console.error("🔥 SCHEDULE API CRASH:", err);

//     res.status(500).json({
//       success: false,
//       error: "Server crashed"
//     });

//   }
// };

// import validator from "validator";
// import Schedule from "../models/Schedule.js";
// import { sendEmail } from "../config/email.js";
// import { sendWhatsApp } from "../config/whatsapp.js";

// export const submitSchedule = async (req, res) => {
//   try {

//     console.log("📅 Incoming Schedule:", req.body);

//     const info = {
//       fullName: validator.trim(req.body.fullName || ""),
//       email: validator.trim(req.body.email || ""),
//       phone: validator.trim(req.body.phone || ""),
//       date: validator.trim(req.body.date || ""),
//       time: validator.trim(req.body.time || ""),
//       message: validator.escape(req.body.message || "")
//     };

//     /* ----------------------------------
//        REQUIRED FIELD VALIDATION
//     ---------------------------------- */

//     if (!info.fullName || !info.phone || !info.date || !info.time) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required fields"
//       });
//     }

//     /* ----------------------------------
//        EMAIL VALIDATION
//     ---------------------------------- */

//     if (info.email && !validator.isEmail(info.email)) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid email"
//       });
//     }

//     /* ----------------------------------
//        PHONE VALIDATION
//     ---------------------------------- */

//     if (!validator.isMobilePhone(info.phone, "en-IN")) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid phone number"
//       });
//     }

//     /* ----------------------------------
//        SAVE DATA IN MONGODB
//     ---------------------------------- */

//     const saved = await Schedule.create(info);

//     console.log("✅ Schedule saved:", saved._id);

//     /* ----------------------------------
//        USER WHATSAPP MESSAGE
//     ---------------------------------- */

//     try {
//       await sendWhatsApp(
//         info.phone,
// `Hello ${info.fullName} 👋

// ✅ Your FREE software demo consultation is confirmed.

// 📅 Date: ${info.date}
// ⏰ Time: ${info.time}

// Our expert will guide you about:
// • Tally Prime
// • Marg ERP
// • Busy Accounting Software
// • CCTV Services
// • AC Services

// 🎁 Free Setup Guidance Included

// 📞 Call / WhatsApp
// +91 9105524440

// QuantumNest Peetron`
//       );
//     } catch (err) {
//       console.log("⚠️ User WhatsApp failed:", err.message);
//     }

//     /* ----------------------------------
//        ADMIN WHATSAPP MESSAGE
//     ---------------------------------- */

//     try {
//       await sendWhatsApp(
//         process.env.ADMIN_WHATSAPP,
// `🔥 New Demo Consultation Booked

// 👤 Name: ${info.fullName}
// 📞 Phone: ${info.phone}
// 📧 Email: ${info.email || "N/A"}

// 📅 Date: ${info.date}
// ⏰ Time: ${info.time}

// 💬 Message:
// ${info.message || "No message"}

// 🌐 Source: Website Demo Scheduler`
//       );
//     } catch (err) {
//       console.log("⚠️ Admin WhatsApp failed:", err.message);
//     }

//     /* ----------------------------------
//        EMAIL NOTIFICATION
//     ---------------------------------- */

//     if (process.env.ADMIN_EMAIL) {
//       sendEmail(
//         process.env.ADMIN_EMAIL,
//         "New Demo Consultation Scheduled",
// `Name: ${info.fullName}
// Phone: ${info.phone}
// Email: ${info.email || "N/A"}

// Date: ${info.date}
// Time: ${info.time}

// Message:
// ${info.message || "None"}`
//       );
//     }

//     /* ----------------------------------
//        FINAL RESPONSE
//     ---------------------------------- */

//     res.status(201).json({
//       success: true,
//       message: "Schedule booked successfully",
//       id: saved._id
//     });

//   } catch (err) {

//     console.error("🔥 SCHEDULE API CRASH:", err);

//     res.status(500).json({
//       success: false,
//       error: "Server crashed"
//     });

//   }
// };


import validator from "validator";
import Schedule from "../models/Schedule.js";
import { sendEmail } from "../config/email.js";
import { sendWhatsApp } from "../config/whatsapp.js";

export const submitSchedule = async (req, res) => {

  try {

    console.log("📅 Incoming Schedule:", req.body);

    const info = {
      fullName: validator.trim(req.body.fullName || ""),
      email: validator.trim(req.body.email || ""),
      phone: validator.trim(req.body.phone || ""),
      date: validator.trim(req.body.date || ""),
      time: validator.trim(req.body.time || ""),
      message: validator.escape(req.body.message || "")
    };

    /* REQUIRED VALIDATION */

    if (!info.fullName || !info.phone || !info.date || !info.time) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    if (info.email && !validator.isEmail(info.email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email"
      });
    }

    if (!validator.isMobilePhone(info.phone, "en-IN")) {
      return res.status(400).json({
        success: false,
        error: "Invalid phone number"
      });
    }

    /* SAVE TO DATABASE */

    const saved = await Schedule.create(info);

    console.log("✅ Schedule saved:", saved._id);

    /* USER WHATSAPP */

    try {

      await sendWhatsApp(
        info.phone,
`Hello ${info.fullName} 👋

✅ Your FREE software consultation is confirmed.

📅 Date: ${info.date}
⏰ Time: ${info.time}

Our expert will guide you about:
• Tally Prime
• Marg ERP
• Busy Accounting Software
• CCTV Services
• AC Services

🎁 Free Setup Guidance Included

📞 Call / WhatsApp
+91 9105524440

QuantumNest Peetron`
      );

      console.log("✅ User WhatsApp Sent");

    } catch (err) {
      console.log("⚠️ User WhatsApp failed:", err.message);
    }

    /* ADMIN WHATSAPP */

    try {

      await sendWhatsApp(
        process.env.ADMIN_WHATSAPP,
`🔥 New Demo Consultation Booked

👤 Name: ${info.fullName}
📞 Phone: ${info.phone}
📧 Email: ${info.email || "N/A"}

📅 Date: ${info.date}
⏰ Time: ${info.time}

💬 Message:
${info.message || "No message"}

🌐 Source: Website Demo Scheduler`
      );

      console.log("✅ Admin WhatsApp Sent");

    } catch (err) {
      console.log("⚠️ Admin WhatsApp failed:", err.message);
    }

    /* EMAIL */

    if (process.env.ADMIN_EMAIL) {

      try {

        await sendEmail(
          process.env.ADMIN_EMAIL,
          "New Demo Consultation Scheduled",
`Name: ${info.fullName}
Phone: ${info.phone}
Email: ${info.email || "N/A"}

Date: ${info.date}
Time: ${info.time}

Message:
${info.message || "None"}`
        );

        console.log("📧 Email Sent");

      } catch (err) {
        console.log("⚠️ Email failed:", err.message);
      }

    }

    /* FINAL RESPONSE */

    res.status(201).json({
      success: true,
      message: "Schedule booked successfully",
      id: saved._id
    });

  } catch (err) {

    console.error("🔥 SCHEDULE API CRASH:", err);

    res.status(500).json({
      success: false,
      error: "Server crashed"
    });

  }
};

