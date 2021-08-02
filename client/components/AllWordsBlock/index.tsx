import React from 'react';
import Typography from '@material-ui/core/Typography';
import { WordsTable } from 'components';
import { useTypedSelector } from 'hooks/useTypedSelector';

function AllWordsBlock() {
  const { words } = useTypedSelector((state) => state.allWords);

  React.useEffect(() => {
    try {
    } catch (e) {
      console.log(e);
    }
  }, []);

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
  );
}

export default AllWordsBlock;
