
import validator from "validator";
import Contact from "../models/Contact.js";
import { sendEmail } from "../config/email.js";
import { sendWhatsApp } from "../config/whatsapp.js";

export const submitContact = async (req, res) => {
  try {

    console.log("📩 Incoming Contact:", req.body);

    const info = {
      fullName: validator.trim(req.body.fullName || ""),
      email: validator.trim(req.body.email || ""),
      phone: validator.trim(req.body.phone || ""),
      company: validator.trim(req.body.company || ""),
      message: validator.escape(req.body.message || ""),
    };

    if (!info.fullName || !info.email || !info.phone || !info.message) {
      return res.status(400).json({
        success: false,
        error: "All fields required",
      });
    }

    if (!validator.isEmail(info.email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email",
      });
    }

    if (!validator.isMobilePhone(info.phone, "en-IN")) {
      return res.status(400).json({
        success: false,
        error: "Invalid phone number",
      });
    }

    const savedContact = await Contact.create(info);

    console.log("✅ Saved to MongoDB:", savedContact._id);

    /* ---------------- USER WHATSAPP ---------------- */

    try {
      await sendWhatsApp(
        info.phone,
`Hello ${info.fullName} 👋

Thank you for contacting QuantumNest Peetron.

Our team will contact you shortly.

📞 Call: +91 9105524440
💬 WhatsApp: https://wa.me/919105524440
🌐 Website: https://qnpeetron.com`
      );

      console.log("✅ User WhatsApp Sent");

    } catch (err) {
      console.error("⚠ User WhatsApp Failed:", err.message);
    }

    /* ---------------- ADMIN WHATSAPP ---------------- */

    try {
      await sendWhatsApp(
        process.env.ADMIN_WHATSAPP,
`📩 New Contact Lead

Name: ${info.fullName}
Phone: ${info.phone}
Email: ${info.email}
Company: ${info.company}

Message:
${info.message}`
      );

      console.log("✅ Admin WhatsApp Sent");

    } catch (err) {
      console.error("⚠ Admin WhatsApp Failed:", err.message);
    }

    /* ---------------- EMAIL ---------------- */

    if (process.env.ADMIN_EMAIL) {

      try {

        await sendEmail(
          process.env.ADMIN_EMAIL,
          "New Contact Message",
`Name: ${info.fullName}
Email: ${info.email}
Phone: ${info.phone}
Company: ${info.company}

Message:
${info.message}`
        );

        console.log("📧 Email Sent");

      } catch (err) {
        console.error("⚠ Email Failed:", err.message);
      }
    }

    res.status(201).json({
      success: true,
      message: "Message received successfully",
      id: savedContact._id,
    });

  } catch (err) {

    console.error("🔥 CONTACT API CRASH:", err);

    res.status(500).json({
      success: false,
      error: "Server crashed",
    });
  }
};

