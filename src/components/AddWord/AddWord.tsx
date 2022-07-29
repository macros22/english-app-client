import React from 'react';
import {
	Button,
	Divider,
	Form,
	Header,
	Icon,
	Input
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
		appendTranslation,
		appendDefinition,
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


				<Divider horizontal>
					<Header as='h4'>
						<Button icon='add' content={'DEFINITIONS'} onClick={() =>
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
								{/* <label>{`Definition #${index + 1}`}</label> */}
								<Input
									label={`№ ${index + 1}`}
									{...register(`definitions.${index}.definition` as const, {
										required: true
									})} placeholder={`definition #${index + 1}`}
									action={<Button icon='trash' size='large' color='red' onClick={() => removeDefinition(index)} />} />
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
								{/* <label>{`Translation #${index + 1}`}</label> */}

								<Controller
									
									name={`translations.${index}.translation`}
									control={control}
									render={({ field: { onChange, value } }) => (
										<Input
											// error={errors.transcription?.message}
											value={value}
											onChange={onChange}
											label={`№ ${index + 1}`}

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
								{/* <label>{`Example #${index + 1}`}</label> */}

								<Input
									label={`№ ${index + 1}`}
									action={

										<Button icon='trash' size='large' color='red' onClick={() => removeUsageExample(index)} />
									}
									placeholder="English sentence"
									{...register(`usageExamples.${index}.sentence` as const, {
										required: true
									})}
									className={errors?.usageExamples?.[index]?.sentence ? "error" : ""}
								/>
							</Form.Field>
							{/* <Form.Field>
								<label>{`Example #${index + 1}`}</label>
								<input
									placeholder="Translation sentence"

									{...register(`usageExamples.${index}.translation` as const, {
										required: true
									})}
									className={errors?.usageExamples?.[index]?.translation ? "error" : ""}
								/>
							</Form.Field> */}



						</React.Fragment >
					);
				})}
				<Divider clearing />
				<Form.Group >
					<Form.Button loading={loadingPostWord} icon='save' primary size='large' type="submit" content="Save" />
					<Form.Button icon='undo' size='large' content="Reset" />
				</Form.Group>
			</Form>
		</>
	);
};
