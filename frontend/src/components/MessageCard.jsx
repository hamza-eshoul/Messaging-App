import React from "react";
import defaultProfile from "../images/defaultProfile.png";

const MessageCard = ({ isUser, messageContent }) => {
  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : ""
      } gap-3 items-center py-5 px-4`}
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
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-900">
            {isUser ? "You" : "Hamza Eshoul"}
          </span>
          <span className="text-zinc-500 text-xs"> Friday 2:20pm</span>
        </div>
        {/* card message */}
        <p
          className={`${
            isUser ? "bg-primaryOrange text-white" : "bg-white"
          } rounded-b-lg rounded-tr-lg shadow-md text-sm p-3`}
        >
          {messageContent}
        </p>
      </div>
    </div>
  );
};

export default MessageCard;
