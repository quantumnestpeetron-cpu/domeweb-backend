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