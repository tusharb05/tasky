const express = require("express");
const router = express.Router();
const z = require("zod");
const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");
const mongoose = require("mongoose")

// get all tasks of a project
router.get("/gettasks", async (req,res)=>{
  const projectId = req.header("projectId");
  try {
    const tasks = await Task.find({projectId});
    res.json({tasks})  
  } catch (e) {
    res.json({msg: "Something went wrong!"})
    console.log(e.message)
  }
  
})

// create a task
router.post("/createtask", async (req,res)=>{
  const {title, description, projectId, creatorId} = req.body;
  const currentDate = new Date();
  // console.log(req.body)
  try {
    const task = await Task.create({title, description, projectId, creatorId, members:[], 
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

// mark a task as completed
router.post("/completetask", async (req,res)=>{
  const {taskId} = req.body;
  console.log(taskId);
  try {
    const task = await Task.findById(taskId);
    task.completed = !task.completed;
    task.save();
  } catch (e) {
    res.json({msg: "Something went wrong!"});
    console.log(e.message);
  }
})

module.exports = router;