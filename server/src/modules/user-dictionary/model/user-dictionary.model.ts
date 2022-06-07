import * as mongoose from 'mongoose';
import { WordInCommonDictionary, wordInCommonDictionarySchema } from '../../common-dictionary/model/common-dictionary.model';
// import { wordInDictionarySchema } from 'src/modules/dictionary/model/dictionary.model';


// 1. Create an interface representing a document in MongoDB.
export interface UserDictionary {
  user: mongoose.Schema.Types.ObjectId;
  wordInCommonDictionary: mongoose.Schema.Types.ObjectId | null;
  userWord: WordInCommonDictionary,
  status: string;
}


// 2. Create a Schema corresponding to the document interface.
const schema = new mongoose.Schema<UserDictionary>({
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  wordInCommonDictionary: {
    ref: 'WordInCommonDictionary',
    type: mongoose.Schema.Types.ObjectId,
  },
  userWord: { type: wordInCommonDictionarySchema },
  status: { type: String, default: "In process" },

}, { timestamps: true });



// 3. Create a Model.
export const UserDictionaryModel = mongoose.model<UserDictionary & mongoose.Document>('UserDictionary', schema);
