// import express from 'express';
// import userModel from '../db/User';
// import applicantModel from '../db/JobApplicant';
// import appModel from '../db/Application';
// import recruiterModel from '../db/Recruiter';
import jobs from '../db/Jobs.js';

// Add a new job
export const postJobs = async (req, res) => {
    try {
        const user = req.user;
        if (user.type != "recruiter") {
            res.status(401).json({
                message: "You dont have permission to add jobs"
            });
            return;
        }
        const data = req.body;

        const job = new jobs({
            userId: user._id,
            jobTitle: data.jobTitle,
            companyLogo: data.companyLogo,
            jobLocation: data.jobLocation,
            description: data.description,
            dateOfPosting: data.dateOfPosting || new Date(), // Default to current date if not provided
            deadline: data.deadline,
            skillsets: data.skillsets || [], // Default to an empty array if not provided
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


