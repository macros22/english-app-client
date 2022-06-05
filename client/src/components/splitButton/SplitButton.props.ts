
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { WordStudyStatus } from "types/types";

export interface SplitButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  setState: React.Dispatch<React.SetStateAction<WordStudyStatus>>;
  state: WordStudyStatus;
}