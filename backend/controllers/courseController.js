const express = require("express");
const Course = require("./../models/courseModel.js");
const User = require("./../models/userModel.js");
const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("./../utils/apiFeatures");
const authentication = require("./authentication");

exports.getAllCourses = catchAsync(async (req, res) => {
  let filter = {};
  if (req.params.id) filter = { course: req.params.id };

  const features = new APIFeatures(Course.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.getCourse = catchAsync(async (req, res, next) => {
  let doc = await Course.find({ _id: req.params.id });
  // console.log(req.params.id);
  if (!doc) {
    return next(new AppError("No doc found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
exports.createCourse = catchAsync(async (req, res) => {
  const doc = await Course.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.deleteCourse = catchAsync(async (req, res) => {
  const doc = await Course.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No doc found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.updateCourse = catchAsync(async (req, res) => {
  const doc = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("No doc found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.getCourseFeedback = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    // Find the course by its ID and populate the feedback field to get associated feedback
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Extract feedback from the course object
    const feedback = course.feedback;

    res.status(200).json({ feedback });
  } catch (error) {
    next(error);
  }
};


exports.getAllAssignments = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const assignments = course.assignments;

    res.json({ assignments });
  } catch (error) {
    next(error);
  }
};

exports.enrolCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const courseId  = req.params.courseId;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is already enrolled in the course
    const isEnrolled = course.students_enrolled.some(student => student.equals(userId));
    if (isEnrolled) {
      return res.status(400).json({ message: 'User is already enrolled in this course' });
    }

    // Update the course model to add the user to the enrolled students list
    course.students_enrolled.push(userId);
    await course.save();

    user.courses_enrolled.push({
      course_id: courseId,
      enrollment_date: new Date(),
      status: 'enrolled'
    });
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: 'Enrollment successful', course, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


