const express = require("express");
const router = express.Router();
const z = require("zod");
const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");

// create a task
router.post("/createtask", async (req,res)=>{
  const {title, description, projectId, creatorId, members} = req.body;
  const currentDate = new Date();

  try {
    const task = await Task.create({title, description, projectId, creatorId, members, 
      creationDate:`${currentDate.getDate().toString()}-${currentDate.getMonth().toString()}-${currentDate.getFullYear()}`});

    res.json(task);
  } catch (e) {
    res.json({msg: "something went wrong"})
    console.log(e)
  }
})

// update a task

// delete a task
router.delete("/deletetask", async (req,res)=>{
  const {projectId} = req.body;
  try {
    const task = await Task.deleteOne({projectId})

    res.json(task);
  } catch (e) {
    res.json({msg: "something went wrong"})
    console.log(e)
  }  
})

// add members to a task
router.put("/addmembers", async (req,res)=>{
  const {taskId, memberEmail} = req.body;

  try {
    const member = await User.findOne({email:memberEmail});
    if(member===null) {
      return res.json({msg: "No user with this email exists"})
    } 
    // console.log(member._id.toString(), projectID);
    // new mongoose.Mongoose.Types.ObjectId(projectID)
    // const task = await Task.findById(taskId);
    
    const memberSaved = await Task.findByIdAndUpdate(taskId, {$push: {members:member._id}});
    // Mongoose.Types.ObjectId
    res.json({memberSaved});
  }catch (e) {
    res.json({msg: "Some error occured on our side"});
    console.log(e)
  }
})

// remove members from tasks
router.delete("/removemember", async (req, res)=>{
  
})

module.exports = router;