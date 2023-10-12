import { useEffect, useRef } from "react";
import { useFetchConversation } from "../../hooks/useFetchConversation";

// components
import MessageCard from "./MessageCard";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const MessagesInterfaceBody = ({
  messagesList,
  setMessagesList,
  selectedUserConversation,
  setConversations,
  user,
}) => {
  const { conversation, isPending, error, isConversationEmpty } =
    useFetchConversation(selectedUserConversation);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessagesList(null);

    if (conversation) {
      setMessagesList(conversation.messages);
    }
  }, [conversation, isConversationEmpty]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  return (
    <>
      {isPending && (
        <Loading
          loadingColor={"#fa4d12"}
          loadingSize={45}
          loadingHeight={"h-screen"}
        />
      )}
      {error && (
        <Error
          error={error}
          errorColor={"text-primaryOrange"}
          errorSize={"text-lg"}
        />
      )}

      {isConversationEmpty && (
        <div className="flex justify-center pt-96 h-full text-primaryOrange text-2xl font-semibold">
          {" "}
          There are no messages in this conversation yet ...
        </div>
      )}

      {messagesList && (
        <div className="flex flex-col gap-2 overflow-y-auto">
          {messagesList.map((message) => (
            <MessageCard
              key={message._id}
              isLoggedInUser={message.author_id === user._id ? true : false}
              message={message}
              setConversations={setConversations}
              selectedUserConversation={selectedUserConversation}
              setMessagesList={setMessagesList}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </>
  );
};

export default MessagesInterfaceBody;
