import React from 'react';
import {
	Divider,
	Form
} from 'semantic-ui-react';
import { useWordForm } from 'hooks';

export const AddWord = (): JSX.Element => {

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
	} = useWordForm();


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
					<Form.Select
						label="Study status"
						required
						name='studyStatus'
						onChange={handleSelectStatusChange}
						placeholder="Select study status"
						// {...register("studyStatus")}
						value={studyStatus}
						options={studyStatusOptions}

					/>
				</Form.Group>


				{definitionsFields.map((field, index) => {
					return (

						<React.Fragment key={field.id}>

							<Form.Field>
								<label>{`Definition #${index + 1}`}</label>
								<input  {...register(`definitions.${index}.definition` as const, {
									required: true
								})} placeholder={`definition #${index + 1}`} />
							</Form.Field>
							<Form.Button icon='trash' labelPosition='left' content={`Delete definition ${index + 1}`} size='large' color='red' onClick={() => removeDefinition(index)} width={9} />
							<Divider clearing />
						</React.Fragment >
					);
				})}

				{translationsFields.map((field, index) => {
					return (

						<React.Fragment key={field.id}>

							<Form.Field>
								<label>{`Translation #${index + 1}`}</label>
								<input  {...register(`translations.${index}.translation` as const, {
									required: true
								})} placeholder={`translation #${index + 1}`} />
							</Form.Field>
							<Form.Button icon='trash' labelPosition='left' content={`Delete translation ${index + 1}`} size='large' color='red' onClick={() => removeTranslation(index)} width={9} />
							<Divider clearing />
						</React.Fragment >
					);
				})}

				{usageExamplesFields.map((field, index) => {
					return (

						<React.Fragment key={field.id}>
							<Form.Field>
								<label>{`Example #${index + 1}`}</label>

								<input
									placeholder="English sentence"
									{...register(`usageExamples.${index}.sentence` as const, {
										required: true
									})}
									className={errors?.usageExamples?.[index]?.sentence ? "error" : ""}
								/>
							</Form.Field>
							<Form.Field>
								<label>{`Example #${index + 1}`}</label>
								<input
									placeholder="Translation sentence"

									{...register(`usageExamples.${index}.translation` as const, {
										required: true
									})}
									className={errors?.usageExamples?.[index]?.translation ? "error" : ""}
								/>
							</Form.Field>
							<Form.Button icon='trash' labelPosition='left' content={`Delete example ${index + 1}`} size='large' color='red' onClick={() => removeUsageExample(index)} width={7} />

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
