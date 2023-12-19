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

    const response = await fetch(
      `https://odin-messaging-app-api.onrender.com/conversations/${user2_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      }
    );

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
