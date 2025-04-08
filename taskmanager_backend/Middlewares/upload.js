const multer = require("multer");
const path = require("path");
const { ApiResponse } = require("../Helpers/index");

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    req.body.image = uniqueSuffix + path.extname(file.originalname);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

exports.uploadFile = function (req, res, next) {
  var upload = multer({
    storage: imageStorage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/gif" ||
        file.mimetype === "image/webp"
      ) {
        cb(null, true);
      } else if (!file) {
        cb(null, false);
        next();
      } else {
        cb(new Error("Image File Type not Allowed"), false);
      }
    },
  }).single("image");

  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json(ApiResponse({}, err.message, false));
    }
    next();
  });
};

