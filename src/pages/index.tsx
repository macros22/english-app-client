import { Layout } from 'layouts';
import { useCommonWords } from 'hooks/useCommonWords';
import React from 'react';
import { WordsTable, AddWord } from 'components';

const Home = () => {

	const { words, loading } = useCommonWords();

	return (
		<Layout>
			{
				loading
					? <h1>Loading</h1>
					: <WordsTable words={words ? words : []} />
			}
		</Layout>
	);
};

export default Home;
