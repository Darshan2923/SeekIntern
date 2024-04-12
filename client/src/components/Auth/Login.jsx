import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import apiList from "../../lib/apiList";
import isAuth from "../../lib/isAuth";
import { useNavigate } from 'react-router-dom'


const LoginForm = () => {
    const [loggedin, setLoggedin] = useState(isAuth());
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleInput = (key, value) => {
        setLoginDetails({
            ...loginDetails,
            [key]: value,
        });
    };

    const handleLogin = () => {
        if (!loginDetails.email || !loginDetails.password) {
            toast.error("Email and password are required");
            return;
        }

        axios
            .post(apiList.login, loginDetails)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("type", response.data.type);
                setLoggedin(isAuth());
                toast.success("Logged in successfully");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
                console.log(response);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || "Login failed");
                console.error(err);
            });
    };

    return (
        <>
            {!isAuth() && <>
                <ToastContainer />
                <input
                    type="email"
                    value={loginDetails.email}
                    onChange={(e) => handleInput("email", e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={loginDetails.password}
                    onChange={(e) => handleInput("password", e.target.value)}
                    placeholder="Password"
                />
                <button onClick={handleLogin}>Login</button>
            </>}
            {
                isAuth() && <p>You're already logged in please log out first</p>
            }

        </>
    );
};

export default LoginForm;
