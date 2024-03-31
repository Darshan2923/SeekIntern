import React, { useState } from 'react'
import '../App.css'
import { NavLink } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { LuScroll } from "react-icons/lu";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6"

const Navbar = () => {
    const [isActive, setisActive] = useState(false);
    const [toggleColor, setToggleColor] = useState(false);

    const handleMenutoggle = () => {
        setisActive(!isActive);
    }

    const handleColorToggle = () => {
        setToggleColor(!toggleColor);
    }

    const navlinks = [
        { path: '/', title: 'Home' },
        { path: '/myjob', title: 'Jobs' },
        { path: '/salaries', title: 'Salary Estimates' },
        { path: '/post_job', title: 'Post A Job' },
    ];

    return (
        <>
            <div className="navbar_container shadow">
                <div className="flex justify-between items-center p-8 max-w-[1350px] mx-auto">
                    <div className="logo_brand text-[26px]">Seek<span className='text-primarygreen'>Intern</span> </div>
                    <div className="link_items">
                        <ul className="mr-2 md:flex gap-12 hidden text-[16px]">
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
                    </div>
                    <div className="login md:flex gap-8 hidden text-[16px]">
                        <NavLink to='/saved'><LuScroll /></NavLink>
                        <NavLink to='/login'><FaUser /></NavLink>
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
