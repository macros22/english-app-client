import axios from 'axios';
import { POST_USER_WORD } from 'constants/url';
import { UserWord } from 'types/types';

export const getUserWords = async (url: string) => {
    try {
        const res = await axios.get(url, { withCredentials: true });
        return res.data as UserWord[];
    } catch (error) {
        console.log(error);
    }

    return null;
};

export const postUserWord = async (word: UserWord) => {
    try {
        const res = await axios.post(
            POST_USER_WORD,
            word,
            { withCredentials: true }
        );
        return res.data as UserWord[];
    } catch (error) {
        console.log(error);
    }

    return null;
};