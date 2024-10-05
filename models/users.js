import mongoose from "mongoose"

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
    savedBooks:[{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "books"
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
})

export const userModel = mongoose.model("users", userSchema)