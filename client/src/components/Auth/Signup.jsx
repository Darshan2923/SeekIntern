import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiList from "../../lib/apiList";
import isAuth from "../../lib/isAuth";

const SignupForm = () => {
    const navigate = useNavigate();
    const [signupDetails, setSignupDetails] = useState({
        type: "applicant",
        email: "",
        password: "",
        name: "",
        bio: "",
        contactNumber: "",
    });

    const handleInput = (key, value) => {
        setSignupDetails({
            ...signupDetails,
            [key]: value,
        });
    };

    const handleSignup = () => {
        if (!signupDetails.email || !signupDetails.password || !signupDetails.name) {
            alert("Email, password, and name are required");
            return;
        }

        axios
            .post(apiList.signup, signupDetails)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("type", response.data.type);
                setTimeout(() => {
                    navigate("/");
                }, 2000)
                toast.success("Signed up successfully");
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || "Signup failed");
                console.error(err);
            });
    };


    return (
        <>
            {!isAuth() &&
                <> <ToastContainer />
                    <div style={{ padding: "60px" }}>
                        <h2>Signup</h2>
                        <div>
                            <label>
                                Category:
                                <select
                                    value={signupDetails.type}
                                    onChange={(event) => handleInput("type", event.target.value)}
                                >
                                    <option value="applicant">Applicant</option>
                                    <option value="recruiter">Recruiter</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={signupDetails.name}
                                    onChange={(event) => handleInput("name", event.target.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    value={signupDetails.email}
                                    onChange={(event) => handleInput("email", event.target.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Password:
                                <input
                                    type="password"
                                    value={signupDetails.password}
                                    onChange={(event) => handleInput("password", event.target.value)}
                                />
                            </label>
                        </div>
                        {signupDetails.type === "recruiter" && (
                            <div>
                                <label>
                                    Bio (up to 250 words):
                                    <textarea
                                        value={signupDetails.bio}
                                        onChange={(event) => handleInput("bio", event.target.value)}
                                    />
                                </label>
                            </div>
                        )}
                        <div>
                            <label>
                                Contact Number:
                                <input
                                    type="text"
                                    value={signupDetails.contactNumber}
                                    onChange={(event) => handleInput("contactNumber", event.target.value)}
                                />
                            </label>
                        </div>
                        <button onClick={handleSignup}>Signup</button>
                    </div>
                </>}
            {isAuth() && <p>You're logged in.Please Logout first</p>}
        </>
    );
};

export default SignupForm;
