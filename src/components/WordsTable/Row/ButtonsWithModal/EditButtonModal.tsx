import React from 'react';
import { Modal, WordForm } from 'components';
import { Button } from 'semantic-ui-react';
import { IWord } from 'libs/types/types';
import { wordDataToFormData } from 'libs/helpers/transform-data.helper';

export const EditButtonModal = ({ word }: { word: IWord }): JSX.Element => {
    return (
        <Modal title='Edit word' modalTrigger={<Button basic icon="edit" size="large" />} >
            <WordForm mode="edit" formValues={wordDataToFormData(word)} wordId={word.id} />
        </Modal>
    );
}