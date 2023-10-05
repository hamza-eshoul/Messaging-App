import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export const useFetchUsers = (isProfileUsers = null) => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [users, setUsers] = useState(null);

  const { user } = useAuthContext();

  const filterUsersList = (users_list) => {
    const shuffledUsers = users_list.sort(() => Math.random() - 0.5);
    return shuffledUsers.slice(0, 5);
  };

  const fetchUsers = async () => {
    setIsPending(true);
    setError(null);

    const response = await fetch("http://localhost:4000/user");

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError("Users could not be fetched");
    }

    if (response.ok) {
      const users_list = json.filter((item) => item.email !== user.email);

      if (isProfileUsers) {
        setUsers(filterUsersList(users_list));
      }
      if (!isProfileUsers) {
        setUsers(users_list);
      }

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
