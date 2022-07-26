import { getUser } from "libs/auth.api";
import useSWR from "swr";

export const useUser = () => {
  const { data, mutate, error } = useSWR('user', getUser);

  const loading = !data && !error;
  const loggedIn = !error && data;

  return {
    loading,
    loggedIn,
    user: data,
    mutate,
  };
}