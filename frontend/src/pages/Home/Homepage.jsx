import { useState } from "react";
import { useFetchConversationList } from "../../hooks/useFetchConversationList";

// components
import UserMessagesList from "./UserMessagesList";
import MessagesInterface from "./MessagesInterface";

const Homepage = ({ receivedMessage, updatedReceivedConversation }) => {
  const [selectedUserConversation, setSelectedUserConversation] =
    useState(null);
  const [isConversationActive, setIsConversationActive] = useState(false);
  const { conversations, setConversations } = useFetchConversationList();

  return (
    <main className="flex h-screen xmd:ml-[96px]">
      <UserMessagesList
        selectedUserConversation={selectedUserConversation}
        setSelectedUserConversation={setSelectedUserConversation}
        conversations={conversations}
        isConversationActive={isConversationActive}
        setIsConversationActive={setIsConversationActive}
      />
      <MessagesInterface
        setConversations={setConversations}
        selectedUserConversation={selectedUserConversation}
        receivedMessage={receivedMessage}
        updatedReceivedConversation={updatedReceivedConversation}
        isConversationActive={isConversationActive}
        setIsConversationActive={setIsConversationActive}
      />
    </main>
  );
};

export default Homepage;
