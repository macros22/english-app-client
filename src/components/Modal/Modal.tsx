import React from 'react';
import { Modal as SUIModal, Button } from 'semantic-ui-react';
import { ModalProps } from './Modal.props';
import styles from './Modal.module.scss';

export const Modal = ({ title, modalTrigger, children }: ModalProps): JSX.Element => {
    const [isEditingNow, setIsEditingNow] = React.useState(false);

    return (
        <SUIModal
            onClose={() => setIsEditingNow(false)}
            onOpen={() => setIsEditingNow(true)}
            open={isEditingNow}
            trigger={modalTrigger}
        >
            <SUIModal.Header className={styles.modalHeader}>
                <div className={styles.title}>{title}</div>
                <Button color='black' className={styles.closeButton} onClick={() => setIsEditingNow(false)}>
                    Close
                </Button>
            </SUIModal.Header>
            <SUIModal.Content>
                {children}
            </SUIModal.Content>
        </SUIModal>
    );
}