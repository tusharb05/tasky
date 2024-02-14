import React, { useState } from "react";

const AddMemberPopup = ({ setShowForm, projectId }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
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
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            placeholder="Enter email of the member"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button type="submit">Add</button>
        </form>
        <button onClick={() => setShowForm((prev) => !prev)}>cancel</button>
      </div>
    </>
  );
};

export default AddMemberPopup;
