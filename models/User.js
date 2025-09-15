import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    login: { type: String, required: true, unique: true},
    password: { type: String, required: true},
});

export default mongoose.model("User", userShema);