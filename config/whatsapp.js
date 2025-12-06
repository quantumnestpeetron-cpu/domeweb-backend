import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendWhatsApp(message,to) {
    if (!to) {
    console.error("WHATSAPP ERROR: 'to' number is missing.");
    return;
  }
  try {
    const response = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,   // Twilio sandbox number
      to: process.env.ADMIN_WHATSAPP_TO,        // Your number
      body: message,
    });

    console.log("WhatsApp sent:", response.sid);
  } catch (error) {
    console.log("WHATSAPP ERROR:", error);
  }
}
