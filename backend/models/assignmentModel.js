const mongoose = require('mongoose');

const { Schema } = mongoose;

const submissionSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  comments: String
});

const assignmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  total_marks: {
    type: Number,
    required: true
  },
  submissions: [submissionSchema]
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
