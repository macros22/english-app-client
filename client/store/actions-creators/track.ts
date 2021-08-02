import { Dispatch } from 'react'
import { AllWordsAction, AllWordsActionTypes, fetchObj } from 'types/words'

export const fetchTracks = () => {
  return async (dispatch: Dispatch<AllWordsAction>) => {
    try {
      let url = new URL('http://localhost:5000/')
      url.searchParams.set('limit', '10')
      url.searchParams.set('page', '30')
      //('http://localhost:3000/?limit=10&page=50')

      const response = await fetch(url.href)
      const data: fetchObj = await response.json()
      dispatch({ type: AllWordsActionTypes.FETCH_ALL_WORDS, payload: data.words })

    } catch (e) {
      console.log(e)
    }
  }
}
