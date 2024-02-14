import React, { useEffect, useState } from "react";
import SingleMember from "./SingleMember";

import AddMemberPopup from "./AddMemberPopup";

const MemberList = ({ projectId }) => {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/projects/getmembers/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setMembers(data.members);
        // console.log("MEMBERS: ", data.members);
      });
  }, [showForm, members]);

  return (
    <>
      {/* <div className="h-full w-full relative"> */}
      {!showForm && <h2 className="text-slate-700 pl-2">Members</h2>}
      {!showForm &&
        members.map((member) => (
          <SingleMember
            key={member._id}
            member={member}
            setMembers={setMembers}
            projectId={projectId}
          />
        ))}
      {!showForm && (
        <button
          className="bg-[#fc9b46] p-1.5 rounded-md w-full text-white"
          onClick={() => setShowForm((prev) => !prev)}
        >
          Add member
        </button>
      )}
      {showForm && (
        <AddMemberPopup setShowForm={setShowForm} projectId={projectId} />
      )}
      {/* </div> */}
    </>
  );
};

export default MemberList;
