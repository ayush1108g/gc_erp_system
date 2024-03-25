const express = require("express");
const attendanceController = require("../controllers/attendanceController");

const router = express.Router();

router.route("/createAttendence").post(attendanceController.createAttendence);

router
  .route("/delete/:attendance_id")
  .delete(attendanceController.deleteAttendance);

router.route("/isActive").post(attendanceController.isActive);

router.route("/mark").post(attendanceController.markAttendance);

router.route("/getbycourse").post(attendanceController.getAttendancebyCourse);
router
  .route("/getpercent")
  .get(attendanceController.getAttendancePercentStudent);

module.exports = router;
