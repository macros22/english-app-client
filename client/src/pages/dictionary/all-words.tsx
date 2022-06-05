import type { NextPage } from 'next'
import * as React from 'react';
import WordsTable from '../../components/organisms/wordsTable/WordsTable';
import { Word, WordStudyStatus } from '../../types/types';

import { withLayout } from '../../layout/MainLayout';


const  words: Word[] = [
    {id: 1, eng: 'neglect', transcription:"tmp", rus: ['пренебрегать'], studyStatus: WordStudyStatus.LEARN, usageExamples: [{eng:"asd", rus: "asdas"}]},
    {id: 2, eng: 'shun', transcription:"tmp", rus: ['избегать'], studyStatus: WordStudyStatus.LEARN, usageExamples: [{eng:"asd", rus: "asdas"}]},
    {id: 3, eng: 'proposal', transcription:"tmp", rus: ['предложение'], studyStatus: WordStudyStatus.LEARN, usageExamples: [{eng:"asd", rus: "asdas"}]},
    {id: 4, eng: 'attainment', transcription:"tmp", rus: ['достижение'], studyStatus: WordStudyStatus.LEARN, usageExamples: [{eng:"asd", rus: "asdas"}]},
    {id: 5, eng: 'unnecessary', transcription:"tmp", rus: ['ненужный'], studyStatus: WordStudyStatus.LEARN, usageExamples: [{eng:"asd", rus: "asdas"}]},
    {id: 6, eng: 'substrate', transcription:"tmp", rus: ['подложка'], studyStatus: WordStudyStatus.LEARN, usageExamples: [{eng:"asd", rus: "asdas"}]},
    {id: 7, eng: 'sophisticated', transcription:"tmp", rus: ['сложный', 'утонченный'], studyStatus: WordStudyStatus.LEARN, usageExamples: [{eng:"asd", rus: "asdas"}]},
  ];


const AllWords: NextPage = () => {
  
    return (
        <WordsTable words={words} />
    );
}

// export default AllWords
export default withLayout(AllWords);