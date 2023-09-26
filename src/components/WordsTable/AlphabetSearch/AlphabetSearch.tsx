import React, { useEffect } from 'react';
import { Badge, Button } from '@radix-ui/themes';
import { alphabet } from 'libs/constants/alphabet';
import { usePagination } from 'libs/hooks';
import { usePageByLetter } from 'libs/hooks/usePageByLetter';
import { Label, Loader, Segment } from 'semantic-ui-react';

import styles from './AlphabetSearch.module.scss';
import { AlphabetSearchProps } from './AlphabetSearch.props';

export const AlphabetSearch = ({
  highlightedLetters,
  activeLetters,
}: AlphabetSearchProps): JSX.Element => {
  const { setSkip, wordsPerPageCount } = usePagination();

  const [activeLetterIndex, setActiveLetterIndex] = React.useState<
    number | null
  >(null);

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

  if (
    isPageLoading &&
    !(typeof activeLetterIndex === 'object' && !activeLetterIndex)
  ) {
    return (
      <Segment>
        <Loader size="massive" active inline="centered" />
      </Segment>
    );
  }

  return (
    <Label.Group className={styles.wrapper}>
      {alphabet.map((letter, index) => {
        return (
          <>
            <Button
              size="2"
              key={letter}
              disabled={!(activeLetters && activeLetters.includes(letter))}
              variant="outline"
              radius="small"
              color={highlightedLetters.includes(letter) ? 'blue' : undefined}
              onClick={() => setActiveLetterIndex(index)}>
              {letter}
            </Button>
          </>
        );
      })}
    </Label.Group>
  );
};
