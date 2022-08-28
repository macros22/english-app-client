import React from 'react';
import {
    DropdownProps,
} from 'semantic-ui-react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { WordLevel, WordsMode, WordStudyStatus } from 'libs/types/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { wordValidationSchema } from './form.schema';
import { IWordFormValues } from 'libs/types/forms';
import { formDataToWordData } from 'libs/helpers/form-data.helper';
import { WORDS_MODE } from 'libs/constants/names.storage';
import { useSessionStorage } from 'libs/hooks/useSessionStorage';
import { useWords } from 'libs/hooks/useWords';
import { useWordsApi } from 'libs/hooks';

const studyStatusOptions = [
    { key: WordStudyStatus.KNOW, value: WordStudyStatus.KNOW, text: WordStudyStatus.KNOW, label: { color: 'green', empty: true, circular: true } },
    { key: WordStudyStatus.LEARN, value: WordStudyStatus.LEARN, text: WordStudyStatus.LEARN, label: { color: 'yellow', empty: true, circular: true } },
];

const wordLevelOptions =
    Object.values(WordLevel).map(level => {
        return { key: level, value: level, text: level, label: { color: 'green', circular: true } }
    });

const defaultFormValues: IWordFormValues = {
    word: '',
    transcription: { uk: null, us: null },
    translations: [],
    definitions: [],
    antonyms: [],
    synonyms: [],
    level: WordLevel.UNCATEGORIZED,
    studyStatus: WordStudyStatus.LEARN,
    usageExamples: [],
};

interface IUseWordForms {
    formValues?: IWordFormValues;
    wordId?: string;
    skip?: number;
    limit?: number;
}

export const useWordForm = ({ formValues, wordId, skip, limit }: IUseWordForms) => {
    const [wordsMode] = useSessionStorage<WordsMode>(WORDS_MODE, 'userWords');
    const { mutate: mutateWords } = useWords({ mode: wordsMode, skip, limit });

    const [withTranscription, setWithTranscription] = React.useState<boolean>(formValues?.transcription ? true : false);

    // Form initialization with react-hook-form.
    const {
        handleSubmit,
        setValue,
        reset,
        register,
        control,
        trigger,
        formState: { errors },
    } = useForm<IWordFormValues>({
        defaultValues: formValues ? formValues : defaultFormValues,
        resolver: yupResolver(wordValidationSchema),
    });

    // react-hook-form arrays.
    const { fields: usageExamplesFields, append: appendUsageExample, remove: removeUsageExample } = useFieldArray({
        name: "usageExamples",
        control,
    });

    const { fields: translationsFields, append: appendTranslation, remove: removeTranslation } = useFieldArray({
        name: "translations",
        control
    });

    const { fields: definitionsFields, append: appendDefinition, remove: removeDefinition } = useFieldArray({
        name: "definitions",
        control
    });

    const { fields: synonymsFields, append: appendSynonym, remove: removeSynonym } = useFieldArray({
        name: "synonyms",
        control
    });

    const { fields: antonymsFields, append: appendAntonym, remove: removeAntonym } = useFieldArray({
        name: "antonyms",
        control
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

            const payload = formDataToWordData(data, studyStatus, wordLevel);

            if (wordId) {
                const response = await api.patchWord(payload, wordId)
                setSuccessMessage(`Successfully updated ${response!.word}`)
            } else {
                const response = await api.postWord(payload);
                setSuccessMessage(`Successfully added ${response!.word}`);
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

    // Study status dropdown.
    const [studyStatus, setStudyStatus] = React.useState<WordStudyStatus>(
        formValues && formValues.studyStatus ? formValues.studyStatus : WordStudyStatus.LEARN
    );
    const handleSelectStatusChange = (
        event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
    ) => {
        setStudyStatus(data.value as WordStudyStatus);
        trigger('studyStatus');
    };

    // Word level dropdown.
    const [wordLevel, setWordLevel] = React.useState<WordLevel>(
        formValues ? formValues.level : WordLevel.UNCATEGORIZED
    );
    const handleSelectWordLevelChange = (
        event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps
    ) => {
        setWordLevel(data.value as WordLevel);
        trigger('level');
    };

    const handleReset = () => {
        setSuccessMessage('');
        setErrorMessage('');
        reset();
    }

    const handleWithTranscriptionButton = () => {
        setWithTranscription(transcription => !transcription);
        // setValue('transcription', { uk: null, us: null });
    }

    return {
        Controller,
        handleSubmit,
        handleReset,
        onSubmit,
        control,
        errors,
        handleSelectStatusChange,
        handleSelectWordLevelChange,
        studyStatus,
        wordLevel,
        synonymsFields,
        removeSynonym,
        antonymsFields,
        removeAntonym,
        definitionsFields,
        removeDefinition,
        translationsFields,
        removeTranslation,
        usageExamplesFields,
        removeUsageExample,
        register,
        loadingPostWord,
        appendUsageExample,
        appendTranslation,
        appendDefinition,
        appendSynonym,
        appendAntonym,
        studyStatusOptions,
        successMessage,
        errorMessage,
        withTranscription,
        handleWithTranscriptionButton,
        wordLevelOptions,
    }
}