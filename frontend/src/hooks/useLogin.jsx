import { useFetchAuth } from "./useFetchAuth";

export const useLogin = () => {
  const { fetchAuth, loading, error } = useFetchAuth();

  const login = async (email, password) => {
    await fetchAuth("login", { email, password });
  };

  return { login, loading, error };
};
