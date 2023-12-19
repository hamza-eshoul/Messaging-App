import { useState } from "react";
import { useAddMessage } from "../../hooks/useAddMessage";
import { socket } from "../../socket";

// icons
import { RiSendPlane2Line } from "react-icons/ri";
import { MdOutlineEmojiEmotions } from "react-icons/md";

// components
import EmojiPicker from "emoji-picker-react";

const AddMessage = ({
  user,
  setConversations,
  selectedUserConversation,
  setMessagesList,
}) => {
  const [messageContent, setMessageContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);
  const { addMessage } = useAddMessage();

  const handleAddMessage = async () => {
    const messageInfo = {
      user2_id: selectedUserConversation._id,
      author: user.firstName + " " + user.lastName,
      content: messageContent,
      authorImage: user.profileImg.url,
    };

    const updatedConversation = await addMessage(messageInfo);

    handleSocketAddMessage(updatedConversation, selectedUserConversation);

    resetAddMessage();

    updateMessagesAndConversationsList(updatedConversation);
  };

  const handleSocketAddMessage = (conversation, selectedUserConversation) => {
    const addedMessage =
      conversation.messages[conversation.messages.length - 1];

    const receiver = selectedUserConversation;

    socket.emit("sendMessage", {
      addedMessage,
      receiver,
      conversation,
    });
  };

  const resetAddMessage = () => {
    setMessageContent("");
    setShowEmojiPicker(null);
  };

  const updateMessagesAndConversationsList = (updatedConversation) => {
    setMessagesList(updatedConversation.messages);

    setConversations((prevConversations) => {
      return prevConversations.map((conversation) => {
        if (conversation._id == updatedConversation._id) {
          return updatedConversation;
        } else {
          return conversation;
        }
      });
    });
  };

  return (
    <section className="relative mx-5 mb-7 flex items-center justify-between rounded-lg bg-white p-3.5 shadow-lg">
      <div className="flex w-full items-center gap-2">
        <MdOutlineEmojiEmotions
          className="hidden cursor-pointer text-2xl text-zinc-500 transition duration-300 hover:scale-110 sm:block"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />

        {showEmojiPicker && (
          <div className="absolute bottom-[50px] left-[32px] hidden sm:block">
            <EmojiPicker
              onEmojiClick={(emojiObject) => {
                setMessageContent((prevState) => {
                  return prevState + emojiObject.emoji;
                });
              }}
            />
          </div>
        )}

        <input
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Send your message..."
          className="w-[95%] p-2 text-sm text-zinc-800 outline-none"
        />
      </div>

      <RiSendPlane2Line
        className={
          messageContent.length === 0
            ? "pointer-events-none text-2xl opacity-30"
            : "cursor-pointer text-2xl text-primaryOrange"
        }
        onClick={handleAddMessage}
      />
    </section>
  );
};

export default AddMessage;
