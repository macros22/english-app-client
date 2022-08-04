import axios from 'axios';
import { COMMON_WORDS_URL, USER_WORDS_URL } from 'constants/url';
import { IUserWord, IUserWordPayload, WordMode, ICommonWord, IWord, Role } from 'types/types';

export const wordsApi = (userRole: Role, mode: WordMode) => {

    type WordTypes = { 'userWords': IUserWord; 'commonWords': IWord };
    type WordType = WordTypes[typeof mode];

    return {
        getWords: async (url: string) => {
            try {
                const res = await axios.get(url, { withCredentials: true });

                console.log(mode);
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
                console.log(res.data);
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
                let url = USER_WORDS_URL;
                if (userRole == Role.ADMIN) {
                    url = COMMON_WORDS_URL;
                }

                const res = await axios.post(
                    url,
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
                let url = USER_WORDS_URL;
                if (userRole == Role.ADMIN) {
                    url = COMMON_WORDS_URL;
                }

                const res = await axios.patch(
                    url + `/${wordId}`,
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
                console.log(error);
            }

            return null;
        },
    }
}

