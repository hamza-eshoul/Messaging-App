import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";
// components
import DefaultMessageInterface from "../../components/DefaultMessageInterface";
import MessagesInterfaceBody from "./MessagesInterfaceBody";
import AddMessage from "./AddMessage";
import MessageInterfaceHeader from "./MessageInterfaceHeader";

const MessagesInterface = ({
  selectedUserConversation,
  setConversations,
  receivedMessage,
  updatedReceivedConversation,
}) => {
  const [messagesList, setMessagesList] = useState(null);
  const { user } = useAuthContext();

  const updatedConversationList = (updatedConversation) => {
    setConversations((prevConversations) => {
      return prevConversations.map((conversation) => {
        if (conversation._id == updatedConversation._id) {
          return updatedConversation;
        } else {
          return conversation;
        }
      });
    });
  };

  useEffect(() => {
    const displayedReceivedMessage = (receivedMessage) => {
      if (receivedMessage.author_id == selectedUserConversation._id) {
        setMessagesList((prevMessagesList) => {
          return [...prevMessagesList, receivedMessage];
        });

        updatedConversationList(updatedReceivedConversation);
      }
    };

    if (messagesList && receivedMessage && selectedUserConversation) {
      displayedReceivedMessage(receivedMessage);
    }
  }, [receivedMessage]);

  if (!selectedUserConversation) {
    return <DefaultMessageInterface />;
  }

  return (
    <section className="flex flex-col w-[calc(75%-96px)]">
      <MessageInterfaceHeader
        selectedUserConversation={selectedUserConversation}
      />
      <div className="flex-grow flex flex-col justify-between bg-[#fbf5f3] h-[92%] dotted-background ">
        <MessagesInterfaceBody
          messagesList={messagesList}
          setMessagesList={setMessagesList}
          selectedUserConversation={selectedUserConversation}
          setConversations={setConversations}
          user={user}
        />
        <AddMessage
          user={user}
          setConversations={setConversations}
          selectedUserConversation={selectedUserConversation}
          setMessagesList={setMessagesList}
        />
      </div>
    </section>
  );
};

export default MessagesInterface;
