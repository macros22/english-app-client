import React from 'react';
import { Button, Input, Label, Table } from 'semantic-ui-react';
import { RowProps } from './Row.props';

export const RowWithEdit = ({ rowData, toggleIsEditingNow, rowId }: RowProps) => {
	const [isExamplesOpen, setIsExamplesOpen] = React.useState(false);

	const handleOpenExamplesButton = () => {
		setIsExamplesOpen((open) => !open);
	};

	return (
		<>
			<Table.Row textAlign='center'>
				<Table.Cell>{rowId}</Table.Cell>
				<Table.Cell><Input placeholder='english...' value={rowData.word} /></Table.Cell>
				<Table.Cell><Input placeholder='transcription...' value={rowData.transcription} /></Table.Cell>
				<Table.Cell><Input placeholder='translation...' value={rowData.translation} /></Table.Cell>
				<Table.Cell>
					<Label color={'green'} size="large">
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
					<Table.Row key={exampleRow.sentence}>
						<Table.Cell></Table.Cell>
						<Table.Cell>{exampleRow.sentence}</Table.Cell>
						<Table.Cell></Table.Cell>
						<Table.Cell>{exampleRow.translation}</Table.Cell>
					</Table.Row>
				))}
		</>
	);
};
