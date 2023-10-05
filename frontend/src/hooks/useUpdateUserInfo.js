import { useState } from "react";

export const updateUserInfo = (user_update) => {
  const [isPendng, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  const updateInfo = async () => {
    const response = await fetch(`http://localhost:4000/user/${user_update}`);
  };
};
