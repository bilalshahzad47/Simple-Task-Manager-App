const mongoose = require("mongoose");
require("dotenv").config();

// const {NODE_ENV, DB_LOCAL, DB_CUSTOMDEV} = process.env
// const DB = NODE_ENV === "CustomDev" ? DB_CUSTOMDEV : DB_CUSTOMDEV

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Error in Database Connection", err);
  });

module.exports = mongoose;