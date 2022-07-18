import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Button, Icon, Input, Label, Menu, Table } from 'semantic-ui-react';
import { Word } from 'types/types';
import { RowType } from './AllWordsTable';

export interface RowWithEditProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	rowData: Word;
	toggleIsEditingNow: () => void;
}

export const RowWithEdit = ({ rowData, toggleIsEditingNow }: RowWithEditProps) => {
	const [isExamplesOpen, setIsExamplesOpen] = React.useState(false);

	const handleOpenExamplesButton = () => {
		setIsExamplesOpen((open) => !open);
	};

	return (
		<>
			<Table.Row textAlign='center'>
				<Table.Cell>{rowData.id}</Table.Cell>
				<Table.Cell><Input placeholder='english...' value={rowData.word} /></Table.Cell>
				<Table.Cell><Input placeholder='transcription...' value={rowData.transcription} /></Table.Cell>
				<Table.Cell><Input placeholder='translation...' value={rowData.translation} /></Table.Cell>
				<Table.Cell>
					<Label color={'green'} size="large">
						{rowData.studyStatus}
					</Label>
				</Table.Cell>
				<Table.Cell>
					<Button icon size="medium">
						<Icon name="edit" onClick={toggleIsEditingNow} size='large'/>
					</Button>
					<Button icon size="medium">
						<Icon name="trash alternate" size='large' />
					</Button>
					<Button icon size="medium" onClick={handleOpenExamplesButton}>
						<Icon name={`chevron ${isExamplesOpen ? 'up' : 'down'}`}  size='large'/>
					</Button>
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
