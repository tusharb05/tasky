import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useParams, useLoaderData } from "react-router-dom";
import { ProjectContext } from "../ProjectContextProvider";
import MemberList from "../components/MemberList";
import TaskSection from "../components/TaskSection";
import ChatSection from "../components/ChatSection";

import { AuthContext } from "../AuthContextProvider";

const SingleProject = () => {
  // const { projectID } = useParams();
  const { project, user } = useLoaderData();
  // console.log(project);
  return (
    <>
      <div className="h-[94vh]">
        <div id="headings" className="h-1/6">
          <div className="flex justify-center mt-7 mb-5">
            <h1 className="text-4xl">{project.title}</h1>
          </div>
          <hr className="mx-[40%]" />
          <div className="flex justify-center my-2">
            <p className="text-xl">{project.description}</p>
          </div>
          <hr className="mx-[40%]" />
        </div>

        <div className="grid lg:grid-cols-4 h-5/6 bg-sky-500">
          <div className="col-span-1 h-full">
            <TaskSection user={user} projectId={project._id} />
          </div>

          <div className="col-span-2 bg-[#cecece] h-full">
            <ChatSection user={user} project={project} />
          </div>

          <div className="col-span-1 bg-[#ecebeb] p-2 relative flex justify-center flex-col align-center">
            <MemberList projectId={project._id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProject;
