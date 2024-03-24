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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const globalErrorHandler = require("./controllers/errorController");
const authController = require("./controllers/authentication");

const userRouter = require("./routes/userRoutes");
const courseRouter = require("./routes/courseRoutes");
const feedbackRouter = require("./routes/feedbackRoutes");
const assignmentRouter = require("./routes/assignmentRoutes");
const assignmentFileRouter = require("./routes/assignmentFileRoutes");
const inventoryRouter = require("./routes/inventoryRoutes");
const attendanceRouter = require("./routes/attendanceRoutes");

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
  res.send("Hello");
});

app.use("/api/v1/users", userRouter);

//middleware to check if the user is logged in
app.use(authController.protect);

app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/assignments", assignmentRouter);
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/submitAssignment", assignmentFileRouter);
app.use("/api/v1/inventory", inventoryRouter);
app.use("/api/v1/attendance", attendanceRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
