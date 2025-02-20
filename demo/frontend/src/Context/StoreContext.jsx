import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItem, setCartItem] = useState(() => {
    const savedCart = localStorage.getItem("cartItem");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [user, setUser] = useState(null); //logged-in user

  useEffect(() => {
    axios
      .get("http://localhost:3000/food/list")
      .then((response) => {
        if (response.data.success) {
          setFoodList(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching food data:", error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  const addTocart = (id) => {
    if (!user) {
      alert("Please log in to add items to the cart");
      return; 
    }

    setCartItem((prevCart) => ({
      ...prevCart,
      [id]: (prevCart[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id) => {
    setCartItem((prevCart) => {
      if (prevCart[id] > 1) {
        return { ...prevCart, [id]: prevCart[id] - 1 };
      } else {
        const newCart = { ...prevCart };
        delete newCart[id];
        return newCart;
      }
    });
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItem).reduce((total, id) => {
      const item = food_list.find((food) => food._id === id);
      return item ? total + item.price * cartItem[id] : total;
    }, 0);
  };

  return (
    <StoreContext.Provider
      value={{
        food_list,
        cartItem,
        setCartItem,
        addTocart,
        removeFromCart,
        getTotalCartAmount,
        user,
        setUser,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
