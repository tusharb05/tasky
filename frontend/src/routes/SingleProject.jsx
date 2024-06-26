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

  return (
    <>
      <div className="h-screen bg-[#1F363D] pt-2">
        <div id="headings" className="text-[#CFDCD4]">
          <div className="flex justify-center mb-5">
            <h1 className="text-3xl">{project.title}</h1>
          </div>
          <hr className="mx-[40%]" />
          <div className="flex justify-center my-2">
            <p className="text-md">{project.description}</p>
          </div>
          <hr className="mx-[40%]" />
        </div>

        <div className="grid lg:grid-cols-4 mb-0 text-white mt-5 h-[500px] ">
          <div className="col-span-1 h-full bg-[#aaaaaa1b] rounded-[16px] m-2 p-2 shadow-[0_4px_30px_rgba(0, 0, 0, 0.1)]">
            {/* <h1>hello</h1> */}
            <TaskSection user={user} projectId={project._id} />
          </div>
          <div className="col-span-2  h-full bg-[#aaaaaa1b] rounded-[16px] m-2 p-2 shadow-[0_4px_30px_rgba(0, 0, 0, 0.1)]">
            <ChatSection user={user} project={project} />
          </div>

          <div className="col-span-1 h-full bg-[#aaaaaa1b] rounded-[16px] m-2 p-2 shadow-[0_4px_30px_rgba(0, 0, 0, 0.1)] p-3 pl-4">
            <MemberList projectId={project._id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProject;
