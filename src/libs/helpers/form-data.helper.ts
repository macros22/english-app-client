import { IWordFormValues } from "libs/types/forms"
import { IUserWordPayload, WordStudyStatus } from "libs/types/types"

// Made data transformation for react-hook-form correct work with fields array.

export const formDataToWordData = (data: IWordFormValues, studyStatus: WordStudyStatus): IUserWordPayload => {
    return ({
        word: data.word,
        transcription: data.transcription,
        translations: data.translations.length ? data.translations.map(translationField => translationField.translation) : undefined,
        definitions: data.definitions.length ? data.definitions.map(definitionField => definitionField.definition) : undefined,
        usageExamples: data.usageExamples.length ? data.usageExamples.map(usageExamplesField => ({
            sentence: usageExamplesField.sentence,
            translation: usageExamplesField.translation,
        })) : undefined,
        studyStatus,
    });
}


export const wordDataToFormData = (data: IUserWordPayload): IWordFormValues => {
    return ({
        word: data.word,
        transcription: data.transcription || '',
        translations: data.translations ? data.translations.map(translation => ({ translation })) : [],
        definitions: data.definitions ? data.definitions.map(definition => ({ definition })) : [],
        usageExamples: data.usageExamples ? data.usageExamples.map(usageExamplesField => ({
            sentence: usageExamplesField.sentence,
            translation: usageExamplesField.translation,
        })) : [],
        studyStatus: data.studyStatus,
    });
}
