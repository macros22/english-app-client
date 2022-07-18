import { getUser } from "libs/auth.api";
import useSWR from "swr";

export default function useUser() {
  const { data, mutate, error } = useSWR("api_user", getUser);

  const loading = !data && !error;
  const loggedIn = !error && data;

  return {
    loading,
    loggedIn,
    user: data,
    mutate,
  };
}