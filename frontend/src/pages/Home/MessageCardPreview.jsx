import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { formatDistance } from "date-fns";

// images
import defaultProfile from "../../assets/images/defaultProfile.png";

// icons
import { BsCheck2All } from "react-icons/bs";

const MessageCardPreview = ({
  user,
  selectedUserConversation,
  setSelectedUserConversation,
  conversations,
  setIsConversationActive,
}) => {
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [previewMessage, setPreviewMessage] = useState(null);
  const [previewMessageTime, setPreviewMessageTime] = useState(null);
  const { user: loggedUser } = useAuthContext();

  const populateEmptyConversation = () => {
    const userFullName = user.firstName + " " + user.lastName;
    setPreviewMessage(`Chat with  ${userFullName} ...`);
  };

  const populateUserConversation = (conversation) => {
    if (conversation.messages.length !== 0) {
      let lastMessage =
        conversation.messages[conversation.messages.length - 1].content;

      let messageTime = conversation.updatedAt;

      let formattedMessageTime = formatDistance(
        new Date(messageTime),
        new Date(),
      );

      if (lastMessage.length > 49) {
        lastMessage = lastMessage.substring(0, 45) + "...";
      }

      setPreviewMessage(lastMessage);
      setPreviewMessageTime(formattedMessageTime);
    }
  };

  const checkAndPopulateConversationMatch = () => {
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
  };

  useEffect(() => {
    populateEmptyConversation();

    checkAndPopulateConversationMatch();
  }, [conversations]);

  useEffect(() => {
    const updateSelectedConversation = () => {
      if (user._id === selectedUserConversation._id) {
        setIsUserSelected(true);
      } else {
        setIsUserSelected(false);
      }
    };

    if (selectedUserConversation) {
      updateSelectedConversation();
    }
  }, [selectedUserConversation]);

  return (
    <article
      className={`${
        isUserSelected
          ? "border-l-[2.5px] border-l-secondaryOrange bg-lightOrange "
          : "border-b-[1px] border-zinc-300"
      } flex cursor-pointer items-center gap-3 px-4 py-[21.6px] `}
      onClick={() => {
        setSelectedUserConversation(user);
        setIsConversationActive(true);
      }}
    >
      <div className="h-12 w-12">
        <img
          src={user.profileImg.url ? user.profileImg.url : defaultProfile}
          alt="user messager"
          className="h-full w-full rounded-full"
        />
      </div>

      <div className="flex w-[calc(100%-48px)] flex-col gap-1">
        {" "}
        <div className="flex items-center justify-between">
          <span
            className={`${
              isUserSelected ? "text-primaryOrange" : ""
            } font-medium`}
          >
            {user.firstName} {user.lastName}
          </span>
          {previewMessageTime && (
            <time className="text-xs text-zinc-500">
              {" "}
              {previewMessageTime}{" "}
            </time>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <p
            className={`${
              isUserSelected ? "font-medium text-primaryDark" : "text-zinc-500"
            } text-sm`}
          >
            {previewMessage && <span>{previewMessage}</span>}
          </p>
          <BsCheck2All className="text-lg text-primaryOrange" />
        </div>
      </div>
    </article>
  );
};

export default MessageCardPreview;
