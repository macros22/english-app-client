import { IUserWordPayload } from "./types";

// Made definitions and translations array of objects
// instead of array of string to avoid react-hook-form errors.
export interface IWordFormValues extends Omit<IUserWordPayload, 'definitions' | 'translations'> {
    definitions: { definition: string }[];
    translations: { translation: string }[];
}

