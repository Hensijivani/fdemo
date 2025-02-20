import React, { useState, useEffect, useContext } from 'react';
import './FoodDisplay.css';
import axios from 'axios';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';
import Footer from '../Footer/Footer';

function FoodDisplay({ category }) {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display'>
      <h2>Our Top Dishes</h2>
      <div className="food-display-list">
        {food_list.map(item => (
          (category === 'All' || category === item.category) && (
            <FoodItem 
              key={item._id} 
              id={item._id} 
              name={item.name} 
              description={item.description} 
              price={item.price} 
              image={item.image} 
            />
          )
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default FoodDisplay;


