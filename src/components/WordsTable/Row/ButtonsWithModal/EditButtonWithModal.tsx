import { WordForm } from 'components/WordForm/WordForm';
import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { IWord } from 'libs/types/types';
import { wordDataToFormData } from 'libs/helpers/form-data.helper';

export const EditButtonWithModal = ({ rowData }: { rowData: IWord }): JSX.Element => {

    const [isEditingNow, setIsEditingNow] = React.useState(false);
    return (
        <Modal
            onClose={() => setIsEditingNow(false)}
            onOpen={() => setIsEditingNow(true)}
            open={isEditingNow}
            trigger={<Button basic icon="edit" size="large" />}
        >
            <Modal.Header>Changing word</Modal.Header>
            <Modal.Content>
                <WordForm mode="edit" formValues={wordDataToFormData(rowData)} wordId={rowData.id} />
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setIsEditingNow(false)}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    );
}