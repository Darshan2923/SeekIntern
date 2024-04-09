import React from 'react'
import Location from './Location'

const Sidebar = ({ handleRadio, handleButton }) => {
    return (
        <div className='space-y-5'>
            <h3 className='text-lg font-bold mb-2'>Filters</h3>
            <Location handleRadio={handleRadio} />

        </div>
    )
}

export default Sidebar