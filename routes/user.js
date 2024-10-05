import express from "express";
import bcrypt, { hash } from 'bcrypt';
import jwt from "jsonwebtoken";
import { userModel } from "../models/users";

const router = express.Router()

router.post("/register", async (req, res) => {
    const { username, password } = req.body

    const user = await userModel.findOne({ username: username })
    if (user) {
        return res.json({ message: "User already exists!!" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new userModel({ username, password: hashedPassword })
    await newUser.save()

    res.json({ message: "User registered successfully!" })
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body
    const user = await userModel.findOne({ username })

    if (!user) {
        return res.json({ message: "User doesn't exist!" })
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
        return res.json({ message: "Username or password is incorrect" })
    }

    const token = jwt.sign({ id: user._id }, "secret")
    res.json({ token, userID: user._id })
})

export {router as userRouter}