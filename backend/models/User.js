const mongoose = require("mongoose");

const arraySchema = new mongoose.Schema({
  projectId: mongoose.Schema.Types.ObjectId,
  owner: Boolean
  // id: mongoose.ObjectId
})

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  projects: {
    type: [arraySchema],
    default: []
  }
})

const user = mongoose.model("users", userSchema);

module.exports = user