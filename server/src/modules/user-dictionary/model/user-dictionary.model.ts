import * as mongoose from 'mongoose';
import { WordInDictionary, wordInDictionarySchema } from '../../../../src/modules/dictionary/model/dictionary.model';
// import { wordInDictionarySchema } from 'src/modules/dictionary/model/dictionary.model';


// 1. Create an interface representing a document in MongoDB.
export interface UserDictionary {
  user: mongoose.Schema.Types.ObjectId;
  wordFromCommonDictionary: mongoose.Schema.Types.ObjectId;
  userWord: WordInDictionary,
  status: string;
}


// 2. Create a Schema corresponding to the document interface.
const schema = new mongoose.Schema<UserDictionary>({
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  wordFromCommonDictionary: {
    ref: 'WordInDictionary',
    type: mongoose.Schema.Types.ObjectId,
  },
  userWord: { type: wordInDictionarySchema },
  status: { type: String, default: "In process" },

}, { timestamps: true });



// 3. Create a Model.
export const UserDictionaryModel = mongoose.model<UserDictionary & mongoose.Document>('UserDictionary', schema);
