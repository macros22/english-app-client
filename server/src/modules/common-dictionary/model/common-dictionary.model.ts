import * as mongoose from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface UsageExample {
  sentence: string;
  translation: string;
}
export interface WordInCommonDictionary {
  word: string;
  transcription: string;
  translation: string[];
  usageExamples: UsageExample[];
}

// 2. Create a Schema corresponding to the document interface.
const usageExampleSchema = new mongoose.Schema<UsageExample>({
  sentence: String,
  translation: String,
});

export const wordInCommonDictionarySchema = new mongoose.Schema<WordInCommonDictionary>({
  word: { type: String, required: true },
  transcription: { type: String, default: "transcription"},
  translation: { type: [String], required: true },
  usageExamples: { type: [usageExampleSchema], default: [{sentence:"", translation:""}]},

}, { timestamps: true });



// 3. Create a Model.
export const WordInCommonDictionaryModel = mongoose.model<WordInCommonDictionary & mongoose.Document>('WordInCommonDictionary', wordInCommonDictionarySchema);
