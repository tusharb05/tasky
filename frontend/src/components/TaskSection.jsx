import React, { useEffect, useState } from "react";
import SingleTask from "./SingleTask";

const TaskSection = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks/gettasks", {
      headers: {
        projectId: projectId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks);
      });
  }, []);

  return (
    <div className="h-full w-full bg-[#e7dfdf] p-2">
      <div className="flex justify-between mt-2 mx-4">
        <h1 className="text-2xl">Tasks</h1>
        <button className="bg-[#f06b6b] text-white p-1.5 rounded-md hover:bg-[#f07777]">
          Add task
        </button>
      </div>

      <div className="mt-5" id="tasks">
        {tasks.map((task) => {
          return <SingleTask key={task._id} task={task} />;
        })}
      </div>
    </div>
  );
};

export default TaskSection;
