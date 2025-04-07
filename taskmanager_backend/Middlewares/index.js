const { ApiResponse } = require("../Helpers");
const User = require("../Models/User/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const models = [User];


// For User authenticated Routes
exports.userRoute = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];
  try {
    if (!token) {
      return res.status(403).json(ApiResponse({}, "Access Forbidden", false));
    }
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    let user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json(ApiResponse({}, "Unauthorized Access", false));
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send(ApiResponse({}, "Invalid Token, Please sign in again", false));
  }
};

// For Admin Routes
exports.adminRoute = async (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["authorization"];
    try {
      if (!token) {
        return res.status(403).json(ApiResponse({}, "Access Forbidden", false));
      }
      const decoded = jwt.verify(
        token.replace("Bearer ", ""),
        process.env.JWT_SECRET
      );
      if (!decoded.isAdmin) {
        return res
          .status(401)
          .json(ApiResponse({}, "Unauthorized Access", false));
      }
      let admin = await User.findById(decoded._id).select("-password");
      if (!admin) {
        return res
          .status(401)
          .json(ApiResponse({}, "Unauthorized Access", false));
      }
      req.user = admin;
      next();
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .send(ApiResponse({}, "Invalid Token, Please sign in again", false));
    }
  };
  
  // For Authenticated Routes
  exports.authenticatedRoute = async (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["authorization"];
    if (!token) {
      return res.status(403).json(ApiResponse({}, "Access Forbidden", false));
    }
    try {
      const decoded = jwt.verify(
        token.replace("Bearer ", ""),
        process.env.JWT_SECRET
      );
      let user = null;
      for (const model of models) {
        user = await model.findById(decoded._id).select("-password");
        if (user) {
          break;
        }
      }
      if (!user) {
        return res
          .status(401)
          .json(ApiResponse({}, "Unauthorized Access", false));
      }
      if (user.status === "INACTIVE") {
        return res
          .status(403)
          .json(ApiResponse({}, "Account is Not Approved", false));
      }
      req.user = user;
      next();
    } catch (err) {
      return res
        .status(401)
        .json(ApiResponse({}, "Invalid Token, Please sign in again", false));
    }
  };