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

