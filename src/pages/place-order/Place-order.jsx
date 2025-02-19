import React, { useContext, useState } from 'react';
import './place-order.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {

  const context = useContext(StoreContext);

  if (!context) {
    return <p>Error: Context not found!</p>;
  }

  const { getTotalCartAmount, token, food_list, cartItems, url } = context;
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list?.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }

    let response = await axios.post(url+ "order/place", orderData, {headers : {token}});
    console.log(response);
    
    if(response.data.success) {
      const {session_url} =  response.data;
      window.location.replace(session_url)
    } else {
      alert("Error")
    }

  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }
  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" placeholder='First name' name='firstname' value={data.firstname} onChange={handleChange} />
          <input required type="text" placeholder='Last Name' name='lastname' value={data.lastname} onChange={handleChange} />
        </div>
        <input required type="email" placeholder='Email Address' name='email' value={data.email} onChange={handleChange} />
        <input required type="text" placeholder='Street' name='street' value={data.street} onChange={handleChange} />
        <div className="multi-fields">
          <input required type="text" placeholder='City' name='city' value={data.city} onChange={handleChange} />
          <input required type="text" placeholder='State' name='state' value={data.state} onChange={handleChange} />
        </div>
        <div className="multi-fields">
          <input required type="text" placeholder='Zip code' name='zipcode' value={data.zipcode} onChange={handleChange} />
          <input required type="text" placeholder='Country' name='country' value={data.country} onChange={handleChange} />
        </div>
        <input required type="text" placeholder='Phone' name='phone' value={data.phone} onChange={handleChange} />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivey Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
