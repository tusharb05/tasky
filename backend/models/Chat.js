const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: String,
  creationDate: {
    type: Date,
    default: Date.now()
  },
  senderName: String,
  senderId: mongoose.Schema.Types.ObjectId
})


const chatSchema = new mongoose.Schema({
  projectId: mongoose.Schema.Types.ObjectId,
  chats: {
    type: [messageSchema],
    default: []
  }
})

const chat = mongoose.model("chats", chatSchema)

module.exports = chat;