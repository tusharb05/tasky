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
      className={`flex align-middle justify-between px-5 mt-3 bg-[#befff0] w-[90%] mx-auto rounded-md py-2 ${
        completed && "bg-[#a8fb7e]"
      }`}
    >
      <div className="">
        <p className="mb-2">{task.title}</p>
        <p>{task.description}</p>
      </div>
      <div className="flex justify-center align-middle">
        <input
          type="checkbox"
          name=""
          id=""
          checked={completed}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SingleTask;
