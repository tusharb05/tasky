import React, { useContext, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { ProjectContext } from "../ProjectContextProvider";

const SingleProject = () => {
  const { projectID } = useParams();
  // console.log(projectID);
  const { projects } = useContext(ProjectContext);
  let project;
  for (let i = 0; i < projects.length; i++) {
    if (projectID === projects[i]._id.toString()) {
      project = projects[i];
      break;
    }
  }

  return (
    <>
      <div className="flex justify-center mt-7 mb-5">
        <h1 className="text-4xl">{project.title}</h1>
      </div>
      <hr className="mx-[40%]" />
      <div className="flex justify-center my-2">
        <p className="text-xl">{project.description}</p>
      </div>
      <hr className="mx-[40%]" />
    </>
  );
};

export default SingleProject;
