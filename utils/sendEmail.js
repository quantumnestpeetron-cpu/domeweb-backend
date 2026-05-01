import nodemailer from "nodemailer";

export const sendEmailOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Your Company" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family: Arial; text-align:center;">
          <h2 style="color:#333;">Your OTP Code</h2>
          <h1 style="letter-spacing:5px;">${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ OTP sent to:", email);

  } catch (error) {
    console.error("❌ Email Error:", error.message);
    throw new Error("Email sending failed");
  }
};