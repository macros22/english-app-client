import { IWord } from "./types";

export interface IWordFormValues extends Omit<IWord, 'id'> {
}

