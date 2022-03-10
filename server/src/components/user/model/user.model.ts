import * as mongoose from 'mongoose';

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
  }


const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;