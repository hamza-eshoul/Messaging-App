import { Link } from "react-router-dom";

// images
import defaultProfile from "../../assets/images/defaultProfile.png";

// icons
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuArrowLeft } from "react-icons/lu";

const MessageInterfaceHeader = ({
  selectedUserConversation,
  setIsConversationActive,
  setMessagesList,
}) => {
  return (
    <header className="flex h-[8%] py-7 items-center gap-3 border-b-[1px] border-zinc-300 px-4">
      <LuArrowLeft
        className="cursor-pointer text-2xl hover:text-primaryOrange md:hidden"
        onClick={() => {
          setMessagesList(null);
          setIsConversationActive(false);
        }}
      />

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

      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col">
          {" "}
          <Link
            to={`/profile/${selectedUserConversation._id}`}
            className="cursor-pointer font-medium hover:opacity-60"
          >
            {selectedUserConversation.firstName}{" "}
            {selectedUserConversation.lastName}
          </Link>
          <span className="text-xs text-zinc-500">
            {selectedUserConversation.email}
          </span>
        </div>

        <BsThreeDotsVertical className="cursor-pointer text-2xl hover:opacity-50" />
      </div>
    </header>
  );
};

export default MessageInterfaceHeader;
