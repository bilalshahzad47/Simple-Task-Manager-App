const express = require("express");
const router = express.Router();

router.use("/user", require("./User/index"));
router.use("/task", require("./Task/index"));


module.exports = router;