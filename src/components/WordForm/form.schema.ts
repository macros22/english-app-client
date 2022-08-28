import * as yup from 'yup';

// Made definitions and translations array of objects
// instead of array of string to avoid react-hook-form errors.
export const wordValidationSchema = yup.object({
	word: yup
		.string()
		.required('Word is required')
		.min(2, 'Word should be of minimum 2 characters length'),
	// transcription: yup
	// 	.string(),
	// .required('Transcription is required'),
	// .min(2, 'Transcription should be of minimum 2 characters length'),
	definitions: yup
		.array()
		.of(
			yup.object().shape({
				definition: yup.string(),
			})
		)
		.required('definitions required'),
	translations: yup
		.array()
		.of(
			yup.object().shape({
				translation: yup.string(),
			})
		)
		.required('Translations required'),
	studyStatus: yup
		.string()
		.required(),
	synonyms: yup
		.array()
		.of(
			yup.object().shape({
				synonym: yup.string(),
			})
		)
		.required('Translations required'),
	antonyms: yup
		.array()
		.of(
			yup.object().shape({
				antonym: yup.string(),
			})
		)
		.required('Translations required'),
	usageExamples: yup
		.array()
		.of(
			yup.object().shape({
				sentence: yup.string(),
				translation: yup.string(),
			})
		)
		.required('Usage examples required'),
		level: yup
		.string()
		.required(),
});

///////////
// import * as yup from 'yup';

// // Made definitions and translations array of objects
// // instead of array of string to avoid react-hook-form errors.
// export const wordValidationSchema = yup.object({
// 	word: yup
// 		.string()
// 		.required('Word is required')
// 		.min(2, 'Word should be of minimum 2 characters length'),
// 	definitions: yup
// 		.array()
// 		.of(
// 			yup.object().shape({
// 				definition: yup.string(),
// 			})
// 		)
// 		.required('definitions required'),
// 	translations: yup
// 		.array()
// 		.of(
// 			yup.object().shape({
// 				translation: yup.string(),
// 			})
// 		)
// 		.required('Translations required'),

// 	studyStatus: yup
// 		.string()
// 		.required(),
	
// 	usageExamples: yup
// 		.array()
// 		.of(
// 			yup.object().shape({
// 				sentence: yup.string(),
// 				translation: yup.string(),
// 			})
// 		)
// 		.required('Usage examples required'),
// 	// transcription: yup.object().shape({
// 	// 	uk: yup.string(),
// 	// 	us: yup.string(),
// 	// })
// });