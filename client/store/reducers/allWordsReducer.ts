import { AllWordsAction, AllWordsActionTypes, AllWordsState } from 'types/words';

const initialState: AllWordsState = {
  words: [
    ['1', 'neglect', 'пренебрегать'],
    ['2', 'shun', 'избегать'],
    ['3', 'proposal', 'предложение'],
    ['4', 'attainment', 'достижение'],
  ],
};

export const allWordsReducer = (state = initialState, action: AllWordsAction): AllWordsState => {
  switch (action.type) {
    case AllWordsActionTypes.FETCH_ALL_WORDS:
      return { words: action.payload };
    default:
      return state;
  }
};
