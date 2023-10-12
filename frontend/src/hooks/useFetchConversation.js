import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export const useFetchConversation = (selectedUserConversation) => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [isConversationEmpty, setIsConversationEmpty] = useState(false);
  const { user } = useAuthContext();

  const fetchConversation = async () => {
    setIsPending(true);
    setIsConversationEmpty(false);
    setConversation(null);
    setError(null);

    const conversation_info = {
      user1_id: user._id,
      user2_id: selectedUserConversation._id,
    };

    const response = await fetch("http://localhost:4000/conversation", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(conversation_info),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (json && json.messages && json.messages.length !== 0) {
      setConversation(json);
      setIsConversationEmpty(false);
      setIsPending(false);
    } else {
      setIsPending(false);
      setIsConversationEmpty(true);
    }
  };

  useEffect(() => {
    if (selectedUserConversation) {
      fetchConversation();
    }
  }, [selectedUserConversation]);

  return { conversation, isPending, error, isConversationEmpty };
};
