const router = require("express").Router();
const Chat = require("../models/Chat");

router.get("/getchats", async (req,res)=>{
  const projectId = req.header("projectId");
  const chats = await Chat.findOne({projectId});
  res.json(chats)
})

module.exports = router;