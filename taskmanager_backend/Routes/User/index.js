const express = require("express");
const router = express.Router();
const { signupValidator , loginValidator , profileValidator} = require("../../Validators/userValidator/index");
const { signup , login , dashboardInfo , getUsers, getUserById, getMyProfile, updateMyProfile, createProfile} = require("../../Controllers/User/index");
const { adminRoute, userRoute, authenticatedRoute } = require("../../Middlewares/index");
// const { uploadFile } = require("../../Middlewares/upload")

router.post("/signup", signupValidator, signup)                // http://localhost:3020/api/user/signup
router.post("/login", loginValidator, login);                  // http://localhost:3020/api/user/login
router.get("/admin/dashboard", adminRoute, dashboardInfo )     // http://localhost:3020/api/user/admin/dashboard
router.get("/getUsers", authenticatedRoute , getUsers )        // http://localhost:3020/api/user/getUsers
router.get("/admin/getUser/:id", adminRoute , getUserById )    // http://localhost:3020/api/user/admin/getUser/:id
router.get("/getMyProfile", userRoute , getMyProfile)          // http://localhost:3020/api/user/getMyProfile
router.put("/updateMyProfile", userRoute, updateMyProfile)     // http://localhost:3020/api/user/updateMyProfile
router.post('/createProfile', userRoute, profileValidator, createProfile )    // http://localhost:3020/api/user/createProfile

module.exports = router;