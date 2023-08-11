import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "../pages/Homepage";
import App from "../App";
import Login from "../pages/Login";
import Singup from "../pages/Signup";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Singup /> },
    {
      path: "/homepage",
      element: <Homepage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
