import React from "react";
import { redirect, useNavigate } from "react-router-dom";

const Project = ({ project }) => {
  const navigate = useNavigate();
  // redirect(`/project/${project._id.toString()}`)
  // console.log(project);
  const handleClick = () => {
    navigate(`/project/${project._id.toString()}`);
  };

  return (
    <>
      <div
        className="bg-[#e8eff4] m-2 shadow-[#e9e8e8b5] shadow-sm hover:shadow-md py-1 px-2 hover:bg-[#72bed7] hover:text-white rounded-md hover:cursor-pointer"
        onClick={handleClick}
      >
        <h3 className="text-xl">{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </>
  );
};

export default Project;
