import { useFetchAuth } from "./useFetchAuth";

export const useDemoLogin = () => {
  const { fetchAuth, loading: demoLoading, error: demoError } = useFetchAuth();

  const demoLogin = async (email, password) => {
    await fetchAuth("login", { email, password });
  };

  return { demoLogin, demoLoading, demoError };
};
