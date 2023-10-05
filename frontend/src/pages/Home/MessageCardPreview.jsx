import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { formatDistance } from "date-fns";

// images
import defaultProfile from "../../images/defaultProfile.png";

// icons
import { BsCheck2All } from "react-icons/bs";

const MessageCardPreview = ({
  user,
  selectedUserConversation,
  setSelectedUserConversation,
  conversations,
}) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [previewMessage, setPreviewMessage] = useState(null);
  const [previewMessageTime, setPreviewMessageTime] = useState(null);

  const { user: loggedUser } = useAuthContext();

  useEffect(() => {
    if (selectedUserConversation) {
      if (user._id === selectedUserConversation._id) {
        setSelectedConversation(true);
      } else {
        setSelectedConversation(null);
      }
    }
  }, [selectedUserConversation]);

  const populateUserConversation = (conversation) => {
    if (conversation.messages.length !== 0) {
      let lastMessage =
        conversation.messages[conversation.messages.length - 1].content;

      let messageTime = conversation.updatedAt;

      let formattedMessageTime = formatDistance(
        new Date(messageTime),
        new Date(),
        {
          addSuffix: true,
        }
      );

      if (lastMessage.length > 49) {
        lastMessage = lastMessage.substring(0, 45) + "...";
      }

      setPreviewMessage(lastMessage);
      setPreviewMessageTime(formattedMessageTime);
    } else {
      populateEmptyConversation();
    }
  };

  const populateEmptyConversation = () => {
    const userName = user.firstName + " " + user.lastName;
    setPreviewMessage(`Chat with  ${userName} ...`);
  };

  useEffect(() => {
    populateEmptyConversation();

    if (conversations) {
      conversations.map((conversation) => {
        if (
          (conversation.user1_id == user._id &&
            conversation.user2_id == loggedUser._id) ||
          (conversation.user1_id == loggedUser._id &&
            conversation.user2_id == user._id)
        ) {
          populateUserConversation(conversation);
        }
      });
    }
  }, [conversations]);

  return (
    <div
      className={`${
        selectedConversation
          ? "bg-lightOrange border-l-[2.5px] border-l-secondaryOrange "
          : "border-b-[1px] border-zinc-300"
      } flex gap-3 items-center py-[21.6px] px-4 cursor-pointer `}
      onClick={() => {
        setSelectedUserConversation(user);
      }}
    >
      {/* image */}
      <div className="h-12 w-12">
        <img
          src={user.profileImg.url ? user.profileImg.url : defaultProfile}
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
          {previewMessageTime && (
            <span className="text-zinc-500 text-xs">
              {" "}
              {previewMessageTime}{" "}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <p
            className={`${
              selectedConversation
                ? "text-primaryDark font-medium"
                : "text-zinc-500"
            } text-sm`}
          >
            {previewMessage && <span>{previewMessage}</span>}
          </p>
          <BsCheck2All className="text-primaryOrange text-lg" />
        </div>
      </div>
    </div>
  );
};

export default MessageCardPreview;
