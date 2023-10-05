import { useDeleteMessage } from "../../hooks/useDeleteMessage";

const DeleteMessage = ({
  user,
  selectedUserConversation,
  setDeleteMessage,
  message,
  setMessagesList,
  triggerFetchConversation,
  setTriggerFetchConversation,
}) => {
  const { deleteMessage, loading, error } = useDeleteMessage();

  const handleDeleteMessage = async () => {
    const deleteMessageInfo = {
      user1_id: user._id,
      user2_id: selectedUserConversation._id,
      message_id: message._id,
    };

    const updatedMessages = await deleteMessage(deleteMessageInfo);

    updateMessagesList(updatedMessages);
  };

  const updateMessagesList = (messages) => {
    setMessagesList(messages.messages);
    setTriggerFetchConversation(!triggerFetchConversation);
  };

  return (
    <div
      className="bg-white hover:bg-zinc-100 text-primaryDark cursor-pointer p-3 m-2 w-48 absolute right-1 top-2.5 shadow-md rounded"
      onClick={() => {
        setDeleteMessage(null);
        handleDeleteMessage();
      }}
    >
      Delete Message
    </div>
  );
};

export default DeleteMessage;
