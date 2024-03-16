import React, { useState } from "react";

const AddMemberPopup = ({ setShowForm, projectId }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    console.log("submitted");
    e.preventDefault();
    fetch("http://localhost:5000/api/projects/addmember", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberEmail: email, projectID: projectId }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        setShowForm(false);
      });
  };

  return (
    <>
      <div className="h-full p-2 px-4">
        <h1 className="text-2xl mb-5">Add member</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label className="text-xl">Enter email of the member</label>
          <br />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email of the member"
            className="mt-2 w-full p-1.5 rounded-md border-solid border-[#f6a4a4] border-2 focus:border-[#f6a4a4] mb-5 text-black"
          />
          <br />

          <button
            type="submit"
            className="w-full bg-[#f06b6b] rounded-md mt-4 p-1.5 text-white text-xl"
          >
            Add Member
          </button>
        </form>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="w-full bg-[#a1a1a1] rounded-md mt-4 p-1.5 text-white text-xl "
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default AddMemberPopup;
