import React from 'react';
import {
	Button,
	Checkbox,
	Divider,
	Form,
	Header,
	Input,
	Message,
	Segment,
} from 'semantic-ui-react';
import { useWordForm } from './useWordForm';
import { WordFormProps } from './WordForm.props';
import styles from './WordForm.module.scss';
import { usePagination } from 'libs/hooks';
export const WordForm = ({ mode, formValues, wordId }: WordFormProps): JSX.Element => {

	const {
		skip,
		wordsPerPageCount,
	} = usePagination();

	const {
		Controller,
		handleSubmit,
		handleReset,
		onSubmit,
		control,
		errors,
		handleSelectStatusChange,
		handleSelectWordLevelChange,
		studyStatus,
		wordLevel,
		synonymsFields,
		removeSynonym,
		antonymsFields,
		removeAntonym,
		definitionsFields,
		removeDefinition,
		translationsFields,
		removeTranslation,
		usageExamplesFields,
		removeUsageExample,
		register,
		loadingPostWord,
		appendUsageExample,
		appendTranslation,
		appendDefinition,
		appendSynonym,
		appendAntonym,
		studyStatusOptions,
		successMessage,
		errorMessage,
		withTranscription,
		handleWithTranscriptionButton,
		wordLevelOptions,
	} = mode == 'edit' ? useWordForm({ formValues, wordId, skip, limit: wordsPerPageCount }) : useWordForm({});

	return (
		<>
			<Form success error size="large" >
				<Controller
					name={'word'}
					control={control}
					render={({ field: { onChange, value } }) => (
						<Form.Input
							size='large'
							value={value}
							onChange={onChange}
							error={errors.word?.message}
							label="English word"
							placeholder="English word"
						/>
					)}
				/>

				<Form.Select
					label="Word level"
					name='wordLevel'
					onChange={handleSelectWordLevelChange}
					placeholder="Select word level"
					value={wordLevel}
					options={wordLevelOptions}
				/>

				<Form.Select
					label="Study status"
					// required
					name='studyStatus'
					onChange={handleSelectStatusChange}
					placeholder="Select study status"
					// {...register("studyStatus")}
					value={studyStatus}
					options={studyStatusOptions}
				/>

				<Divider horizontal>
					<Header as='h4'>
						<Button
							content={`Transcription: ${withTranscription ? 'Yes' : 'No'}`}
							onClick={handleWithTranscriptionButton}
						/>
					</Header>
				</Divider>

				{withTranscription &&
					<>
						<Form.Field>
							<Controller
								name={'transcription.uk'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<Input
										label={'UK'}
										size='large'
										value={withTranscription ? value : ''}
										onChange={onChange}
										placeholder="UK transcription"
										disabled={!withTranscription}

									/>
								)}
							/>
						</Form.Field>
						<Form.Field>
							<Controller
								name={'transcription.us'}
								control={control}
								render={({ field: { onChange, value } }) => (
									<Input
										size='large'
										label={'US'}
										value={withTranscription ? value : ''}
										onChange={onChange}
										placeholder="US transcription"
										disabled={!withTranscription}

									/>
								)}
							/>
						</Form.Field>
					</>
				}

				<Divider horizontal>
					<Header as='h4'>
						<Button icon='add' content={'Definitions'} onClick={() =>
							appendDefinition({
								definition: '',
							})
						} />
					</Header>
				</Divider>

				{definitionsFields.map((field, index) => {
					return (
						<React.Fragment key={field.id}>
							<Form.Field>
								<Controller
									name={`definitions.${index}.definition`}
									control={control}
									render={({ field: { onChange, value } }) => (
										<Input
											size='large'
											// error={errors.transcription?.message}
											value={value}
											onChange={onChange}
											label={`${index + 1}`}
											placeholder={`definition ${index + 1}`}
											action={<Button icon='trash' size='large' color='red' onClick={() => removeDefinition(index)} />}
										/>
									)}
								/>
							</Form.Field>
						</React.Fragment >
					);
				})}
				<Divider horizontal>
					<Header as='h4'>
						<Button icon='add' content={'Translations'} onClick={() =>
							appendTranslation({
								translation: '',
							})
						} />
					</Header>
				</Divider>
				{translationsFields.map((field, index) => {
					return (
						<React.Fragment key={field.id}>
							<Form.Field>
								<Controller
									name={`translations.${index}.translation`}
									control={control}
									render={({ field: { onChange, value } }) => (
										<Input
											size='large'
											// error={errors.transcription?.message}
											value={value}
											onChange={onChange}
											label={`${index + 1}`}
											placeholder={`translation ${index + 1}`}
											action={<Button icon='trash' size='large' color='red' onClick={() => removeTranslation(index)} />}

										/>
									)}
								/>
							</Form.Field>
						</React.Fragment >
					);
				})}

				<Divider horizontal>
					<Header as='h4'>
						<Button icon='add' content={"Usage examples"} onClick={() =>
							appendUsageExample({
								sentence: '',
								translation: '',
							})
						} />
					</Header>
				</Divider>

				{usageExamplesFields.map((field, index) => {
					return (
						<React.Fragment key={field.id}>
							<Form.Field>
								<Controller
									name={`usageExamples.${index}.sentence`}
									control={control}
									render={({ field: { onChange, value } }) => (
										<Input
											size='large'
											// error={errors.transcription?.message}
											value={value}
											onChange={onChange}
											label={`${index + 1}`}
											placeholder={`Usage example ${index + 1}`}
											action={<Button icon='trash' size='large' color='red' onClick={() => removeUsageExample(index)} />}

										/>
									)}
								/>
							</Form.Field>
						</React.Fragment >
					);
				})}

				<Divider horizontal>
					<Header as='h4'>
						<Button icon='add' content={"Synonyms"} onClick={() =>
							appendSynonym({
								synonym: '',
							})
						} />
					</Header>
				</Divider>

				{synonymsFields.map((field, index) => {
					return (
						<React.Fragment key={field.id}>
							<Form.Field>
								<Controller
									name={`synonyms.${index}.synonym`}
									control={control}
									render={({ field: { onChange, value } }) => (
										<Input
											size='large'
											value={value}
											onChange={onChange}
											label={`${index + 1}`}
											placeholder={`synonym ${index + 1}`}
											action={<Button icon='trash' size='large' color='red' onClick={() => removeSynonym(index)} />}

										/>
									)}
								/>
							</Form.Field>
						</React.Fragment >
					);
				})}

				<Divider horizontal>
					<Header as='h4'>
						<Button icon='add' content={"Antonyms"} onClick={() =>
							appendAntonym({
								antonym: '',
							})
						} />
					</Header>
				</Divider>

				{antonymsFields.map((field, index) => {
					return (
						<React.Fragment key={field.id}>
							<Form.Field>
								<Controller
									name={`antonyms.${index}.antonym`}
									control={control}
									render={({ field: { onChange, value } }) => (
										<Input
											size='large'
											value={value}
											onChange={onChange}
											label={`${index + 1}`}
											placeholder={`antonym ${index + 1}`}
											action={<Button icon='trash' size='large' color='red' onClick={() => removeAntonym(index)} />}

										/>
									)}
								/>
							</Form.Field>
						</React.Fragment >
					);
				})}


				<Divider clearing />
				{errorMessage &&
					<>
						<Message
							error
							header={errorMessage}
						/>
						<Divider clearing />
					</>
				}
				{successMessage &&
					<>
						<Message
							success
							header={successMessage}
						/>
						<Divider clearing />
					</>
				}
				<Form.Group >
					<Form.Button loading={loadingPostWord} icon='save' primary size='large' type="submit" content="Save" onClick={handleSubmit(onSubmit)} />
					<Button icon='undo' size='large' content="Reset" onClick={handleReset} />
				</Form.Group>
			</Form>
		</>
	);
};
