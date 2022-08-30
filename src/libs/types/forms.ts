import { IMeaning, IUserWordPayload } from "./types";

// Transform usageExamples, translations, synonyms, antonyms
// array of objects instead of array of string
// to avoid react-hook-form errors.
export interface IWordFormMeaning extends Required<Omit<IMeaning, 'translations' | 'synonyms' | 'antonyms' | 'usageExamples'>> {
    translations: { translation: string }[];
    synonyms: { synonym: string }[];
    antonyms: { antonym: string }[];
    usageExamples: { usageExample: string }[];
}

export interface IWordFormValues extends Required<Omit<IUserWordPayload, 'meanings'>> {
    meanings: IWordFormMeaning[];
}
