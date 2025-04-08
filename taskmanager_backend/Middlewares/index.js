const { ApiResponse } = require("../Helpers");
const User = require("../Models/User/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// For User authenticated Routes
exports.userRoute = async (req, res, next) => {
  try {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader && tokenHeader.startsWith("Bearer ")
      ? tokenHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(403).json(ApiResponse({}, "Access Forbidden", false));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json(ApiResponse({}, "Unauthorized Access", false));
    }

    req.user = user; // Attach user to request for access in controller
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res
      .status(401)
      .json(ApiResponse({}, "Invalid or expired token. Please sign in again.", false));
  }
};