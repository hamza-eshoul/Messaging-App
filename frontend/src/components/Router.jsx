import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Homepage from "../pages/Homepage";
import App from "../App";
import Login from "../pages/Login";
import Singup from "../pages/Signup";
import Profile from "../pages/Profile";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,

      children: [
        { path: "homepage", element: <Homepage /> },
        { path: "profile/:id", element: <Profile /> },
      ],
    },

    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Singup /> },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
