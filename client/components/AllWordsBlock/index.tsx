import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { WordsTable } from 'components';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { wordsType } from '../../types/words';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      fontWeight: 500,
      letterSpacing: '2px',
    },
  })
);

function AllWordsBlock() {
  const classes = useStyles();

  const { words } = useTypedSelector((state) => state.allWords);
  const { setAllWords } = useActions();

  const wordsKey = 'LOCAL_STORAGE_WORDS';

  React.useEffect(() => {
    try {
      const temp = window.localStorage.getItem(wordsKey);
      if (temp !== null) {
        setAllWords(JSON.parse(temp) as wordsType);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(wordsKey, JSON.stringify(words));
    console.log('words changed');
  }, [JSON.stringify(words)]);

  return (
    <>
      <Typography className={classes.title} variant="h5" component="h2" gutterBottom align="center">
        ALL WORDS
      </Typography>
      <WordsTable words={words} />
    </>
  );
}

export default AllWordsBlock;
