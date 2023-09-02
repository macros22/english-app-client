import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { WORDS_MODE } from 'libs/constants/names.storage';
import { formDataToWordData } from 'libs/helpers/transform-data.helper';
import { useWordsApi } from 'libs/hooks';
import { useSessionStorage } from 'libs/hooks/useSessionStorage';
import { useWords } from 'libs/hooks/useWords';
import { IWordFormValues } from 'libs/types/forms';
import {
  PartOfSpeech,
  WordLevel,
  WordsMode,
  WordStudyStatus,
} from 'libs/types/types';

import { wordValidationSchema } from './form.schema';

const studyStatusOptions = [
  {
    key: WordStudyStatus.Know,
    value: WordStudyStatus.Know,
    text: WordStudyStatus.Know,
    label: { color: 'green', empty: true, circular: true },
  },
  {
    key: WordStudyStatus.Learn,
    value: WordStudyStatus.Learn,
    text: WordStudyStatus.Learn,
    label: { color: 'yellow', empty: true, circular: true },
  },
];

const defaultFormValues: IWordFormValues = {
  word: '',
  transcription: { uk: null, us: null },
  studyStatus: WordStudyStatus.Learn,
  meanings: [
    {
      pos: PartOfSpeech.Noun,
      level: WordLevel.Uncategorized,
      translations: [],
      definition: '',
      antonyms: [],
      synonyms: [],
      usageExamples: [],
    },
  ],
};

interface IUseWordFormsProps {
  formValues?: IWordFormValues;
  wordId?: string;
  skip?: number;
  limit?: number;
}

export const useWordForm = ({
  formValues,
  wordId,
  skip,
  limit,
}: IUseWordFormsProps) => {
  const [wordsMode] = useSessionStorage<WordsMode>(WORDS_MODE, 'userWords');
  const { mutateWords, mutateCount: muteteWordsCount } = useWords({
    mode: wordsMode,
    skip,
    limit,
  });

  const [withTranscription, setWithTranscription] = React.useState<boolean>(
    !!(formValues?.transcription.uk || formValues?.transcription.us),
  );

  // Form initialization with react-hook-form.
  const {
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<IWordFormValues>({
    defaultValues: formValues || defaultFormValues,
    resolver: yupResolver(wordValidationSchema),
  });

  // react-hook-form arrays.
  const {
    fields: meaningsFields,
    append: appendMeaning,
    remove: removeMeaning,
  } = useFieldArray({
    name: 'meanings',
    control,
  });

  const { api } = useWordsApi(wordsMode);

  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  // Handlers.
  const [loadingPostWord, setLoadingPostWord] = React.useState(false);
  const onSubmit = async (data: IWordFormValues) => {
    setSuccessMessage('');
    setErrorMessage('');
    try {
      setLoadingPostWord(true);

      const payload = formDataToWordData(data);
      // alert(JSON.stringify(payload, null, '\t'));
      if (wordId) {
        const response = await api.patchWord(payload, wordId);
        setSuccessMessage(`Successfully updated ${response!.word}`);
      } else {
        const response = await api.postWord(payload);
        setSuccessMessage(`Successfully added ${response!.word}`);
        muteteWordsCount();
        reset();
      }
      mutateWords();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
    setLoadingPostWord(false);
  };

  const handleReset = () => {
    setSuccessMessage('');
    setErrorMessage('');
    reset();
  };

  const handleWithTranscriptionButton = () => {
    setWithTranscription(transcription => !transcription);
    // setValue('transcription', { uk: null, us: null });
  };

  return {
    Controller,
    handleSubmit,
    handleReset,
    onSubmit,
    control,
    errors,
    loadingPostWord,
    studyStatusOptions,
    successMessage,
    errorMessage,
    withTranscription,
    handleWithTranscriptionButton,
    appendMeaning,
    removeMeaning,
    meaningsFields,
    setValue,
  };
};
