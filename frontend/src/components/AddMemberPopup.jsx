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
      <div className="h-full w-100%">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Enter email of the member"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="bg-orange-400 p-2">
            Add
          </button>
          {/* <button onClick={() => console.log("clicked")}>Add</button> */}
        </form>

        <button className="m-20" onClick={() => console.log("hello, world")}>
          cancel
        </button>
      </div>
    </>
  );
};

export default AddMemberPopup;
