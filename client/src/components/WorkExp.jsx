import React from 'react'
import InputField from './InputField'

const WorkExp = ({ handleRadio }) => {
    const workData = [
        { value: "Any Experience", title: "Any Experience", name: "test" },
        { value: "Internship", title: "Internship", name: "test" },
        { value: "Work remotely", title: "Work remotely", name: "test" },
    ]
    const expData = [
        { value: "Part-time", title: "Part Time", name: "test4" },
        { value: "Full-time", title: "Full Time", name: "test4" },
        { value: "Temporary", title: "Temporary", name: "test4" },
    ]
    return (
        <>
            <div className='mb-4'>
                <h4 className='text-lg font-medium mb-2'>Work Experience</h4>
                <div>
                    <label className='sidebar-label-container'>
                        <input type="radio" name='test' id='test' value="" onChange={handleRadio} />
                        <span className='checkmark'></span>All
                    </label>
                    {workData.map((work) => (
                        <InputField handleRadio={handleRadio} value={work.value} title={work.title} name={work.name} />
                    ))}
                </div>
            </div>
            <div>
                <h4 className='text-lg font-medium mb-2'>Employment Type</h4>
                <div>
                    <label className='sidebar-label-container'>
                        <input type="radio" name='test4' id='test' value="" onChange={handleRadio} />
                        <span className='checkmark'></span>All
                    </label>
                    {expData.map((exp) => (
                        <InputField handleRadio={handleRadio} value={exp.value} title={exp.title} name={exp.name} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default WorkExp