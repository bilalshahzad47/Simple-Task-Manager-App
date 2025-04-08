const express = require("express");
const router = express.Router();
const { signupValidator , loginValidator , profileValidator} = require("../../Validators/userValidator/index");
const { signup , login , dashboardInfo , getUsers, getMyProfile, createProfile} = require("../../Controllers/User/index");
const { userRoute} = require("../../Middlewares/index");
const { uploadFile } = require("../../Middlewares/upload")

router.post("/signup", signupValidator, signup)                // http://localhost:3020/api/user/signup
router.post("/login", loginValidator, login);                  // http://localhost:3020/api/user/login
router.get("/dashboard", userRoute, dashboardInfo )     // http://localhost:3020/api/user/dashboard
router.get("/getUsers", userRoute , getUsers )        // http://localhost:3020/api/user/getUsers
router.get("/getMyProfile", userRoute , getMyProfile)          // http://localhost:3020/api/user/getMyProfile
router.post('/createProfile', userRoute, uploadFile, profileValidator, createProfile )    // http://localhost:3020/api/user/createProfile

module.exports = router;