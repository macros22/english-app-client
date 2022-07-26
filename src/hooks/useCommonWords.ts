
import { COMMON_WORDS_API } from "constants/swr";
import { getCommonWords } from "libs/common-words.api";
import useSWR from "swr";

export const useCommonWords = () => {
  const { data, mutate, error } = useSWR(COMMON_WORDS_API, getCommonWords);

  const loading = !data && !error;

  return {
    loading,
    words: data ? data : null,
    mutate,
  };
}