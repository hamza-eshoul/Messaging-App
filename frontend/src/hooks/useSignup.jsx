import { useFetchAuth } from "./useFetchAuth";

export const useSignup = () => {
  const { fetchAuth, loading, error } = useFetchAuth();

  const signup = async (firstName, lastName, email, password) => {
    await fetchAuth("signup", { firstName, lastName, email, password });
  };

  return { signup, loading, error };
};
