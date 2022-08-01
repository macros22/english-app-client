import { IWordFormValues } from "types/forms";

export interface WordFormProps {
    mode: 'add' | 'edit';
    formValues?: IWordFormValues;
    wordId?: string;
}