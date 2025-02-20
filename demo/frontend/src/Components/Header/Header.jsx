import React, { useState } from 'react'
import './Header.css'
import Navbar from '../Navbar/Navbar'
import LoginPopup from '../LoginPopup/LoginPopup';

function Header() {
    const [showLogin, setShowLogin] = useState(false);
  return (
    <div>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <Navbar setShowLogin={setShowLogin} />
    <div className='header'>
        <div className="header-contents">
            <h2 className='main-heading'>"Cravings Calling? Order Fresh, Fast, and Delicious Now!"</h2>
            <p>
"Hungry? We've got you covered!
Order now and indulge in your favorite dishes, delivered straight to your door.
Fast. Fresh. Effortless. ready to enjoy – the perfect meal is just a click away.With just a tap, your next delicious meal is on its way, bringing comfort and taste to your door in no time!"</p>
            <button ><a href="#explore-menu">View Menu</a></button>
        </div>
        </div>
      
    </div>
  )
}

export default Header
