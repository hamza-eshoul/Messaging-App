import { createBrowserRouter, RouterProvider } from "react-router-dom";

// components
import Homepage from "../pages/Home/Homepage";
import App from "../App";
import Login from "../pages/Login";
import Singup from "../pages/Signup";
import Profile from "../pages/Profile/Profile";

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
