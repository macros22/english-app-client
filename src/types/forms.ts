import { IUsageExample, IWord, WordStudyStatus } from "./types";

// Made definitions and translations array of objects
// instead of array of string to avoid react-hook-form errors.
// export interface IWordFormValues extends Omit<IWord, 'id' | 'definitions' | 'translations'> {
export interface IWordFormValues  {
    definitions: { definition: string }[];
    translations: { translation: string }[];

    word: string;
    transcription: string;

    usageExamples: IUsageExample[];
    studyStatus: WordStudyStatus;
}

