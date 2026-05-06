// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// export const sendWhatsApp = async (number, message) => {
//   try {
//     console.log("🚀 WhatsApp function started");

//     if (!number) throw new Error("Phone number missing");

//     let phone = number.toString().replace(/\D/g, "");

//     if (!phone.startsWith("91")) {
//       phone = "91" + phone;
//     }

//     console.log("📞 Sending to:", phone);

//     const url = "https://app.messageautosender.com/api/v1/message/create";

//     const response = await axios.post(
//       url,
//       {
//         username: process.env.WHATSAPP_USERNAME,
//         password: process.env.WHATSAPP_PASSWORD,
//         api_key: process.env.WHATSAPP_API_KEY,
//         receiverMobileNo: phone,
//         message: message
//       },
//       {
//         headers: {
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     console.log("✅ WhatsApp API Response:", response.data);

//     return response.data;

//   } catch (error) {
//     console.log("❌ WhatsApp Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// export const sendWhatsApp = async (number, message) => {
//   try {
//     console.log("🚀 WhatsApp function started");

//     if (!number) throw new Error("Phone number missing");

//     let phone = number.toString().replace(/\D/g, "");

//     // ✅ FIX NUMBER FORMAT
//     if (!phone.startsWith("91")) {
//       phone = "91" + phone;
//     }

//     console.log("📞 Sending to:", phone);

//     const response = await axios.post(
//       "https://app.messageautosender.com/api/v1/message/create",
//       {
//         api_key: process.env.WHATSAPP_API_KEY,
//         number: phone,
//         message: message
//         // ⚠️ some accounts need sender (check below)
//         // sender: "DEVICE_NAME"
//       },
//       {
//         headers: {
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     console.log("✅ WhatsApp API Response:", response.data);

//     return response.data;

//   } catch (error) {
//     console.log("❌ WhatsApp Error:", error.response?.data || error.message);
//     throw error;
//   }
// };


// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// export const sendWhatsApp = async (number, message) => {
//   try {
//     console.log("🚀 WhatsApp function started");

//     if (!number) throw new Error("Phone number missing");

//     // ✅ Clean number
//     let phone = number.toString().replace(/\D/g, "");
//     phone = phone.replace(/^0+/, "");

//     if (!phone.startsWith("91")) {
//       phone = "91" + phone;
//     }

//     console.log("📞 Final Phone:", phone);

//     // 🔥 IMPORTANT: SEND DATA IN PARAMS (NOT BODY)
//     const response = await axios.get(
//       "https://app.messageautosender.com/api/v1/message/create",
//       {
//         params: {
//           username: process.env.WHATSAPP_USERNAME,
//           password: process.env.WHATSAPP_PASSWORD,
//           api_key: process.env.WHATSAPP_API_KEY,
//           receiverMobileNo: phone,
//           message: message,
//           sender: "2026-03-06T14:11:19.436720335" // 👉 change this to your real device name
//         }
//       }
//     );

//     console.log("✅ WhatsApp SUCCESS:", response.data);

//     return response.data;

//   } catch (error) {
//     console.log("❌ WhatsApp ERROR:");
//     console.log(error.response?.data || error.message);
//     throw error;
//   }
// };

// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// export const sendWhatsApp = async (number, message) => {
//   try {
//     console.log("🚀 WhatsApp function started");

//     let phone = number.toString().replace(/\D/g, "");

//     // keep 10 digit
//     if (phone.startsWith("91")) {
//       phone = phone.slice(2);
//     }

//     console.log("📞 Phone:", phone);

//     const response = await axios.post(
//       "https://app.messageautosender.com/api/v1/message/create",
//       {
//         receiverMobileNo: phone,
//         message: message
//       },
//       {
//         params: {
//           username: process.env.WHATSAPP_USERNAME,
//           password: process.env.WHATSAPP_PASSWORD,
//           api_key: process.env.WHATSAPP_API_KEY
//         },
//         headers: {
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     console.log("✅ WhatsApp Sent:", response.data);

//     return response.data;

//   } catch (error) {
//     console.log("❌ WhatsApp ERROR:");
//     console.log(error.response?.data || error.message);
//   }
// };

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendWhatsApp = async (number, message) => {
  try {
    console.log("🚀 WhatsApp function started");

    if (!number) {
      console.log("❌ No phone number provided");
      return;
    }

    let phone = number.toString().replace(/\D/g, "");

    // ✅ Ensure India code
    if (!phone.startsWith("91")) {
      phone = "91" + phone;
    }

    console.log("📞 Final Phone:", phone);

    const response = await axios.post(
      "https://app.messageautosender.com/api/v1/message/create",
      {
        receiverMobileNo: String(phone),
        message: String(message),
      },
      {
        params: {
          username: process.env.WHATSAPP_USERNAME,
          password: process.env.WHATSAPP_PASSWORD,
          api_key: process.env.WHATSAPP_API_KEY,
        },
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000, // ✅ avoid hanging
      }
    );

    console.log("✅ WhatsApp Sent:", response.data);

    return response.data;

  } catch (error) {
    console.log("❌ WhatsApp ERROR:");

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
    } else {
      console.log(error.message);
    }
  }
};