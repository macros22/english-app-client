import React from 'react';
import { Modal, WordMoreInfo } from 'components';
import { IWord } from 'libs/types/types';
import { Button } from 'semantic-ui-react';

export const WordMoreInfoModal = ({ word }: { word: IWord }): JSX.Element => {
  return (
    <Modal
      title="More information about word"
      modalTrigger={<Button basic icon="info" size="large" />}>
      <WordMoreInfo word={word} />
    </Modal>
  );
};
