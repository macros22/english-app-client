import { Dispatch } from 'react';
import { allWordsAction, allWordsActionTypes, fetchObj, setWordStatusType } from 'types/words';

export const fetchAllWords = () => {
  return async (dispatch: Dispatch<allWordsAction>) => {
    try {
      let url = new URL('http://localhost:5000/');
      url.searchParams.set('limit', '10');
      url.searchParams.set('page', '30');
      //('http://localhost:3000/?limit=10&page=50')

      const response = await fetch(url.href);
      const data: fetchObj = await response.json();
      dispatch({ type: allWordsActionTypes.FETCH_ALL_WORDS, payload: data.words });
    } catch (e) {
      console.log(e);
    }
  };
};

export const setWordStatus = (payload: setWordStatusType) => {
  return {
    type: allWordsActionTypes.SET_WORD_STATUS,
    payload,
  };
};
