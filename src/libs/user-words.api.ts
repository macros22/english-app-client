import axios from 'axios';
import { GET_USER_WORDS, POST_USER_WORD } from 'constants/url';
import { UserWord } from 'types/types';

export const getUserWords = async (skip: number, limit: number) => {
    try {
        const res = await axios.get(
            GET_USER_WORDS,

            { withCredentials: true }
        );
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