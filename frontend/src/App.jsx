import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div className="min-h-screen flex rounded-lg">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default App;
