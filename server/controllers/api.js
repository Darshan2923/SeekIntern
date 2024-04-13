// import express from 'express';
// import userModel from '../db/User';
// import applicantModel from '../db/JobApplicant';
import appModel from '../db/Application.js';
// import recruiterModel from '../db/Recruiter';
import jobs from '../db/Jobs.js';

// Add a new job
export const postJobs = async (req, res) => {
    try {
        const user = req.user;
        // if (user.type != "recruiter") {
        //     res.status(401).json({
        //         message: "You dont have permission to add jobs"
        //     });
        //     return;
        // }
        const data = req.body;

        const job = new jobs({
            // userId: user._id,
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
        console.error(err);
        res.status(400).json(err);
    }
}

//apply for jobs posted by recruiters
export const applyJobs = async (req, res) => {
    const user = req.user;
    // if (user.type !== "applicant") {
    //     return res.status(401).json({ message: "You don't have permission to apply for a job" });
    // }

    const data = req.body;
    const jobId = req.params.id;

    try {
        console.log("user:", user);
        console.log("job:", job);

        const appliedApplication = await appModel.findOne({
            userId: user._id,
            jobId: jobId,
            status: { $nin: ["deleted", "accepted", "cancelled"] },
        });

        if (appliedApplication !== null) {
            return res.status(400).json({ message: "You've already applied" });
        }

        const job = await jobs.findOne({ _id: jobId });

        if (job === null) {
            return res.status(404).json({ message: "Job does not exist!!" });
        }

        const myActiveApplicationCount = await appModel.countDocuments({
            jobId: jobId,
            status: { $nin: ["rejected", "deleted", "cancelled", "finished"] },
        });

        if (myActiveApplicationCount >= 10) {
            return res.status(400).json({ message: "You have 10 active applications. Hence, you cannot apply" });
        }

        const acceptedJobs = await appModel.countDocuments({
            userId: user._id,
            status: "accepted",
        });

        if (acceptedJobs !== 0) {
            return res.status(400).json({ message: "You already have an accepted job application" });
        }

        const userApplication = new appModel({
            userId: user._id,
            recruiterId: job.userId,
            jobId: job._id,
            status: "applied",
            coverletter: data.coverletter,
        });

        await userApplication.save();
        return res.json({ message: "Job Application success!!" });

    } catch (error) {
        console.log(error)
        return res.status(400).json(error);
    }
};

// recruiter gets all his applications for a particular job
export const getApply = async (req, res) => {
    const user = req.user;
    if (user.type != "recruiter") {
        return res.status(401).json({ message: "You don't have permission to view job applications" })
    }
    try {
        const jobId = req.params.id;
        let findParams = {
            jobId: jobId,
            recruiterId: user._id,
        };
        let sortParams = {};

        if (req.query.status) {
            findParams = {
                ...findParams,
                status: req.query.status,
            };
        }
        appModel.find()
    } catch (error) {
        res.status(401).json(err);
    }

}




