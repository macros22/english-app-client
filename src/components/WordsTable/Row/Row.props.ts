import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Word } from "types/types";

export interface RowProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    rowData: Word;
    toggleIsEditingNow: () => void;
    rowId: number;
}