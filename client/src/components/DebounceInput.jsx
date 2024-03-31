// import { useEffect, useState } from "react"

// export const useDebounce = (value, delay) => {
//     const [debouncedValue, setDebouncedValue] = useState(value);

//     useEffect(() => {
//         const timeout = setTimeout(() => {
//             setDebouncedValue(value);
//         }, delay);
//         return () => clearTimeout(timeout)
//     }, [value, delay]);
// }

import React, { useState, useEffect } from 'react';

const DebounceInput = ({ onChange, placeholder }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onChange(inputValue);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [inputValue, onChange]);

    return <input type="text" value={inputValue} onChange={handleInputChange} placeholder={placeholder} className='block flex-1 border-2 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6' />;
};

export default DebounceInput;
