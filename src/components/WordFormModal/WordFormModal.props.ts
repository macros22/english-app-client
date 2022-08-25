import { ReactNode } from "react";
import { IWord } from "libs/types/types";

export interface WordFormModalProps {
    word?: IWord;
    mode: 'add' | 'edit';
    modalTrigger: ReactNode;
}