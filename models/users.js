import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true
    },
    savedbooks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "books"
    }],
})

export const userModel = mongoose.model("users", userSchema)
