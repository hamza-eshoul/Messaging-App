import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./components/Router.jsx";
import AuthContextProvider from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </React.StrictMode>
);
