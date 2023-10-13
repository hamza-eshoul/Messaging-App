import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useDeleteMessage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { user } = useAuthContext();

  const deleteMessage = async (deleteMessageInfo) => {
    setLoading(true);
    setError(null);

    const response = await fetch(
      "https://odin-messaging-app-api.onrender.com/conversation/delete_message",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...deleteMessageInfo }),
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

  return { deleteMessage, loading, error };
};
