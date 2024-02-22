const {Server} = require("socket.io")
const Chat = require("../models/Chat")

module.exports = function(server) {
  const io = new Server(server,{
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    }
  })
    
  
  let roomId;
  io.on("connection", (socket)=>{
    
    console.log();
    console.log("user connected", socket.id);


    socket.on("join_room_id", async ({projectId})=>{

      socket.join(projectId);
      roomId = projectId;
      console.log(projectId)
      const chats = await Chat.findOne({projectId});
      socket.emit("get_chats", chats);
      
    })

    socket.on("send_message", async ({projectId, text, senderName, senderId}) => {
      const c = await Chat.findOne({projectId});
      if (c==null) {
        await Chat.create({projectId, chats:[]});
      }
      const chat = await Chat.updateOne({projectId}, {$push: {chats: {text,senderName, senderId}}})
      const chats = await Chat.findOne({projectId});
      console.log(chat)
      io.to(projectId).emit('get_chats', chats)
      socket.emit("get_chats", chats);
    })


  })

}
