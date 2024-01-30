const express = require("express");
const z = require("zod");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
  const user = userSchema.safeParse(req.body.user);
  if (!user.success) {
    return res.status(400).json({msg: "wrong input"});
  }

  try {

    const findUser = await User.findOne({email:user.data.email});
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
  // const token = req.body.token;
  // const decoded = jwt.verify(token, process.env.JWT_KEY, (err,decoded)=>{
  //   if (err) return false
  //   return decoded
  // });
  // console.log(decoded)
  // if (!decoded) {
  //   return res.json({msg: "invalid token"})
  // }

  const {email, password} = req.body;
  const userLogin = loginSchema.safeParse({email,password});
  if (!userLogin.success) {
    return res.status(400).json({msg: "wrong input"});
  }

  try {
    const user = await User.findOne({email, password});
    if(user===null) {
      return res.json({msg: "invalid email or password"});
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_KEY);
    res.json({token});
    
  } catch (e) {
    res.json({msg: "some error occured"})
  }
  
})

module.exports = router;
