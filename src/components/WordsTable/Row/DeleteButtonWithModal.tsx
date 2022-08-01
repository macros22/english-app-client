import { useUserWords } from 'hooks';
import { deleteUserWord } from 'libs/user-words.api';
import React from 'react';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';

export const DeleteButtonWithModal = ({ wordId }: { wordId: string }): JSX.Element => {

    const [isOpen, setIsOpen] = React.useState(false);

    const { mutate: mutateUserWords, mutateCount } = useUserWords();
    const handleDeleteButton = async () => {
        await deleteUserWord(wordId);
        mutateUserWords();
        mutateCount();
        setIsOpen(false);
    };

    return (
        <Modal
            basic
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
            open={isOpen}
            size='small'
            trigger={<Button basic icon="trash alternate" size="large" />}
        >
            <Header icon>
                <Icon name='trash' />
                Delete word
            </Header>
            <Modal.Content>
                <p>
                    Do you really want to delete this word?
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => setIsOpen(false)}>
                    <Icon name='remove' /> No
                </Button>
                <Button color='green' inverted onClick={handleDeleteButton}>
                    <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
}