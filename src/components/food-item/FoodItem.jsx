import React, { useContext, useState } from 'react';
import './FoodItem.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
    const context = useContext(StoreContext);

    if (!context) {
        return <p>Error: Context not found!</p>;
    }
    const { cartItems, addToCart, removeToCart, imageUrl } = context;

    return (
        <div className='food-item'>
            <div className="food-item-image-container">
                <img className="food-item-image" src={imageUrl + "images/" + image} alt="" />
                {
                    !cartItems[id] ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
                        : <div className="food-item-counter">
                            <img onClick={() => removeToCart(id)} src={assets.remove_icon_red} alt="" />
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                        </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-description">
                    {description}
                </p>
                <p className='food-item-price'>${price}</p>
            </div>

        </div>
    )
}

export default FoodItem
