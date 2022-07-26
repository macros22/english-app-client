import React from 'react';
import {
	Divider,
	DropdownProps,
	Form
} from 'semantic-ui-react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { UserWord, WordStudyStatus } from 'types/types';
import { postUserWord } from 'libs/user-words.api';
import { useUserWords } from 'hooks';
import { validationSchema } from './form.schema';
import { IFormValues } from './interfaces';
import { defaultFormValues, studyStatusOptions } from './constants';


export const AddWord = (): JSX.Element => {
	const [studyStatus, setStudyStatus] = React.useState<WordStudyStatus>(
		WordStudyStatus.UNKNOWN
	);

	const { mutate: mutateUserWords } = useUserWords();
	const {
		handleSubmit,
		reset,
		register,
		control,
		trigger,
		formState: { errors },
	} = useForm<IFormValues>({
		defaultValues: defaultFormValues,
		resolver: yupResolver(validationSchema),
	});

	const { fields, append, remove } = useFieldArray({
		name: "usageExamples",
		control
	});

	const [loadingPostWord, setLoadingPostWord] = React.useState(false);

	const onSubmit = async (data: IFormValues) => {
		reset();
		setLoadingPostWord(true);
		await postUserWord({
			word: data.word,
			transcription: data.transcription,
			translation: [data.translation],
			usageExamples: [
				{
					sentence: fields[0].sentence,
					translation: fields[0].translation,
				},
			],
		} as UserWord);

		mutateUserWords();
		setLoadingPostWord(false);
	};

	const handleSelectStatusChange = (
		event: React.SyntheticEvent<HTMLElement, Event>,
		data: DropdownProps
	) => {
		setStudyStatus(data.value as WordStudyStatus);
		trigger('studyStatus');
	};


	return (
		<>
			<Form size="large" onSubmit={handleSubmit(onSubmit)} >
				<Form.Group widths={'equal'}>
					<Controller
						name={'word'}
						control={control}
						render={({ field: { onChange, value } }) => (
							<Form.Input
								value={value}
								onChange={onChange}
								error={errors.word?.message}
								label="English word"
								placeholder="English word"

							/>
						)}
					/>
					<Controller
						name={'transcription'}
						control={control}
						render={({ field: { onChange, value } }) => (
							<Form.Input
								error={errors.transcription?.message}
								value={value}
								onChange={onChange}
								label="Transcription"
								placeholder="Transcription"

							/>
						)}
					/>
				</Form.Group>
				<Form.Group widths={'equal'}>
					<Controller
						name={'translation'}
						control={control}
						render={({ field: { onChange, value } }) => (
							<Form.Input

								value={value}
								onChange={onChange}
								label="Translation"
								placeholder="Translation"
								error={errors.translation?.message}
							/>
						)}
					/>
					<Form.Select
						label="Study status"
						required
						name='studyStatus'
						onChange={handleSelectStatusChange}
						placeholder="Select study status"

						value={studyStatus}
						options={studyStatusOptions}

					/>
				</Form.Group>

				{fields.map((field, index) => {
					return (

						<React.Fragment key={field.id}>
							{/* <Form.Group  widths='equal'> */}
							<Form.Input label={`Example #${index + 1}`} {...register(`usageExamples.${index}.sentence` as const, {
								required: true
							})} placeholder="English sentence" />
							<Form.Input label={`Example #${index + 1} translation`} {...register(`usageExamples.${index}.translation` as const, {
								required: true
							})} placeholder="Translation sentence" />
							<Form.Button icon='trash' labelPosition='left' content={`Delete example ${index + 1}`} size='large' color='red' onClick={() => remove(index)} width={2} />


							{/* </Form.Group>  */}
							<Divider clearing />
						</React.Fragment >
					);
				})}

				<Form.Group >
					<Form.Button loading={loadingPostWord} icon='save' primary size='large' type="submit" content="Save" />
					<Form.Button icon='undo' size='large' content="Reset" />
					<Form.Button icon='add' labelPosition='left' size='large' content="Add usage example" onClick={() =>
						append({
							sentence: '',
							translation: '',
						})
					} />
				</Form.Group>
			</Form>
		</>
	);
};
