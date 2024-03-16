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
        <div className="flex justify-between mx-4 mb-5">
          <h1 className="text-2xl">Members</h1>
          <button
            className="bg-[#f06b6b] text-white p-1.5 rounded-md hover:bg-[#f07777] h-[65%] "
            onClick={() => setShowForm(true)}
          >
            Add Member
          </button>
        </div>
      )}

      <div className="overflow-y-auto">
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
