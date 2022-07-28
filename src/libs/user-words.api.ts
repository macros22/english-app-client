import axios from 'axios';
import { POST_USER_WORD } from 'constants/url';
import { IUserWord } from 'types/types';

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


export const postUserWord = async (word: IUserWord) => {
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