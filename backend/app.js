const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");
const cron = require("node-cron");
const https = require("https");
let cookieParser = require("cookie-parser");
const reteLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const app = express();

console.log("app");

const globalErrorHandler = require("./controllers/errorController");

const courseRouter = require("./routes/courseRoutes");
const userRouter = require("./routes/userRoutes");
const assignmentRouter = require("./routes/assignmentRoutes");

const AppError = require("./utils/appError");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("MORGAN");
}
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:8000",
      "https://ayush1108g.github.io",
    ],
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", [
    // "https://ayush1108g.github.io",
    "http://localhost:8000",
  ]);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.json({ limit: "200kb" }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

const backendUrl = "https://gc-erp-system.onrender.com";
cron.schedule("*/180 * * * * *", async function () {
  console.log("Restarting server");

  await https
    .get(backendUrl, (res) => {
      if (res.statusCode === 200) {
        console.log("Restarted");
      } else {
        console.error(`failed to restart with status code: ${res.statusCode}`);
      }
    })
    .on("error", (err) => {
      console.log("hi");
      console.error("Error ", err.message);
    });
});
app.get("/", (req, res) => {
  console.log("/ hi ");
  res.send("Hello");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/assignments", assignmentRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
