import { WordForm } from 'components';
import { useUserWords } from 'hooks';
import { deleteUserWord } from 'libs/user-words.api';
import React from 'react';
import { Button, Header, Label, Modal, SemanticCOLORS, Table } from 'semantic-ui-react';
import { WordStudyStatus } from 'types/types';
import { wordDataToFormData } from 'utils/form-data.util';
import { RowProps } from './Row.props';

const labelColors: Record<WordStudyStatus, SemanticCOLORS> = {
	[WordStudyStatus.KNOW]: 'green',
	[WordStudyStatus.LEARN]: 'yellow',
	[WordStudyStatus.UNKNOWN]: 'red',
}

export const Row = ({ rowData, rowId }: RowProps) => {
	const [isExamplesOpen, setIsExamplesOpen] = React.useState(false);

	const [isEditingNow, setIsEditingNow] = React.useState(false);

	const handleOpenExamplesButton = () => {
		setIsExamplesOpen((open) => !open);
	};

	const { mutate: mutateUserWords, mutateCount } = useUserWords();
	const handleDeleteButton = async () => {
		await deleteUserWord(rowData.id);
		await mutateUserWords();
		await mutateCount();
	};

	return (
		<>
			<Table.Row textAlign='center' verticalAlign='middle'>
				<Table.Cell width={1}>{rowId}</Table.Cell>
				<Table.Cell>
					<Header as='h1'>
						{rowData.word}
						<Header.Subheader>
							{rowData.transcription}
						</Header.Subheader>
					</Header>
					{/* {rowData.word} <br /> {rowData.transcription} */}
				</Table.Cell>
				<Table.Cell verticalAlign='middle'>
					{rowData.translations.map((translation, index) => {
						return (
							<React.Fragment key={translation + index}>
								<Header style={{ margin: '0.35rem 0' }} size='small'>{translation}</Header>
							</React.Fragment>
						);
					})
					}</Table.Cell>
				<Table.Cell>
					<Label color={labelColors[rowData.studyStatus]} size="big" >
						{rowData.studyStatus}
					</Label>
				</Table.Cell>
				<Table.Cell>
					<Modal
						onClose={() => setIsEditingNow(false)}
						onOpen={() => setIsEditingNow(true)}
						open={isEditingNow}
						trigger={<Button basic icon="edit" size="large" />}
					>
						<Modal.Header>Changing word</Modal.Header>
						<Modal.Content>
							<WordForm mode="edit" formValues={wordDataToFormData(rowData)} wordId={rowData.id} />
						</Modal.Content>
						<Modal.Actions>
							<Button color='black' onClick={() => setIsEditingNow(false)}>
								Close
							</Button>
						</Modal.Actions>
					</Modal>
					<Button basic icon="trash alternate" size="large" onClick={handleDeleteButton} />
					<Button basic icon={`chevron ${isExamplesOpen ? 'up' : 'down'}`} size='large' onClick={handleOpenExamplesButton} />

				</Table.Cell>
			</Table.Row>
			{isExamplesOpen &&
				rowData.usageExamples.map((exampleRow) => (
					<Table.Row key={exampleRow.sentence} >
						<Table.Cell></Table.Cell>
						<Table.Cell colspan={5}>{exampleRow.sentence}</Table.Cell>
						{/* <Table.Cell></Table.Cell>
						<Table.Cell>{exampleRow.translation}</Table.Cell> */}
					</Table.Row>
				))}



		</>
	);
};
