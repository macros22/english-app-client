

import { USER_WORDS_API } from "constants/swr";
import { getUserWords } from "libs/user-words.api";
import useSWR from "swr";

export const useUserWords = () => {
    const { data, mutate, error } = useSWR(USER_WORDS_API, getUserWords);

    const loading = !data && !error;

    return {
        loading,
        words: data ? data : [],
        mutate,
    };
}
