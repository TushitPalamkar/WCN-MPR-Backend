import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/user.js';
import { bookRouter } from './routes/book.js';
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/auth', userRouter);
app.use('/books', bookRouter);

// Basic route
app.get('/', (req, res) => {
    res.send("Hello World!!");
});

mongoose.connect("mongodb://localhost:27017/bookstore", {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

app.listen(5000, () => {
    console.log("Server listening on port 5000");
});