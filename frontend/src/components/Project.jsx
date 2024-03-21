import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const Project = ({ project, projectIndex }) => {
  const [ownerName, setOwnerName] = useState("");
  const [displayProject, setDisplayProject] = useState(true);
  const navigate = useNavigate();
  // redirect(`/project/${project._id.toString()}`)
  // console.log(project);
  // console.log(project);
  const handleClick = () => {
    navigate(`/project/${project.project._doc._id.toString()}`);
  };

  const getOwnerName = async (userId) => {
    let res = await fetch("http://localhost:5000/api/auth/getuserbyid", {
      method: "GET",
      headers: {
        userId: userId,
      },
    });
    let data = await res.json();
    setOwnerName(data.user.fname + " " + data.user.lname);
    return data.user.id;
  };

  useEffect(() => {
    if (project.isOwner) {
      setOwnerName("you");
      if (projectIndex == 2) {
        setDisplayProject(false);
      }
    } else {
      let id = getOwnerName(project.project._doc.owner);
      if (projectIndex == 1) {
        setDisplayProject(false);
      }
      if (projectIndex == 2) {
        setDisplayProject(true);
      }
    }
  }, [project, projectIndex]);
  return (
    <>
      {displayProject && (
        <div
          // className="bg-[#e8eff4] m-2 shadow-[#e9e8e8b5] shadow-sm hover:shadow-md py-1 px-2 hover:bg-[#72bed7] hover:text-white rounded-md hover:cursor-pointer"
          className="bg-[#CCDAD1] h-fit p-2 rounded-md mx-4 my-6 hover:cursor-pointer hover:shadow-lg hover:shadow-[#2e454c]"
          onClick={handleClick}
        >
          <h3 className="text-xl">{project.project._doc.title}</h3>
          <p>{project.project._doc.description}</p>
          <p>owner: {ownerName}</p>
        </div>
      )}
    </>
  );
};

export default Project;
