import React, { useContext } from 'react';
import './foodDisplay.css'
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../food-item/FoodItem';

const FoodDisplay = ({ category }) => {
    const context = useContext(StoreContext);
    
        if (!context) {
            return <p>Error: Context not found!</p>;
        }
    const { food_list } = context;


    if (!food_list) {
        return <div>Loading...</div>;
    }
    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes near you</h2>
            <div className="food-display-list">
                <ul>

                    {
                        food_list?.map((item, index) => {
                            if (category === 'All' || category === item.category) {
                                return <li key={index} className='food-data'>
                                    <FoodItem id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                                </li>
                            }
                        })
                    }
                </ul>
            </div>

        </div>
    )
}

export default FoodDisplay
