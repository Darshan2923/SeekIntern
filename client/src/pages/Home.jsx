import React from 'react'
import MainBar from '../components/MainBar'
import { useEffect, useState } from 'react';

const Home = () => {
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch("../components/jobs.json")
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => setJobs(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    console.log(jobs)


    const handleInputChange = (value) => {
        setQuery(value);
    };

    const filteredData = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) != -1);
    console.log(filteredData);

    console.log(query);
    return (
        <>
            <div className="main_container">
                <MainBar handleInputChange={handleInputChange} />
            </div>
        </>
    )
}

export default Home