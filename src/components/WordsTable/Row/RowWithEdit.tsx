import React from 'react';
import { Button, Form, Input, Label, Table } from 'semantic-ui-react';
import { RowProps } from './Row.props';
import { useWordForm } from 'hooks';
import { IWordFormValues } from 'types/forms';
import { wordDataToFormData } from 'utils/form-data.util';

export const RowWithEdit = ({ rowData, toggleIsEditingNow, rowId }: RowProps) => {
	const [isExamplesOpen, setIsExamplesOpen] = React.useState(false);


	const handleOpenExamplesButton = () => {
		setIsExamplesOpen((open) => !open);
	};



	const {
		Controller,
		handleSubmit,
		onSubmit,
		control,
		errors,
		handleSelectStatusChange,
		studyStatus,
		definitionsFields,
		removeDefinition,
		translationsFields,
		removeTranslation,
		usageExamplesFields,
		removeUsageExample,
		register,
		loadingPostWord,
		appendUsageExample,
		studyStatusOptions,
	} = useWordForm(wordDataToFormData(rowData));


	const handleSave = async (data: IWordFormValues) => {
		console.log(data);
		// onSubmit(data);
		toggleIsEditingNow();
	}


	return (
		<>
			<Table.Row textAlign='center'>
				<Table.Cell>{rowId}</Table.Cell>
				<Table.Cell><Controller
					name={'word'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<Form.Input
							value={value}
							onChange={onChange}
							error={errors.word?.message}
							placeholder="English word"

						/>
					)}
				/></Table.Cell>
				<Table.Cell><Controller
					name={'transcription'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<Form.Input
							error={errors.transcription?.message}
							value={value}
							onChange={onChange}
							placeholder="Transcription"

						/>
					)}
				/></Table.Cell>
				<Table.Cell><Input placeholder='translation...' value={rowData.translations[0]} /></Table.Cell>
				<Table.Cell>
					<Label color={'green'} size="large">
						{rowData.studyStatus}
					</Label>
				</Table.Cell>
				<Table.Cell>
					<Button basic icon="save" size="large" onClick={handleSubmit(handleSave)} />
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
