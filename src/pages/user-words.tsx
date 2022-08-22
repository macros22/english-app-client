import React from 'react';
import { Layout } from 'layouts';
import { WordsTable } from 'components';
import { WordMode } from 'libs/types/types';
import { useLocalStorage } from 'libs/hooks';
import { WORDS_MODE } from 'libs/constants/names.storage';
import { PaginationProvider } from 'libs/contexts/PagiantionContext';

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
