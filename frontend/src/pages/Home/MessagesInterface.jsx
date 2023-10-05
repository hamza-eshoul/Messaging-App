import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFetchConversation } from "../../hooks/useFetchConversation";

// images
import defaultProfile from "../../images/defaultProfile.png";

// icons
import { BsThreeDotsVertical } from "react-icons/bs";

// components
import DefaultMessageInterface from "../../components/DefaultMessageInterface";
import MessageCard from "./MessageCard";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import AddMessage from "./AddMessage";

const MessagesInterface = ({
  selectedUserConversation,
  triggerFetchConversation,
  setTriggerFetchConversation,
  socket,
  arrivalMessage,
}) => {
  const { user } = useAuthContext();
  const [messagesList, setMessagesList] = useState(null);
  const [triggerScrollEffect, setTriggerScrollEffect] = useState(null);
  const { conversation, isPending, error, isConversationEmpty } =
    useFetchConversation(selectedUserConversation);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log(
      "arrivalMessage hook ran with the following value",
      arrivalMessage
    );
    if (
      arrivalMessage &&
      messagesList &&
      arrivalMessage.author_id == selectedUserConversation._id
    ) {
      setMessagesList((prevMessagesList) => {
        return [...prevMessagesList, arrivalMessage];
      });
      setTriggerFetchConversation(!triggerFetchConversation);
    } else {
      setTriggerFetchConversation(!triggerFetchConversation);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    if (user && socket) {
      socket.emit("addUser", user._id);
      socket.on("getUsers", (users) => {
        console.log(users);
      });
    }
  }, [user, socket]);

  useEffect(() => {
    if (conversation) {
      setMessagesList(conversation.messages);
    }
    if (isConversationEmpty) {
      setMessagesList(null);
    }
  }, [conversation, isConversationEmpty]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messagesList, triggerScrollEffect]);

  if (selectedUserConversation) {
    return (
      <section className="flex flex-col w-[calc(75%-96px)]">
        {/* Header */}
        <div className="flex gap-3 items-center border-b-[1px] border-zinc-300 h-[8%] px-4">
          {/* image */}
          {selectedUserConversation && (
            <div className="h-10 w-10">
              <img
                src={
                  selectedUserConversation.profileImg.url
                    ? selectedUserConversation.profileImg.url
                    : defaultProfile
                }
                alt="user messager"
                className="w-full h-full rounded-full"
              />
            </div>
          )}

          {/* User information */}

          <div className="flex items-center justify-between w-full">
            {selectedUserConversation && (
              <div className="flex flex-col">
                {" "}
                <Link
                  to={`/profile/${selectedUserConversation._id}`}
                  className="font-medium cursor-pointer hover:opacity-60"
                >
                  {selectedUserConversation.firstName}{" "}
                  {selectedUserConversation.lastName}
                </Link>
                <p className="text-zinc-500 text-xs">
                  {selectedUserConversation.email}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <BsThreeDotsVertical className="text-2xl hover:opacity-50 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Main */}

        <div className="flex-grow flex flex-col justify-between bg-[#fbf5f3] h-[92%] dotted-background ">
          {/* Message Interface Body */}
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
                  message={message}
                  selectedUserConversation={selectedUserConversation}
                  setMessagesList={setMessagesList}
                  triggerFetchConversation={triggerFetchConversation}
                  setTriggerFetchConversation={setTriggerFetchConversation}
                  triggerScrollEffect={triggerScrollEffect}
                  setTriggerScrollEffect={setTriggerScrollEffect}
                />
              ))}

              <div ref={messagesEndRef} />
            </div>
          )}
          <AddMessage
            user={user}
            socket={socket}
            selectedUserConversation={selectedUserConversation}
            setMessagesList={setMessagesList}
            triggerFetchConversation={triggerFetchConversation}
            setTriggerFetchConversation={setTriggerFetchConversation}
          />
        </div>
      </section>
    );
  }

  return <DefaultMessageInterface />;
};

export default MessagesInterface;
