import { useState } from "react";

export const useFetchConversation = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const fetchConversation = async (user1_id, user2_id) => {
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/conversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user1_id, user2_id }),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      setLoading(false);
      return json;
    }
  };

  return { fetchConversation, loading, error };
};
