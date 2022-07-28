import * as yup from 'yup';

export const wordValidationSchema = yup.object({
	word: yup
		.string()
		.min(2, 'Word should be of minimum 2 characters length')
		.required('Word is required'),
	transcription: yup
		.string()
		.min(2, 'Transcription should be of minimum 2 characters length')
		.required('Transcription is required'),
	definitions: yup
		.array()
		.of(
			yup
				.string()
				.min(2, 'Definition should be of minimum 2 characters length')
		)
		.required('Definitions required'),
	translations: yup
		.array()
		.of(
			yup
				.string()
				.min(2, 'Translation should be of minimum 2 characters length')
		)
		.required('Translation required'),
	studyStatus: yup
		.string()
		.required(),
	usageExamples: yup
		.array()
		.of(
			yup.object().shape({
				sentence: yup.string(),
				translation: yup.boolean(),
			})
		)
		.required('Usage examples required'),
});