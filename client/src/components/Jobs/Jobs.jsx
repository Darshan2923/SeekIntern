import React from 'react';

const Jobs = ({ result }) => {
    return (
        <>
            <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
            <section className='card-container'>{result}</section>
        </>
    );
};

export default Jobs;
