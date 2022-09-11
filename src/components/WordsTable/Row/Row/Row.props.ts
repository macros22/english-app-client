import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IWord } from "libs/types/types";
import { KeyedMutator } from "swr";

export interface RowProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    rowData: IWord;
    rowId: number;
    mutateCommonWords: KeyedMutator<IWord[]>
}