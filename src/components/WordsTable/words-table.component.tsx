import { useEffect, useState } from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import {
  Badge,
  Em,
  Heading,
  IconButton,
  Strong,
  Table,
  Text,
} from '@radix-ui/themes';
import { styled } from '@stitches/react';
import { WORDS_MODE } from 'libs/constants/names.storage';
import { useLocalStorage, usePagination, useWords } from 'libs/hooks';
import { WordsMode } from 'libs/types/types';
import { useRouter } from 'next/router';
import {
  Label,
  Loader,
  Pagination,
  PaginationProps,
  Segment,
} from 'semantic-ui-react';

import { AlphabetSearch } from './alphabet-search/alphabet-search';
import { Row } from './row/row';
import styles from './WordsTable.module.scss';
import { WordsTableProps } from './WordsTable.props';

export const InfoIcon = styled(InfoCircledIcon, {
  width: '30px',
  height: '30px',
  fill: 'Gold',
});

const defaultWordsPerPageCount = 5;

export const WordsTable = ({
  mode: wordsMode,
}: WordsTableProps): JSX.Element => {
  const [mode, setWordsMode] = useLocalStorage<WordsMode>(
    WORDS_MODE,
    wordsMode,
  );

  const { skip, setSkip, wordsPerPageCount, setWordsPerPageCount } =
    usePagination();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {
    words,
    loading,
    count: wordsCount,
    mutateWords,
    activeLetters,
  } = useWords({ mode, skip, limit: wordsPerPageCount });

  useEffect(() => {
    let wordsPerPage = 0;
    if (wordsCount) {
      // Pagination logic.
      const pagesCount =
        wordsCount > defaultWordsPerPageCount
          ? Number(Math.ceil(wordsCount / defaultWordsPerPageCount))
          : 1;
      setTotalPages(pagesCount);

      // Logic for correct display rows count.
      if (wordsCount < defaultWordsPerPageCount) {
        wordsPerPage = wordsCount;
      } else if (currentPage === pagesCount && currentPage !== 1) {
        // for last page
        wordsPerPage =
          wordsCount - (currentPage - 1) * defaultWordsPerPageCount;
      } else {
        wordsPerPage = defaultWordsPerPageCount;
      }

      if (currentPage > pagesCount) {
        setCurrentPage(pagesCount);
        setSkip((pagesCount - 1) * defaultWordsPerPageCount);
      }
    }
    setWordsPerPageCount(wordsPerPage);
    // setSkip((currentPage - 1) * defaultWordsPerPageCount);
  }, [wordsCount]);

  const router = useRouter();
  useEffect(() => {
    setCurrentPage(1);
    setSkip(0);
  }, [mode]);

  useEffect(() => {
    if (skip >= 0) {
      setCurrentPage(Math.ceil(skip / defaultWordsPerPageCount) + 1);
    }
  }, [skip]);

  useEffect(() => {
    router.push(
      `/words/${router.query.wordsMode}?skip=${skip}&limit=${wordsPerPageCount}`,
    );
  }, [skip, wordsPerPageCount]);

  const handlePaginationChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    { activePage }: PaginationProps,
  ) => {
    if (typeof activePage === 'number') {
      // setCurrentPage(activePage);
      const newSkip = (activePage - 1) * defaultWordsPerPageCount;
      setSkip(newSkip);
    }
  };

  if (loading) {
    return (
      <Segment>
        <Loader size="massive" active inline="centered" />
      </Segment>
    );
  }

  if (!words?.length) {
    return <Heading>No words yet </Heading>;
  }

  return (
    <>
      <Badge
        size="2"
        variant="surface"
        color="blue"
        radius="medium"
        style={{ paddingInline: 16, paddingBlock: 8, fontSize: 16 }}>
        <Strong>{mode === 'userWords' ? 'My words' : 'All words'}</Strong>
        <Heading color="gray" size="3">
          {wordsCount}
        </Heading>
      </Badge>

      <Table.Root
        variant="surface"
        size="1"
        style={{
          width: '800px',
          margin: 'auto',
          marginTop: 16,
        }}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell justify="center">ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Word</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Transcription</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {words.map((word, index) => {
            return (
              <Row
                key={word.id}
                rowData={word}
                rowId={skip + index + 1}
                mutateCommonWords={mutateWords}
              />
            );
          })}
        </Table.Body>
      </Table.Root>

      <AlphabetSearch
        highlightedLetters={words.map(word =>
          word.word.charAt(0).toLowerCase(),
        )}
        activeLetters={activeLetters}
      />
    </>
  );
};
