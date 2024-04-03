import React from 'react'
import { FiMapPin } from 'react-icons/fi';

const Card = ({ job }) => {
    const { companyName, jobTitle, companyLogo, minPrice, maxPrice, salaryType, jobLocation, postingDate, experienceLevel, employmentType, description } = job;
    return (
        <section className='card'>
            <Link to={"/"} className='flex gap-4 flex-col sm:flex-row items-start'>
                <img src={companyLogo} alt="" />
                <div className='card-details'>
                    <h4 className='text-black mb-1'>{companyName}</h4>
                    <h3 className='text-lg font-semibold mb-2'>{jobTitle}</h3>

                    <div className='text-primary/70 text-base flex flex-wrap gap-2 mb-2'>
                        <span className='flex items-center gap-2'><FiMapPin /> {jobLocation}</span>
                        <span className='flex items-center gap-2'><FiClock /> {employmentType}</span>
                        <span className='flex items-center gap-2'><FiDollarSign /> {minPrice} - {maxPrice}</span>
                        <span className='flex items-center gap-2'><FiCalendar /> {postingDate}</span>
                    </div>
                    <p className='text-primary/70 text-base'>{description}</p>
                </div>
            </Link>
        </section>
    )
}

export default Card