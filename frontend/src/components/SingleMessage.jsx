import React from "react";

const SingleMessage = ({ chat, user, project }) => {
  // console.log(chat);
  console.log(project);
  return (
    <div
      id="chat"
      className={`${
        user._id.toString() == chat.senderId.toString()
          ? "bg-[#aafbbd]"
          : "bg-[#99e2ff]"
      } ${
        project.owner.toString() == chat.senderId.toString() && "bg-[#ffa389]"
      } text-white mx-3 my-4 rounded-md px-5 py-2 `}
    >
      <p className="text-[#5a5a5a]">{chat.senderName}</p>
      <h1 className="text-[#272727]">{chat.text}</h1>
    </div>
  );
};

export default SingleMessage;
