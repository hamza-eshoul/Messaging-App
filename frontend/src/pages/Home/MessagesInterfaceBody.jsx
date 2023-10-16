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
        <div className="flex h-full items-center justify-center px-6 text-center text-lg font-semibold text-primaryOrange sm:text-2xl">
          {" "}
          There are no messages in this conversation yet ...
        </div>
      )}

      {messagesList && (
        <section className="flex flex-col gap-2">
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
        </section>
      )}
    </>
  );
};

export default MessagesInterfaceBody;
