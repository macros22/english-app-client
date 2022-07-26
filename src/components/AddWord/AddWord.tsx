import {

	Divider,
	DropdownProps,

} from 'semantic-ui-react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { UserWord, WordStudyStatus } from 'types/types';
import React from 'react';
import { Form } from 'semantic-ui-react';
import { postUserWord } from 'libs/user-words.api';


const studyStatusOptions = [

	{ key: WordStudyStatus.KNOW, value: WordStudyStatus.KNOW, text: WordStudyStatus.KNOW, label: { color: 'green', empty: true, circular: true } },
	{ key: WordStudyStatus.LEARN, value: WordStudyStatus.LEARN, text: WordStudyStatus.LEARN, label: { color: 'yellow', empty: true, circular: true } },
	{ key: WordStudyStatus.UNKNOWN, value: WordStudyStatus.UNKNOWN, text: WordStudyStatus.UNKNOWN, label: { color: 'red', empty: true, circular: true } },
];

interface IUsageExample {
	sentence: string;
	translation: string;
}

interface IFormValues {
	word: string;
	transcription: string;
	translation: string;
	studyStatus: string;
	usageExamples: IUsageExample[];
}

const validationSchema = yup.object({
	word: yup
		.string()
		.min(2, 'Word should be of minimum 2 characters length')
		.required('Word is required'),
	transcription: yup
		.string()
		.min(2, 'Transcription should be of minimum 2 characters length')
		.required('Transcription is required'),
	translation: yup
		.string()
		.min(2, 'Translation should be of minimum 2 characters length')
		.required('Translation is required'),
	studyStatus: yup
		.string()
		.required(),
	usageExamples: yup.array()
		.of(
			yup.object().shape({
				sentence: yup.string(),
				translation: yup.boolean(),
			})
		)
		.required('Required'),
});

export const AddWord = (): JSX.Element => {
	const [studyStatus, setStudyStatus] = React.useState<WordStudyStatus>(
		WordStudyStatus.UNKNOWN
	);




	const defaultValues: IFormValues = {
		word: '',
		transcription: '',
		translation: '',
		studyStatus: WordStudyStatus.UNKNOWN,
		usageExamples: [
			{
				sentence: 'asd',
				translation: 'asd'
			}
		]
	};



	const {
		// register,
		handleSubmit,
		reset,
		register,
		control,
		trigger,
		formState: { errors },
	} = useForm<IFormValues>({
		defaultValues,
		resolver: yupResolver(validationSchema),
	});

	const { fields, append, remove } = useFieldArray({
		name: "usageExamples",
		control
	});


	const onSubmit = (data: IFormValues) => {
		// alert(JSON.stringify(data, null, 2));
		reset();
		postUserWord({
			word: data.word,
			transcription: data.transcription,
			translation: [data.translation],
			usageExamples: [
				{
					sentence: fields[0].sentence,
					translation: fields[0].translation,
				},
			],
		} as UserWord );
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
							<Form.Button icon='trash' labelPosition='left' content={`Delete example ${index+1}`}  size='large' color='red' onClick={() => remove(index)} width={2} />


							{/* </Form.Group>  */}
							<Divider clearing />
						</React.Fragment >
					);
				})}

				

				<Form.Group >
					<Form.Button icon='save' primary size='large' type="submit" content="Save" />
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
