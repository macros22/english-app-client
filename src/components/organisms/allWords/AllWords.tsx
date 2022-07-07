import * as React from "react";
import Paper from "@mui/material/Paper";
import { UsageExample, Word, WordStudyStatus } from "types/types";
import { WordsTable } from "components";

const wordsDefault: Word[] = [
  {
    id: 1,
    word: "example",
    transcription: "example",
    translation: ["example"],
    usageExamples: [
      { sentence: "example", translation: "example" } as UsageExample,
    ],
    studyStatus: WordStudyStatus.LEARN,
  },
];

const AllWords = () => {
  const [words, setWords] = React.useState<Word[]>(wordsDefault);

  React.useEffect(() => {
    fetch("http://localhost:3146/api/dictionary/words")
      .then((response) => response.json())
      .then((data) => setWords(data));
  }, []);

  return (
    <>
      <WordsTable words={words || wordsDefault} />
    </>
  );
};

export default AllWords;
