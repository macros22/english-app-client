import React from 'react'
import WordsTable from './WordsTable'

export type wordsType = Array<Array<string>>

type fetchObj = {
  allWordsCount: number
  words: wordsType
}

function AllWordsBlock() {
  const [words, setWords] = React.useState<wordsType>([[]])

  React.useEffect(() => {
    try {
      let url = new URL('http://localhost:5000/')
      url.searchParams.set('limit', '10')
      url.searchParams.set('page', '30')
      // 'http://localhost:3000/?limit=10&page=50'
      ;(async function () {
        const response = await fetch(url.href)
        const data: fetchObj = await response.json()
        setWords(data.words)
        // console.log(data)
      })()
    } catch (e) {
      console.log(e)
      setWords([
        ['0', 'neglect', 'пренебрегать'],
        ['1', 'shun', 'избегать'],
      ])
    }
  }, [])

  return (
    <>
      <WordsTable words={words} />
    </>
  )
}

export default AllWordsBlock
