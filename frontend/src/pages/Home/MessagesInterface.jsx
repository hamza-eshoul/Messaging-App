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
  isConversationActive,
  setIsConversationActive,
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
    <section
      className={`${
        !isConversationActive ? "hidden" : ""
      }  mb-[48px] w-full flex-col md:flex md:w-[60%] xmd:mb-0  xl:w-[70%]`}
    >
      <MessageInterfaceHeader
        selectedUserConversation={selectedUserConversation}
        setIsConversationActive={setIsConversationActive}
        setMessagesList={setMessagesList}
      />
      <section className="dotted-background flex h-[92%] flex-grow flex-col justify-between overflow-y-auto bg-[#fbf5f3]">
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
      </section>
    </section>
  );
};

export default MessagesInterface;
