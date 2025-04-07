const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
// const https = require("https");
const http = require("http");
const morgan = require("morgan");

const fs = require("fs");
// const { initializeWebSocket } = require("./Config/socket")

require("dotenv").config();

const { PORT } = process.env;

// app initialize
const app = express();

// db initialize
require("./Config/db");

//register middleware

const coreOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders:
    "Content-Type, Authorization, X-Requested-With, Accept, VERSION , params, headers",
  exposedHeaders:
    "Content-Type, Authorization, X-Requested-With, Accept, VERSION , params, headers",
};

app.use(cors(coreOptions));

app.use(morgan("dev"));

app.use(express.json());

const httpServer = http.createServer(app);

// initializeWebSocket(httpServer);

// limiting the api calls


const limiter = rateLimit({
  max: 1000000,

  windowMs: 60 * 60 * 1000,

  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

// static routes
app.use("/Uploads", express.static("./Uploads"));

// routes register

app.use("/api", require("./Routes/index"));

//test route

app.get("/", (req, res) => {
  res.send("Task Manager Server Running");
});

httpServer.listen(PORT, () => {
  console.log(`Task Manager backend Listening on port ${PORT}`);
});