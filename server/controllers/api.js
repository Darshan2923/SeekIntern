// import express from 'express';
// import userModel from '../db/User';
// import applicantModel from '../db/JobApplicant';
import appModel from '../db/Application.js';
// import recruiterModel from '../db/Recruiter';
import jobs from '../db/Jobs.js';
import recruiterModel from '../db/Recruiter.js';

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
            about: data.about,
            requirements: data.requirements
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

export const getOnejobInfo = async (req, res) => {
    try {
        const job = await jobs.findOne({ _id: req.params.id });
        if (!job) {
            return res.status(400).json({ message: "Job doesn't exist" });
        }
        res.json(job);
    } catch (error) {
        res.status(400).json(error);
    }
};

// get user's personal details
export const profileInfo = async (req, res) => {
    try {
        const user = req.user;
        if (user.type === "recruiter") {
            const recUser = await recruiterModel.findOne({ userId: user._id })
            if (!recUser) {
                return res.status(400).json({ message: "User doesn't exist" });
            }
            res.json(recUser);
        } else {
            const appUser = await appModel.findOne({ userId: user._id })
            if (!appUser) {
                return res.status(400).json({ message: "User doesn't exist" });
            }
            res.json(appUser);
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

// recruiter/applicant gets all his applications [pagination]
export const myApps = async (req, res) => {
    try {
        const user = req.user;
        const applications = await appModel.aggregate([
            {
                $lookup: {
                    from: "jobapplicantinfos",
                    localField: "userId",
                    foreignField: "userId",
                    as: "jobApplicant",
                },
            },
            { $unwind: "$jobApplicant" },
            {
                $lookup: {
                    from: "jobs",
                    localField: "jobId",
                    foreignField: "_id",
                    as: "job",
                },
            },
            { $unwind: "$job" },
            {
                $lookup: {
                    from: "recruiterinfos",
                    localField: "recruiterId",
                    foreignField: "userId",
                    as: "recruiter",
                },
            },
            { $unwind: "$recruiter" },
            {
                $match: {
                    [user.type === "recruiter" ? "recruiterId" : "userId"]: user._id,
                },
            },
            {
                $sort: {
                    dateOfApplication: -1,
                },
            },
        ]);

        res.json(applications);
    } catch (err) {
        res.status(400).json(err);
    }
};

// delete a job post after the deadline
export const deleteJobs = async (req, res) => {
    try {
        const user = req.user;
        if (user.type !== "recruiter") {
            return res.status(401).json({ message: "You don't have permissions to delete the job" });
        }
        const jobDel = await jobs.findOneAndDelete({
            _id: req.params.id,
            userId: user.id,
        });
        if (!jobDel) {
            return res.status(401).json({ message: "You don't have a job to delete" });
        }
        res.status(200).json("Job deleted successfully!!");
    } catch (err) {
        res.status(404).json(err);
    }
}







