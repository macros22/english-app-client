import {Schema, model, Types} from "mongoose";

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password : {type: String, required: true},
    words: {type: Types.ObjectId, ref: "Word"},
});

module.exports = model("User", schema);
