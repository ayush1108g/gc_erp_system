const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  professor: {
    type: [String],
    required: true
  },
  schedule: [{
    day: String,
    time: String
  }],
  department: [{
    type: String,
    required: true
  }],
  semester: [{
    type: Number,
    required: true
  }],
  students_enrolled: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  assignments: [{
    assignment_id: {
      type: Schema.Types.ObjectId,
      ref: 'Assignment',
      auto: true
    },
    name: String,
    due_date: Date,
    total_marks: Number
  }],
  attendance_records: [{
    date: Date,
    present_students: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    absent_students: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  }],
  grades: [{
    student_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    assignment_id: {
      type: Schema.Types.ObjectId,
      ref: 'Assignment'
    },
    marks_obtained: Number,
    feedback: String
  }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;


// const mongoose = require('mongoose');

// const courseSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'A course must have a name!'],
//         unique: true,
//         trim: true,
//         maxLength: [40, 'Course name length should be less!'],
//     },
//     ratingAverage: {
//         type: Number,
//         default: 4.5,
//         min: [1, 'Rating should be from 1 to 5!'],
//         max: [5, 'Rating should be from 1 to 5!'],
//         set: val => Math.round(val*10) / 10
//     },
//     semester: {
//         type: Number,
//         required: [true, 'A course must have a semester number']
//     },
//     branch: {
//         type: [String],
//         required: [true, 'A course must have a branch!'],
//         trim: true,
//         maxLength: [40, 'Course name length should be less!'],
//     },
//     faculty: {
//         type: [String],
//         required: [true, 'A faculty must have a name!'],
//         trim: true,
//         maxLength: [40, 'name length should be less!'],
//     },
//     ratingsQuantity: {
//         type: Number,
//         default: 0
//     },
//     studentsEmail:{
//         type: [String]
//     }
//     // guides: [
//     //     {
//     //         type: mongoose.Schema.ObjectId,
//     //         ref: 'User'
//     //     }
//     // ]
// },
// {
//     toJSON: {virtuals: true},
//     toObject: {virtuals: true}
// }
// );

// const Course = mongoose.model('Course',courseSchema);

// module.exports = Course;