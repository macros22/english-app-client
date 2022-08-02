import { Layout } from 'layouts';
import React from 'react';
import { WordsTable } from 'components';
import { WordMode } from 'types/types';
import { useSessionStorage } from 'hooks';
import { WORDS_MODE } from 'constants/names.storage';

const Home = () => {
	const [wordsMode] = useSessionStorage<WordMode>(WORDS_MODE, 'userWords');
	return (
		<Layout>
			<WordsTable mode={wordsMode} />
		</Layout>
	);
};

export default Home;
