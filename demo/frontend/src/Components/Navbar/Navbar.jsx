
import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../img/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
// import { Link } from 'react-router-dom'

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("menu");
  // const { getTotalCartAmount } = useState(StoreContext);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#about-us"
          onClick={() => setMenu("about-us")}
          className={menu === "home" ? "active" : ""}
        >
          About Us
        </a>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "home" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "home" ? "active" : ""}
        >
          Contact
        </a>
      </ul>
      <div className="navbar-right">
       
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
        
        <button className="signin" onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  );
}

export default Navbar;
