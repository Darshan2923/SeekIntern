import express from 'express';
import userModel from '../db/User';
import applicantModel from '../db/JobApplicant';
import appModel from '../db/Application';
import recruiterModel from '../db/Recruiter';
import jobs from '../db/Jobs';

// Add a new job
export const postRoutes = async (req, res) => {
    try {
        const user = req.user;
        if (user.type != "recruiter") {
            res.status(401).json({
                message: "You dont have permission to add jobs"
            });
            return;
        }
        const data = req.body;

        let job = new jobs({
            userId: user._id,
            title: data.title,
            maxApplicants: data.maxApplicants,
            maxPositions: data.maxPositions,
            dateOfPosting: data.dateOfPosting,
            deadline: data.deadline,
            skillsets: data.skillsets,
            jobType: data.jobType,
            duration: data.duration,
            salary: data.salary,
        });
        await job.save().then(() => {
            res.json({ message: "Job added successfully to the database" });
        })
    } catch (err) {
        res.status(400).json(err);
    }
}

// to get all the jobs [pagination] [for recruiter personal and for everyone]


