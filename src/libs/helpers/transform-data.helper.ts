import { IWordFormValues } from "libs/types/forms"
import { IUserWordPayload, IWord, WordLevel, WordStudyStatus } from "libs/types/types"

// Made data transformation for react-hook-form correct work with fields array.
export const formDataToWordData = (data: IWordFormValues): IUserWordPayload => {
    return ({
        word: data.word,
        normalizedWord: data.word.toLowerCase(),
        transcription: data.transcription,
        studyStatus: data.studyStatus,
        meanings: data.meanings.map(meaning => {
            return {
                level: meaning.level,
                pos: meaning.pos,
                definition: meaning.definition,
                translations: meaning.translations.length ? meaning.translations.map(translationField => translationField.translation) : [],
                synonyms: meaning.synonyms.length ? meaning.synonyms.map(synonymField => synonymField.synonym) : [],
                antonyms: meaning.antonyms.length ? meaning.antonyms.map(antonymField => antonymField.antonym) : [],
                usageExamples: meaning.usageExamples.length ? meaning.usageExamples.map(usageExamplesField => usageExamplesField.usageExample) : [],
            }
        })

    });
}


export const wordDataToFormData = (data: IWord): IWordFormValues => {
    return ({
        word: data.word,
        transcription: data.transcription || { uk: null, us: null },
        studyStatus: data.studyStatus,
        meanings: data.meanings.map(meaning => {
            return {
                level: meaning.level,
                pos: meaning.pos,
                definition: meaning.definition,
                translations: meaning.translations ? meaning.translations.map(translation => ({ translation })) : [],
                synonyms: meaning.synonyms ? meaning.synonyms.map(synonym => ({ synonym })) : [],
                antonyms: meaning.antonyms ? meaning.antonyms.map(antonym => ({ antonym })) : [],
                usageExamples: meaning.usageExamples ? meaning.usageExamples.map(usageExample => ({ usageExample })) : [],
            }
        })
    });
}


export const wordDataToWordDataPayload = (data: IWord): IUserWordPayload => {
    return ({
        word: data.word,
        normalizedWord: data.word.toLowerCase(),
        transcription: (data.transcription.uk || data.transcription.us)
            ? {
                uk: data.transcription.uk || null,
                us: data.transcription.us || null,
            }
            : undefined,
        studyStatus: data.studyStatus || WordStudyStatus.Learn,

        // meanings: undefined,
        meanings: data.meanings
            ? data.meanings.map(meaning => ({
                level: meaning.level || WordLevel.Uncategorized,
                pos: meaning.pos || undefined,
                definition: meaning.definition || undefined,
                translations: meaning.translations || undefined,
                synonyms: meaning.synonyms || undefined,
                antonyms: meaning.antonyms || undefined,
                usageExamples: meaning.usageExamples || undefined,
            })) : undefined,
    });
}
