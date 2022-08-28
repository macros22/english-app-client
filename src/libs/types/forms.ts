import { IUserWordPayload } from "./types";

// Made definitions and translations array of objects
// instead of array of string to avoid react-hook-form errors.
export interface IWordFormValues extends Required<Omit<IUserWordPayload, 'definitions' | 'translations' | 'synonyms' | 'antonyms'>> {
    definitions: { definition: string }[];
    translations: { translation: string }[];
    synonyms: { synonym: string }[];
    antonyms: { antonym: string }[];
}

