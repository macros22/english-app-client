import { useUserWords } from 'hooks';
import React from 'react';
import { Icon, Menu, Pagination, PaginationProps, Table } from 'semantic-ui-react';
import { Row } from '../Row/Row';
import { RowWithEdit } from '../Row/RowWithEdit';
import { WordsTableProps } from './WordsTable.props';

export const WordsTable = ({ }: WordsTableProps): JSX.Element => {

	// ! TMP
	const wordsCount = 4;

	const [page, setPage] = React.useState(3);

	const defaultWordsPerPageCount = 5;
	const wordsPerPageCount = defaultWordsPerPageCount > wordsCount ? wordsCount : defaultWordsPerPageCount;

	const [skip, setSkip] = React.useState((page - 1) * wordsPerPageCount);

	// const { words, loading, mutate: mutateUserWords } = useUserWords({ skip, limit: wordsPerPageCount });
	const { words, loading} = useUserWords(skip, wordsPerPageCount);

	React.useEffect(() => {
		console.log(words)
	}, [loading])

	const handlePaginationChange = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, { activePage }: PaginationProps) => {
		setPage(Number(activePage) || 1);
	}

	React.useEffect(() => {
		setSkip((page - 1) * wordsPerPageCount);
	}, [page])

	const [rowsEditStatus, setRowsEditStatus] = React.useState<boolean[]>(new Array(wordsPerPageCount).fill(false));

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
							<RowWithEdit rowData={words[index]} key={words[index].id} toggleIsEditingNow={() => toggleIsEditingNow(index)} />
						) : (
							<Row rowData={words[index]} key={words[index].id} toggleIsEditingNow={() => toggleIsEditingNow(index)} />
						);
					})}
				</Table.Body>

				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan="6">
							<Pagination
								activePage={page}
								onPageChange={handlePaginationChange}
								// boundaryRange={boundaryRange}
								// onPageChange={this.handlePaginationChange}
								// size='mini'
								// siblingRange={siblingRange}
								totalPages={wordsCount}
							// // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
							// ellipsisItem={showEllipsis ? undefined : null}
							// firstItem={showFirstAndLastNav ? undefined : null}
							// lastItem={showFirstAndLastNav ? undefined : null}
							// prevItem={showPreviousAndNextNav ? undefined : null}
							// nextItem={showPreviousAndNextNav ? undefined : null}
							/>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		</>
	);
};
