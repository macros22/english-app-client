import { AddWord } from 'components/AddWord/AddWord';
import { AllWordsTable } from 'components/AllWordsTable/AllWordsTable';
import { Layout } from 'components/Layout/Layout';
import { Segment } from 'semantic-ui-react';

const Home = () => {
	return (
		<Layout>
			<AllWordsTable />
			<Segment style={{width: '1050px'}}>
				<AddWord />
			</Segment>
		</Layout>
	);
};

export default Home;
