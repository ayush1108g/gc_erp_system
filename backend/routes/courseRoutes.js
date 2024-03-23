const express = require("express");
const courseController = require('../controllers/courseController');

const router = express.Router();
router
    .route('/:id')
    .get(courseController.getCourse)
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse);

router
    .route("/")
    .post(courseController.createCourse)
    .get(courseController.getAllCourses);


module.exports = router;