import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import WordsTable from './WordsTable/WordsTable';
import { UsageExample, Word, WordStudyStatus } from 'types/types';
import AddWord from './molecules/addWord/AddWord';

const wordsDefault: Word[] = [{id: 1,
  eng: "string",
  transcription: "string;",
  rus: ["sd"],
  usageExamples: [{eng: "sdf", rus: "sad"} as UsageExample],
  studyStatus: WordStudyStatus.UNKNOWN}]

export default function Content() {

  const [words, setWords] = React.useState<Word[] | null>([])

  

  React.useEffect(() => {
    fetch('http://localhost:3146/api/dictionary/words')
    .then(response => response.json())
    .then(data => setWords(data))
  },[])

  return (
    <>
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <WordsTable words={words || wordsDefault} />
    </Paper>

    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
  <AddWord />
  </Paper>
  </>
  );
}