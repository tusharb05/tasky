import React, { useEffect, useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import { ProjectContext } from "../ProjectContextProvider";

import Project from "./Project";

const AllProjects = () => {
  const { projects, setProjects } = useContext(ProjectContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects/getownerprojects", {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects);
        // console.log(data.projects);
      });
  }, []);

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:px-12 md:px-6 mt-[2%] h-full w-full bg-[#1F363D] m-0">
        {projects.map((project) => (
          <Project key={project.project._doc._id} project={project} />
        ))}
      </div>
    </>
  );
};

export default AllProjects;
