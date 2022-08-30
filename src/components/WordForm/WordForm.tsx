import React from 'react';
import {
	Button,
	Divider,
	Form,
	Header,
	Input,
	Message,
	Tab,
} from 'semantic-ui-react';
import { useWordForm } from './useWordForm';
import { WordFormProps } from './WordForm.props';
import styles from './WordForm.module.scss';
import { usePagination } from 'libs/hooks';
import { PartOfSpeech, WordLevel, WordStudyStatus } from 'libs/types/types';
import { DefinitionInput } from './MeaningNestedFields/DefinitionInput';
import { AntonymsInputs } from './MeaningNestedFields/AntonymsInputs';
import { SynonymsInputs } from './MeaningNestedFields/SynonymsInputs';
import { TranslationsInputs } from './MeaningNestedFields/TranslationsInputs';
import { WordLevelSelect } from './MeaningNestedFields/WordLevelSelect';
import { PartOfSpeechSelect } from './MeaningNestedFields/PartOfSpeechSelect';
import { UsageExamplesInputs } from './MeaningNestedFields/UsageExamplesInputs';

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
		setValue,
		loadingPostWord,
		studyStatusOptions,
		successMessage,
		errorMessage,
		withTranscription,
		handleWithTranscriptionButton,
		appendMeaning,
		meaningsFields,
		removeMeaning,
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


				<Controller
					name='studyStatus'
					control={control}
					render={({ field }) =>
						<Form.Select
							name={field.name}
							label="Study status"
							ref={field.ref}
							onBlur={field.onBlur}
							onChange={(_, { value }) => setValue('studyStatus', value ? value as WordStudyStatus : WordStudyStatus.Learn)}
							value={field.value?.toString()}
							options={studyStatusOptions}
						/>}
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
						<Button icon='add' content={'Meanings'} onClick={() =>
							appendMeaning({
								pos: PartOfSpeech.Noun,
								level: WordLevel.Uncategorized,
								definition: '',
								translations: [],
								antonyms: [],
								synonyms: [],
								usageExamples: []
							})
						} />
					</Header>
				</Divider>

				<Tab panes={
					meaningsFields.map((_, meaningIndex) => {
						return {
							menuItem: `Meannig ${meaningIndex + 1}`,
							render: () => {
								return (
									// TODO: fix key value
									<Tab.Pane key={Math.random() * Math.random()}>
										<WordLevelSelect control={control} meaningIndex={meaningIndex} setValue={setValue} />
										<PartOfSpeechSelect control={control} meaningIndex={meaningIndex} setValue={setValue} />
										<DefinitionInput control={control} meaningIndex={meaningIndex} />
										<AntonymsInputs control={control} meaningIndex={meaningIndex} />
										<SynonymsInputs control={control} meaningIndex={meaningIndex} />
										<UsageExamplesInputs control={control} meaningIndex={meaningIndex} />
										<TranslationsInputs control={control} meaningIndex={meaningIndex} />
										<Button icon='trash' size='large' color='red' content="Delete meaning"
											onClick={() => removeMeaning(meaningIndex)}
										/>
									</Tab.Pane>
								)
							}
						}
					})} />

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
