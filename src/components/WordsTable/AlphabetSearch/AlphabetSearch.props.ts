import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface AlphabetSearchProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    highlightedLetters: string[];
    currentLetter: string;
}