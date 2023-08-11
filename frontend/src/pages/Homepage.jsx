import React from "react";
import Sidebar from "../components/Sidebar";
import UserMessagesList from "../components/UserMessagesList";
import MessagesInterface from "../components/MessagesInterface";

const Homepage = () => {
  return (
    <div className="min-h-screen flex rounded-lg">
      {/* sidebar */}
      <Sidebar />
      <UserMessagesList />
      <MessagesInterface />
    </div>
  );
};

export default Homepage;
