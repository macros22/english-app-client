import axios from "axios";
import { COMMON_WORDS_URL, USER_WORDS_URL } from "libs/constants/url";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then((res) => res.data as number);

interface IProps {
    letter: string;
    limit: number;
}

export const usePageByLetter = ({ letter, limit }: IProps) => {
    const router = useRouter();
    const { data, error } = useSWR(`${router.query.wordsMode == 'user-words' ? USER_WORDS_URL: COMMON_WORDS_URL}/getPageByLetter?letter=${letter}&limit=${limit}`, fetcher)
    const isPageLoading = !data && !error;

    return {
        isPageLoading,
        pageError: error,
        page: data || 1,
    };
}