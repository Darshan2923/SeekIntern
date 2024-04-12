import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        toast.success("Logged out successfully!!");
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }, []);
    return <><ToastContainer /><p>You have successfully Logged out</p></>;
};

export default Logout;