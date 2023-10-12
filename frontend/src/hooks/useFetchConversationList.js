import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useFetchConversationList = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [conversations, setConversations] = useState(null);
  const { user } = useAuthContext();

  const fetchConversationList = async () => {
    setIsPending(true);
    setError(null);

    const response = await fetch("http://localhost:4000/conversation", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setConversations(null);
      setError(json.error);
    }

    if (response.ok) {
      setIsPending(false);
      setConversations(json);
    }
  };

  useEffect(() => {
    fetchConversationList();
  }, []);

  return { conversations, setConversations, isPending, error };
};
