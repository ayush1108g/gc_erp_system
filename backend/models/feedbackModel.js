const mongoose = require('mongoose');

const { Schema } = mongoose;

const feedbackSchema = new Schema({
  student_id: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  feedback_type: {
    type: String,
    enum: ['course', 'professor', 'facility', 'event'],
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comments: String,
  submitted_at: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
