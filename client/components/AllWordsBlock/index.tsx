import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { WordsTable } from 'components';
import { useTypedSelector } from 'hooks/useTypedSelector';

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

  React.useEffect(() => {
    try {
    } catch (e) {
      console.log(e);
    }
  }, []);

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
