import { useState } from "react";

export const useDeleteMessage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const deleteConversationMessage = async (user1_id, user2_id, message_id) => {
    setLoading(true);
    setError(null);

    const response = await fetch(
      "http://localhost:4000/conversation/delete_message",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user1_id, user2_id, message_id }),
      }
    );

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

  return { deleteConversationMessage, loading, error };
};
