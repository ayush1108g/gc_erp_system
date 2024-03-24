const Attendance = require("../models/attendanceModel");
const catchasync = require("../utils/catchAsync");
const Course = require("../models/courseModel");
const AppError = require("../utils/appError");

exports.createAttendence = catchasync(async (req, res, next) => {
  if (req.user.role !== "teacher") {
    return next(
      new AppError("You are not authorized to create attendence", 401)
    );
  }
  const { course_id, location, validtill } = req.body;
  const course = await Course.findById(course_id);
  if (!course) {
    return next(new AppError("Course not found", 404));
  }
  const attendance = await Attendance.create({
    course_id,
    createdBy: req.user._id,
    location,
    validtill: validtill || Date.now() + 1000 * 60 * 60,
  });

  Course.attendance_records.push(attendance._id);
  await Course.save({
    validateBeforeSave: false,
  });

  res.status(201).json({
    status: "success",
    data: {
      attendance,
    },
  });
});

exports.deleteAttendance = catchasync(async (req, res, next) => {
  if (req.user.role !== "teacher") {
    return next(
      new AppError("You are not authorized to create attendence", 401)
    );
  }

  const attendance = await Attendance.findById(req.params.attendance_id);

  if (!attendance) {
    return next(new AppError("Attendance not found", 404));
  }

  const course = await Course.findById(attendance.course_id);
  if (course) {
    course.attendance_records.pull(attendance._id);
    await course.save({ validateBeforeSave: false });
  }

  const delattendance = await Attendance.findByIdAndDelete(
    req.params.attendance_id
  );

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.isActive = catchasync(async (req, res, next) => {
  const course_id = req.body.course_id;
  const attendance = await Attendance.findOne({
    course_id,
    validtill: { $gt: Date.now() },
  });
  if (!attendance) {
    return next(new AppError("Attendance is not active", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      attendance,
    },
  });
});

exports.markAttendance = catchasync(async (req, res, next) => {
  const attendance = await Attendance.findById(req.body.attendance_id);
  console.log(attendance);
  if (!attendance) {
    return next(new AppError("Attendance not found", 404));
  }
  if (new Date(attendance.validtill) < Date.now()) {
    return next(new AppError("Attendance is expired", 400));
  }

  const student_id = req.user._id;
  const status = req.body.status;
  const attendanceRecord = {
    student_id,
    status,
  };
  attendance.attendance_records.push(attendanceRecord);
  await attendance.save({
    validateBeforeSave: false,
  });
  res.status(200).json({
    status: "success",
    data: {
      attendance,
    },
    message: "Attendance marked",
  });
});
