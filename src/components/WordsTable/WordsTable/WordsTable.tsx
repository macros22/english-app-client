import React from 'react';
import { useUserWords, useUserWordsCount } from 'hooks';
import { Dimmer, Loader, Pagination, PaginationProps, Segment, Table } from 'semantic-ui-react';
import { Row } from '../Row/Row';
import { RowWithEdit } from '../Row/RowWithEdit';
import { WordsTableProps } from './WordsTable.props';


const defaultWordsPerPageCount = 5;

export const WordsTable = ({ }: WordsTableProps): JSX.Element => {
	const { count: wordsCount } = useUserWordsCount();
	const [currentPage, setCurrentPage] = React.useState(1);
	const [totalPages, setTotalPages] = React.useState(1);
	const [skip, setSkip] = React.useState(0);
	const [wordsPerPageCount, setWordsPerPageCount] = React.useState(0);
	const [rowsEditStatus, setRowsEditStatus] = React.useState<boolean[]>([]);

	const { words, loading } = useUserWords(skip, wordsPerPageCount);

	// Pagination logic.
	React.useEffect(() => {
		if (wordsCount) {
			const pagesCount = wordsCount > defaultWordsPerPageCount ? Number(Math.ceil(wordsCount / defaultWordsPerPageCount)) : 1;
			setTotalPages(pagesCount);
		}
	}, [wordsCount])

	// Logic for correct display rows count.
	React.useEffect(() => {
		let wordsPerPage = 0;
		if (wordsCount) {
			if (wordsCount < defaultWordsPerPageCount) {
				wordsPerPage = wordsCount;
			} else if (currentPage == (totalPages) && (currentPage != 1)) { // for last page
				wordsPerPage = wordsCount - (currentPage - 1) * defaultWordsPerPageCount;
			} else {
				wordsPerPage = defaultWordsPerPageCount;
			}
		}
		setWordsPerPageCount(wordsPerPage)
		setSkip((currentPage - 1) * defaultWordsPerPageCount);
		setRowsEditStatus(new Array(wordsPerPage).fill(false))
	}, [currentPage, wordsCount])


	// Handlers.
	const handlePaginationChange = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, { activePage }: PaginationProps) => {
		setCurrentPage(Number(activePage) || 1);
	}

	const toggleIsEditingNow = (index: number) => {
		setRowsEditStatus(rowsRowsEdit => {
			const newRowsEditStatus = [...rowsEditStatus];
			newRowsEditStatus[index] = !rowsRowsEdit[index];
			return newRowsEditStatus;
		})
	}

	if (loading) {
		return (
			<Segment>
				<Dimmer active>
					<Loader size='massive'>
						Loading
					</Loader>
				</Dimmer>
			</Segment>
		);
	}

	if (!words?.length) {
		return <h1>No words yet </h1>
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
							<RowWithEdit rowData={words[index]} rowId={skip + index + 1} key={words[index].id} toggleIsEditingNow={() => toggleIsEditingNow(index)} />
						) : (
							<Row rowData={words[index]} rowId={skip + index + 1} key={words[index].id} toggleIsEditingNow={() => toggleIsEditingNow(index)} />
						);
					})}
				</Table.Body>

				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan="6">
							<Pagination
								activePage={currentPage}
								onPageChange={handlePaginationChange}
								// boundaryRange={boundaryRange}
								// onPageChange={this.handlePaginationChange}
								// size='mini'
								// siblingRange={siblingRange}
								totalPages={totalPages}
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
