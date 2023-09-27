import { useState } from 'react';
import { ReaderIcon } from '@radix-ui/react-icons';
import { Dialog, IconButton, Separator } from '@radix-ui/themes';
import { Button } from 'semantic-ui-react';

import styles from './Modal.module.scss';
import { ModalProps } from './Modal.props';

export const Modal = ({
  title,
  modalTrigger,
  children,
}: ModalProps): JSX.Element => {
  const [isEditingNow, setIsEditingNow] = useState(false);

  return (
    <>
      <Dialog.Root onOpenChange={setIsEditingNow} open={isEditingNow}>
        <Dialog.Trigger>
          {/* <IconButton variant="surface" color="gold">
            <ReaderIcon width="18" height="18" />
          </IconButton> */}
          {modalTrigger}
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 950 }}>
          <Dialog.Title className={styles.modalHeader}>
            {title}
            <Button
              color="black"
              className={styles.closeButton}
              onClick={() => setIsEditingNow(false)}>
              Close
            </Button>
          </Dialog.Title>

          {children}
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
