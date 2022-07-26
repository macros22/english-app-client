
import { getCommonWords } from "libs/common-words.api";
import useSWR from "swr";

export const useCommonWords = () => {
  const { data, mutate, error } = useSWR('common-words', getCommonWords);

  const loading = !data && !error;

  return {
    loading,
    words: data ? data : null,
    mutate,
  };
}