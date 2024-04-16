import React, { useEffect, useState } from 'react'
import '../App.css'
import { NavLink } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { LuScroll } from "react-icons/lu";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6"
import isAuth, { userType } from '../lib/isAuth'

const Navbar = () => {
    const [isActive, setisActive] = useState(false);
    const [toggleColor, setToggleColor] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        setAuthenticated(isAuth());
        console.log("authchange", isAuth())
    }, []);

    const handleMenutoggle = () => {
        setisActive(!isActive);
    }

    const handleColorToggle = () => {
        setToggleColor(!toggleColor);
    }

    const applicant_navlinks = [
        { path: '/', title: 'Home' },
        { path: '/myjob', title: 'Applied Jobs' },
        { path: '/company_profiles', title: 'Company Profiles' },
        { path: '/feedback', title: 'Feedback' },
    ];


    const recruiter_navlinks = [
        { path: '/', title: 'Home' },
        { path: '/add_jobs', title: 'Add Jobs' },
        { path: '/my_jobs', title: 'My Jobs' },
        { path: '/employees', title: 'Employees' },
    ]

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    console.log("User type: ", userType());

    return (
        <>
            <div className="navbar_container shadow">
                <div className="flex justify-between items-center p-8 max-w-[1350px] mx-auto">
                    <div className="logo_brand text-[26px]">Seek<span className='text-primarygreen'>Intern</span> </div>
                    <div className="link_items">
                        <ul className="mr-2 md:flex gap-12 hidden text-[16px]">
                            {authenticated && (
                                <>
                                    {userType() === "recruiter" ? (
                                        recruiter_navlinks.map(({ path, title }) => (
                                            <li key={path}>
                                                <NavLink
                                                    to={path}
                                                    onClick={handleColorToggle}
                                                    className={({ toggleColor }) => toggleColor ? "active" : ""}
                                                >
                                                    {title}
                                                </NavLink>
                                            </li>
                                        ))
                                    ) : userType() === "applicant" ? (
                                        applicant_navlinks.map(({ path, title }) => (
                                            <li key={path}>
                                                <NavLink
                                                    to={path}
                                                    onClick={handleColorToggle}
                                                    className={({ toggleColor }) => toggleColor ? "active" : ""}
                                                >
                                                    {title}
                                                </NavLink>
                                            </li>
                                        ))
                                    ) : null}
                                </>
                            )}


                        </ul>

                    </div>
                    <div className="login md:flex gap-8 hidden text-[16px]">
                        <NavLink to='/saved'><LuScroll /></NavLink>
                        <div className="relative">
                            <div className="user-icon cursor-pointer" onClick={toggleDropdown}>
                                <FaUser />
                            </div>
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg cursor-pointer">
                                    <ul>
                                        <li>
                                            <NavLink to="/signup" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Register</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Login</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* mobile view */}
                    <div className="staggeredbars block md:hidden">
                        <button onClick={handleMenutoggle}>
                            {isActive ? <FaXmark className=" text-[18px]"></FaXmark> : <FaBarsStaggered className="text-[18px]" />}
                        </button>
                    </div>
                </div>
                {/* mobile navlinks */}
                {isActive && (
                    <ul className="mr-2 flex flex-col bg-mainbg justify-center p-4 items-center gap-12 md:hidden text-[16px]">
                        {navlinks.map(({ path, title }) => (
                            <li key={path}>
                                <NavLink
                                    to={path}
                                    onClick={handleColorToggle}
                                    className={({ toggleColor }) => toggleColor ? "active" : ""}
                                >
                                    {title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default Navbar;
