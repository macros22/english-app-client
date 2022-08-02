import { USER_WORDS_URL, COMMON_WORDS_URL, COMMON_WORDS_COUNT_URL, USER_WORDS_COUNT_URL } from "constants/url";
import { getUserWords, getUserWordsCount } from "libs/user-words.api";
import useSWR from "swr";

export const useWords = (mode: 'commonWords' | 'userWords', skip?: number, limit?: number) => {

    const searchParams = (skip == 0 || skip) && limit
        ? `?skip=${skip}&limit=${limit}`
        : '';

    const wordsUrl = (mode == 'userWords' ? USER_WORDS_URL : COMMON_WORDS_URL) + searchParams;
    const { data: words, mutate, error } = useSWR(wordsUrl, getUserWords);
    const loading = !words && !error;

    const countUrl = mode == 'userWords' ? USER_WORDS_COUNT_URL : COMMON_WORDS_COUNT_URL;
    const { data: count, mutate: mutateCount, error: countError } = useSWR(countUrl, getUserWordsCount);
    const loadingCount = !count && !countError;

    return {
        loading,
        words: words ? words : [],
        mutate,
        loadingCount,
        count: count ? count : null,
        mutateCount,
    };
}

