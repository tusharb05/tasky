import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import SingleMessage from "./SingleMessage";
import { BsFillSendFill } from "react-icons/bs";

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
    setText("");
  };

  // console.log(localStorage.getItem("auth-token"));

  return (
    <div className="h-full w-full">
      <h1 className=" h-[10%] text-white text-2xl flex justify-center m-0 p-0 my-auto py-2.5">
        Chat with the members
      </h1>

      <div id="container" className="relative h-[90%]">
        <div id="chats" className="h-[500px]  overflow-y-auto">
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

        <div id="chat-form" className="">
          <form onSubmit={(e) => handleSubmit(e)} className="w-full px-10">
            <input
              type="text"
              placeholder="Enter your message"
              className="h-10 w-[65%] p-1 mr-5 bg-inherit text-md border-[#83d5f9] border-solid border-b-2 focus:outline-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              // className="bg-inherit border-[#83d5f9] border-solid border-2 h-1/2 my-auto p-1 px-10 rounded-lg hover:border-[#4dc9ff]"
            >
              <BsFillSendFill className="text-[#83d5f9]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
