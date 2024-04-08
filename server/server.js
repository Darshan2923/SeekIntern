import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js'
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

mongoose
    .connect("mongodb+srv://darshankumar:pass123@cruddemo.h9zf4hp.mongodb.net/?retryWrites=true&w=majority&appName=crudDemo")
    .then((res) => console.log("Connected to DB"))
    .catch((err) => console.log(err));
app.listen(5000, () => console.log("server running at port 5000"));