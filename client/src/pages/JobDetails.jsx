import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import axios from 'axios'; // Import axios for making API requests
import apiList from '../lib/apiList';

const JobDetails = () => {
    const { id } = useParams(); // Get the job ID from URL parameters
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                // Fetch job details using the job ID
                const response = await axios.get(`${apiList.jobs}/${id}`);
                const jobData = response.data;
                // Do something with the job data
                console.log(jobData);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };
        fetchJobDetails(); // Call the fetchJobDetails function
    }, [id]); // Add id to the dependency array to re-run effect when id changes

    return (
        <div>
            {/* Render job details here */}
        </div>
    );
};

export default JobDetails;
