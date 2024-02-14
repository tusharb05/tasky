const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  id: mongoose.ObjectId
})

const projectSchema = new mongoose.Schema({

  members: [memberSchema],

})

const project = mongoose.model("projects", projectSchema);

module.exports = project