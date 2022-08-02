import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface WordsTableProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	mode: 'commonWords' | 'userWords';
}