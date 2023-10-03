import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex, IconButton } from '@radix-ui/themes';
import { WORDS_MODE } from 'libs/constants/names.storage';
import { useLocalStorage, useWords, useWordsApi } from 'libs/hooks';
import { WordsMode } from 'libs/types/types';

export const DeleteWordDialog = ({
  wordId,
}: {
  wordId: string;
}): JSX.Element => {
  const [wordsMode] = useLocalStorage<WordsMode>(WORDS_MODE, 'userWords');

  const { mutateWords, mutateCount } = useWords({ mode: wordsMode });
  const { api } = useWordsApi(wordsMode);

  const handleDeleteButton = async () => {
    await api.deleteWord(wordId);
    mutateWords();
    mutateCount();
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <IconButton variant="surface" color="red">
          <TrashIcon width="18" height="18" />
        </IconButton>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 400 }}>
        <AlertDialog.Title>Delete word</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Do you really want to delete this word?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={handleDeleteButton}>
              <TrashIcon width="18" height="18" /> Delete word
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
