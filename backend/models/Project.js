const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId
})

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  members: [memberSchema],

})

const project = mongoose.model("projects", projectSchema);

module.exports = project