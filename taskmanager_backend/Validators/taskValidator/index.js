const { body, validationResult, check } = require("express-validator");
const { ApiResponse } = require("../../Helpers/index");

// Add Task Validator
exports.addTaskValidator = [
  body("title").not().isEmpty().withMessage("Task title is Required"),
  body("description").not().isEmpty().withMessage("Description is Required"),
  body("date").not().isEmpty().withMessage("Date is Required"),
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