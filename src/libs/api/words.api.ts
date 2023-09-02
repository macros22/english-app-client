import axios, { AxiosError } from 'axios';
import { COMMON_WORDS_URL, USER_WORDS_URL } from 'libs/constants/url';
import {
  ICommonWord,
  IUserWord,
  IUserWordPayload,
  IWord,
  Role,
  WordsMode,
} from 'libs/types/types';

interface IWordsApiProps {
  wordsMode: WordsMode;
  userRole: Role;
}

export const wordsApi = ({ userRole, wordsMode }: IWordsApiProps) => {
  type WordTypes = { userWords: IUserWord; commonWords: IWord };
  type WordType = WordTypes[typeof wordsMode];

  return {
    getWords: async (url: string) => {
      try {
        const res = await axios.get(url, { withCredentials: true });

        // Transform ICommonWord to IWord.
        if (wordsMode == 'commonWords') {
          return (res.data as ICommonWord[]).map(word => {
            const returnWord: IWord = {
              ...word,
              studyStatus: word?.userWord?.studyStatus || null,
            };
            return returnWord;
          });
        }

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
        if (userRole == Role.Admin) {
          url = COMMON_WORDS_URL;
        }

        const res = await axios.post(url, word, { withCredentials: true });
        return res.data as WordType;
      } catch (error) {
        if (error instanceof AxiosError) {
          error.message = error.response?.data.message || error.message;
        }
        throw error;
      }
    },
    patchWord: async (word: IUserWordPayload, wordId: string) => {
      try {
        let url = USER_WORDS_URL;
        if (userRole == Role.Admin) {
          url = COMMON_WORDS_URL;
        }

        const res = await axios.patch(`${url}/${wordId}`, word, {
          withCredentials: true,
        });
        return res.data as WordType;
      } catch (error) {
        if (error instanceof AxiosError) {
          error.message = error.response?.data.message || error.message;
        }
        throw error;
      }
    },
    deleteWord: async (wordId: string) => {
      try {
        let url = USER_WORDS_URL;
        if (userRole == Role.Admin) {
          url = COMMON_WORDS_URL;
        }
        const res = await axios.delete(`${url}/${wordId}`, {
          withCredentials: true,
        });
        return res.data as WordType[];
      } catch (error) {
        throw error;
      }
    },
  };
};
