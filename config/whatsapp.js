// import twilio from "twilio";
// import dotenv from "dotenv";

// dotenv.config();

// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// export async function sendWhatsApp(message,to) {
//     if (!to) {
//     console.error("WHATSAPP ERROR: 'to' number is missing.");
//     return;
//   }
//   try {
//     const response = await client.messages.create({
//       from: process.env.TWILIO_WHATSAPP_FROM,   // Twilio sandbox number
//       to: process.env.ADMIN_WHATSAPP_TO,        // Your number
//       body: message,
//     });

//     console.log("WhatsApp sent:", response.sid);
//   } catch (error) {
//     console.log("WHATSAPP ERROR:", error);
//   }
// }


// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// export const sendWhatsApp = async (number, message) => {
//   try {

//     const phone = number.replace(/\D/g, "");

//     const url = `https://app.messageautosender.com/api/send`;

//     await axios.get(url, {
//       params: {
//         number: `91${phone}`,
//         message: message,
//         apikey: process.env.WHATSAPP_API_KEY
//       }
//     });

//     console.log("📲 WhatsApp sent to:", phone);

//   } catch (error) {
//     console.log("❌ WhatsApp Error:", error.message);
//   }
// };

// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// export const sendWhatsApp = async (number, message) => {
//   try {

//     console.log("🚀 WhatsApp function started");

//     console.log("🔑 API KEY:", process.env.WHATSAPP_API_KEY);

//     let phone = number.replace(/\D/g, "");

//     if (!phone.startsWith("91")) {
//       phone = "91" + phone;
//     }

//     console.log("📞 Final Phone:", phone);

//     const url = "https://app.messageautosender.com/api/send";

//     const response = await axios.get(url, {
//       params: {
//         number: phone,
//         message: message,
//         apikey: process.env.WHATSAPP_API_KEY
//       }
//     });

//     console.log("✅ WhatsApp API Response:", response.data);

//   } catch (error) {

//     if (error.response) {
//       console.log("❌ WhatsApp API Error:", error.response.data);
//     } else {
//       console.log("❌ WhatsApp Error:", error.message);
//     }

//   }
// };

// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// export const sendWhatsApp = async (number, message) => {
//   try {
//     console.log("🚀 WhatsApp function started");

//     // check API key
//     if (!process.env.WHATSAPP_API_KEY) {
//       console.log("❌ WHATSAPP_API_KEY missing in .env");
//       return;
//     }

//     // remove non numbers
//     let phone = number.replace(/\D/g, "");

//     // add India code if missing
//     if (!phone.startsWith("91")) {
//       phone = "91" + phone;
//     }

//     console.log("📞 Final Phone:", phone);

//     // encode message (important)
//     const encodedMessage = encodeURIComponent(message);

//     const apiURL = `https://app.messageautosender.com/api/send?number=${phone}&message=${encodedMessage}&apikey=${process.env.WHATSAPP_API_KEY}`;

//     console.log("📡 API Request:", apiURL);

//     const response = await axios.get(apiURL);

//     console.log("✅ WhatsApp API Response:", response.data);

//     return response.data;

//   } catch (error) {

//     if (error.response) {
//       console.log("❌ WhatsApp API Error:", error.response.data);
//     } else if (error.request) {
//       console.log("❌ No response from WhatsApp API");
//     } else {
//       console.log("❌ WhatsApp Error:", error.message);
//     }

//   }
// };

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendWhatsApp = async (number, message) => {
  try {

    console.log("🚀 WhatsApp function started");

    if (!number) {
      console.log("❌ Phone number missing");
      return;
    }

    // clean phone
    let phone = number.toString().replace(/\D/g, "");

    if (!phone.startsWith("91")) {
      phone = "91" + phone;
    }

    console.log("📞 Sending to:", phone);

    const url = "https://app.messageautosender.com/api/v1/message/create";

    const response = await axios.post(
      url,
      {
        receiverMobileNo: phone,
        message: [message]
      },
      {
        params: {
          username: process.env.WHATSAPP_USERNAME,
          password: process.env.WHATSAPP_PASSWORD,
          api_key: process.env.WHATSAPP_API_KEY
        },
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ WhatsApp API Response:", response.data);

    return response.data;

  } catch (error) {

    if (error.response) {
      console.log("❌ WhatsApp API Error:", error.response.data);
    } else {
      console.log("❌ WhatsApp Error:", error.message);
    }

  }
};