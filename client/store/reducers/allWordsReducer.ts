import { allWordsAction, allWordsActionTypes, allWordsState, wordStatusType } from 'types/words';

const initialState: allWordsState = {
  words: [
    ['1', 'neglect', 'пренебрегать', wordStatusType.LEARN],
    ['2', 'shun', 'избегать', wordStatusType.LEARN],
    ['3', 'proposal', 'предложение', wordStatusType.KNOW],
    ['4', 'attainment', 'достижение', wordStatusType.LEARN],
    ['5', 'unnecessary', 'ненужный', wordStatusType.LEARN],
    ['6', 'substrate', 'подложка', wordStatusType.UNKNOWN],
  ],
};

export const allWordsReducer = (state = initialState, action: allWordsAction): allWordsState => {
  switch (action.type) {
    case allWordsActionTypes.FETCH_ALL_WORDS:
      return { words: action.payload };
    case allWordsActionTypes.SET_WORD_STATUS:
      const statusPos: number = 3;

      const newWords = state.words;
      console.log('before: ', newWords[action.payload.id - 1][statusPos]);

      newWords[action.payload.id - 1][statusPos] = action.payload.status;

      console.log('after: ', newWords[action.payload.id - 1][statusPos]);

      return { ...state, words: newWords };
    default:
      return state;
  }
};
