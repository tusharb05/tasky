import React, { useEffect, useState } from "react";
import SingleMember from "./SingleMember";

import AddMemberPopup from "./AddMemberPopup";

const MemberList = ({ projectId }) => {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [memberListChanged, setMemberListChanged] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/projects/getmembers/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setMembers(data.members);
      });
  }, [showForm, memberListChanged]);

  return (
    <>
      {/* <div className="h-full w-full relative"> */}
      {!showForm && (
        <h2 className="text-slate-700 pl-2 absolute top-4">Members</h2>
      )}

      <div className="absolute top-11  w-[95%] h-[77%] overflow-scroll ">
        {!showForm &&
          members.map((member) => (
            <SingleMember
              key={member._id}
              member={member}
              setMembers={setMembers}
              projectId={projectId}
              setMemberListChanged={setMemberListChanged}
            />
          ))}
      </div>

      {!showForm && (
        <button
          className="bg-[#fc9b46] p-1.5 rounded-md w-3/5 text-white absolute bottom-10 right-auto left-1/2 -translate-x-1/2"
          onClick={() => setShowForm((prev) => !prev)}
        >
          Add member
        </button>
      )}
      {/* <div className=""> */}
      {showForm && (
        <AddMemberPopup setShowForm={setShowForm} projectId={projectId} />
      )}
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default MemberList;
