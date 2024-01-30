const mongoose = require("mongoose");
const mongoURL = "mongodb://localhost:27017/taskyDB";


async function connectToMongo(){
  await mongoose.connect(mongoURL)
  console.log("connected to mongoDB")
}

module.exports = connectToMongo