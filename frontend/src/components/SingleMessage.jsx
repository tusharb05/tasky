import React from "react";

const SingleMessage = ({ chat, user, project }) => {
  // console.log(chat);
  console.log(user);
  return (
    <div
      className={`relative w-full flex  flex-row ${
        user._id.toString() == chat.senderId.toString() && "flex-row-reverse"
      } ${
        project.owner.toString() == chat.senderId.toString() &&
        console.log("owner: ", chat.text)
      }`}
    >
      <div
        id="chat"
        className={`
        h-fit
        w-fit
        max-w-[70%]
      bg-[#ffffff0f]  text-white mx-3 my-1 rounded-md px-2 py-[0.2rem] 
        
      `}
      >
        <div
          className={`flex ${
            project.owner.toString() == chat.senderId.toString() &&
            "flex-row-reverse"
          }`}
        >
          <p
            className={`text-[#46ffa9]
        ${
          user._id.toString() == chat.senderId.toString()
            ? "text-[#46ffa9]"
            : "text-[#b8b7b7]"
        }
        ${
          project.owner.toString() == chat.senderId.toString() &&
          user._id.toString() != chat.senderId.toString() &&
          "text-[#ffa389]"
        } 
        
      `}
          >
            {chat.senderName}
          </p>
        </div>
        {/* owner-orange, normal-grey sender-green */}
        <h1 className="text-white">{chat.text}</h1>
      </div>
    </div>
  );
};

export default SingleMessage;
