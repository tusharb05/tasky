const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  members: [memberSchema],
  creationDate: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const task = mongoose.model('tasks', taskSchema);

module.exports = task;