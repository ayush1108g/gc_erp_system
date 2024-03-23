const express = require('express');
const Course = require('./../models/courseModel.js');
const factory = require('./handlerFactory');

exports.getAllCourses = factory.getAll(Course);
exports.getCourse = factory.getOne(Course);
exports.createCourse = factory.createOne(Course);
exports.deleteCourse = factory.deleteOne(Course);
exports.updateCourse = factory.updateOne(Course);

