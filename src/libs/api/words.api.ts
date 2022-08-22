import axios from 'axios';
import { COMMON_WORDS_URL, USER_WORDS_URL } from 'libs/constants/url';
import { IUserWord, IUserWordPayload, WordMode, ICommonWord, IWord, Role } from 'libs/types/types';

export const wordsApi = (userRole: Role, mode: WordMode) => {

    type WordTypes = { 'userWords': IUserWord; 'commonWords': IWord };
    type WordType = WordTypes[typeof mode];

    return {
        getWords: async (url: string) => {
            try {
                const res = await axios.get(url, { withCredentials: true });

                // transform common words to IWord
                if (mode == 'commonWords') {
                    return (res.data as ICommonWord[]).map(word => {
                        const returnWord: IWord = {
                            ...word.commonWord,
                            studyStatus: word.userStudyStatus,
                        }
                        return returnWord;
                    });
                }
                // console.log(res.data.length);
                return res.data as WordType[];
            } catch (error) {
                throw error;
            }
        },
        getWordsCount: async (url: string) => {
            try {
                const res = await axios.get(url, { withCredentials: true });
                return res.data as number;
            } catch (error) {
                throw error;
            }
        },
        postWord: async (word: IUserWordPayload) => {
            try {
                let url = USER_WORDS_URL;
                if (userRole == Role.ADMIN) {
                    url = COMMON_WORDS_URL;
                }

                const res = await axios.post(
                    url,
                    word,
                    { withCredentials: true }
                );
                return res.data as WordType;
            } catch (error) {
                throw error;
            }
        },
        patchWord: async (word: IUserWordPayload, wordId: string) => {
            try {
                let url = USER_WORDS_URL;
                if (userRole == Role.ADMIN) {
                    url = COMMON_WORDS_URL;
                }

                const res = await axios.patch(
                    url + `/${wordId}`,
                    word,
                    { withCredentials: true }
                );
                return res.data as WordType;
            } catch (error) {
                throw error;
            }
        },
        deleteWord: async (wordId: string) => {
            try {
                let url = USER_WORDS_URL;
                if (userRole == Role.ADMIN) {
                    url = COMMON_WORDS_URL;
                }
                const res = await axios.delete(
                    url + `/${wordId}`,
                    { withCredentials: true }
                );
                return res.data as WordType[];
            } catch (error) {
                throw error;
            }
        },
    }
}

