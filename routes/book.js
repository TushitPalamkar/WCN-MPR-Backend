import express from 'express';
import { bookModel } from '../models/books.js';

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const books = req.body;
        if (!Array.isArray(books)) {
            return res.status(400).json({ message: "Input should be an array of books" });
        }

        const bulkOps = books.map(book => ({
            updateOne: {
                filter: { title: book.title },
                update: { $set: book },
                upsert: true
            }
        }));

        const result = await bookModel.bulkWrite(bulkOps);
        
        res.status(200).json({
            message: "Books updated/inserted successfully",
            modifiedCount: result.modifiedCount,
            upsertedCount: result.upsertedCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const { genre } = req.query;
        let query = {};

        if (genre) {
            query.genre = new RegExp(genre, 'i'); // 'i' flag for case-insensitive
        }

        const books = await bookModel.find(query);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export { router as bookRouter };
