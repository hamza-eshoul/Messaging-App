import React, { useEffect, useState } from "react";
import defaultProfile from "../images/defaultProfile.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsCheck2All } from "react-icons/bs";

import { format } from "date-fns";
import { useDeleteMessage } from "../hooks/useDeleteMessage";

const MessageCard = ({
  message,
  selectedUserConversation,
  setConfirmDeleteMessage,
  setMessagesList,
  triggerFetchConversation,
  setTriggerFetchConversation,
  triggerScrollEffect,
  setTriggerScrollEffect,
}) => {
  const [isUser, setIsUser] = useState(undefined);
  const { user } = useAuthContext();
  const [formattedDate, setFormattedDate] = useState(null);
  const [editMessage, setEditMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const {
    deleteConversationMessage,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteMessage();

  useEffect(() => {
    const formattedMonthDate = format(new Date(message.createdAt), "PP").split(
      ","
    )[0];

    const formattedHourDate = format(new Date(message.createdAt), "p");

    setFormattedDate(formattedMonthDate + ", " + formattedHourDate);

    if (user) {
      if (message.author_id === user._id) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
      setTriggerScrollEffect(!triggerScrollEffect);
    }
  }, [message, user]);

  const handleDeleteMessage = async () => {
    const user1_id = user._id;
    const user2_id = selectedUserConversation._id;
    const message_id = message._id;

    const updatedMessages = await deleteConversationMessage(
      user1_id,
      user2_id,
      message_id
    );

    setConfirmDeleteMessage(null);
    setMessagesList(updatedMessages.messages);
    setTriggerFetchConversation(!triggerFetchConversation);
  };

  return (
    <>
      {isUser == undefined ? (
        ""
      ) : (
        <div
          className={`flex ${
            isUser ? "justify-end" : ""
          } gap-3 items-center py-3 px-4  `}
        >
          {/* image */}

          {isUser ? null : (
            <div className="h-10 w-10">
              <img
                src={message.authorImg ? message.authorImg : defaultProfile}
                alt="user messager"
                className="w-full h-full rounded-full"
              />
            </div>
          )}

          {/* card information */}
          <div className="flex flex-col gap-1">
            {" "}
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-zinc-900">
                {isUser ? "You" : <> {message.author} </>}
              </span>
              <span className="text-zinc-500 text-xs"> {formattedDate}</span>
            </div>
            {/* card message */}
            {isUser ? (
              <div
                onMouseOver={() => setEditMessage(true)}
                onMouseLeave={() => {
                  setEditMessage(null);
                  setDeleteMessage(null);
                }}
                className="bg-primaryOrange text-white max-w-[500px] rounded-b-lg rounded-tr-lg shadow-md text-sm p-3 flex justify-between gap-1"
              >
                <div className="text-justify">{message.content} </div>
                {editMessage ? (
                  <div className="relative">
                    <MdKeyboardArrowDown
                      className="text-white text-xl place-self-start cursor-pointer"
                      onClick={() => setDeleteMessage(!deleteMessage)}
                    />

                    {deleteMessage && (
                      <div
                        className="bg-white hover:bg-zinc-100 text-primaryDark cursor-pointer p-3 m-2 w-48 absolute right-1 top-2.5 shadow-md rounded"
                        onClick={() => {
                          setConfirmDeleteMessage(true);
                          setDeleteMessage(null);
                          handleDeleteMessage();
                        }}
                      >
                        Delete Message
                      </div>
                    )}
                  </div>
                ) : (
                  <BsCheck2All className="text-white place-self-end relative" />
                )}
              </div>
            ) : (
              <div className="bg-white max-w-[500px] rounded-b-lg rounded-tr-lg shadow-md text-sm p-3 flex gap-1 justify-between">
                <div className="text-justify">{message.content} </div>
                <BsCheck2All className="text-white place-self-end relative" />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MessageCard;
