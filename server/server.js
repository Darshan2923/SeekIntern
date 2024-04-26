import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from './lib/passportConfig.js'
import bodyParser from 'body-parser';
import apiRoutes from './routes/apiRoutes.js'
import authRoutes from './routes/authRoutes.js'
// import uploadRoutes from './routes/uploadRoutes.js'
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(passport.initialize());

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
// app.use("/upload", uploadRoutes)

mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => console.log("Connected to DB"))
    .catch((err) => console.log(err));
app.listen(5000, () => console.log("server running at port 5000"));

