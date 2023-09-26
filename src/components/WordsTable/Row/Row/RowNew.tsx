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
    <Table.Row key={rowData.word}>
      <Table.RowHeaderCell
        justify="center"
        style={
          {
            // paddingTop: '16px',
            // paddingBottom: '16px',
          }
        }>
        <div className={styles.iconButtons}>
          <Badge size="2" color="gray" radius="full" variant="surface">
            {rowId}
          </Badge>
        </div>
      </Table.RowHeaderCell>
      <Table.Cell>
        <div className={styles.iconButtons}>
          <Text
            as="span"
            size="4"
            weight="bold"
            style={{ display: 'flex', flexDirection: 'column' }}>
            {rowData.word}
            {Boolean(rowData.transcription.uk || rowData.transcription.us) && (
              <Text as="span" size="1" color="bronze">
                {rowData.transcription.uk ?? rowData.transcription.us}
              </Text>
            )}
          </Text>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className={styles.iconButtons}>
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
        </div>
      </Table.Cell>
      {/* <Table.Cell
        justify="center"
        align="center"
        style={{
          paddingTop: '16px',
          paddingBottom: '16px',
        }}>
        <IconButton color="gray" variant="ghost" size="2" radius="full">
          <InfoCircledIcon width="24" height="24" />
        </IconButton>
      </Table.Cell> */}

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

    //     </Table.Cell>

    //   </Table.Row>
    // </>
  );
};
