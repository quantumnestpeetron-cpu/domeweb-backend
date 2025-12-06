import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Must be an App Password if 2FA enabled
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully:", info.response);
    return info;
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    throw err; // Important: allows controller to catch and log error
  }
};
