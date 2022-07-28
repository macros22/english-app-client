import React from 'react';
import {
	Divider,
	DropdownProps,
	Form
} from 'semantic-ui-react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { IUserWord, WordStudyStatus } from 'types/types';
import { postUserWord } from 'libs/user-words.api';
import { useUserWords } from 'hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { wordValidationSchema } from 'utils/form.schema';
import { defaultFormValues, studyStatusOptions } from './constants';
import { IWordFormValues } from 'types/forms';


export const AddWord = (): JSX.Element => {

	const { mutate: mutateUserWords } = useUserWords();

	// Form initialization.
	const {
		handleSubmit,
		reset,
		register,
		control,
		trigger,
		formState: { errors },
	} = useForm<IWordFormValues>({
		defaultValues: defaultFormValues,
		resolver: yupResolver(wordValidationSchema),
	});

	const { fields: usageExamplesFields, append: appendUsageExample, remove: removeUsageExample } = useFieldArray({
		name: "usageExamples",
		control,
	} );

	const { fields: translationsFields, append: appendTranslation, remove: removeTranslation } = useFieldArray({
		name: "translations",
		control
	} as never);

	const [loadingPostWord, setLoadingPostWord] = React.useState(false);

	const onSubmit = async (data: IWordFormValues) => {
		reset();
		try {
			setLoadingPostWord(true);
			await postUserWord({
				word: data.word,
				transcription: data.transcription,
				translations: data.translations,
				definitions: [""],
				usageExamples: [
					{
						sentence: usageExamplesFields[0].sentence,
						translation: usageExamplesFields[0].translation,
					},
				],
				studyStatus,
			} as IUserWord);

			mutateUserWords();

		} catch (e) {

		}
		setLoadingPostWord(false);
	};

	// Study status dropdown.
	const [studyStatus, setStudyStatus] = React.useState<WordStudyStatus>(
		WordStudyStatus.UNKNOWN
	);
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
					{/* <Controller
						name={'translations'}
						control={control}
						render={({ field: { onChange, value } }) => (
							<Form.Input

								value={value}
								onChange={onChange}
								label="Translation"
								placeholder="Translation"
								error={errors.translations?.message}
							/>
						)}
					/> */}
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

				{translationsFields.map((field, index) => {
					return (

						<React.Fragment key={field.id}>
							{/* <Form.Group  widths='equal'> */}
							<Form.Input label={`Translation #${index + 1}`} {...register(`translations.${index}` as const, {
								required: true
							})} placeholder={`translation #${index + 1}`} />
						
							<Form.Button icon='trash' labelPosition='left' content={`Delete example ${index + 1}`} size='large' color='red' onClick={() => removeTranslation(index)} width={8} />
							{/* </Form.Group>  */}
							<Divider clearing />
						</React.Fragment >
					);
				})}

				{usageExamplesFields.map((field, index) => {
					return (

						<React.Fragment key={field.id}>
							{/* <Form.Group  widths='equal'> */}
							<Form.Input label={`Example #${index + 1}`} {...register(`usageExamples.${index}.sentence` as const, {
								required: true
							})} placeholder="English sentence" />
							<Form.Input label={`Example #${index + 1} translation`} {...register(`usageExamples.${index}.translation` as const, {
								required: true
							})} placeholder="Translation sentence" />
							<Form.Button icon='trash' labelPosition='left' content={`Delete example ${index + 1}`} size='large' color='red' onClick={() => removeUsageExample(index)} width={7} />


							{/* </Form.Group>  */}
							<Divider clearing />
						</React.Fragment >
					);
				})}

				<Form.Group >
					<Form.Button loading={loadingPostWord} icon='save' primary size='large' type="submit" content="Save" />
					<Form.Button icon='undo' size='large' content="Reset" />
					<Form.Button icon='add' labelPosition='left' size='large' content="Add usage example" onClick={() =>
						appendUsageExample({
							sentence: '',
							translation: '',
						})
					} />
				</Form.Group>
			</Form>
		</>
	);
};
