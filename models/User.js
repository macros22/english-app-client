import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password : {type: String, required: true},
    words: {type: Types.ObjectId, ref: "Word"},
});

export default model("User", schema)
