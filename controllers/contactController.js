import validator from "validator";
import Contact from "../models/Contact.js";
import { sendEmail } from "../config/email.js";
import { sendWhatsApp } from "../config/whatsapp.js";

export async function submitContact(req, res) {
  try {
    let info = req.body;

    // 🔹 Sanitize Inputs
    info.fullName = validator.trim(info.fullName || "");
    info.email = validator.trim(info.email || "");
    info.phone = validator.trim(info.phone || "");
    info.company = validator.trim(info.company || "");
    info.message = validator.escape(info.message || "");

    // -------------------------------
    // ✅ VALIDATION SECTION
    // -------------------------------

    // Required fields
    if (!info.fullName || !info.email || !info.phone || !info.message) {
      return res.status(400).json({
        success: false,
        error: "All required fields must be filled.",
      });
    }

    // Email validation
    if (!validator.isEmail(info.email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format.",
      });
    }

    // Phone validation (India)
    if (!validator.isMobilePhone(info.phone, "en-IN")) {
      return res.status(400).json({
        success: false,
        error: "Invalid phone number.",
      });
    }

    // -------------------------------
    // ✅ SAVE TO DATABASE
    // -------------------------------
    await Contact.create(info);

    // -------------------------------
    // ✅ SEND EMAIL TO ADMIN
    // -------------------------------
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "New Contact Form Submission",
      `
      <div style="font-family: Arial, sans-serif; background: #f4f6f8; padding: 20px; width: 100%;">
        <div style="max-width: 600px; margin: auto; border-radius: 20px; background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); padding: 25px; box-shadow: 0 10px 25px rgba(0,0,0,0.15);">

          <div style="text-align: center; background: rgba(255,255,255,0.2); padding: 8px 15px; border-radius: 12px; color: white; font-size: 13px; margin-bottom: 20px;">
            ${new Date().toLocaleString()}
          </div>

          <div style="background: white; border-radius: 15px; padding: 20px; text-align: center;">
            <h2 style="color: #333;">📩 New Contact Form Message</h2>

            <p><strong>Name:</strong> ${info.fullName}</p>
            <p><strong>Email:</strong> ${info.email}</p>
            <p><strong>Phone:</strong> ${info.phone}</p>
            <p><strong>Company:</strong> ${info.company}</p>

            <div style="background: #f4f6f8; padding: 15px; border-radius: 12px; margin-top: 15px; text-align: left;">
              <strong>Message:</strong><br>
              ${info.message}
            </div>
          </div>

          <div style="height: 6px; margin-top: 25px; border-radius: 3px; background: linear-gradient(90deg, #ff6a00, #ee0979);"></div>
        </div>
      </div>
      `
    );

    // -------------------------------
    // ✅ SEND WHATSAPP MESSAGE
    // -------------------------------
    await sendWhatsApp(`
📩 NEW CONTACT MESSAGE  
Name: ${info.fullName}  
Email: ${info.email}  
Phone: ${info.phone}  
Company: ${info.company}  
Message: ${info.message}
    `);

    // -------------------------------
    // SUCCESS RESPONSE
    // -------------------------------
    res.json({ success: true, message: "Message received!" });

  } catch (err) {
    console.log("CONTACT FORM ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
