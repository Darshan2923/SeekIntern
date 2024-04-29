import express from 'express';
import { applyJobs, getApply, getOnejobInfo, postJobs, profileInfo } from '../controllers/api.js';

const router = express.Router();

router.post("/jobs", postJobs);
router.post("/jobs/:id/applications", applyJobs);
router.get("/jobs/:id/applications", getApply);
router.get("/jobs/:id", getOnejobInfo);
router.get("/user", profileInfo);

// router.get("/jobs", getJobs)

export default router;