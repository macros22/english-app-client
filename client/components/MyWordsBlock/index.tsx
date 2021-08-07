import React from 'react';
import Typography from '@material-ui/core/Typography';
import { WordsTable } from 'components';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { wordStatusType } from 'types/words';

function MyWordsBlock() {
  const { words: allWords } = useTypedSelector((state) => state.allWords);

  const words = allWords.filter((word) => word.status !== wordStatusType.UNKNOWN);

  React.useEffect(() => {
    try {
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom align="center">
        My words.
      </Typography>
      <WordsTable words={words} />
    </>
  );
}

export default MyWordsBlock;
