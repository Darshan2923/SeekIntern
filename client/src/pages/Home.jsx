import React from 'react'
import MainBar from '../components/MainBar'
import { useEffect, useState } from 'react';
import Jobs from '../components/Jobs';

const Home = () => {
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [jobs, setJobs] = useState([]);

    const handleInputChange = (value) => {
        setQuery(value);
    };
    useEffect(() => {
        fetch('jobs.json')
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                console.log(data);
            });
    }, []);

    const filteredJobs = jobs.filter(job =>
        job.jobTitle.toLowerCase().includes(query.toLowerCase())
    );

    const handleRadio = e => {
        setCategory(e.target.value);
    };

    const handleButton = e => {
        setCategory(e.target.value);
    };

    const handleInput = e => {
        setQuery(e.target.value);
    };


    const filteredData = (jobs, selected, query) => {
        let finalJobs = jobs;

        if (query) {
            finalJobs = filteredJobs;
        }

        if (selected) {
            finalJobs = finalJobs.filter(
                ({
                    jobLocation,
                    maxPrice,
                    experienceLevel,
                    salaryType,
                    employmentType,
                    postingDate
                }) =>
                    jobLocation.toLowerCase() === selected.toLowerCase() ||
                    salaryType.toLowerCase() === selected.toLowerCase() ||
                    employmentType.toLowerCase() === selected.toLowerCase() ||
                    parseInt(maxPrice) <= parseInt(selected)
            );
        }

        return finalJobs.map((data, i) => <Card key={i} data={data} />);
    };

    const results = filteredData(jobs, category, query);

    // Log query instead of location
    console.log(query);
    return (
        <>
            <div className="main_container">
                <MainBar handleInputChange={handleInputChange} />
            </div>

            {/* // main content */}
            <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
                <div className='bg-white p-4 rounded'>Left</div>
                <div className='col-span-2 bg-white p-4 rounded'><Jobs result={results} /></div>
                <div className='bg-white p-4 rounded'>Right</div>
            </div>
        </>
    )
}

export default Home