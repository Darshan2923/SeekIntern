import React, { useEffect } from 'react'
import apiList from '../../lib/apiList';
import { ToastContainer,toast } from 'react-toastify';

const MyJobs = () => {
    const [applications, setApplications] = useState([]);
    useEffect(()=>{
       getData();
    },[]);
    const getData=async(req,res)=>{
        try {
            const response = await axios.get(apiList.applications, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setApplications(response.data);
            console.log(response.data);
        } catch (error) {
            toast.error("An error occurred");
            console.error(error);
        }
    }
  return (
    <div>
      <ToastContainer/>
    </div>
  )
}

export default MyJobs