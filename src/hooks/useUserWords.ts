

import { getUserWords } from "libs/user-words.api";
import useSWR from "swr";

export const useUserWords = () => {
    const { data, mutate, error } = useSWR("api_user_words", getUserWords);

    const loading = !data && !error;

    return {
        loading,
        words: data ? data : [],
        mutate,
    };
}
