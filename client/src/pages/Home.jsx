import React from 'react'
import MainBar from '../components/MainBar'
import { useEffect, useState } from 'react';
import Jobs from '../components/Jobs';
import Card from '../components/Card'
import Sidebar from '../components/Sidebar';

const Home = () => {
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [currentPage, setcurrentPage] = useState(1);
    const itemsPerPage = 6;

    const handleInputChange = (value) => {
        setQuery(value);
    };
    const handleLocChange = (value) => {
        setLocation(value);
    }
    useEffect(() => {
        setisLoading(true);
        fetch('/jobs.json')
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setisLoading(false);
                console.log("Json Data:", data);
            });
    }, []);

    console.log(jobs)

    // const filteredJobs = jobs.filter(job =>
    //     job.jobTitle.toLowerCase().includes(query.toLowerCase()) || job.jobLocation.toLowerCase().includes(query.toLowerCase())
    // );

    const handleRadio = e => {
        setCategory(e.target.value);
    };

    const handleButton = e => {
        setCategory(e.target.value);
    };

    // calculate index range
    const calculatePageRange = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return { startIndex, endIndex };
    }

    // func for next page
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
            setcurrentPage(currentPage + 1);
        }
    }

    // func for prev page
    const prevPage = () => {
        if (currentPage > 1) {
            setcurrentPage(currentPage - 1);
        }
    }

    const filteredData = (jobs, selected, query, location) => {
        let finalJobs = jobs;

        // if (query) {
        //     finalJobs = jobs.filter(job =>
        //         job.jobTitle.toLowerCase().includes(query.toLowerCase())
        //     );
        // }
        // if (location) {
        //     finalJobs = jobs.filter(job =>
        //         job.jobLocation.toLowerCase().includes(location.toLowerCase())
        //     );
        // }


        // Apply all filters in a single pass
        finalJobs = finalJobs.filter(job => {
            // Filter by query
            if (query) {
                return job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
                    job.description.toLowerCase().includes(query.toLowerCase());
            }
            return true; // Include all jobs if no query provided
        }).filter(job => {
            // Filter by location
            if (location) {
                return job.jobLocation.toLowerCase().includes(location.toLowerCase());
            }
            return true; // Include all jobs if no location provided
        });

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

    const results = filteredData(jobs, category, query, location);

    // Log query instead of location
    console.log("Query:", query);
    console.log("Location:", location);
    // console.log("filteredJobs:", filteredJobs);
    return (
        <>
            <div className="main_container">
                <MainBar handleInputChange={handleInputChange} handleLocChange={handleLocChange} />
            </div>

            {/* // main content */}
            <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
                <div className='bg-white p-4 rounded'><Sidebar handleRadio={handleRadio} handleButton={handleButton} /></div>
                <div className='col-span-2 bg-white p-4 rounded'>{isLoading ? (<p className='font-semibold'>Loading...</p>) : results.length > 0 ? (<Jobs result={results} />) : <><h3 className='text-lg font-bold mb-2'>{results.length} Jobs</h3><p>No data found</p></>}</div>
                <div className='bg-white p-4 rounded'>Right</div>
            </div>
        </>
    )
}

export default Home