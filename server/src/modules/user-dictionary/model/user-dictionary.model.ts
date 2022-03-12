import * as mongoose from 'mongoose';


// 1. Create an interface representing a document in MongoDB.
export interface UserDictionary {
  user: mongoose.Schema.Types.ObjectId;
  word: mongoose.Schema.Types.ObjectId;
  status: string;
}


// 2. Create a Schema corresponding to the document interface.
const schema = new mongoose.Schema<UserDictionary>({
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  word: {
    ref: 'Dictionary',
    type: mongoose.Schema.Types.ObjectId,
  },
  status: { type: String, default: "In process" },

}, { timestamps: true });



// 3. Create a Model.
export const UserDictionaryModel = mongoose.model<UserDictionary & mongoose.Document>('UserDictionary', schema);
