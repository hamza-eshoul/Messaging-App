import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useFetchUsers = () => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [usersList, setUsersList] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:4000/user");

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError("Users could not be fetched");
      }

      if (response.ok) {
        const users = json.filter((item) => item.email !== user.email);

        setLoading(false);
        setUsersList(users);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  return { loading, error, usersList };
};
