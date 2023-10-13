import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import formatMessageDate from "../../utility/formatMessageDate";

// icons
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsCheck2All } from "react-icons/bs";

// images
import defaultProfile from "../../assets/images/defaultProfile.png";

// components
import DeleteMessage from "./DeleteMessage";

const MessageCard = ({
  isLoggedInUser,
  message,
  selectedUserConversation,
  setMessagesList,
  setConversations,
}) => {
  const [formattedDate, setFormattedDate] = useState(null);
  const [isHoverDeleteMessage, setIsHoverDeleteMessage] = useState(false);
  const [isDeleteMessage, setIsDeleteMessage] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    setFormattedDate(formatMessageDate(message.createdAt));
  }, []);

  if (isLoggedInUser) {
    return (
      <div className="flex items-center justify-end gap-3 px-4 py-3">
        <article className="flex flex-col gap-1">
          {" "}
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-zinc-900">You</span>
            <time className="text-xs text-zinc-500"> {formattedDate}</time>
          </div>
          <div
            onMouseOver={() => setIsHoverDeleteMessage(true)}
            onMouseLeave={() => {
              setIsHoverDeleteMessage(false);
              setIsDeleteMessage(false);
            }}
            className="flex max-w-[500px] justify-between gap-1 rounded-b-lg rounded-tr-lg bg-primaryOrange p-3 text-sm text-white shadow-md"
          >
            <span className="text-justify">{message.content} </span>
            {isHoverDeleteMessage && (
              <div className="relative">
                <MdKeyboardArrowDown
                  className="cursor-pointer place-self-start text-xl text-white"
                  onClick={() => setIsDeleteMessage(!isDeleteMessage)}
                />

                {isDeleteMessage && (
                  <DeleteMessage
                    user={user}
                    setConversations={setConversations}
                    selectedUserConversation={selectedUserConversation}
                    message={message}
                    setIsDeleteMessage={setIsDeleteMessage}
                    setMessagesList={setMessagesList}
                  />
                )}
              </div>
            )}

            {!isHoverDeleteMessage && (
              <BsCheck2All className="relative place-self-end text-white" />
            )}
          </div>
        </article>
      </div>
    );
  }

  if (!isLoggedInUser) {
    return (
      <article className="flex items-center gap-3 px-4 py-3">
        <div className="h-10 w-10">
          <img
            src={
              selectedUserConversation.profileImg.url
                ? selectedUserConversation.profileImg.url
                : defaultProfile
            }
            alt="user messager"
            className="h-full w-full rounded-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          {" "}
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-zinc-900">{message.author}</span>
            <time className="text-xs text-zinc-500"> {formattedDate}</time>
          </div>
          <div className="flex max-w-[500px] justify-between gap-1 rounded-b-lg rounded-tr-lg bg-white p-3 text-sm shadow-md">
            <span className="text-justify">{message.content} </span>
            <BsCheck2All className="relative place-self-end text-white" />
          </div>
        </div>
      </article>
    );
  }
};

export default MessageCard;
