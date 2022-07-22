import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Word } from "types/types";

export interface WordsTableProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	words: Word[];
}