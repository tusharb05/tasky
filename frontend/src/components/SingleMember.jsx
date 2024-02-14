import React from "react";

const SingleMember = ({ member, projectId, setMembers }) => {
  const deleteMember = () => {
    console.log(projectId);
    fetch(`http://localhost:5000/api/projects/removemember`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: projectId,
        memberId: member._id.toString(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMembers(data.members);
        alert(data.msg);
      });
  };

  return (
    <>
      <div className="bg-[#e7dfdf] text-black rounded-sm m-2 pl-3 px-2 grid grid-cols-6 py-2">
        <div className="col-span-4">
          <h1>{`${member.fname} ${member.lname}`}</h1>
          <h2>{member.email}</h2>
        </div>
        <div className="col-span-2 my-auto  text-white px-auto">
          <button
            className="bg-[#ff6d63] p-0.5 px-2 rounded-md"
            onClick={deleteMember}
          >
            remove
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleMember;
