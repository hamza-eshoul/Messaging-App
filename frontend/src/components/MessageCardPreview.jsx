import React, { useEffect, useState } from "react";
import defaultProfile from "../images/defaultProfile.png";

const MessageCardPreview = ({
  user,
  selectedUserConversation,
  setSelectedUserConversation,
}) => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    if (selectedUserConversation) {
      if (user._id === selectedUserConversation._id) {
        setSelectedConversation(true);
      } else {
        setSelectedConversation(null);
      }
    }
  }, [selectedUserConversation]);

  return (
    <div
      className={`${
        selectedConversation
          ? "bg-lightOrange border-l-[2.5px] border-l-secondaryOrange "
          : "border-b-[1px] border-zinc-300"
      } flex gap-3 items-center py-5 px-4 cursor-pointer `}
      onClick={() => {
        setSelectedUserConversation(user);
      }}
    >
      {/* image */}
      <div className="h-12 w-12">
        <img
          src={user.profileImg ? user.profileImg : defaultProfile}
          alt="user messager"
          className="w-full h-full rounded-full"
        />
      </div>

      {/* card information */}
      <div className="flex flex-col gap-1 w-[calc(100%-48px)]">
        {" "}
        <div className="flex items-center justify-between">
          <span
            className={`${
              selectedConversation ? "text-primaryOrange" : ""
            } font-medium`}
          >
            {user.firstName} {user.lastName}
          </span>
          <span className="text-zinc-500 text-xs"> 2m ago</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p
            className={`${
              selectedConversation
                ? "text-primaryDark font-medium"
                : "text-zinc-500"
            } text-sm`}
          >
            Sure let me tell you about what is going on and ...
          </p>
          <div className="text-xs text-white bg-secondaryOrange px-1.5 py-0.5 rounded-full">
            6{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCardPreview;
