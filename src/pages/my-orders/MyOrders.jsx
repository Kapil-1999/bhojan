import React, { useContext, useEffect, useState } from 'react';
import "./MyOrder.css"
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const [data, setData] = useState([]);
    const context = useContext(StoreContext);

    if (!context) {
        return <p>Error: Context not found!</p>;
    }
    const { url, token } = context;

    const fetchOrder = async() => {
        const response = await axios.post(url+"order/userorders",{},{headers : {token}});
        setData(response.data.data)  
    }

    useEffect(() => {
        if(token) {
            fetchOrder()
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data?.map((order, index) =>{
                    return (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order?.items?.map((item, index) => {
                                if(index == order.items?.length - 1){
                                    return item.name+ " x " + item.quantity
                                } else {
                                    return item.name+" x " + item.quantity +" , " 
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items?.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={fetchOrder}>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders