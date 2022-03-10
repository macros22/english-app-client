import * as mongoose from 'mongoose';

// 1. Create an interface representing a document in MongoDB.

export interface UsageExample {
  eng: string;
  rus: string;
}
interface Dictionary {
  eng: string;
  transcription: string;
  rus: string[];
  usageExamples: UsageExample[];
}

// 2. Create a Schema corresponding to the document interface.


const usageExampleSchema = new mongoose.Schema<UsageExample>({
  eng: String,
  rus: String,
});

const schema = new mongoose.Schema<Dictionary>({
  eng: { type: String, required: true },
  transcription: {type: String, default: "transcription"},
  rus: { type: [String], required: true },
  usageExamples: {type: [usageExampleSchema], default: [{eng:"", rus:""}]},

}, { timestamps: true });



// 3. Create a Model.
export const DictionaryModel = mongoose.model<Dictionary & mongoose.Document>('Dictionary', schema);
