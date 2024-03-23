const mongoose = require("mongoose");

const { Schema } = mongoose;

const attendanceRecordSchema = new Schema({
  student_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["present", "absent"],
    required: true,
  },
});

const attendanceSchema = new Schema({
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  validtill: {
    type: Date,
    default: Date.now + 1000 * 60 * 60,
  },
  attendance_records: [attendanceRecordSchema],
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
