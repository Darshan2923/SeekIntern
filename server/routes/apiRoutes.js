import express from 'express';
import { postJobs } from '../controllers/api.js';

const router = express.Router();

router.post("/jobs", postJobs);
// router.get("/jobs", getJobs)

export default router;