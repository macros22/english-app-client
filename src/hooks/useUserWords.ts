

import { GET_USER_WORDS } from "constants/url";
import { getUserWords } from "libs/user-words.api";
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

    const { data, mutate, error } = useSWR(url, getUserWords);

    const loading = !data && !error;

    return {
        loading,
        words: data ? data : [],
        mutate,
    };
}
