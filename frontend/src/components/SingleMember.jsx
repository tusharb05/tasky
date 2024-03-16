import React from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";

const SingleMember = ({
  member,
  projectId,
  setMembers,
  setMemberListChanged,
}) => {
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
        setMemberListChanged((prev) => !prev);
      });
  };

  return (
    <>
      <div className="bg-[#416a7aa0] text-white rounded-lg m-2 pl-3 px-4 flex justify-between py-2">
        <div className="">
          <h1>{`${member.fname} ${member.lname}`}</h1>
          <h2>{member.email}</h2>
        </div>
        <div className="my-auto px-auto">
          <button
            // className="bg-[#ff6d63] p-1 rounded-md"
            onClick={deleteMember}
          >
            <RiDeleteBin7Fill className="text-[#d36860]" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleMember;
