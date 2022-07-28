import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Label, Table } from 'semantic-ui-react';
import { IWordFormValues } from 'types/forms';
import { RowProps } from './Row.props';
import { yupResolver } from '@hookform/resolvers/yup';
import { wordValidationSchema } from 'utils/form.schema';

export const RowWithEdit = ({ rowData, toggleIsEditingNow, rowId }: RowProps) => {
	const [isExamplesOpen, setIsExamplesOpen] = React.useState(false);

	// Inputs initialization.
	const {
		handleSubmit,
		reset,
		register,
		control,
		trigger,
		formState: { errors },
	} = useForm<IWordFormValues>({
		defaultValues: {
			word: rowData.word,
			transcription: rowData.transcription,
			translations: rowData.translations,
			definitions: rowData.definitions,
			studyStatus: rowData.studyStatus,
			usageExamples: rowData.usageExamples,
		},
		resolver: yupResolver(wordValidationSchema),
	});



	const handleOpenExamplesButton = () => {
		setIsExamplesOpen((open) => !open);
	};




	return (
		<>
			<Table.Row textAlign='center'>
				<Table.Cell>{rowId}</Table.Cell>
				<Table.Cell><Input placeholder='english...' value={rowData.word} /></Table.Cell>
				<Table.Cell><Input placeholder='transcription...' value={rowData.transcription} /></Table.Cell>
				<Table.Cell><Input placeholder='translation...' value={rowData.translations[0]} /></Table.Cell>
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
						<Table.Cell colspan={3}>{exampleRow.sentence}</Table.Cell>
						<Table.Cell></Table.Cell>
						<Table.Cell>{exampleRow.translation}</Table.Cell>
					</Table.Row>
				))}
		</>
	);
};
