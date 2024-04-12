import React, { useState, useEffect } from 'react';
import Location from './Location';
import Salary from './Salary';
import DatePosting from './DatePosting';
import WorkExp from './WorkExp';
import { FaFilter } from 'react-icons/fa';

const Sidebar = ({ handleRadio, handleButton }) => {
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        // Set collapsed to true when component mounts
        setCollapsed(true);
    }, []); // Empty dependency array ensures this effect runs only once, on mount

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className='space-y-5'>
            <h3 className='text-lg font-bold mb-2 md:block hidden'>Filters</h3>
            <div className="md:hidden flex items-center justify-between">
                <h3 className='text-lg font-bold mb-2'>Filters</h3>
                <FaFilter className="cursor-pointer" onClick={toggleCollapsed} />
            </div>
            <div className={`md:block ${collapsed ? 'hidden' : 'block'}`}>
                <Location handleRadio={handleRadio} />
                <Salary handleRadio={handleRadio} handleButton={handleButton} />
                <DatePosting handleRadio={handleRadio} />
                <WorkExp handleRadio={handleRadio} />
            </div>
        </div>
    );
};

export default Sidebar;
