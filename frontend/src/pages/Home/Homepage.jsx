import { useState } from "react";
import { useFetchConversationList } from "../../hooks/useFetchConversationList";

// components
import UserMessagesList from "./UserMessagesList";
import MessagesInterface from "./MessagesInterface";

const Homepage = ({ receivedMessage, updatedReceivedConversation }) => {
  const [selectedUserConversation, setSelectedUserConversation] =
    useState(null);
  const { conversations, setConversations } = useFetchConversationList();

  return (
    <>
      <UserMessagesList
        selectedUserConversation={selectedUserConversation}
        setSelectedUserConversation={setSelectedUserConversation}
        conversations={conversations}
      />
      <MessagesInterface
        setConversations={setConversations}
        selectedUserConversation={selectedUserConversation}
        receivedMessage={receivedMessage}
        updatedReceivedConversation={updatedReceivedConversation}
      />
    </>
  );
};

export default Homepage;
