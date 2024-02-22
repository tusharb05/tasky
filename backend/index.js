const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");
const http = require("http");
const chatSocket = require("./routes/chats");

const app = express();

const PORT = 5000;

connectToMongo();

app.use(express.json());
app.use(cors({
  cors: {
    origin: "http://localhost:5173/"
  }
}));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"))
app.use("/api/chats", require("./routes/chatapi"))

// const server = http.createServer(app);
// chatSocket(server);


const {Server} = require("socket.io")

// const io = new Server(server,{
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   }
// })
  

// io.on("connection", (socket)=>{
//   console.log("user connected", socket.id)
// })



const server = app.listen(PORT, ()=>console.log(`SERVER RUNNING ON PORT ${PORT}`));

chatSocket(server)
// const io = new Server(server,{
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   }
// })
  

// io.on("connection", (socket)=>{
//   console.log("user connected", socket.id)
// })

