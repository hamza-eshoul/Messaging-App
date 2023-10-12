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
      <div className="flex justify-end gap-3 items-center py-3 px-4">
        {/* message information */}
        <div className="flex flex-col gap-1">
          {" "}
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-zinc-900">You</span>
            <span className="text-zinc-500 text-xs"> {formattedDate}</span>
          </div>
          {/* card message */}
          <div
            onMouseOver={() => setIsHoverDeleteMessage(true)}
            onMouseLeave={() => {
              setIsHoverDeleteMessage(false);
              setIsDeleteMessage(false);
            }}
            className="bg-primaryOrange text-white max-w-[500px] rounded-b-lg rounded-tr-lg shadow-md text-sm p-3 flex justify-between gap-1"
          >
            <div className="text-justify">{message.content} </div>
            {isHoverDeleteMessage && (
              <div className="relative">
                <MdKeyboardArrowDown
                  className="text-white text-xl place-self-start cursor-pointer"
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
              <BsCheck2All className="text-white place-self-end relative" />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedInUser) {
    return (
      <div className="flex gap-3 items-center py-3 px-4">
        {/* image */}
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

        {/* card information */}
        <div className="flex flex-col gap-1">
          {" "}
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-zinc-900">{message.author}</span>
            <span className="text-zinc-500 text-xs"> {formattedDate}</span>
          </div>
          {/* card message */}
          <div className="bg-white max-w-[500px] rounded-b-lg rounded-tr-lg shadow-md text-sm p-3 flex gap-1 justify-between">
            <div className="text-justify">{message.content} </div>
            <BsCheck2All className="text-white place-self-end relative" />
          </div>
        </div>
      </div>
    );
  }
};

export default MessageCard;
