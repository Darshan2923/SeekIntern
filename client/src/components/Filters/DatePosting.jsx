import React from 'react'
import InputField from './InputField';

const DatePosting = ({ handleRadio }) => {
    const now = new Date();
    const twentyfourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

    // convert date to string
    const twentyFourHoursAgoDate = twentyfourHoursAgo.toISOString().slice(0, 10);
    const sevenDaysAgoDate = sevenDaysAgo.toISOString().slice(0, 10);
    const thirtyDaysAgoDate = thirtyDaysAgo.toISOString().slice(0, 10);

    console.log(twentyFourHoursAgoDate)

    const DateData = [
        { value: twentyFourHoursAgoDate, title: "Last 24 Hours", name: "test3" },
        { value: sevenDaysAgoDate, title: "Last 7 Days", name: "test3" },
        { value: thirtyDaysAgoDate, title: "Last 30 Days", name: "test3" },
    ]
    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Date of Posting</h4>
            <div>
                <label className='sidebar-label-container'>
                    <input type="radio" name='test3' id='test' value="" onChange={handleRadio} />
                    <span className='checkmark'></span>All
                </label>
                {DateData.map((dateData) => (
                    <InputField handleRadio={handleRadio} value={dateData.value} title={dateData.title} name={dateData.name} />
                ))}
            </div>
        </div>
    )
}

export default DatePosting