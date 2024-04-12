import React from 'react'

const InputField = ({ handleRadio, value, title, name }) => {
    return (
        <label className='sidebar-label-container'>
            <input type="radio" name={name} value={value} onChange={handleRadio} />
            <span className='checkmark'></span>{title}
        </label>
    )
}

export default InputField