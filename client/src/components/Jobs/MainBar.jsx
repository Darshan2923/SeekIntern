// import React, { useEffect, useState } from 'react'
// import { FiSearch } from 'react-icons/fi'
// import { useDebounce } from './DebounceInput';

// const MainBar = () => {
//     const [inputValue, setInputValue] = useState("");
//     // const debouncedSearch = useDebounce(query, 1000);

//     const handleInputChange = (event) => {
//         setInputValue(event.target.value);
//     };

//     // debouncing the query
//     useEffect(() => {
//         const timeoutId = setTimeout(() => {
//             console.log(inputValue);
//         }, 1000);

//         return () => clearTimeout(timeoutId);
//     }, [inputValue]);

//     console.log(inputValue);

//     return (
//         <div className='max-w-screen-2xl container  md:py-20 py-14'>
//             <h1 className='text-5xl font-bold mb-4'>Let’s help you land your <span className='text-primarygreen'>dream career</span></h1>
//             <p className='text-lg text-black/70 mb-8'>Know the companies visiting your campus for grabbing opportunities on time.</p>

//             <form action="">
//                 <div>
//                     <div className="flex rounded-[10px] shadow ring-inset ring-gray-300 focus-within:ring-inset md:w-1/2 w-full ">
//                         <FiSearch className="absolute  mt-2.5 ml-[10px] text-gray-400" />
//                         <input type="text" name='title' id='title' placeholder='What position are you looking for?' className='block flex-1 border-2 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6' onChange={handleInputChange} />
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default MainBar;


import { FiMapPin, FiSearch } from 'react-icons/fi';
import DebounceInput from './DebounceInput'; // Assuming you have this component in a file

const MainBar = ({ handleInputChange, handleLocChange }) => {

    return (
        <div className='max-w-screen-2xl container  md:py-20 py-14'>
            <h1 className='md:text-5xl text-4xl font-bold mb-4 mt-8 md:mt-0'>Let’s help you land your <span className='text-primarygreen'>dream career</span></h1>
            <p className='text-lg text-black/70 mb-8'>Know the companies visiting your campus for grabbing opportunities on time.</p>

            <form action="">
                <div className='flex justify-start md:flex-row flex-col md:gap-0 gap-2'>
                    <div className="flex rounded-[10px] shadow ring-inset ring-gray-300 focus-within:ring-inset md:w-1/2 w-full ">
                        <FiSearch className="absolute  mt-2.5 ml-[10px] text-gray-400" />
                        <DebounceInput onChange={handleInputChange} placeholder='What position are you looking for?' />
                    </div>
                    <div className="flex rounded-[10px] shadow ring-inset ring-gray-300 focus-within:ring-inset md:w-1/3 w-full ">
                        <FiMapPin className="absolute  mt-2.5 ml-[10px] text-gray-400" />
                        <DebounceInput onChange={handleLocChange} placeholder='Location' />
                    </div>
                    <button type='submit' className='bg-primarygreen py-2 px-8 text-white md:rounded rounded'>Search</button>
                </div>
            </form>
        </div>
    )
}

export default MainBar;
