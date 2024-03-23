const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

console.log("app");

const courseRouter = require('./routes/courseRoutes');
const userRouter = require('./routes/userRoutes');

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
app.get("/",(req,res)=>{
  console.log("/ hi ");
  res.send("Hello");
}
)

module.exports = app;
