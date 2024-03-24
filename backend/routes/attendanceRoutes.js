const express = require("express");
const attendanceController = require("../controllers/attendanceController");

const router = express.Router();

router.route("/createAttendence").post(attendanceController.createAttendence);

router
  .route("/delete/:attendance_id")
  .delete(attendanceController.deleteAttendance);

router.route("/isActive").get(attendanceController.isActive);

router.route("/mark").post(attendanceController.markAttendance);

module.exports = router;
