import { IWordFormValues } from "libs/types/forms"
import { IUserWordPayload, WordLevel, WordStudyStatus } from "libs/types/types"

// Made data transformation for react-hook-form correct work with fields array.

export const formDataToWordData = (data: IWordFormValues, studyStatus: WordStudyStatus, wordLevel: WordLevel): IUserWordPayload => {
    return ({
        word: data.word,
        transcription: data.transcription,
        translations: data.translations.length ? data.translations.map(translationField => translationField.translation) : [],
        synonyms: data.synonyms.length ? data.synonyms.map(synonymField => synonymField.synonym) : [],
        antonyms: data.antonyms.length ? data.antonyms.map(antonymField => antonymField.antonym) : [],
        definitions: data.definitions.length ? data.definitions.map(definitionField => definitionField.definition) : [],
        usageExamples: data.usageExamples.length ? data.usageExamples.map(usageExamplesField => ({
            sentence: usageExamplesField.sentence,
            translation: usageExamplesField.translation,
        })) : [],
        studyStatus,
        level: wordLevel,
    });
}


export const wordDataToFormData = (data: IUserWordPayload): IWordFormValues => {
    return ({
        word: data.word,
        transcription: data.transcription || { uk: null, us: null },
        translations: data.translations ? data.translations.map(translation => ({ translation })) : [],
        antonyms: data.antonyms ? data.antonyms.map(antonym => ({ antonym })) : [],
        synonyms: data.synonyms ? data.synonyms.map(synonym => ({ synonym })) : [],
        definitions: data.definitions ? data.definitions.map(definition => ({ definition })) : [],
        usageExamples: data.usageExamples ? data.usageExamples.map(usageExamplesField => ({
            sentence: usageExamplesField.sentence,
            translation: usageExamplesField.translation,
        })) : [],
        studyStatus: data.studyStatus,
        level: data.level,
    });
}
