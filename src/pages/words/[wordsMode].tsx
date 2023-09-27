import { useEffect } from 'react';
import { WordsTable } from 'components';
import { Button } from 'components/ui/Button';
import { Layout } from 'layouts';
import { WORDS_MODE } from 'libs/constants/names.storage';
import { getQueryParametr } from 'libs/helpers/get-param-from-query.helper';
import { useLocalStorage } from 'libs/hooks';
import { WordsMode } from 'libs/types/types';
import { GetServerSideProps } from 'next';

interface WordTablePageProps extends Record<string, unknown> {
  wordsMode: WordsMode;
}

export const getServerSideProps: GetServerSideProps<
  WordTablePageProps
> = async context => {
  const wordsModeString =
    getQueryParametr(context, 'wordsMode') || 'common-words';
  const wordsMode: WordsMode =
    wordsModeString === 'user-words' ? 'userWords' : 'commonWords';

  return {
    props: {
      wordsMode,
    },
  };
};

const WordsTablePage = ({ wordsMode }: WordTablePageProps): JSX.Element => {
  const [_, setWordsMode] = useLocalStorage<WordsMode>(WORDS_MODE, wordsMode);

  useEffect(() => {
    setWordsMode(wordsMode);
  }, [wordsMode]);

  return (
    <Layout>
      <WordsTable mode={wordsMode} />
    </Layout>
  );
};

export default WordsTablePage;
