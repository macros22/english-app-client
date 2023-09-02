import { useContext } from 'react';
import { WordsModeContext } from 'libs/contexts/WordsMode.context';

export const useWordsMode = () => useContext(WordsModeContext);
