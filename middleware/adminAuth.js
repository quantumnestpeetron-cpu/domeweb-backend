// import jwt from "jsonwebtoken";

// export const adminAuth = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token" });

//   try {
//     jwt.verify(token, process.env.ADMIN_SECRET);
//     next();
//   } catch {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// import jwt from "jsonwebtoken";
// import Admin from "../models/Admin.js";
// import Reseller from "../models/Reseller.js";

// export const protect = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "Not authorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     let user = await Admin.findById(decoded.id);
//     if (!user) {
//       user = await Reseller.findById(decoded.id);
//     }

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();

//   } catch (err) {
//     res.status(401).json({ message: "Token failed" });
//   }
// };

// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role) && req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     next();
//   };
// };

// // ✅ BACKWARD COMPATIBILITY (VERY IMPORTANT)
// export const adminAuth = protect;

// import jwt from "jsonwebtoken";
// import Admin from "../models/Admin.js";
// import Reseller from "../models/Reseller.js";

// /* ================= PROTECT ================= */
// export const protect = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     let user = await Admin.findById(decoded.id);
//     let role = "admin";

//     if (!user) {
//       user = await Reseller.findById(decoded.id);
//       role = "reseller";
//     }

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user;
//     req.user.role = role; // ✅ FORCE ROLE

//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Token invalid" });
//   }
// };

// /* ================= ADMIN ONLY ================= */
// export const adminAuth = async (req, res, next) => {
//   await protect(req, res, async () => {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Admin access only" });
//     }
//     next();
//   });
// };

// /* ================= OPTIONAL ROLE AUTH ================= */
// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     next();
//   };
// };

// import jwt from "jsonwebtoken";
// import Admin from "../models/Admin.js";
// import Reseller from "../models/Reseller.js";

// /* ================= COMMON AUTH ================= */
// export const protect = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     let user;

//     // ✅ Try role-based first
//     if (decoded.role === "admin") {
//       user = await Admin.findById(decoded.id);
//       if (user) {
//         req.user = user;
//         req.user.role = "admin";
//         return next();
//       }
//     }

//     if (decoded.role === "reseller") {
//       user = await Reseller.findById(decoded.id);
//       if (user) {
//         req.user = user;
//         req.user.role = "reseller";
//         return next();
//       }
//     }

//     // ✅ Fallback (no role in token)
//     user = await Admin.findById(decoded.id);
//     if (user) {
//       req.user = user;
//       req.user.role = "admin";
//       return next();
//     }

//     user = await Reseller.findById(decoded.id);
//     if (user) {
//       req.user = user;
//       req.user.role = "reseller";
//       return next();
//     }

//     return res.status(401).json({ message: "User not found" });

//   } catch (err) {
//     console.error("Auth Error:", err.message);
//     return res.status(401).json({ message: "Token invalid" });
//   }
// };

// /* ================= ADMIN ONLY ================= */
// export const adminAuth = (req, res, next) => {
//   protect(req, res, () => {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Admin access only" });
//     }
//     next();
//   });
// };

// /* ================= ROLE BASED ================= */
// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!req.user || !roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     next();
//   };
// };

import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Reseller from "../models/Reseller.js";

/* ================= COMMON AUTH ================= */
export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;

    // ✅ Check role from token
    if (decoded.role === "admin") {
      user = await Admin.findById(decoded.id);
    } else if (decoded.role === "reseller") {
      user = await Reseller.findById(decoded.id);
    } else {
      return res.status(401).json({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ✅ PRODUCTION SECURITY: trust DB role
    req.user = user;
    req.user.role = user.role || decoded.role;

    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    return res.status(401).json({ message: "Token invalid" });
  }
};

/* ================= ADMIN ONLY ================= */
export const adminAuth = (req, res, next) => {
  protect(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }
    next();
  });
};

/* ================= ROLE BASED ================= */
export const authorize = (...roles) => {
  return (req, res, next) => {
    protect(req, res, () => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    });
  };
};