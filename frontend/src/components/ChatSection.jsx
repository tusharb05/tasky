import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import SingleMessage from "./SingleMessage";

const ChatSection = ({ user, project }) => {
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const socket = useMemo(
    () => io("http://localhost:5000", { msg: "hello" }),
    []
  );

  // console.log(project, user);

  useEffect(() => {
    // console.log("hello");

    socket.on("connect", () => {
      setSocketId(socket.id);
      // console.log("connected", socket.id);
    });

    socket.emit("join_room_id", { projectId: project._id.toString() });

    socket.on("get_chats", (data) => {
      setMessages(data?.chats);
    });
    // -------------------------------------------

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("message sent");
    let senderName = user.fname + " " + user.lname;
    let senderId = user._id.toString();
    let projectId = project._id.toString();
    // console.log(text, senderName, senderId, projectId);
    socket.emit("send_message", { text, senderName, senderId, projectId });
  };

  // console.log(localStorage.getItem("auth-token"));

  return (
    <div className="h-full w-full">
      <h1 className="bg-[#989898] h-[10%] text-white text-2xl flex justify-center my-auto py-2.5">
        Chat with the members
      </h1>
      <div id="container" className="relative h-full w-full">
        <div id="chats" className="h-[80%]  overflow-scroll">
          {/* {console.log(messages.length)} */}
          {messages?.map((msg) => (
            <SingleMessage
              key={msg._id}
              chat={msg}
              user={user}
              project={project}
            />
          ))}
        </div>

        <div id="chat-form" className="absolute bottom-20 w-full">
          {/* <h1>form</h1> */}
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="p-0 m-0 flex justify-between px-10"
          >
            <input
              type="text"
              placeholder="Enter your message"
              className="w-5/6 py-1 px-2 rounded-md bg-[#ff749d] text-white placeholder-white text-xl font-medium"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#4b78ff] px-4 rounded-md text-white hover:bg-[#5983ff] text-xl"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
