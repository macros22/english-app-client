import React from 'react';
import { ReaderIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { Modal, WordMoreInfo } from 'components';
import { IWord } from 'libs/types/types';

export const WordMoreInfoModal = ({ word }: { word: IWord }): JSX.Element => {
  return (
    <Modal
      title="More information about word"
      modalTrigger={
        <IconButton variant="surface" color="gold">
          <ReaderIcon width="18" height="18" />
        </IconButton>
      }>
      <WordMoreInfo word={word} />
    </Modal>
  );
};
