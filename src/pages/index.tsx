import { Layout } from 'layouts';
import { useCommonWords } from 'hooks/useCommonWords';
import React from 'react';
import { Segment } from 'semantic-ui-react';
import { WordsTable, AddWord } from 'components';

const Home = () => {

	const { words, loading } = useCommonWords();


	return (
		<Layout>
			{loading ? <h1>Loading</h1> :
				<WordsTable words={words ? words : []} />
			}
			<Segment style={{ width: '95%' }}>
				<AddWord />
			</Segment>
		</Layout>
	);
};

export default Home;
