import { useEffect, useState } from 'react';
import { Box } from '@radix-ui/themes';
import { Button } from 'components/ui/Button';
import { usePagination } from 'libs/hooks';
import { usePageByLetter } from 'libs/hooks/usePageByLetter';

import { alphabet } from './alphabet-search.constant';
import { AlphabetSearchLaoder } from './alphabet-search.loader';
import styles from './alphabet-search.module.scss';
import { AlphabetSearchProps } from './alphabet-search.props';

export const AlphabetSearch = ({
  highlightedLetters,
  activeLetters,
}: AlphabetSearchProps): JSX.Element => {
  const { setSkip, wordsPerPageCount } = usePagination();

  const [activeLetterIndex, setActiveLetterIndex] = useState<number | null>(
    null,
  );

  const { page, isPageLoading, pageError } = usePageByLetter({
    letter:
      typeof activeLetterIndex === 'object' && !activeLetterIndex
        ? null
        : alphabet[activeLetterIndex],
    limit: wordsPerPageCount,
  });

  useEffect(() => {
    if (page && page >= 1) {
      setSkip((page - 1) * wordsPerPageCount);
    }
  }, [page]);

  const isLoading =
    isPageLoading &&
    !(typeof activeLetterIndex === 'object' && !activeLetterIndex);

  return (
    <Box className={styles.wrapper}>
      {isLoading ? (
        <AlphabetSearchLaoder />
      ) : (
        alphabet.map((letter, index) => {
          return (
            <Button
              key={letter}
              className={styles.letter}
              size="2"
              disabled={!(activeLetters && activeLetters.includes(letter))}
              variant="outline"
              radius="small"
              color={highlightedLetters.includes(letter) ? 'blue' : 'gray'}
              onClick={() => setActiveLetterIndex(index)}>
              {letter}
            </Button>
          );
        })
      )}
    </Box>
  );
};
