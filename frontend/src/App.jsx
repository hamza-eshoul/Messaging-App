import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { socket } from "./socket";

// components
import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Home/Homepage";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

const App = () => {
  const { user, authIsReady } = useAuthContext();
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [updatedReceivedConversation, setUpdatedReceivedConversation] =
    useState(null);

  // socket io

  useEffect(() => {
    function onGetMessage({ addedMessage, conversation }) {
      setReceivedMessage(addedMessage);
      setUpdatedReceivedConversation(conversation);
    }

    socket.on("getMessage", onGetMessage);

    return () => {
      socket.off("getMessage", onGetMessage);
    };
  }, []);

  useEffect(() => {
    function onGetUsers(users) {
      console.log(users);
    }

    if (user) {
      socket.emit("addUser", user._id);
    }

    socket.on("getUsers", onGetUsers);

    return () => {
      socket.off("getUsers", onGetUsers);
    };
  }, [user]);

  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/homepage" /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/homepage"
              element={
                user ? (
                  <Homepage
                    receivedMessage={receivedMessage}
                    updatedReceivedConversation={updatedReceivedConversation}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/profile/:id"
              element={
                user ? <Profile user={user} /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/homepage" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/homepage" />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
