import express from 'express';
import { userModel } from '../models/users.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const { bookId, quantity, userID } = req.body;

        if (!userID) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        const user = await userModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the book is already in savedBooks
        const savedBookIndex = user.savedBooks.findIndex(item => item.book.toString() === bookId);

        if (savedBookIndex > -1) {
            // If the book is already saved, update the quantity
            user.savedBooks[savedBookIndex].quantity += quantity;
        } else {
            // If it's a new book, add it to savedBooks
            user.savedBooks.push({ book: bookId, quantity });
        }

        await user.save();

        res.status(200).json({ message: "Book saved successfully", savedBooks: user.savedBooks });
    } catch (error) {
        console.error('Error in /add route:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/get/:userID', async (req, res) => {
    try {
        const { userID } = req.params;

        const user = await userModel.findById(userID).populate('savedBooks.book');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ savedBooks: user.savedBooks });
    } catch (error) {
        console.error('Error in /get route:', error);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:userID/:bookID', async (req, res) => {
    try {
        const { userID, bookID } = req.params;

        const user = await userModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const savedBookIndex = user.savedBooks.findIndex(item => item.book.toString() === bookID);

        if (savedBookIndex > -1) {
            user.savedBooks.splice(savedBookIndex, 1);
            console.log('Book removed from savedBooks');
        } else {
            console.log('Book not found in savedBooks');
        }

        await user.save();

        res.status(200).json({ message: "Book removed from cart", savedBooks: user.savedBooks });
    } catch (error) {
        console.error('Error in /delete route:', error);
        res.status(500).json({ message: error.message });
    }
});

export { router as cartRouter };