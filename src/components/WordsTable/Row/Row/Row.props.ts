import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IWord } from "types/types";

export interface RowProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    rowData: IWord;
    rowId: number;
}