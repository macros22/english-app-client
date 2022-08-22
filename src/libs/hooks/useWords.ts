import { WORDS_MODE } from "libs/constants/names.storage";
import { USER_WORDS_URL, COMMON_WORDS_URL, COMMON_WORDS_COUNT_URL, USER_WORDS_COUNT_URL } from "libs/constants/url";
import { useLocalStorage, useWordsApi } from "libs/hooks";
import { wordsApi } from "libs/api/words.api";
import useSWR from "swr";
import { Role, WordMode } from "libs/types/types";

interface IUseWords {
    mode: 'commonWords' | 'userWords';
    skip?: number;
    limit?: number;
}

export const useWords = ({ mode, skip, limit }: IUseWords) => {

    const [wordsMode] = useLocalStorage<WordMode>(WORDS_MODE, 'userWords');

    const searchParams = (skip == 0 || skip) && limit
        ? `?skip=${skip}&limit=${limit}`
        : '';

    const { api } = useWordsApi(wordsMode);

    const wordsUrl = (mode == 'userWords' ? USER_WORDS_URL : COMMON_WORDS_URL) + searchParams;

    // TODO! remove interval.
    // , { refreshInterval: 3000 }
    const { data: words, mutate, error } = useSWR(wordsUrl, api.getWords);
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

