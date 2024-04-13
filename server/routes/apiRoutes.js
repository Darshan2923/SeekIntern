import express from 'express';
import { applyJobs, getApply, postJobs } from '../controllers/api.js';

const router = express.Router();

router.post("/jobs", postJobs);
router.post("/jobs/:id/applications", applyJobs);
router.get("/jobs/:id/applications", getApply);

// router.get("/jobs", getJobs)

export default router;