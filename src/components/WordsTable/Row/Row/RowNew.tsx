import React, { useState } from 'react';
import { InfoCircledIcon, ReaderIcon } from '@radix-ui/react-icons';
import { Badge, IconButton, Table, Text } from '@radix-ui/themes';
import { styled } from '@stitches/react';
import { Button } from 'components/ui/Button';
import { WORDS_MODE } from 'libs/constants/names.storage';
import { wordDataToWordDataPayload } from 'libs/helpers/transform-data.helper';
import { useLocalStorage, useUser, useWordsApi } from 'libs/hooks';
import { IWord, Role, WordsMode, WordStudyStatus } from 'libs/types/types';
import { Loader, Segment, SemanticCOLORS } from 'semantic-ui-react';

import { DeleteButtonWithModal } from '../ButtonsWithModal/DeleteButtonWithModal';
import { EditButtonModal } from '../ButtonsWithModal/EditButtonModal';
import { WordMoreInfoModal } from '../ButtonsWithModal/WordMoreInfoModal';

import styles from './Row.module.scss';
import { RowProps } from './Row.props';

export const InfoIcon = styled(InfoCircledIcon, {
  width: '30px',
  height: '30px',
  fill: 'gold',
});

const labelColors: Record<WordStudyStatus, SemanticCOLORS> = {
  [WordStudyStatus.Know]: 'green',
  [WordStudyStatus.Learn]: 'yellow',
};

export const RowNew = ({ rowData, rowId, mutateCommonWords }: RowProps) => {
  const { isUserLoading, user } = useUser();
  const [wordsMode] = useLocalStorage<WordsMode>(WORDS_MODE, 'userWords');

  const { api } = useWordsApi('userWords');
  const [isAddTomyWordsButtonLoading, setIsAddTomyWordsButtonLoading] =
    useState(false);

  const handleAddToMyWords = async (word: IWord) => {
    if (user && user.role !== Role.Admin) {
      setIsAddTomyWordsButtonLoading(true);
      await api.postWord(wordDataToWordDataPayload(word));
      mutateCommonWords();
      setIsAddTomyWordsButtonLoading(false);
    }
  };

  if (isUserLoading) {
    return (
      <Segment>
        <Loader size="massive" active inline="centered" />
      </Segment>
    );
  }

  return (
    <Table.Row key={rowData.word} align="center">
      <Table.RowHeaderCell justify="center" width={90}>
        <Badge size="2" color="gray" radius="full" variant="surface">
          {rowId}
        </Badge>
      </Table.RowHeaderCell>
      <Table.Cell width={250}>
        <Text as="span" size="4" weight="bold">
          {rowData.word}
        </Text>
      </Table.Cell>
      <Table.Cell>
        {Boolean(rowData.transcription.uk || rowData.transcription.us) && (
          <Text as="span" size="1" color="bronze">
            {rowData.transcription.uk ?? rowData.transcription.us}
          </Text>
        )}
      </Table.Cell>
      <Table.Cell>
        {rowData.studyStatus ? (
          <Badge
            size="2"
            variant="surface"
            color={
              rowData.studyStatus ? labelColors[rowData.studyStatus] : 'red'
            }
            radius="medium">
            {rowData.studyStatus}
          </Badge>
        ) : (
          <Button
            isLoading={isAddTomyWordsButtonLoading}
            onClick={() => handleAddToMyWords(rowData)}>
            Add to my words
          </Button>
        )}
      </Table.Cell>

      {wordsMode === 'userWords' ? (
        <>
          <Table.Cell width={3}>
            <div className={styles.iconButtons}>
              <WordMoreInfoModal word={rowData} />
              <EditButtonModal word={rowData} />
              <DeleteButtonWithModal wordId={rowData.id} />
            </div>
          </Table.Cell>
        </>
      ) : // eslint-disable-next-line unicorn/no-nested-ternary
      user && user.role === Role.Admin ? (
        <>
          <Table.Cell width={6}>
            <WordMoreInfoModal word={rowData} />
            <EditButtonModal word={rowData} />
            <DeleteButtonWithModal wordId={rowData.id} />
          </Table.Cell>
        </>
      ) : (
        <Table.Cell width={6}>
          <WordMoreInfoModal word={rowData} />
        </Table.Cell>
      )}
    </Table.Row>
  );
};
