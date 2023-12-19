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
      className="absolute right-1 top-2.5 m-2 w-48 cursor-pointer rounded bg-white p-3 text-primaryDark shadow-md hover:bg-zinc-100"
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
