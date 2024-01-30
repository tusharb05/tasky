const mongoose = require("mongoose");

const arraySchema = mongoose.Schema({
  id: String
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
  tasks: [arraySchema]
})

const user = mongoose.model("users", userSchema);

module.exports = user