import { WORDS_MODE } from 'constants/names.storage';
import { useLocalStorage, useUser } from 'hooks';
import React from 'react';
import { Button, Dimmer, Header, Label, Loader, Segment, SemanticCOLORS, Table } from 'semantic-ui-react';
import { Role, WordMode, WordStudyStatus } from 'types/types';
import { DeleteButtonWithModal } from './DeleteButtonWithModal';
import { WordMoreInfoModal } from './WordMoreInfoModal';
import { EditButtonWithModal } from './EditButtonWithModal';
import styles from './Row.module.scss';
import { RowProps } from './Row.props';

const labelColors: Record<WordStudyStatus, SemanticCOLORS> = {
	[WordStudyStatus.KNOW]: 'green',
	[WordStudyStatus.LEARN]: 'yellow',
	[WordStudyStatus.UNKNOWN]: 'red',
}

export const Row = ({ rowData, rowId }: RowProps) => {
	const { isUserLoading, user } = useUser();
	const [wordsMode] = useLocalStorage<WordMode>(WORDS_MODE, 'userWords');

	if (isUserLoading) {
		return (
			<Segment>
				<Dimmer active>
					<Loader size='massive'>
						isUserLoading
					</Loader>
				</Dimmer>
			</Segment>
		);
	}

	return (
		<>
			<Table.Row textAlign='center' verticalAlign='middle'>
				<Table.Cell width={1}>{rowId}</Table.Cell>
				<Table.Cell width={9}>
					<Header as='h1'>
						{rowData.word}
						<Header.Subheader>
							{rowData.transcription}
						</Header.Subheader>
					</Header>
				</Table.Cell>
				<Table.Cell width={2}>
					<Label color={labelColors[rowData.studyStatus]} size="big" >
						{rowData.studyStatus}
					</Label>
				</Table.Cell>
				{wordsMode == 'userWords' ?
					<>
						<Table.Cell width={1}><EditButtonWithModal rowData={rowData} /></Table.Cell>
						<Table.Cell width={1}><DeleteButtonWithModal wordId={rowData.id} /></Table.Cell>
						<Table.Cell width={1}><WordMoreInfoModal rowData={rowData} /></Table.Cell>
					</>
					:
					user && user.role == Role.ADMIN
						?
						<>
							<Table.Cell><EditButtonWithModal rowData={rowData} /></Table.Cell>
							<Table.Cell><DeleteButtonWithModal wordId={rowData.id} /></Table.Cell>
							<Table.Cell><WordMoreInfoModal rowData={rowData} /></Table.Cell>
						</>
						:

						<Table.Cell width={1}><WordMoreInfoModal rowData={rowData} /></Table.Cell>
				}
			</Table.Row>
		</>
	);
};
