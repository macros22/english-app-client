import React from 'react';
import { Button, Icon, Input, Label, Menu, SemanticCOLORS, Table } from 'semantic-ui-react';
import { WordStudyStatus } from 'types/types';
import { RowProps } from './Row.props';

const labelColors: Record<WordStudyStatus, SemanticCOLORS> = {
	[WordStudyStatus.KNOW]: 'green',
	[WordStudyStatus.LEARN]: 'yellow',
	[WordStudyStatus.UNKNOWN]: 'red',
}

export const Row = ({ rowData, toggleIsEditingNow, rowId }: RowProps) => {
	const [isExamplesOpen, setIsExamplesOpen] = React.useState(false);


	const handleOpenExamplesButton = () => {
		setIsExamplesOpen((open) => !open);
	};

	return (
		<>
			<Table.Row textAlign='center' >
				<Table.Cell>{rowId}</Table.Cell>
				<Table.Cell>{rowData.word}</Table.Cell>
				<Table.Cell>{rowData.transcription}</Table.Cell>
				<Table.Cell>{rowData.translation}</Table.Cell>
				<Table.Cell>
					<Label color={labelColors[rowData.studyStatus]} size="large" >
						{rowData.studyStatus}
					</Label>
				</Table.Cell>
				<Table.Cell>
					<Button basic icon="edit" size="large" onClick={toggleIsEditingNow} />
					<Button basic icon="trash alternate" size="large" />
					<Button basic icon={`chevron ${isExamplesOpen ? 'up' : 'down'}`} size='large' onClick={handleOpenExamplesButton} />

				</Table.Cell>
			</Table.Row>
			{isExamplesOpen &&
				rowData.usageExamples.map((exampleRow) => (
					<Table.Row key={exampleRow.sentence} >
						<Table.Cell></Table.Cell>
						<Table.Cell colspan={3}>{exampleRow.sentence}</Table.Cell>
						<Table.Cell></Table.Cell>
						<Table.Cell>{exampleRow.translation}</Table.Cell>
					</Table.Row>
				))}
		</>
	);
};
