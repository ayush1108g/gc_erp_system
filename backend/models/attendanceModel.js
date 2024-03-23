const mongoose = require('mongoose');

const { Schema } = mongoose;

const attendanceRecordSchema = new Schema({
  student_id: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true
  }
});

const attendanceSchema = new Schema({
  course_id: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  attendance_records: [attendanceRecordSchema]
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
