import axios from 'axios';
import { POST_USER_WORD } from 'constants/url';
import { IUserWord, IUserWordPayload } from 'types/types';

export const getUserWords = async (url: string) => {
    try {
        const res = await axios.get(url, { withCredentials: true });
        return res.data as IUserWord[];
    } catch (error) {
        console.log(error);
    }

    return null;
};

export const getUserWordsCount = async (url: string) => {
    try {
        const res = await axios.get(url, { withCredentials: true });
        return res.data as number;
    } catch (error) {
        console.log(error);
    }

    return null;
};


export const postUserWord = async (word: IUserWordPayload) => {
    try {
        const res = await axios.post(
            POST_USER_WORD,
            word,
            { withCredentials: true }
        );
        return res.data as IUserWord[];
    } catch (error) {
        console.log(error);
    }

    return null;
};

export const patchUserWord = async (word: IUserWordPayload, wordId: string) => {
    try {
        const res = await axios.patch(
            POST_USER_WORD + `/${wordId}`,
            word,
            { withCredentials: true }
        );
        return res.data as IUserWord[];
    } catch (error) {
        console.log(error);
    }

    return null;
};