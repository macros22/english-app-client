import React from 'react';
import {
	Button,
	Divider,
	Form,
	Header,
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
		handleReset,
	} = useWordForm();


	return (
		<>
			<Form size="large" >
				{/* <Form.Group widths={'equal'}> */}
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
				{/* </Form.Group> */}

				{/* <Form.Group widths={'equal'}> */}
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
				{/* </Form.Group> */}

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
											// error={errors.transcription?.message}
											value={value}
											onChange={onChange}
											label={`№ ${index + 1}`}
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
								<Controller
									name={`usageExamples.${index}.sentence`}
									control={control}
									render={({ field: { onChange, value } }) => (
										<Input
											// error={errors.transcription?.message}
											value={value}
											onChange={onChange}
											label={`№ ${index + 1}`}
											placeholder={`Usage example ${index + 1}`}
											action={<Button icon='trash' size='large' color='red' onClick={() => removeUsageExample(index)} />}

										/>
									)}
								/>
							</Form.Field>
						</React.Fragment >
					);
				})}

				<Divider clearing />

				<Form.Group >

					<Form.Button loading={loadingPostWord} icon='save' primary size='large' type="submit" content="Save" onClick={handleSubmit(onSubmit)} />
					<Button icon='undo' size='large' content="Reset" onClick={handleReset} />
				</Form.Group>
			</Form>
		</>
	);
};
