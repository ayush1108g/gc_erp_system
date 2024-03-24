// feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Route for writing feedback
router.post('/', feedbackController.writeFeedback);

// Route for getting all feedback
router.get('/', feedbackController.getAllFeedback);

module.exports = router;
