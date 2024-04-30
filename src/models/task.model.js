const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", taskSchema);
