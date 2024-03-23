const express = require('express');
const Course = require('./../models/courseModel.js');
const factory = require('./handlerFactory');

exports.getAllCourses = factory.getAll(Course);
exports.getCourse = factory.getOne(Course);
exports.createCourse = factory.createOne(Course);
exports.deleteCourse = factory.deleteOne(Course);
exports.updateCourse = factory.updateOne(Course);

exports.getAllAssignments = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const assignments = course.assignments;

    res.json({ assignments });
  } catch (error) {
    next(error);
  }
};
