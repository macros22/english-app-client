import { WORDS_MODE } from "constants/names.storage";
import { USER_WORDS_URL, COMMON_WORDS_URL, COMMON_WORDS_COUNT_URL, USER_WORDS_COUNT_URL } from "constants/url";
import { useLocalStorage, useWordsApi } from "hooks";
import { wordsApi } from "libs/words.api";
import useSWR from "swr";
import { Role, WordMode } from "types/types";


export const useWords = (mode: 'commonWords' | 'userWords', skip?: number, limit?: number) => {

    const [wordsMode] = useLocalStorage<WordMode>(WORDS_MODE, 'userWords');

    const searchParams = (skip == 0 || skip) && limit
        ? `?skip=${skip}&limit=${limit}`
        : '';

    const { api } = useWordsApi(wordsMode);

    const wordsUrl = (mode == 'userWords' ? USER_WORDS_URL : COMMON_WORDS_URL) + searchParams;

    // TODO! remove interval.
    const { data: words, mutate, error } = useSWR(wordsUrl, api.getWords, { refreshInterval: 3000 });
    const loading: boolean = !words && !error;

    const countUrl = mode == 'userWords' ? USER_WORDS_COUNT_URL : COMMON_WORDS_COUNT_URL;
    const { data: count, mutate: mutateCount, error: countError } = useSWR(countUrl, api.getWordsCount);
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

