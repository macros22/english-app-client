import React from 'react'
import Typography from '@material-ui/core/Typography'

import { wordsType } from 'types/types'
import { WordsTable } from 'components'

function AllWordsBlock() {
  const [words, setWords] = React.useState<wordsType>([[]])

  React.useEffect(() => {
    try {
      let url = new URL('http://localhost:5000/')
      url.searchParams.set('limit', '10')
      url.searchParams.set('page', '30')
      // 'http://localhost:3000/?limit=10&page=50'
      // ;(async function () {
      //   const response = await fetch(url.href)
      //   const data: fetchObj = await response.json()
      //   setWords(data.words)
      //   // console.log(data)
      // })()
      setWords([
        ['1', 'neglect', 'пренебрегать'],
        ['2', 'shun', 'избегать'],
      ])
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        All words.
      </Typography>
      <WordsTable words={words} />
      <Typography variant="h5" component="h2" gutterBottom>
        My dict.
      </Typography>
      <WordsTable words={words} />
    </>
  )
}

export default AllWordsBlock
