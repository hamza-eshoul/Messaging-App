import React, { useEffect, useState } from "react";
import defaultProfile from "../images/defaultProfile.png";
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiSendPlane2Line } from "react-icons/ri";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import MessageCard from "./MessageCard";
import { useAddMessage } from "../hooks/useAddMessage";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFetchConversation } from "../hooks/useFetchConversation";
import { MoonLoader } from "react-spinners";
import { DefaultMessageInterface } from "./DefaultMessageInterface";

const MessagesInterface = ({ selectedUserConversation }) => {
  const { user } = useAuthContext();
  const [messageContent, setMessageContent] = useState("");
  const [messagesList, setMessagesList] = useState(null);
  const [emptyMessagesList, setEmptyMessagesList] = useState(null);

  const { addMessage } = useAddMessage();
  const { fetchConversation, loading, error } = useFetchConversation();

  const handleAddMessage = async () => {
    const user1_id = user._id;
    const user2_id = selectedUserConversation._id;
    const messageAuthor = user.firstName + " " + user.lastName;

    const updatedConversation = await addMessage(
      user1_id,
      user2_id,
      messageAuthor,
      messageContent
    );

    setMessageContent("");

    setMessagesList(updatedConversation.messages);
    setEmptyMessagesList(null);
  };

  useEffect(() => {
    const conversation = async () => {
      const selectedUserConversationId = selectedUserConversation._id;
      setEmptyMessagesList(null);
      setMessagesList(null);
      const res = await fetchConversation(user._id, selectedUserConversationId);

      if (res.messages) {
        setEmptyMessagesList(null);
        setMessagesList(res.messages);
      } else {
        setMessagesList(null);
        setEmptyMessagesList(res.msg);
      }
    };

    if (user && selectedUserConversation) {
      conversation();
    }
  }, [user, selectedUserConversation]);

  return (
    // {selectedUserConversation ?  : <DefaultMessageInterface />}
    <section className="flex flex-col w-[calc(75%-96px)]">
      {/* Header */}
      <div className="flex gap-3 items-center border-b-[1px] border-zinc-300 py-4 px-4">
        {/* image */}
        {selectedUserConversation && (
          <div className="h-10 w-10">
            <img
              src={
                selectedUserConversation.profileImg
                  ? selectedUserConversation.profileImg
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
              <span className="font-medium">
                {selectedUserConversation.firstName}{" "}
                {selectedUserConversation.lastName}
              </span>
              <p className="text-zinc-500 text-xs">
                {selectedUserConversation.email}
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <FiSearch className="text-2xl" />
            <BsThreeDotsVertical className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Main */}

      <div className="flex-grow flex flex-col justify-between bg-[#fbf5f3] dotted-background">
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
          <div className="flex items-center justify-center h-full text-primaryOrange text-2xl font-semibold">
            {" "}
            {emptyMessagesList}{" "}
          </div>
        )}

        {messagesList && (
          <div className="flex flex-col gap-2">
            {messagesList.map((message) => (
              <MessageCard key={message._id} message={message} />
            ))}
          </div>
        )}

        {/* Message Sending */}
        <div className="flex flex-col gap-3 bg-white rounded-lg shadow-lg mx-5 my-7 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 w-full">
              <MdOutlineEmojiEmotions className="text-2xl text-zinc-500" />
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

          <div className="flex gap-4 text-zinc-400">
            <BsThreeDotsVertical />
            <BsThreeDotsVertical />
            <BsThreeDotsVertical />
            <BsThreeDotsVertical />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesInterface;
