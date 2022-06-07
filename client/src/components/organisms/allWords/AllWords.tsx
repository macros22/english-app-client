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
      <Paper
        elevation={1}
        sx={{
          padding: "1.2rem",
          minWidth: 940,
          maxWidth: 965,
          margin: "auto",
          overflow: "hidden",
        }}
      >
        <WordsTable words={words || wordsDefault} />
      </Paper>
    </>
  );
};

export default AllWords;
