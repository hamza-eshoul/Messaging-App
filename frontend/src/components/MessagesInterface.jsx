import React, { useEffect, useRef, useState } from "react";
import defaultProfile from "../images/defaultProfile.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiSendPlane2Line } from "react-icons/ri";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import MessageCard from "./MessageCard";
import { useAddMessage } from "../hooks/useAddMessage";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchConversation } from "../hooks/useFetchConversation";
import { MoonLoader } from "react-spinners";
import { DefaultMessageInterface } from "./DefaultMessageInterface";
import { Link } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

const MessagesInterface = ({
  selectedUserConversation,
  triggerFetchConversation,
  setTriggerFetchConversation,
  socket,
  arrivalMessage,
}) => {
  const { user } = useAuthContext();
  const [messageContent, setMessageContent] = useState("");
  const [messagesList, setMessagesList] = useState(null);
  const [emptyMessagesList, setEmptyMessagesList] = useState(null);
  const messagesEndRef = useRef(null);
  const [confirmDeleteMessage, setConfirmDeleteMessage] = useState(null);
  const [triggerScrollEffect, setTriggerScrollEffect] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);

  const { addMessage } = useAddMessage();
  const { fetchConversation, loading, error } = useFetchConversation();

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

  const handleAddMessage = async () => {
    const user1_id = user._id;
    const user2_id = selectedUserConversation._id;
    const messageAuthor = user.firstName + " " + user.lastName;
    const authorImg = user.profileImg.url;

    const updatedConversation = await addMessage(
      user1_id,
      user2_id,
      messageAuthor,
      messageContent,
      authorImg
    );

    const addedMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    setMessageContent("");
    setShowEmojiPicker(null);

    setMessagesList(updatedConversation.messages);
    setEmptyMessagesList(null);
    setTriggerFetchConversation(!triggerFetchConversation);

    socket.emit("sendMessage", {
      ...addedMessage,
      receiverId: user2_id,
    });
  };

  useEffect(() => {
    const conversation = async () => {
      const selectedUserConversationId = selectedUserConversation._id;

      setEmptyMessagesList(null);
      setMessagesList(null);
      const res = await fetchConversation(user._id, selectedUserConversationId);

      if (res && res.messages && res.messages.length !== 0) {
        setEmptyMessagesList(null);
        setMessagesList(res.messages);
      } else {
        setMessagesList(null);
        setEmptyMessagesList(
          "There are no messages in this conversation yet ..."
        );
      }
    };

    if (selectedUserConversation) {
      conversation();
    }
  }, [selectedUserConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messagesList, triggerScrollEffect]);

  return (
    <>
      {selectedUserConversation ? (
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
            {loading && (
              <div className="flex justify-center items-center h-full">
                {" "}
                <MoonLoader
                  color={"#fa4d12"}
                  loading={loading}
                  size={40}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )}
            {error && (
              <div className="flex justify-center items-center h-full text-primaryOrange text-2xl font-semibold">
                {" "}
                {error}{" "}
              </div>
            )}

            {emptyMessagesList && (
              <div className="flex justify-center pt-96 h-full text-primaryOrange text-2xl font-semibold">
                {" "}
                {emptyMessagesList}{" "}
              </div>
            )}

            {messagesList && (
              <div className="flex flex-col gap-2 overflow-y-auto">
                {messagesList.map((message) => (
                  <MessageCard
                    confirmDeleteMessage={confirmDeleteMessage}
                    setConfirmDeleteMessage={setConfirmDeleteMessage}
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

            {/* Message Sending */}
            <div className="flex flex-col gap-3 bg-white rounded-lg shadow-lg mx-5 my-5 p-4 relative">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 w-full">
                  <MdOutlineEmojiEmotions
                    className="text-2xl cursor-pointer text-zinc-500 hover:scale-110 transition duration-300"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  />

                  {showEmojiPicker && (
                    <div className="absolute bottom-[50px] left-[30px]">
                      <EmojiPicker
                        onEmojiClick={(emojiObject) => {
                          setMessageContent((prevState) => {
                            return prevState + emojiObject.emoji;
                          });
                        }}
                      />
                    </div>
                  )}

                  <input
                    type="text"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Send your message..."
                    className="outline-none text-sm text-zinc-800 w-[95%] p-2"
                  />
                </div>

                <RiSendPlane2Line
                  className={
                    messageContent.length === 0
                      ? "text-2xl pointer-events-none opacity-30"
                      : "text-2xl text-primaryOrange cursor-pointer"
                  }
                  onClick={handleAddMessage}
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <DefaultMessageInterface />
      )}
    </>
  );
};

export default MessagesInterface;
