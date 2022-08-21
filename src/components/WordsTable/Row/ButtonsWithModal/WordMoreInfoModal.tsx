import { WordMoreInfo } from 'components/WordMoreInfo/WordMoreInfo';
import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { IWord } from 'types/types';

export const WordMoreInfoModal = ({ rowData }: { rowData: IWord }): JSX.Element => {
    const [isEditingNow, setIsEditingNow] = React.useState(false);
    return (
        <Modal
            onClose={() => setIsEditingNow(false)}
            onOpen={() => setIsEditingNow(true)}
            open={isEditingNow}
            trigger={<Button basic icon="info" size="large" />}
        >
            <Modal.Header>More word information</Modal.Header>
            <Modal.Content>
                <WordMoreInfo rowData={rowData} />
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setIsEditingNow(false)}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    );
}