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

const MessagesInterface = () => {
  const { user } = useAuthContext();
  const [messageContent, setMessageContent] = useState("");
  const [messagesList, setMessagesList] = useState(null);

  const { addMessage } = useAddMessage();
  const { fetchConversation, loading, error } = useFetchConversation();

  const handleAddMessage = async () => {
    const user1_id = user._id;
    const user2_id = "64d61feafa2d311e2220a8e9";

    await addMessage(user1_id, user2_id, messageContent);
  };

  useEffect(() => {
    const conversation = async () => {
      const convo = await fetchConversation(
        user._id,
        "64d61feafa2d311e2220a8e9"
      );

      console.log(convo.messages);
      setMessagesList(convo.messages);
    };

    if (user) {
      conversation();
    }
  }, [user]);

  return (
    <section className="w-[calc(75%-96px)]">
      {/* Header */}
      <div className="flex gap-3 items-center border-b-[1px] border-zinc-300 py-4 px-4">
        {/* image */}
        <div className="h-10 w-10">
          <img
            src={defaultProfile}
            alt="user messager"
            className="w-full h-full rounded-full"
          />
        </div>

        {/* userinformation */}

        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            {" "}
            <span className="font-medium">Hamza Eshoul</span>
            <p className="text-zinc-500 text-xs">hamza.eshoul.pro@gmail.com</p>
          </div>

          <div className="flex gap-2">
            <FiSearch className="text-2xl" />
            <BsThreeDotsVertical className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Main */}

      <div className="h-[calc(100%-73px)] flex flex-col justify-between bg-[#fbf5f3] dotted-background">
        {/* Message Interface Body */}
        {loading ? (
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
        ) : (
          <>
            {
              error ? (
                <div> {error} </div>
              ) : (
                <>
                  {" "}
                  {messagesList &&
                    messagesList.map((message) => (
                      <MessageCard
                        key={message._id}
                        messageContent={message.content}
                        isUser={true}
                      />
                    ))}{" "}
                </>
              )

              // <div>
              //   <MessageCard />
              //   <MessageCard isUser={true} />
              //   <MessageCard />
              //   <MessageCard isUser={true} />
              //   <MessageCard />
              //   <MessageCard isUser={true} />
              //   <MessageCard />
              // </div>
            }
          </>
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
              className="text-2xl text-primaryOrange cursor-pointer"
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
