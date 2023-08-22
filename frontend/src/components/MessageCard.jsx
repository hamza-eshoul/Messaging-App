import React, { useEffect, useState } from "react";
import defaultProfile from "../images/defaultProfile.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { format } from "date-fns";

const MessageCard = ({ message }) => {
  const [isUser, setIsUser] = useState(null);
  const { user } = useAuthContext();
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    const formattedMonthDate = format(new Date(message.createdAt), "PP").split(
      ","
    )[0];

    const formattedHourDate = format(new Date(message.createdAt), "p");

    setFormattedDate(formattedMonthDate + ", " + formattedHourDate);

    if (user) {
      if (message.author_id === user._id) {
        setIsUser(true);
      }
    }
  }, [message, user]);

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : ""
      } gap-3 items-center py-3 px-4  `}
    >
      {/* image */}

      {isUser ? null : (
        <div className="h-10 w-10">
          <img
            src={defaultProfile}
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
        <p
          className={`${
            isUser ? "bg-primaryOrange text-white" : "bg-white"
          } max-w-[500px] rounded-b-lg rounded-tr-lg shadow-md text-sm p-3`}
        >
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default MessageCard;
