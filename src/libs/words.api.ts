import axios from 'axios';
import { USER_WORDS_URL } from 'constants/url';
import { IUserWord, IUserWordPayload, WordMode, ICommonWord, IWord } from 'types/types';

export const wordsApi = (mode: WordMode) => {

    type WordTypes = { 'userWords': IUserWord; 'commonWords': IWord };
    type WordType = WordTypes[typeof mode];

    return {
        getWords: async (url: string) => {
            try {
                const res = await axios.get(url, { withCredentials: true });

                if (mode == 'commonWords') {
                    return (res.data as ICommonWord[]).map(word => {
                        const returnWord: IWord = {
                            ...word.commonWord,
                            studyStatus: word.userStudyStatus,
                        }
                        return returnWord;
                    });
                }

                return res.data as WordType[];
            } catch (error) {
                console.log(error);
            }

            return null;
        },
        getWordsCount: async (url: string) => {
            try {
                const res = await axios.get(url, { withCredentials: true });
                return res.data as number;
            } catch (error) {
                console.log(error);
            }

            return null;
        },
        postWord: async (word: IUserWordPayload) => {
            try {
                const res = await axios.post(
                    USER_WORDS_URL,
                    word,
                    { withCredentials: true }
                );
                return res.data as WordType[];
            } catch (error) {
                console.log(error);
            }

            return null;
        },
        patchWord: async (word: IUserWordPayload, wordId: string) => {
            try {
                const res = await axios.patch(
                    USER_WORDS_URL + `/${wordId}`,
                    word,
                    { withCredentials: true }
                );
                return res.data as WordType[];
            } catch (error) {
                console.log(error);
            }

            return null;
        },
        deleteWord: async (wordId: string) => {
            try {
                const res = await axios.delete(
                    USER_WORDS_URL + `/${wordId}`,
                    { withCredentials: true }
                );
                return res.data as WordType[];
            } catch (error) {
                console.log(error);
            }

            return null;
        },
    }
}

