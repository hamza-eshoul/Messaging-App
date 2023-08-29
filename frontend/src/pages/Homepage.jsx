import { useEffect, useState } from "react";
import UserMessagesList from "../components/UserMessagesList";
import MessagesInterface from "../components/MessagesInterface";
import { io } from "socket.io-client";

const Homepage = () => {
  const [selectedUserConversation, setSelectedUserConversation] =
    useState(null);

  const [usersList, setUsersList] = useState(null);
  const [triggerFetchConversation, setTriggerFetchConversation] =
    useState(null);
  const [socket, setSocket] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (addedMessage) => {
        console.log("this is the added message", addedMessage);
        setArrivalMessage(addedMessage);
      });
    }
  }, [socket]);

  return (
    <>
      <UserMessagesList
        selectedUserConversation={selectedUserConversation}
        setSelectedUserConversation={setSelectedUserConversation}
        usersList={usersList}
        setUsersList={setUsersList}
        triggerFetchConversation={triggerFetchConversation}
      />
      <MessagesInterface
        selectedUserConversation={selectedUserConversation}
        usersList={usersList}
        setUsersList={setUsersList}
        triggerFetchConversation={triggerFetchConversation}
        setTriggerFetchConversation={setTriggerFetchConversation}
        socket={socket}
        arrivalMessage={arrivalMessage}
      />
    </>
  );
};

export default Homepage;
