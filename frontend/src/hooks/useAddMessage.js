import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useAddMessage = () => {
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const addMessage = async (messageInfo) => {
    const response = await fetch(
      "https://odin-messaging-app-api.onrender.com/conversations/message",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...messageInfo,
        }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      return json;
    }
  };

  return { addMessage, error };
};
