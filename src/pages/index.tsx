import { Layout } from 'layouts';
import React from 'react';
import { WordsTable, AddWord } from 'components';
import { useCommonWords } from 'hooks';

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
