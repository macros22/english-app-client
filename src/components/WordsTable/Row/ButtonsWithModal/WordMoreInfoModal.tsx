import React from 'react';
import { WordMoreInfo, Modal } from 'components';
import { Button } from 'semantic-ui-react';
import { IWord } from 'libs/types/types';

export const WordMoreInfoModal = ({ word }: { word: IWord }): JSX.Element => {
    return (
        <Modal title='More information about word' modalTrigger={<Button basic icon="info" size="large" />} >
            <WordMoreInfo rowData={word} />
        </Modal>
    );
}