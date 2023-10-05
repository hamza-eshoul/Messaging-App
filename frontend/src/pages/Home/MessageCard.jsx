import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import formatMessageDate from "../../utility/formatMessageDate";

// icons
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsCheck2All } from "react-icons/bs";

// images
import defaultProfile from "../../images/defaultProfile.png";
import DeleteMessage from "./DeleteMessage";

const MessageCard = ({
  message,
  selectedUserConversation,
  setMessagesList,
  triggerFetchConversation,
  setTriggerFetchConversation,
  triggerScrollEffect,
  setTriggerScrollEffect,
}) => {
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [formattedDate, setFormattedDate] = useState(null);
  const [editMessage, setEditMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const { user } = useAuthContext();

  const checkIsUser = () => {
    if (message.author_id === user._id) {
      setIsLoggedInUser(true);
    }
  };

  useEffect(() => {
    setFormattedDate(formatMessageDate(message.createdAt));

    checkIsUser();

    setTriggerScrollEffect(!triggerScrollEffect);
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
            onMouseOver={() => setEditMessage(true)}
            onMouseLeave={() => {
              setEditMessage(null);
              setDeleteMessage(null);
            }}
            className="bg-primaryOrange text-white max-w-[500px] rounded-b-lg rounded-tr-lg shadow-md text-sm p-3 flex justify-between gap-1"
          >
            <div className="text-justify">{message.content} </div>
            {editMessage && (
              <div className="relative">
                <MdKeyboardArrowDown
                  className="text-white text-xl place-self-start cursor-pointer"
                  onClick={() => setDeleteMessage(!deleteMessage)}
                />

                {deleteMessage && (
                  <DeleteMessage
                    user={user}
                    selectedUserConversation={selectedUserConversation}
                    message={message}
                    setDeleteMessage={setDeleteMessage}
                    setMessagesList={setMessagesList}
                    triggerFetchConversation={triggerFetchConversation}
                    setTriggerFetchConversation={setTriggerFetchConversation}
                  />
                )}
              </div>
            )}

            {!editMessage && (
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
            src={message.authorImg ? message.authorImg : defaultProfile}
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
