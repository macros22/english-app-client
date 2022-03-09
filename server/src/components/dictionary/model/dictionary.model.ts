import { Schema, model} from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Dictionary {
  eng: string;
  rus: string[];
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<Dictionary>({
  eng: { type: String, required: true },
  rus: { type: [String], required: true }
});

// 3. Create a Model.
export const DictionaryModel = model<Dictionary>('Dictionary', schema);
