import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface AlphabetSearchProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  highlightedLetters: string[];
  activeLetters: string[];
}
