const { body, validationResult, check } = require("express-validator");
const { ApiResponse } = require("../../Helpers");

// Add New User Validator
exports.signupValidator = [
  check("email", "Email is Required")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Email is Invalid"),
  body("firstName").not().isEmpty().withMessage("First Name is Required"),
  body("lastName").not().isEmpty().withMessage("Last Name is Required"),
  body("mobile")
    .not()
    .isEmpty()
    .withMessage("Mobile Number is Required")
    .isNumeric().withMessage('Mobile Number must be a Valid Number'),
  body("password").not().isEmpty().withMessage("Password is Required"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(ApiResponse({}, errors.array()[0].msg, false));
    }
    next();
  },
];

// Login User Validator
exports.loginValidator = [
  check("email", "Email is Required")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Email is Invalid"),
  body("password").not().isEmpty().withMessage("Password is Required"),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(ApiResponse({}, errors.array()[0].msg, false));
    }
    next();
  },
];


// User Profile Validator
exports.profileValidator = [
    body("email").not().isEmpty().withMessage("Email is Required"),
    body("fullName").not().isEmpty().withMessage("Full Name is Required"),
    body("image").not().isEmpty().withMessage("Image is Required"),
    body("gender")
      .not()
      .isEmpty()
      .withMessage("Gender is Required")
      .isIn(["MALE", "FEMALE", "OTHERS"])
      .withMessage("Invalid Gender Value"),
    body("dateOfBirth").not().isEmpty().withMessage("Date Of Birth is Required"),
    body("phone")
      .not()
      .isEmpty()
      .withMessage("Phone is Required")
      .isNumeric()
      .withMessage("Phone must be a Valid Number"),
    function (req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(ApiResponse({}, errors.array()[0].msg, false));
      }
      next();
    },
  ];