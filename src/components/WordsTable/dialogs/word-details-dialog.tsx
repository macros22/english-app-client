import { ReaderIcon } from '@radix-ui/react-icons';
import { Dialog, IconButton } from '@radix-ui/themes';
import { WordMoreInfo } from 'components';
import { Button } from 'components/ui/Button';
import { IWord } from 'libs/types/types';

type WordDetailsDialogProps = {
  word: IWord;
};

export const WordDetailsDialog = ({
  word,
}: WordDetailsDialogProps): JSX.Element => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton
          variant="surface"
          color="gold"
          style={{ cursor: 'pointer' }}>
          <ReaderIcon width="18" height="18" />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>More information about word</Dialog.Title>
        <h2>Engish word:</h2>
        <h3>{word.word}</h3>

        {word.transcription.uk && (
          <>
            <h2>UK:</h2>
            <span>{word.transcription.uk}</span>
          </>
        )}
        {word.transcription.us && (
          <>
            <h2>US:</h2>
            <span>{word.transcription.us}</span>
          </>
        )}

        {word.meanings &&
          word.meanings.map(meaning => {
            return (
              <>
                <h4>{meaning.level}</h4>
                {meaning.pos && <h4>{meaning.pos}</h4>}
                {meaning.definition && <h4>{meaning.definition}</h4>}

                {meaning.translations.length > 0 && (
                  <>
                    <h2>Translations:</h2>
                    {meaning.translations.map((translation, index) => {
                      return <h3 key={translation + index}>{translation}</h3>;
                    })}
                  </>
                )}
                {meaning.synonyms.length > 0 && (
                  <>
                    <h2>Synonyms:</h2>
                    {meaning.synonyms.map((synonym, index) => {
                      return <h3 key={synonym + index}>{synonym}</h3>;
                    })}
                  </>
                )}
                {meaning.antonyms.length > 0 && (
                  <>
                    <h2>Antonyms:</h2>
                    {meaning.antonyms.map((antonym, index) => {
                      return <h3 key={antonym + index}>{antonym}</h3>;
                    })}
                  </>
                )}
                {meaning.usageExamples.length > 0 && (
                  <>
                    <h2>usageExamples:</h2>
                    {meaning.usageExamples.map((usageExample, index) => {
                      return <h3 key={usageExample + index}>{usageExample}</h3>;
                    })}
                  </>
                )}
              </>
            );
          })}
      </Dialog.Content>
    </Dialog.Root>
  );
};
