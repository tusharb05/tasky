import React, { useEffect, useState } from "react";

const SingleTask = ({ task }) => {
  // console.log(task);
  const [completed, setCompleted] = useState(task.completed);

  const handleChange = () => {
    fetch("http://localhost:5000/api/tasks/completetask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId: task._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg !== null) {
          alert(data.msg);
        }
      });
    setCompleted(!completed);
  };

  return (
    <div
      className={`flex align-middle justify-between px-5 mb-2 w-[90%] mx-auto rounded-md py-2 ${
        completed ? "bg-[#4dbc4d]" : "bg-[#416a7aa0] backdrop-blur-sm"
      }`}
    >
      {/* bg-[#FFFFFF1C] rounded-[16px] m-2 p-2 shadow-[0_4px_30px_rgba(0, 0, 0,
      0.1)] */}
      <div className="">
        <p className="mb-2">{task.title}</p>
        <p>{task.description}</p>
      </div>
      <div className="flex justify-center align-middle">
        <input
          type="checkbox"
          name=""
          id=""
          className={`h-4 w-4 my-auto bg-slate-500 border-none`}
          checked={completed}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SingleTask;
