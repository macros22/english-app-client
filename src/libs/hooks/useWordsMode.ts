import { WordsModeContext } from "libs/contexts/WordsMode.context";
import { useContext } from "react";

export const useWordsMode = () => useContext(WordsModeContext);