import React, {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useMemo,
} from 'react';
import { WordsMode } from 'libs/types/types';

interface IWordsModeContext {
  wordsMode: WordsMode;
  setWordsMode: Dispatch<SetStateAction<WordsMode>>;
}
export const WordsModeContext = createContext<IWordsModeContext>(
  {} as IWordsModeContext,
);

export const WordsModeProvider: FC = ({ children }) => {
  const [wordsMode, setWordsMode] = React.useState<WordsMode>('commonWords');

  const value = useMemo(
    () => ({
      wordsMode,
      setWordsMode,
    }),
    [wordsMode],
  );

  return (
    <WordsModeContext.Provider value={value}>
      {' '}
      {children}{' '}
    </WordsModeContext.Provider>
  );
};
