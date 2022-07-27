import { GET_USER_WORDS, GET_USER_WORDS_COUNT } from "constants/url";
import { getUserWords, getUserWordsCount } from "libs/user-words.api";
import useSWR from "swr";

export const useUserWords = (skip?: number, limit?: number) => {

    // const searchParamsStr = skip
    //     ?
    //     '?' + new URLSearchParams({
    //         skip: searchParams.skip.toString(),
    //         limit: searchParams.limit.toString(),
    //     })
    //     : '';

    const searchParams = skip && limit
        ? `?skip=${skip}&limit=${limit}`
        : '';

    const url = GET_USER_WORDS + searchParams;

    const { data: words, mutate, error } = useSWR(url, getUserWords);
    const loading = !words && !error;

    const { data: count, mutate: mutateCount, error: countError } = useSWR(GET_USER_WORDS_COUNT, getUserWordsCount);
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


export const useUserWordsCount = () => {


    const { data: count, mutate: mutateCount, error: countError } = useSWR(GET_USER_WORDS_COUNT, getUserWordsCount);
    const loadingCount = !count && !countError;

    return {
        loadingCount,
        count: count ? count : null,
        mutateCount,
    };
}