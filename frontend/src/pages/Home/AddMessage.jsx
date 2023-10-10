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
  const { addMessage, error } = useAddMessage();

  const handleAddMessage = async () => {
    const messageInfo = {
      user1_id: user._id,
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
    <div className="flex flex-col gap-3 bg-white rounded-lg shadow-lg mx-5 my-5 p-4 relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 w-full">
          <MdOutlineEmojiEmotions
            className="text-2xl cursor-pointer text-zinc-500 hover:scale-110 transition duration-300"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />

          {showEmojiPicker && (
            <div className="absolute bottom-[50px] left-[30px]">
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
            className="outline-none text-sm text-zinc-800 w-[95%] p-2"
          />
        </div>

        <RiSendPlane2Line
          className={
            messageContent.length === 0
              ? "text-2xl pointer-events-none opacity-30"
              : "text-2xl text-primaryOrange cursor-pointer"
          }
          onClick={handleAddMessage}
        />
      </div>
    </div>
  );
};

export default AddMessage;
