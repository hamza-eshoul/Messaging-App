import { Link } from "react-router-dom";

// images
import defaultProfile from "../../assets/images/defaultProfile.png";

// icons
import { BsThreeDotsVertical } from "react-icons/bs";

const MessageInterfaceHeader = ({ selectedUserConversation }) => {
  return (
    <div className="flex gap-3 items-center border-b-[1px] border-zinc-300 h-[8%] px-4">
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

      {/* User information */}

      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          {" "}
          <Link
            to={`/profile/${selectedUserConversation._id}`}
            className="font-medium cursor-pointer hover:opacity-60"
          >
            {selectedUserConversation.firstName}{" "}
            {selectedUserConversation.lastName}
          </Link>
          <p className="text-zinc-500 text-xs">
            {selectedUserConversation.email}
          </p>
        </div>

        <div className="flex gap-2">
          <BsThreeDotsVertical className="text-2xl hover:opacity-50 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default MessageInterfaceHeader;
