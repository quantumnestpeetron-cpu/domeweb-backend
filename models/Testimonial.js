// import mongoose from "mongoose";

// const testimonialSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     role: {
//       type: String,
//       required: true,
//     },

//     image: {
//       type: String,
//       default:
//         "https://cdn-icons-png.flaticon.com/512/149/149071.png",
//     },

//     text: {
//       type: String,
//       required: true,
//     },

//     rating: {
//       type: Number,
//       default: 5,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Testimonial", testimonialSchema);

// models/Testimonial.js

import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    img: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },

    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Testimonial",
  testimonialSchema
);