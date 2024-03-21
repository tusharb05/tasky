const express = require("express");
const z = require("zod");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middlewares/fetchUser");
require('dotenv').config();

const router = express.Router();

const userSchema = z.object({
  fname: z.string(),
  lname: z.string(),
  email: z.string().email(),
  password: z.string().min(5)
}).required();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5)
}).required();



router.post("/createuser", async (req,res)=>{
  // console.log(process.env.JWT_KEY)
  const user = userSchema.safeParse(req.body);
  if (!user.success) {
    console.log(user.error)
    return res.status(400).json({msg: "wrong input"});
  }
  try {
    const findUser = await User.findOne({email:user.data.email});
    // const findUser = await User.findOne({email:req.body.user.email})
    // console.log(findUser);
    if (findUser!=null) { 
      return res.json({msg: "an account same email exists"})
    }

    const userSave = await User.create(user.data);
    // console.log(user.data)
    // const userSave = await User.create({
    //   fname: 'a',
    //   lname: 'b',
    //   email: 'ab@g.com',
    //   password: 'abcde',
    //   tasks: [{id:'a'}, {id:'b'}]
    // });

    const token = jwt.sign({id: userSave._id}, process.env.JWT_KEY);
    res.json({token});
    
  } catch (e) {
    res.json({msg: "some error occured"})
    console.log(e)
  }
  
})



router.post("/login", async(req,res)=> {
  // console.log(`email: ${email} and password: ${password}`);
  
  const {email, password} = req.body;
  const userLogin = loginSchema.safeParse({email,password});
  // console.log(userLogin)
  if (!userLogin.success) {
    return res.json({msg: "Wrong input"});
  }

  try {
    const user = await User.findOne({email, password});
    if(user===null) {
      return res.json({msg: "Invalid email or password"});
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_KEY);
    res.json({token});
    
  } catch (e) {
    res.json({msg: "some error occured"})
  }
  
})



router.get("/getuser", fetchUser, async(req,res)=>{
  // return res.json({id:req.body.id});
  try {
    let user = await User.findById(req.body.id);
    res.json(user)
  } catch (e) {
    res.status(500).json({msg:'error occured while fetching user data'})
  }
})

router.get("/getuserbyid", async (req,res)=>{
  let userId = req.header("userId");
  console.log(userId)
  try {
    let user = await User.findById(userId);
    console.log(user) 
    res.json({user })
  } catch (e) {
    res.json({msg:"something went wrong"});
    console.log(e.message)
  }
})

module.exports = router;
