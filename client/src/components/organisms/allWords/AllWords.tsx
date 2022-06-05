import * as React from 'react';
import Paper from '@mui/material/Paper';
import { UsageExample, Word, WordStudyStatus } from 'types/types';
import { WordsTable } from 'components';

const wordsDefault: Word[] = [{id: 1,
  word: "string",
  transcription: "string;",
  translation: ["sd"],
  usageExamples: [{sentence: "sdf", translation: "sad"} as UsageExample],
  studyStatus: WordStudyStatus.UNKNOWN}]

const AllWords = () => {

  const [words, setWords] = React.useState<Word[] | null>([])

  

  React.useEffect(() => {
    fetch('http://localhost:3146/api/dictionary/words')
    .then(response => response.json())
    .then(data => setWords(data))
  },[])

  return (
    <>
    <Paper elevation={1} sx={{padding: '1rem', maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <WordsTable words={words || wordsDefault} />
    </Paper>

  </>
  );
}

export default AllWords;