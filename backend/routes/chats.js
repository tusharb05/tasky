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
      
      const chats = await Chat.findOne({projectId});
      socket.emit("get_chats", chats);
      // console.log(rooms)
    })

    socket.on("send_message", async ({projectId, text, senderName, senderId}) => {
      const chat = await Chat.updateOne({projectId}, {$push: {chats: {text,senderName, senderId}}})
      const chats = await Chat.findOne({projectId});
      io.to(projectId).emit('get_chats', chats)
      socket.emit("get_chats", chats);
    })
    // socket.on("")

    // io.to(Object.keys(io.of("/").adapter.rooms[socket.id])[1]).emit("greet", {msg:"hello"}) // doesn't work
    // -----------------------------------------------------------

    // socket.to("65d427f81cc2e2df9f68a0ba").emit("get_all_messages", async () => {
    //   const projectId = "65d427f81cc2e2df9f68a0ba"
    //   const chats = await Chat.findOne({projectId});
    //   console.log(socket)
    //   console.log(socket.rooms)
    //   return chats;
    // })
    
    
    // socket.on("send_message", async ({text, senderName, senderId, projectId}) => {
    //   const chat = await Chat.findOneAndUpdate({projectId:projectId},{$push: {chats:{text, senderName, senderId}}});
    //   console.log(chat);
    // })

  })

}

// return all the previous messages from the database
// listen for new messages - store it in the database and return the updated array of messages and emit the new array
// 