import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../AuthContextProvider";
import { ProjectContext } from "../ProjectContextProvider";
import { useNavigate } from "react-router-dom";
import Project from "./Project";

const AllProjects = () => {
  const nav = useNavigate();
  const { projects, setProjects } = useContext(ProjectContext);
  const { loggedIn, userData, setLoggedIn, setUserData } =
    useContext(AuthContext);
  // console.log(userData);
  const [projectIndex, setProjectIndex] = useState(0);

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
  }, [projectIndex]);

  const signout = () => {
    localStorage.removeItem("auth-token");
    setLoggedIn(false);
    setUserData({});
  };

  return (
    <>
      <div className=" bg-[#1F363D] p-2 min-h-screen max-h-fit">
        <div
          id="sidebar"
          className="w-[20%] bg-[#aaaaaa1b] fixed top-2 bottom-2"
        >
          <div id="heading" className="flex pt-2 flex-col">
            <h1 className="text-3xl text-white inline mx-auto mb-5">tasky</h1>
            <div id="categories" className="mt-[30%] px-3">
              <div
                className={`bg-inherit p-3 text-white text-xl rounded-md hover:bg-[#1F363D] flex align-middle justify-center cursor-pointer my-2 ${
                  projectIndex == 0 && "bg-[#aaaaaa29] shadow-md"
                }`}
                onClick={() => setProjectIndex(0)}
              >
                All Projects
              </div>
              <div
                className={`bg-inherit p-3 text-white text-xl rounded-md hover:bg-[#1F363D] flex align-middle justify-center cursor-pointer my-2 ${
                  projectIndex == 1 && "bg-[#aaaaaa29] shadow-md"
                }`}
                onClick={() => setProjectIndex(1)}
              >
                Your Projects
              </div>
              <div
                className={`bg-inherit p-3 text-white text-xl rounded-md hover:bg-[#1F363D] flex align-middle justify-center cursor-pointer my-2 ${
                  projectIndex == 2 && "bg-[#aaaaaa29] shadow-md"
                }`}
                onClick={() => setProjectIndex(2)}
              >
                Member Projects
              </div>
            </div>

            <div
              id="auth-details"
              className="absolute bottom-7 self-center w-full px-3"
            >
              <div className="text-xl text-white font-semibold flex justify-center mb-5">
                {loggedIn && userData.fname + " " + userData.lname}
              </div>
              {!loggedIn && (
                <div
                  className="text-xl text-white font-semibold flex justify-center mb-5 rounded-md bg-[#aaaaaa29] p-1 cursor-pointer hover:shadow-md"
                  onClick={() => nav("/login")}
                >
                  Login
                </div>
              )}
              <div
                className="text-xl text-white font-semibold flex justify-center rounded-md bg-[#aaaaaa29] p-1 cursor-pointer hover:shadow-md"
                onClick={loggedIn ? signout : () => nav("/signup")}
              >
                {loggedIn ? "Sign out" : "Sign up"}
              </div>
              <div className=""></div>
            </div>
          </div>
        </div>

        <div
          id="main-content"
          className="w-[70%] text-black ml-[25%] grid lg:grid-cols-3 md-grid-cols-2 sm:grid-cols-1"
        >
          {loggedIn &&
            projects.map((project) => (
              <Project
                key={project.project._doc._id}
                project={project}
                projectIndex={projectIndex}
              />
            ))}
          {!loggedIn && (
            <div className="text-2xl text-white w-full flex justify-center">
              Login first!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProjects;
