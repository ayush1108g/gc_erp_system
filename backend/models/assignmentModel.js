const mongoose = require('mongoose');

const { Schema } = mongoose;

const submissionSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  submissionFile: String,
  grade: {
    type: Number
  },
  comments: String
});

const assignmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  questionFile: String,
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
  submissions: [submissionSchema],
  doubts:[
    {
      message:{
        type: String,
        required:[true, 'Empty message!']
      },
      date: {
        type: Date,
        default: Date.now()
      },
      student_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    }
  ]
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
