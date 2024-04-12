import React from 'react'
import InputField from './InputField'

const Location = ({ handleRadio }) => {
    const locationData = [
        { value: "london", title: "London", name: "test" },
        { value: "seattle", title: "Seattle", name: "test" },
        { value: "madrid", title: "Madrid", name: "test" },
        { value: "boston", title: "Boston", name: "test" },
    ]
    return (
        <div>
            <h4 className='text-lg font-medium mb-2'>Location</h4>
            <div>
                <label className='sidebar-label-container'>
                    <input type="radio" name='test' id='test' value="" onChange={handleRadio} />
                    <span className='checkmark'></span>All
                </label>
                {locationData.map((locData) => (
                    <InputField handleRadio={handleRadio} value={locData.value} title={locData.title} name={locData.name} />
                ))}
            </div>
        </div>
    )
}

export default Location