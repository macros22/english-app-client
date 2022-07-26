import { WordStudyStatus } from "types/types";
import { IFormValues } from "./interfaces";

export const defaultFormValues: IFormValues = {
    word: '',
    transcription: '',
    translation: '',
    studyStatus: WordStudyStatus.UNKNOWN,
    usageExamples: [
        {
            sentence: 'asd',
            translation: 'asd'
        }
    ]
};

export const studyStatusOptions = [
	{ key: WordStudyStatus.KNOW, value: WordStudyStatus.KNOW, text: WordStudyStatus.KNOW, label: { color: 'green', empty: true, circular: true } },
	{ key: WordStudyStatus.LEARN, value: WordStudyStatus.LEARN, text: WordStudyStatus.LEARN, label: { color: 'yellow', empty: true, circular: true } },
	{ key: WordStudyStatus.UNKNOWN, value: WordStudyStatus.UNKNOWN, text: WordStudyStatus.UNKNOWN, label: { color: 'red', empty: true, circular: true } },
];