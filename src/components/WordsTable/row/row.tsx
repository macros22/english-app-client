/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Badge, Box, Table, Text } from '@radix-ui/themes';
import { BadgeProps } from '@radix-ui/themes/dist/cjs/components/badge';
import { styled } from '@stitches/react';
import { Button } from 'components/ui/Button';
import { WORDS_MODE } from 'libs/constants/names.storage';
import { wordDataToWordDataPayload } from 'libs/helpers/transform-data.helper';
import { useLocalStorage, useUser, useWordsApi } from 'libs/hooks';
import { IWord, Role, WordsMode, WordStudyStatus } from 'libs/types/types';
import { Loader, Segment } from 'semantic-ui-react';

import { DeleteWordDialog } from '../dialogs/delete-word-dialog';
import { EditButtonModal } from '../dialogs/EditButtonModal';
import { WordDetailsDialog } from '../dialogs/word-details-dialog';

import styles from './row.module.scss';
import { RowProps } from './row.props';

export const InfoIcon = styled(InfoCircledIcon, {
  width: '30px',
  height: '30px',
  fill: 'gold',
});

const labelColors: Record<WordStudyStatus, BadgeProps['color']> = {
  [WordStudyStatus.Know]: 'green',
  [WordStudyStatus.Learn]: 'yellow',
};

export const Row = ({ rowData, rowId, mutateCommonWords }: RowProps) => {
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
      <Table.RowHeaderCell justify="center" width={90} className={styles.cell}>
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
            variant="outline"
            isLoading={isAddTomyWordsButtonLoading}
            onClick={() => handleAddToMyWords(rowData)}>
            Add to my words
          </Button>
        )}
      </Table.Cell>

      {wordsMode === 'userWords' ? (
        <Table.Cell width={3}>
          <Box className={styles.iconButtons}>
            <WordDetailsDialog word={rowData} />
            <EditButtonModal word={rowData} />
            <DeleteWordDialog wordId={rowData.id} />
          </Box>
        </Table.Cell>
      ) : user && user.role === Role.Admin ? (
        <>
          <Table.Cell width={6}>
            <WordDetailsDialog word={rowData} />
            <EditButtonModal word={rowData} />
            <DeleteWordDialog wordId={rowData.id} />
          </Table.Cell>
        </>
      ) : (
        <Table.Cell width={6}>
          <WordDetailsDialog word={rowData} />
        </Table.Cell>
      )}
    </Table.Row>
  );
};
