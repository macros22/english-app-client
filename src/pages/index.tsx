import { Layout } from 'layouts';
import React from 'react';
import { WordsTable, AddWord } from 'components';
import { useCommonWords } from 'hooks';

const Home = () => {


	return (
		<Layout>
		 <WordsTable />
		
		</Layout>
	);
};

export default Home;
