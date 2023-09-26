import { Pencil1Icon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { Modal, WordForm } from 'components';
import { wordDataToFormData } from 'libs/helpers/transform-data.helper';
import { IWord } from 'libs/types/types';

export const EditButtonModal = ({ word }: { word: IWord }): JSX.Element => {
  return (
    <Modal
      title="Edit word"
      modalTrigger={
        <IconButton variant="surface" color="gray">
          <Pencil1Icon width="18" height="18" />
        </IconButton>
      }>
      <WordForm
        mode="edit"
        formValues={wordDataToFormData(word)}
        wordId={word.id}
      />
    </Modal>
  );
};
