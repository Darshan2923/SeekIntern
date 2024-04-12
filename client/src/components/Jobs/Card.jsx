import React from 'react'
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';
import { NavLink } from 'react-router-dom'

const Card = ({ data }) => {
    const { companyName, jobTitle, companyLogo, minPrice, maxPrice, salaryType, jobLocation, postingDate, experienceLevel, employmentType, description } = data;
    return (
        <section className='card mb-4'>
            <NavLink to={"/"} className='flex gap-4 flex-col sm:flex-row items-start border border-gray-300 p-4'>
                <img className="w-14" src={companyLogo} alt="" />
                <div className='card-details'>
                    <h4 className='text-primary mb-1'>{companyName}</h4>
                    <h3 className='text-lg text-black font-semibold mb-2'>{jobTitle}</h3>

                    <div className='flex flex-wrap gap-4 mb-2 text-primary'>
                        <span className='flex items-center gap-2'><FiMapPin /> {jobLocation}</span>
                        <span className='flex items-center gap-2'><FiClock /> {employmentType}</span>
                        <span className='flex items-center gap-2'><FiDollarSign /> {minPrice} - {maxPrice}k</span>
                        <span className='flex items-center gap-2'><FiCalendar /> {postingDate}</span>
                    </div>
                    <p className='text-primary'>{description}</p>
                </div>
            </NavLink>
        </section>
    )
}

export default Card