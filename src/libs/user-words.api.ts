import axios from 'axios';
import { USER_WORDS_URL } from 'constants/url';
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
            USER_WORDS_URL,
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
            USER_WORDS_URL + `/${wordId}`,
            word,
            { withCredentials: true }
        );
        return res.data as IUserWord[];
    } catch (error) {
        console.log(error);
    }

    return null;
};

export const deleteUserWord = async (wordId: string) => {
    try {
        const res = await axios.delete(
            USER_WORDS_URL + `/${wordId}`,
            { withCredentials: true }
        );
        return res.data as IUserWord[];
    } catch (error) {
        console.log(error);
    }

    return null;
};