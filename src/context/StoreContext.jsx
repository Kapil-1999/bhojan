import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = 'http://localhost:4000/api/';
    const imageUrl = 'http://localhost:4000/'
    const [token, setToken] = useState('');
    const [food_list, setFoodList] = useState([])

    const addToCart = async(itemId) => {        
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }         
        if(token) {
            await axios.post(url+ "cart/add" , {itemId}, {headers : {token}})
        }
    }

    const removeToCart = async(itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token) {
            await axios.post(url+"cart/remove", {itemId}, {headers : {token}})
        }
    }

    const getFoodList = async () => {
        let newRrl = `${url}food/list`;        
        const response = await axios.get(newRrl)
        setFoodList(response.data.data)
    }

    const loadcartData = async(token) => {
        let newRrl = `${url}cart/get`;
        const response = await axios.post(newRrl, {}, {headers : {token}});
        setCartItems(response.data.cartData)     
    }

    useEffect(() => {
        async function loadData() {
            await getFoodList();
            if (localStorage.getItem('bhojantoken')) {
                setToken(localStorage.getItem('bhojantoken'))
                await loadcartData(localStorage.getItem('bhojantoken'))
            }
        }
        loadData()
    }, [])



    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list?.find((product) => product._id === item);
                totalAmount +=  itemInfo?.price * cartItems[item]
            }
        }
        return totalAmount;
    }


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeToCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        imageUrl
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;