import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    }
})

export const bookModel = mongoose.model("books", bookSchema)