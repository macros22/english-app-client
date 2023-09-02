import React from 'react';
import { WORDS_MODE } from 'libs/constants/names.storage';
import { wordDataToWordDataPayload } from 'libs/helpers/transform-data.helper';
import { useLocalStorage, useUser, useWordsApi } from 'libs/hooks';
import { IWord, Role, WordsMode, WordStudyStatus } from 'libs/types/types';
import {
  Button,
  Header,
  Label,
  Loader,
  Segment,
  SemanticCOLORS,
  Table,
} from 'semantic-ui-react';

import { DeleteButtonWithModal } from '../ButtonsWithModal/DeleteButtonWithModal';
import { EditButtonModal } from '../ButtonsWithModal/EditButtonModal';
import { WordMoreInfoModal } from '../ButtonsWithModal/WordMoreInfoModal';

import styles from './Row.module.scss';
import { RowProps } from './Row.props';

const labelColors: Record<WordStudyStatus, SemanticCOLORS> = {
  [WordStudyStatus.Know]: 'green',
  [WordStudyStatus.Learn]: 'yellow',
};

export const Row = ({ rowData, rowId, mutateCommonWords }: RowProps) => {
  const { isUserLoading, user } = useUser();
  const [wordsMode] = useLocalStorage<WordsMode>(WORDS_MODE, 'userWords');

  const { api } = useWordsApi('userWords');
  const [isAddTomyWordsButtonLoading, setIsAddTomyWordsButtonLoading] =
    React.useState(false);
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
    <>
      <Table.Row textAlign="center" verticalAlign="middle">
        <Table.Cell width={2}>
          <Label size="big" color="blue" circular>
            {rowId}
          </Label>
        </Table.Cell>
        <Table.Cell width={8}>
          <Header as="h2">
            {rowData.word}
            {Boolean(rowData.transcription.uk || rowData.transcription.us) && (
              <Header.Subheader>
                {rowData.transcription.uk
                  ? rowData.transcription.uk
                  : rowData.transcription.us}
              </Header.Subheader>
            )}
          </Header>
        </Table.Cell>
        <Table.Cell width={4}>
          {rowData.studyStatus ? (
            <Label
              color={
                rowData.studyStatus ? labelColors[rowData.studyStatus] : 'red'
              }
              size="big"
              className={styles.studyStatus}>
              {rowData.studyStatus}
            </Label>
          ) : (
            <Button
              loading={isAddTomyWordsButtonLoading}
              onClick={() => handleAddToMyWords(rowData)}>
              {' '}
              Add to my words
            </Button>
          )}
        </Table.Cell>
        {wordsMode == 'userWords' ? (
          <>
            <Table.Cell width={3}>
              <div className={styles.iconButtons}>
                <WordMoreInfoModal word={rowData} />
                <EditButtonModal word={rowData} />
                <DeleteButtonWithModal wordId={rowData.id} />
              </div>
            </Table.Cell>
          </>
        ) : (user && user.role == Role.Admin ? (
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
        ))}
      </Table.Row>
    </>
  );
};
