import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useFetchAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const fetchAuth = async (authType, authData) => {
    setLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:4000/user/${authType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      setLoading(false);

      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: `${authType}`, payload: json });

      navigate("/homepage");
    }
  };

  return { fetchAuth, loading, error };
};
