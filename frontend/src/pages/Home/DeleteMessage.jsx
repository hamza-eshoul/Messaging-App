import { useDeleteMessage } from "../../hooks/useDeleteMessage";

const DeleteMessage = ({
  user,
  selectedUserConversation,
  setIsDeleteMessage,
  message,
  setMessagesList,
  setConversations,
}) => {
  const { deleteMessage, loading, error } = useDeleteMessage();

  const handleDeleteMessage = async () => {
    const deleteMessageInfo = {
      user1_id: user._id,
      user2_id: selectedUserConversation._id,
      message_id: message._id,
    };

    const updatedConversation = await deleteMessage(deleteMessageInfo);

    updateMessagesListAndConversationList(updatedConversation);
  };

  const updateMessagesListAndConversationList = (updatedConversation) => {
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
    <div
      className="bg-white hover:bg-zinc-100 text-primaryDark cursor-pointer p-3 m-2 w-48 absolute right-1 top-2.5 shadow-md rounded"
      onClick={() => {
        setIsDeleteMessage(null);
        handleDeleteMessage();
      }}
    >
      Delete Message
    </div>
  );
};

export default DeleteMessage;
