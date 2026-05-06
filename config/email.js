// import nodemailer from "nodemailer";

// export const sendEmail = async (to, subject, html) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS, // Must be an App Password if 2FA enabled
//       },
//     });

//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       html,
//     });

//     console.log("Email sent successfully:", info.response);
//     return info;
//   } catch (err) {
//     console.error("EMAIL ERROR:", err);
//     throw err; // Important: allows controller to catch and log error
//   }
// };


// import nodemailer from "nodemailer";

// export const sendEmail = async (to, subject, html) => {
//   try {
//     // ❗ SAFE CHECK (THIS FIXES YOUR ERROR)
//     if (!to) {
//       console.log("❌ EMAIL SKIPPED: No recipient");
//       return;
//     }

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       html,
//     });

//     // console.log("✅ Email sent to:", to);

//   } catch (err) {
//     console.log("EMAIL ERROR:", err.message);
//   }
// };

import nodemailer from "nodemailer";

const getTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.log("❌ EMAIL ENV MISSING");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  });
};

export const sendEmail = async (to, subject, html) => {
  try {
    if (!to) {
      console.log("❌ No recipient");
      return;
    }

    const transporter = getTransporter();

    const info = await transporter.sendMail({
      from: `"QuantumNest" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ EMAIL SENT:", info.messageId);
    return info;

  } catch (err) {
    console.log("❌ EMAIL ERROR:", err.message);
  }
};