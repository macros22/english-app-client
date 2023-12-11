import { WordStudyStatus } from 'libs/types/types';
import * as yup from 'yup';

const REQUIRED = 'required';

// Made usageExamples, antonyms, synonyms and translations
// array of objects instead of array of string
// to avoid react-hook-form errors.
export const wordValidationSchema = yup.object({
  word: yup
    .string()
    .required(REQUIRED)
    .min(2, 'Word should be of minimum 2 characters length'),
  studyStatus: yup
    .mixed<WordStudyStatus>()
    .oneOf(Object.values(WordStudyStatus))
    .required(),
  // transcription: yup
  // 	.string(),
  // .required('Transcription is required'),
  // .min(2, 'Transcription should be of minimum 2 characters length'),
  meanings: yup.array().of(
    yup.object().shape({
      definition: yup.string(),
      // .required('definition required'),
      translations: yup
        .array()
        .of(
          yup.object().shape({
            translation: yup.string(),
          }),
        )
        .required(REQUIRED),

      synonyms: yup
        .array()
        .of(
          yup.object().shape({
            synonym: yup.string(),
          }),
        )
        .required(REQUIRED),
      antonyms: yup
        .array()
        .of(
          yup.object().shape({
            antonym: yup.string(),
          }),
        )
        .required(REQUIRED),
      usageExamples: yup
        .array()
        .of(
          yup.object().shape({
            usageExample: yup.string(),
          }),
        )
        .required('Usage examples required'),
      level: yup.string().required(),
    }),
  ),
});
