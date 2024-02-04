import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Login from "./routes/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import { AuthContextProvider } from "./AuthContextProvider";
import { ProjectContextProvider } from "./ProjectContextProvider.jsx";
import Signup from "./routes/Signup.jsx";
import SingleProject from "./components/SingleProject.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/project/:projectID",
    element: <SingleProject />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProjectContextProvider>
        <Navbar />
        <RouterProvider router={router} />
      </ProjectContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
