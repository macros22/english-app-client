import { WordMoreInfo } from 'components/WordMoreInfo/WordMoreInfo';
import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { RowProps } from './Row.props';

export const WordMoreInfoModal = ({ rowData }: Pick<RowProps, 'rowData'>): JSX.Element => {

    const [isEditingNow, setIsEditingNow] = React.useState(false);
    return (
        <Modal
            onClose={() => setIsEditingNow(false)}
            onOpen={() => setIsEditingNow(true)}
            open={isEditingNow}
            trigger={<Button basic icon="info" size="large" />}
        >
            <Modal.Header>More word info</Modal.Header>
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