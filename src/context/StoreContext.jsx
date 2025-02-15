import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }


    // const addToCart = (itemId) => {
    //     setCartItems((prev) => {
    //         const newCartItems = {...prev};
    //         if (newCartItems[itemId]) {
    //             newCartItems[itemId] += 1;
    //         } else {
    //             newCartItems[itemId] = 1;
    //         }
    //         return newCartItems;
    //     });
    // };

    // const removeFromCart = (itemId) => {
    //     setCartItems((prev) => {
    //         const newCartItems = {...prev};
    //         if (newCartItems[itemId]) {
    //             if (newCartItems[itemId] === 1) {
    //                 delete newCartItems[itemId]; // Remove the item if the quantity is 1
    //             } else {
    //                 newCartItems[itemId] -= 1;
    //             }
    //         }
    //         return newCartItems;
    //     });
    // };


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item]
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
        getTotalCartAmount
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;