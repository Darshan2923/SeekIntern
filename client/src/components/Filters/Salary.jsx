import React from 'react'
import Button from '../Button'
import InputField from './InputField'

const Salary = ({ handleRadio, handleButton }) => {
    const salaryData = [
        { value: 30, title: "< 30k", name: "test2" },
        { value: 50, title: "< 50k", name: "test2" },
        { value: 80, title: "< 80k", name: "test2" },
        { value: 100, title: "< 100k", name: "test2" },
    ]
    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Salary</h4>
            <div className='mb-4'>
                <Button onClickhandler={handleButton} value="" title='Hourly' />
                <Button onClickhandler={handleButton} value="Monthly" title='Monthly' />
                <Button onClickhandler={handleButton} value="Yearly" title='Yearly    ' />
            </div>
            <div>
                <label className='sidebar-label-container'>
                    <input type="radio" name='test2' id='test' value="" onChange={handleRadio} />
                    <span className='checkmark'></span>All
                </label>
                {salaryData.map((salData) => (
                    <InputField handleRadio={handleRadio} value={salData.value} title={salData.title} name={salData.name} />
                ))}
            </div>
        </div>
    )
}

export default Salary
