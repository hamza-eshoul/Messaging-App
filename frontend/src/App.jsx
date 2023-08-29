import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showApp, setShowApp] = useState(null);

  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/login");
    } else {
      setShowApp(true);
    }
  }, []);

  return (
    <>
      {showApp && (
        <div className="h-screen flex rounded-lg">
          <Sidebar />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default App;
