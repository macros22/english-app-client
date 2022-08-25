import React from 'react';
import { WordForm } from 'components/WordForm/WordForm';
import { Modal, Button } from 'semantic-ui-react';
import { wordDataToFormData } from 'libs/helpers/form-data.helper';
import { WordFormModalProps } from './WordFormModal.props';
import styles from './WordFormModal.module.scss';

export const WordFormModal = ({ word, modalTrigger, mode }: WordFormModalProps): JSX.Element => {
    const [isEditingNow, setIsEditingNow] = React.useState(false);

    return (
        <Modal
            onClose={() => setIsEditingNow(false)}
            onOpen={() => setIsEditingNow(true)}
            open={isEditingNow}
            trigger={modalTrigger}
        >
            <Modal.Header className={styles.modalHeader}>
                <div className={styles.title}>Changing word</div>
                <Button color='black' className={styles.closeButton} onClick={() => setIsEditingNow(false)}>
                    Close
                </Button>
            </Modal.Header>
            <Modal.Content>
                {
                    (mode == 'edit' && word)
                        ? <WordForm mode="edit" formValues={wordDataToFormData(word)} wordId={word.id} />
                        : <WordForm mode="add" />
                }
            </Modal.Content>
        </Modal>
    );
}