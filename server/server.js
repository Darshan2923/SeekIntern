import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import authRoutes from './routes/authRoutes.js'


const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

mongoose
    .connect("mongodb+srv://darshankumar:pass123@cruddemo.h9zf4hp.mongodb.net/?retryWrites=true&w=majority&appName=crudDemo")
    .then((res) => console.log("Connected to DB"))
    .catch((err) => console.log(err));
app.listen(5000, () => console.log("server running at port 5000"));

