import React from 'react';
import { Layout } from 'layouts';
import { WordsTable } from 'components';
import { WordsMode } from 'libs/types/types';
import { getQueryParametr } from 'libs/helpers/get-param-from-query.helper';
import { GetServerSideProps } from 'next';
import { useLocalStorage } from 'libs/hooks';
import { WORDS_MODE } from 'libs/constants/names.storage';

interface WordTablePageProps extends Record<string, unknown> {
	wordsMode: WordsMode;
}

export const getServerSideProps: GetServerSideProps<
	WordTablePageProps
> = async (context) => {

	const wordsModeStr = getQueryParametr(context, 'wordsMode') || 'common-words';
	let wordsMode: WordsMode = wordsModeStr == 'user-words' ? 'userWords' : 'commonWords';

	return {
		props: {
			wordsMode,
		}
	}

};


const WordsTablePage = ({ wordsMode }: WordTablePageProps): JSX.Element => {

	const [_, setWordsMode] = useLocalStorage<WordsMode>(WORDS_MODE, wordsMode);

	React.useEffect(() => {
		setWordsMode(wordsMode);
		console.log(wordsMode)
	}, [wordsMode])
	return (
		<Layout>
			<WordsTable mode={wordsMode} />
		</Layout>
	);
};

export default WordsTablePage;
