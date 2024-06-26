import React, { useEffect, useState } from "react";
import SingleTask from "./SingleTask";
import AddTaskPopup from "./AddTaskPopup";

const TaskSection = ({ user, projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskUpdated, setTaskUpdated] = useState(false);

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
  }, [taskUpdated, showForm]);

  return (
    <>
      {!showForm && (
        <div className="h-full w-full p-2">
          <div className="flex justify-between mx-4 mb-5">
            <h1 className="text-2xl">Tasks</h1>
            <button
              className="bg-[#f06b6b] text-white p-1.5 rounded-md hover:bg-[#f07777] h-[65%] "
              onClick={() => setShowForm(true)}
            >
              Add task
            </button>
          </div>

          <div className="lg:h-[500px] md:h-[350px] overflow-y-auto" id="tasks">
            {tasks.map((task) => {
              return <SingleTask key={task._id} task={task} />;
            })}
          </div>
        </div>
      )}

      {showForm && (
        <AddTaskPopup
          setShowForm={setShowForm}
          projectId={projectId}
          setTaskUpdated={setTaskUpdated}
          creatorId={user._id}
        />
      )}
    </>
  );
};

export default TaskSection;
