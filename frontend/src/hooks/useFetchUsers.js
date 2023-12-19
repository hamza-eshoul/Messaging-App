import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export const useFetchUsers = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [users, setUsers] = useState(null);

  const { user } = useAuthContext();

  const fetchUsers = async () => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      "https://odin-messaging-app-api.onrender.com/users",
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError("Users could not be fetched");
    }

    if (response.ok) {
      const users_list = json.filter((item) => item.email !== user.email);
      setUsers(users_list);
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, []);

  return { users, isPending, error };
};
