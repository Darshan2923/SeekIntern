import express from 'express';
import { applyJobs, deleteJobs, getApply, getOnejobInfo, myApps, postJobs, profileInfo } from '../controllers/api.js';
import { jwtAuth } from '../lib/jwtAuth.js';

const router = express.Router();

router.post("/jobs",jwtAuth, postJobs);
router.post("/jobs/:id/applications",jwtAuth, applyJobs);
router.get("/jobs/:id/applications",jwtAuth, getApply);
router.get("/jobs/:id",jwtAuth, getOnejobInfo);
router.get("/user",jwtAuth, profileInfo);
router.get("/applications",jwtAuth,myApps);
router.delete("/jobs/:id",jwtAuth,deleteJobs);

// router.get("/jobs", getJobs)

export default router;