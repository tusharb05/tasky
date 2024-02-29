import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContextProvider";

const AddTaskPopup = ({ setShowForm, projectId, creatorId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user = useContext(AuthContext);
  // const creatorId = user.userData._id;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    fetch("http://localhost:5000/api/tasks/createtask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, projectId, creatorId }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    setShowForm(false);
  };

  return (
    <div className="h-full p-2 px-4">
      <h1 className="text-2xl mb-5">Add task</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="text-xl">Title</label>
        <br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title of the task"
          className="mt-2 w-full p-1.5 rounded-md border-solid border-[#f6a4a4] border-2 focus:border-[#f6a4a4] mb-5 text-black"
        />
        <br />
        <label className="text-xl">Description</label>
        <br />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description of the task"
          className="mt-2 w-full p-1.5 rounded-md border-solid border-[#f6a4a4] border-2 focus:border-[#f6a4a4] mb-4 text-black"
        />
        <br />
        <button
          type="submit"
          className="w-full bg-[#f06b6b] rounded-md mt-4 p-1.5 text-white text-xl"
        >
          Add task
        </button>
      </form>
      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="w-full bg-[#a1a1a1] rounded-md mt-4 p-1.5 text-white text-xl "
      >
        Cancel
      </button>
    </div>
  );
};

export default AddTaskPopup;
