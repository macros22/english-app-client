import * as yup from 'yup';

export const validationSchema = yup.object({
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