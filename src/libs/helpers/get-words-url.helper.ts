
import { COMMON_WORDS_URL, USER_WORDS_URL } from "libs/constants/url";
import { WordsMode } from "libs/types/types";

interface IProps {
    wordsMode: WordsMode;
    skip: number | undefined;
    limit: number | undefined;
}

export const getWordsUrl = ({ wordsMode, skip, limit }: IProps) => {

    const searchParams = (skip == 0 || skip) && limit
        ? `?skip=${skip}&limit=${limit}`
        : '';

    const wordsModeUrl = wordsMode == 'userWords' ? USER_WORDS_URL : COMMON_WORDS_URL;

    return wordsModeUrl + searchParams;
}