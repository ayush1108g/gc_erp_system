const express = require("express");
const assignmentController = require('../controllers/assignmentController');

const router = express.Router();

router
    .route("/")
    .post(assignmentController.addAssignment)
    .patch(assignmentController.updateStudentGrade);

router
    .route("/:assignmentId")
    .delete(assignmentController.deleteAssignment);

router
    .route("/submitAssignment")
    .post(assignmentController.addSubmissionFile);

router
    .route("/askDoubts")
    .post(assignmentController.addDoubt);

module.exports = router;