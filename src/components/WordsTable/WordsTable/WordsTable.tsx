import { useUserWords } from 'hooks';
import React from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';
import { Row } from '../Row/Row';
import { RowWithEdit } from '../Row/RowWithEdit';
import { WordsTableProps } from './WordsTable.props';

export const WordsTable = ({ words: dadsas }: WordsTableProps): JSX.Element => {

	const { words, loading } = useUserWords();

	

	
	// const [page, setPage] = React.useState(1);
	const defaultRowsPerPage = 5;

	const rowsPerPage = defaultRowsPerPage > words.length ? words.length : defaultRowsPerPage;

	// const [skip, setSkip] = React.useState((page-1) * defaultRowsPerPage);
	const rows = words.slice(0, rowsPerPage)


	const [rowsEditStatus, setRowsEditStatus] = React.useState<boolean[]>(new Array(rows.length).fill(false));

	const toggleIsEditingNow = (index: number) => {
		setRowsEditStatus(rowsRowsEdit => {
			const newRowsEditStatus = [...rowsEditStatus];
			newRowsEditStatus[index] = !rowsRowsEdit[index];
			return newRowsEditStatus;
		})
	}

	if (loading) {
		return <h1>loadign</h1>
	}

	if (!words?.length) {
		return <h1>No words</h1>
	}

	return (
		<>
			<Table basic style={{ width: '98%', backgroundColor: 'white' }}>
				<Table.Header >
					<Table.Row textAlign='center'>
						<Table.HeaderCell >Id</Table.HeaderCell>
						<Table.HeaderCell >English</Table.HeaderCell>
						<Table.HeaderCell >Transcription</Table.HeaderCell>
						<Table.HeaderCell >Translation</Table.HeaderCell>
						<Table.HeaderCell >Status</Table.HeaderCell>
						<Table.HeaderCell ></Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{rowsEditStatus.map((rowEditStatus, index) => {
						return rowEditStatus ? (
							<RowWithEdit rowData={rows[index]} key={rows[index].id} toggleIsEditingNow={() => toggleIsEditingNow(index)} />
						) : (
							<Row rowData={rows[index]} key={rows[index].id} toggleIsEditingNow={() => toggleIsEditingNow(index)} />
						);
					})}
				</Table.Body>

				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan="6">
							<Menu floated="right" pagination>
								<Menu.Item as="a" icon>
									<Icon name="chevron left" />
								</Menu.Item>
								<Menu.Item as="a">1</Menu.Item>
								<Menu.Item as="a">2</Menu.Item>
								<Menu.Item as="a">3</Menu.Item>
								<Menu.Item as="a">4</Menu.Item>
								<Menu.Item as="a" icon>
									<Icon name="chevron right" />
								</Menu.Item>
							</Menu>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		</>
	);
};
