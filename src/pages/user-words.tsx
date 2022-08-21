import React from 'react';
import { Layout } from 'layouts';
import { WordsTable } from 'components';
import { WordMode } from 'types/types';
import { useLocalStorage } from 'hooks';
import { WORDS_MODE } from 'constants/names.storage';

const Home = () => {
	const [wordsMode, setWordsMode] = useLocalStorage<WordMode>(WORDS_MODE, 'userWords');

	React.useEffect(() => {
		setWordsMode('userWords');
	}, [])


	return (
		<Layout>
			<WordsTable mode={wordsMode} />
		</Layout>
	);
};

export default Home;
