import { getUser } from 'libs/api/auth.api';
import useSWR from 'swr';

export const useUser = () => {
  const { data, mutate, error } = useSWR('user', getUser);
  const isUserLoading = !data && !error;
  const isLoggedIn = !error && data;

  return {
    isUserLoading,
    isLoggedIn,
    user: data,
    mutate,
  };
};
