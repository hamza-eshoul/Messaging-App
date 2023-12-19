import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [demoError, setDemoError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isDemoPending, setIsDemoPending] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const login = async (email, password, isDemoAccount = null) => {
    if (isDemoAccount) {
      setIsDemoPending(true);
      setDemoError(null);
    }

    if (!isDemoAccount) {
      setIsPending(true);
      setError(null);
    }

    const response = await fetch(
      "https://odin-messaging-app-api.onrender.com/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      if (isDemoAccount) {
        setIsDemoPending(false);
        setDemoError(json.error);
      }
      if (!isDemoAccount) {
        setIsPending(false);
        setError(json.error);
      }
    }

    if (response.ok) {
      if (isDemoAccount) {
        setIsDemoPending(false);
      }
      if (!isDemoAccount) {
        setIsPending(false);
      }

      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });

      navigate("/homepage");
    }
  };

  return { login, isPending, isDemoPending, error, demoError };
};
