const mongoose = require("mongoose");

const { Schema } = mongoose;

const equipmentInventorySchema = new Schema({
  equipment_name: {
    type: String,
    required: true,
  },
  total_quantity: {
    type: Number,
    required: true,
  },
  available_quantity: {
    type: Number,
    required: true,
  },
  issued_to: [{
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    issued_date: Date
  }],
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

const Equipment = mongoose.model("Equipment", equipmentInventorySchema);

module.exports = Equipment;
