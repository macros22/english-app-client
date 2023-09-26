import { useEffect, useState } from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Badge, IconButton, Table as TableR, Text } from '@radix-ui/themes';
import { styled } from '@stitches/react';
// import { styled } from 'styled-components';
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
  Table,
} from 'semantic-ui-react';

import { AlphabetSearch } from '../AlphabetSearch/AlphabetSearch';
import { Row } from '../Row/Row/Row';
import { RowNew } from '../Row/Row/RowNew';

// import { Title } from './words-table.styled';
import styles from './WordsTable.module.scss';
import { WordsTableProps } from './WordsTable.props';

// export const Title = styled.h1`
//   color: ${({ theme }) => theme.colors.primary};
//   font-size: 50px;

//   display: flex;
// `;

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

  // Handlers.
  const handlePaginationChange = (
    event: MouseEvent<HTMLAnchorElement, MouseEvent>,
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

  if (words && words.length === 0) {
    return <h1>No words yet </h1>;
  }

  return (
    <>
      <Label size="big" color="blue" className={styles.titleLabel}>
        {mode === 'userWords' ? 'My words' : 'All words'}
        <Label.Detail>{wordsCount}</Label.Detail>
      </Label>

      <Badge size="2" variant="solid" color="green" radius="medium">
        {mode === 'userWords' ? 'My words' : 'All words'} {wordsCount}
      </Badge>

      <TableR.Root
        variant="surface"
        size="1"
        style={{
          width: '800px',
          margin: 'auto',
        }}>
        <TableR.Header>
          <TableR.Row>
            <TableR.ColumnHeaderCell justify="center">
              ID
            </TableR.ColumnHeaderCell>
            <TableR.ColumnHeaderCell>Word</TableR.ColumnHeaderCell>
            <TableR.ColumnHeaderCell>Transcription</TableR.ColumnHeaderCell>
            <TableR.ColumnHeaderCell>Status</TableR.ColumnHeaderCell>
            <TableR.ColumnHeaderCell>Actions</TableR.ColumnHeaderCell>
          </TableR.Row>
        </TableR.Header>

        <TableR.Body>
          {words.map((word, index) => {
            return (
              <RowNew
                key={word.id}
                rowData={word}
                rowId={skip + index + 1}
                mutateCommonWords={mutateWords}
              />
            );
          })}
        </TableR.Body>
      </TableR.Root>

      <AlphabetSearch
        highlightedLetters={words.map(word =>
          word.word.charAt(0).toLowerCase(),
        )}
        activeLetters={activeLetters}
      />

      <Table basic className={styles.table}>
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

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell textAlign="center" colSpan="16">
              <Pagination
                className={styles.pagination}
                pointing
                secondary
                activePage={currentPage}
                // activePage={Math.ceil(skip / defaultWordsPerPageCount)}

                onPageChange={handlePaginationChange}
                boundaryRange={0}
                // onPageChange={this.handlePaginationChange}
                // size='mini'
                // siblingRange={siblingRange}
                totalPages={totalPages}
                // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
                ellipsisItem={null}
                // firstItem={showFirstAndLastNav ? undefined : null}
                // lastItem={showFirstAndLastNav ? undefined : null}
                firstItem={null}
                lastItem={null}
                // prevItem={showPreviousAndNextNav ? undefined : null}
                // nextItem={showPreviousAndNextNav ? undefined : null}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};
