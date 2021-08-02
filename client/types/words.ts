export type fetchObj = {
  allWordsCount: number;
  words: wordsType;
};

export type wordsType = Array<Array<string>>;

export interface AllWordsState {
  words: wordsType;
}

export enum AllWordsActionTypes {
  FETCH_ALL_WORDS = 'FETCH_ALL_WORDS',
}

interface FetchAllWordsAction {
  type: AllWordsActionTypes.FETCH_ALL_WORDS;
  payload: wordsType;
}

export type AllWordsAction = FetchAllWordsAction;
