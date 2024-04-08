import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js'
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.listen(5000, () => console.log("server running at port 5000"));