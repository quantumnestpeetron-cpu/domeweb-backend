import Schedule from "../models/Schedule.js";
import { sendEmail } from "../config/email.js";
import { sendWhatsApp } from "../config/whatsapp.js";

export async function submitSchedule(req, res) {
  try {
    const info = req.body;

    console.log("Received Info:", info);

    await Schedule.create(info);

    try {
      await sendEmail(
        // info.email,   // ✔ SEND TO USER NOW
        process.env.ADMIN_EMAIL,
        "Your Consultation Schedule is Confirmed!",
        `
        <div style="
          width: 100%;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          padding: 40px 0;
          font-family: Arial, sans-serif;
        ">
        
          <div style="
            max-width: 550px;
            background: #ffffff;
            margin: auto;
            padding: 30px 25px;
            border-radius: 30px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            text-align: center;
          ">
            
            <!-- Company Logo -->
            <img 
              src="http://localhost:3000/logo.png"
              alt="QuantumNest Peetron"
              style="width: 140px; margin-bottom: 20px;"
            />

            <h1 style="font-size: 26px; color: #222;">Hello
            </h1>

            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Your consultation has been successfully scheduled with below detail;
            </p>

            <div style="
              background: #f4f6ff;
              padding: 20px;
              margin: 25px 0;
              border-radius: 20px;
              border-left: 6px solid #2a5298;
              text-align: left;
            ">
              <p><b>Name:</b>${info.fullName}</p>
              <p><b>Phone:</b>${info.phone}</p>
              <p><b>Email:</b>${info.email}</p>
              <p><b>Date:</b> ${info.date}</p>
              <p><b>Time:</b> ${info.time}</p>
              <p><b>Message:</b> ${info.message || "No message provided"}</p>
            </div>

            <a href="https://quantumnestpeetron.com"
              style="
                display: inline-block;
                padding: 12px 25px;
                background: #2a5298;
                color: white;
                border-radius: 50px;
                text-decoration: none;
                font-size: 16px;
                font-weight: bold;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
              ">
              Visit Our Website
            </a>

            <p style="color: #777; margin-top: 25px; font-size: 14px;">
              If you want to modify your appointment, simply reply to this email.
            </p>

          </div>
        </div>
        `
      );
    } catch (emailErr) {
      console.log("EMAIL ERROR:", emailErr);
    }

    try {
      await sendWhatsApp(
       
            `📅 *NEW SCHEDULE REQUEST*
                 ──────────────────
            👤 *Name:* ${info.fullName}
            📧 *Email:* ${info.email}
            📞 *Phone:*${info.phone}
            📆 *Date:* ${info.date}
            ⏰ *Time:* ${info.time}
            💬 *Message:* ${info.message || "No message"}
            `,
            process.env.ADMIN_WHATSAPP_TO
      );
    } catch (waErr) {
      console.log("WHATSAPP ERROR:", waErr);
    }

    return res.json({ success: true, message: "Schedule saved successfully!" });
  } catch (err) {
    console.error("SERVER ERROR ===>", err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
