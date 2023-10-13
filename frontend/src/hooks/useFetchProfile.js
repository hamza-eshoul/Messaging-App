import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export const useFetchProfile = (profile_id) => {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const { user } = useAuthContext();

  const fetchProfile = async () => {
    setIsPending(true);
    setIsLoggedInUser(false);
    setError(null);

    const response = await fetch(
      `https://odin-messaging-app-api.onrender.com/user/${profile_id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsPending(false);
      setUserProfile(json);

      if (json._id === user._id) {
        setIsLoggedInUser(true);
      }
    }
  };

  useEffect(() => {
    fetchProfile(profile_id);
  }, [profile_id]);

  return { userProfile, isLoggedInUser, isPending, error, setUserProfile };
};
