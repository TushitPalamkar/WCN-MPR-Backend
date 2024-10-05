import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import { userRouter } from './routes/user';

const app = express()

app.use(express.json())
app.use(cors())
app.use('/auth', userRouter)

app.get('/', (req, res)=>{
    res.send("Hello World!!")
})


app.listen(5000, () =>{
    console.log("Port listening at 5000");
})