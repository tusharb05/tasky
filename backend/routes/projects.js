const express = require("express");
const z = require("zod");
const Project = require("../models/Project");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const mongoose = require("mongoose");
const fetchUser = require("../middlewares/fetchUser");

const router = express.Router();

// create a project
router.post("/create", async (req,res) => {
  const {title, description, owner} = req.body;
  try {
    const project = await Project.create({title,description,owner});
    res.json({...project});
  } catch(e) {
    res.json({msg: "Some error occured on our side"});
  }
})

// delete a project
router.delete("/delete", async (req,res) => {
  const {id} = req.body;
  try {
    const deleted = await Project.deleteOne({_id:id});
    res.json({...deleted})
  } catch (e) {
    res.json({msg: "Some error occured on our side"});
  }
})

// get all projects where user is owner
router.get("/getownerprojects", fetchUser, async (req,res) => {
  // const {ownerID} = req.body;
  try {
    // console.log('hello: ', req.body)
    const projects = await Project.find({owner:req.body.id});
    res.json({projects});
  } catch (e) {
    res.json({msg: "Some error occured on our side"});
  }
})

// get all projects where user is not owner

// add a team member to a project
router.post("/addmember", async (req,res) => {
  const {projectID, memberEmail} = req.body;

  try {
    const member = await User.findOne({email:memberEmail});
    if(member===null) {
      return res.json({msg: "No user with this email exists"})
    } 
    // console.log(member._id.toString(), projectID);
    // new mongoose.Mongoose.Types.ObjectId(projectID)
    const project = await Project.findById(projectID);
    
    const memberSaved = await Project.findByIdAndUpdate(projectID, {$push: {members:member._id}});
    // Mongoose.Types.ObjectId
    res.json({memberSaved});
  }catch (e) {
    res.json({msg: "Some error occured on our side"});
    console.log(e)
  }
})

// remove a team member from a project
router.post("/removemember", async (req,res)=>{
  const {projectID, memberEmail} = req.body;
})

// get all team members working for the project
router.get("/getmembers", async (req,res)=>{
  const {projectID} = req.body;
  try {
    const project = await Project.findById(projectID)
    const members = project.members;
    // console.log(members)
    let data = [];
    for (let i=0;i <members.length; i++) {
      // console.log(members[i]._id)
      const user = await User.findById(members[i]._id.toString());
      // console.log(user)
    }
  }catch (e) {
    res.json({msg: "Some error occured on our side"});
    console.log(e)
  }
})


module.exports = router;
