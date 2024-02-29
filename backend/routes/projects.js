const express = require("express");
const z = require("zod");
const Project = require("../models/Project");
const User = require("../models/User");
const Chat = require("../models/Chat");
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
    const updateList = await User.findOneAndUpdate({_id:owner}, {$push:{projects: {projectId: project._id, owner: true}}})
    const chat = await Chat.create({projectId:project._id, chats: []});
    res.json({...project});
  } catch(e) {
    res.json({msg: "Some error occured on our side"});
    console.log(e.message)
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

async function getAllProjects (arr)  {
  let list = [];
  for (let i=0; i<arr.length; i++) {
    let singleProject = await Project.findById(arr[i].projectId);
    // console.log(singleProject)
    singleProject = {...singleProject, isOwner: arr[i].owner};
    // list.push(singleProject)
    list.push({project: singleProject, isOwner:arr[i].owner});
  }
  // console.log(list)
  return list;
}

// get all projects where user is owner
router.get("/getownerprojects", fetchUser, async (req,res) => {
  try {
    // console.log('hello: ', req.body)
    const user = await User.findById(req.body.id)
    // res.json({userId:req.body.id})
    // res.json({projects: user.projects})

    let projects = await getAllProjects(user.projects);
    // console.log(projects)
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

    member.projects = [{projectId:new mongoose.Types.ObjectId(projectID), owner:false},...member.projects];
    member.save();
    
    // console.log("MEMBER ID: ", new mongoose.Types.ObjectId(member.id))
    // const memberSaved = await Project.findByIdAndUpdate(projectID, {$push: {members: new mongoose.Types.ObjectId(member.id)}});
    const id = new mongoose.Types.ObjectId(member.id);
    console.log(id)

    const project = await Project.findById(projectID);
    project.members = [{id}, ...project.members];
    project.save();

    // Mongoose.Types.ObjectId
    res.json({msg: id});
  }catch (e) {
    res.json({msg: "Some error occured on our side"});
    console.log(e)
  }
})

// remove a team member from a project
router.post("/removemember", async (req,res)=>{
  // console.log("asdf")
  const {projectId, memberId} = req.body;
  
  const project = await Project.findById(projectId);
  let newMembers = project.members.filter(member => member.id.toString()!==memberId)
  // res.json({newMembers})
  const newProject = await Project.findByIdAndUpdate(projectId, {members: newMembers});
  res.json({members: newMembers, msg:"member removed"})
})


async function getMembers(members) {
  let list = []
  for (let i=0; i<members.length; i++) {
    // console.log(members[i].id)
    let user = await User.findById(members[i].id);
    list.push(user);
  }
  return list;
}

// get all team members working for the project
router.get("/getmembers/:projectId", async (req,res)=>{
  const projectID = req.params.projectId
  try {
    const project = await Project.findById(projectID)
    const members = project.members;
    let list = await getMembers(members)
    return res.json({members: list})
  }catch (e) {
    res.json({msg: "Some error occured on our side"});
    console.log(e)
  }
})

// get a project
router.get("/getproject/:projectId", async (req,res)=>{
  // console.log(req.params.projectId)
  try {
    const project = await Project.findById(req.params.projectId);
    res.json({project})
  } catch (e) {
    res.json({msg: "project not found"})
  }
})



module.exports = router;
