import { useState } from "react";
import UserMessagesList from "../components/UserMessagesList";
import MessagesInterface from "../components/MessagesInterface";

const Homepage = () => {
  const [selectedUserConversation, setSelectedUserConversation] =
    useState(null);

  return (
    <>
      <UserMessagesList
        selectedUserConversation={selectedUserConversation}
        setSelectedUserConversation={setSelectedUserConversation}
      />
      <MessagesInterface selectedUserConversation={selectedUserConversation} />
    </>
  );
};

export default Homepage;
