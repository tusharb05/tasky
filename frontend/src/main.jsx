import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



import App from './App.jsx'
import ErrorPage from './ErrorPage.jsx';
import Login from './routes/Login.jsx';
import Navbar from './components/Navbar.jsx';
import {AuthContextProvider} from './AuthContextProvider';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/login",
    element: <Login/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Navbar/>
      <RouterProvider router={router}/>
    </AuthContextProvider>
  </React.StrictMode>,
)
