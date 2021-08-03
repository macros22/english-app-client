import { AllWordsAction, AllWordsActionTypes, AllWordsState } from 'types/words';

const initialState: AllWordsState = {
  words: [
    ['1', 'neglect', 'пренебрегать', 'learn'],
    ['2', 'shun', 'избегать', 'learn'],
    ['3', 'proposal', 'предложение', 'learn'],
    ['4', 'attainment', 'достижение', 'know'],
    ['5', 'unnecessary', 'ненужный', 'know'],
    ['6', 'substrate', 'подложка', 'don`t know']
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
