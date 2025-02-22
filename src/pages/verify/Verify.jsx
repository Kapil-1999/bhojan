import React, { useContext, useEffect } from 'react';
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

     const context = useContext(StoreContext);
    
      if (!context) {
        return <p>Error: Context not found!</p>;
      }
    
      const { url } = context;
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();   

    const verifyPayment = async() => {
        const response =  await axios.post(url+"order/verify", {success, orderId});
        if(response.data.success) {
            navigate("/myorders")
        } else {
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment()
    },[])

  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify