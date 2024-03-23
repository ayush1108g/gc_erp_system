// writeFeedbackController.js
const Feedback = require('../models/feedbackModel');
const Course = require('../models/courseModel');

exports.writeFeedback = async (req, res, next) => {
  try {
    const { student_id, course_id, rating, comments } = req.body;

    const feedback = new Feedback({
      student_id,
      course_id,
      rating,
      comments
    });

    await feedback.save();

    // Update course model with the new feedback
    await Course.findByIdAndUpdate(course_id, {
      $push: {
        feedback: {
          student_id,
          rating,
          comments
        }
      }
    });

    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    next(error);
  }
};


exports.getAllFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json({ feedback });
  } catch (error) {
    next(error);
  }
};
