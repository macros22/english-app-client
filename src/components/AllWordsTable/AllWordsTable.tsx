import React from 'react';
import { Icon, Input, Label, Menu, Table } from 'semantic-ui-react';
import { Word } from 'types/types';
import { wordsDefault } from './defaultWords';
import { Row } from './Row';
import { RowWithEdit } from './RowWithEdit';

export function createData(word: Word) {
	return {
		...word,
		isEditingNow: false,
	};
}

export type RowType = ReturnType<typeof createData>;

export const AllWordsTable = () => {

	const rows = wordsDefault
		.map((word) => createData(word))
		.sort((a, b) => (a.id < b.id ? -1 : 1));

	rows[0].isEditingNow = true;

	return (
		<>
			<Table basic style={{ width: '1050px', backgroundColor: 'white'}}>
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
					{rows.map((row) => {
						return row.isEditingNow ? (
							<RowWithEdit rowData={row} key={row.id} />
						) : (
							<Row rowData={row} key={row.id} />
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
