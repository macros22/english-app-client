import * as mongoose from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Dictionary {
  eng: string;
  transcription: string;
  rus: string[];
}

// 2. Create a Schema corresponding to the document interface.
const schema = new mongoose.Schema<Dictionary>({
  eng: { type: String, required: true },
  transcription: {type: String, default: "transcription"},
  rus: { type: [String], required: true },

}, { timestamps: true });



// 3. Create a Model.
export const DictionaryModel = mongoose.model<Dictionary & mongoose.Document>('Dictionary', schema);
