const mongoose = require("mongoose");

const { Schema } = mongoose;

const announcementSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  time: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;
