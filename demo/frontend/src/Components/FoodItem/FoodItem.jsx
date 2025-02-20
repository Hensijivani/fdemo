import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../img/assets';
import { StoreContext } from '../../Context/StoreContext';
import Footer from '../Footer/Footer';

function FoodItem({ id, name, price, description, image }) {
  const { cartItem, addTocart, removeFromCart, user } = useContext(StoreContext);

  const handleAddToCart = () => {
    if (!user) {
      alert('Please log in to add items to the cart');
      return;
    }
    addTocart(id);
  };

  const imageUrl = `http://localhost:3000/img/${image}`;
  console.log("Image URL:", imageUrl);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={imageUrl} alt={name} />
        {!cartItem[id] ? (
          <img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="Add to cart" />
        ) : (
          <div className='food-item-counter'>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
            <p>{cartItem[id]}</p>
            <img onClick={() => addTocart(id)} src={assets.add_icon_green} alt="Add" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    
    </div>
  );
}

export default FoodItem;
