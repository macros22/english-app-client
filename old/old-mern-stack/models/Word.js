import mongoose from "mongoose";
const {Schema, model, Types} = mongoose;

const schema = new Schema({
  eng: { type: String, required: true },
  rus: { type: String, required: true },
  date: { type: Date, default: Date.now },
  owner: { type: Types.ObjectId, ref: "User" },
});

export default model("Word", schema);
