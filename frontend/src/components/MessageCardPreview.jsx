import React from "react";
import defaultProfile from "../images/defaultProfile.png";

const MessageCardPreview = ({ firstName, lastName }) => {
  return (
    <div className="flex gap-3 items-center border-b-[1px] border-zinc-300 py-5 px-4 cursor-pointer">
      {/* image */}
      <div className="h-10 w-10">
        <img
          src={defaultProfile}
          alt="user messager"
          className="w-full h-full rounded-full"
        />
      </div>

      {/* card information */}
      <div className="flex flex-col w-full">
        {" "}
        <div className="flex items-center justify-between">
          <span className="font-medium">
            {firstName} {lastName}
          </span>
          <span className="text-zinc-500 text-xs"> 2m ago</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-zinc-500 text-sm">
            Sure let me tell you about what is going on and i'll{" "}
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
