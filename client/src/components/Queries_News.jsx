import React from 'react'
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa";

const Queries_News = () => {
    return (
        <div>
            <div>
                <h3 className='text-lg font-bold mb-2 mt-6 flex items-center gap-2'>
                    <FaEnvelopeOpenText />
                    Email the TPO for any queries
                </h3>
                <p className="mb-4">
                    Reach out for almost any questions or queries regarding the placements,events and seminars...
                </p>

                <div className="w-full space-y-4">
                    <input type="email" name='email' id='email' placeholder='name@gmail.com' className='w-full block py-2 pl-3 border focus:outline-none' />
                    <input type="submit" value={'Post'} className='w-full block py-2 pl-3 border focus:outline-none bg-primarygreen rounded-sm  text-white cursor-pointer font-semibold' />
                </div>

            </div>
            <div>
                <h3 className='text-lg font-bold mb-2 mt-6 flex items-center gap-2'>
                    <FaRocket />
                    Contribute to help your peers reach their goals
                </h3>
                <p className="mb-4">
                    Help your peers to get the dream company they want...
                </p>

                <div className="w-full space-y-4">
                    <input type="submit" value={'Upload your resume'} className='w-full block py-2 pl-3 border focus:outline-none bg-primarygreen rounded-sm  text-white cursor-pointer font-semibold' />
                </div>

            </div>
        </div>
    )
}

export default Queries_News