import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const signup = async (firstName, lastName, email, password) => {
    setIsPending(true);
    setError(null);

    const response = await fetch(
      "https://odin-messaging-app-api.onrender.com/user/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsPending(false);

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });

      navigate("/homepage");
    }
  };

  return { signup, isPending, error };
};
