import React, { useState } from 'react';
import axios from 'axios';
import apiList from '../../lib/apiList';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateJobs = () => {
    const [jobDetails, setJobDetails] = useState({
        title: "",
        deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().substr(0, 16),
        skillsets: [],
        jobType: "Full Time",
        duration: 0,
        salary: 0,
        companyLogo: "",
        jobLocation: "Mumbai",
        description: "",
    });
    const handleInput = (keymvalue) => {
        setJobDetails({
            ...jobDetails,
            [key]: value,
        });
    };
    const handleUpdate = async () => {
        try {
            console.log(jobDetails);
            await axios.post(apiList.jobs, jobDetails, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            toast.success("Job created successfully");
            setJobDetails({
                title: "",
                deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().substr(0, 16),
                skillsets: [],
                jobType: "Full Time",
                duration: 0,
                salary: 0,
                companyLogo: "",
                jobLocation: "Mumbai",
                description: "",
            });
        } catch (err) {
            toast.error("An error occurred");
            console.error(err);
        }
    };
    return (
        <>
            <ToastContainer />
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={jobDetails.title}
                    onChange={(e) => handleInput("title", e.target.value)}
                />
                <input
                    type="datetime-local"
                    value={jobDetails.deadline}
                    onChange={(e) => handleInput("deadline", e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Job Type"
                    value={jobDetails.jobType}
                    onChange={(e) => handleInput("jobType", e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Duration"
                    value={jobDetails.duration}
                    onChange={(e) => handleInput("duration", parseInt(e.target.value))}
                />
                <input
                    type="number"
                    placeholder="Salary"
                    value={jobDetails.salary}
                    onChange={(e) => handleInput("salary", parseInt(e.target.value))}
                />
                <input
                    type="text"
                    placeholder="Company Logo URL"
                    value={jobDetails.companyLogo}
                    onChange={(e) => handleInput("companyLogo", e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Job Location"
                    value={jobDetails.jobLocation}
                    onChange={(e) => handleInput("jobLocation", e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={jobDetails.description}
                    onChange={(e) => handleInput("description", e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Post Job</button>
            </div>
        </>
    )
}

export default CreateJobs