import React from 'react';
import './Footer.css'
import { assets } from '../../img/assets';

function Footer() {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
              <h2 className='flavor' style={{fontFamily:'Kaushan Script' , fontSize:'35px'}}>Flavor Ferry</h2>
              <p className='footer-desc' style={{fontFamily:'sans-serif' , fontSize:'17px'}}>"At Flavor Ferry,we believe that great food starts with fresh ingredients and ends with a satisfied smile.Our passion is delivering delicious meals right to your doorstep, crafted with care and unmatched flavor.food isn’t just fuel – it’s a way of bringing joy to your day. Let us make every meal special for you!"

</p>
              <div className="footer-social-icons">
                  <img src={assets.facebook_icon} alt="" />
                  <img src={assets.twitter_icon} alt="" />
                  <img src={assets.linkedin_icon} alt="" />
                </div>
              </div>
        <div className="footer-content-center">
          <h2 className='flavor' style={{fontFamily:'Kaushan Script' , fontSize:'35px'}}>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2 className='flavor'>GET IN TOUCH</h2>
          <ul>
            <li>+91 9909837612</li>
            <li>flavorferry12@gmail.com</li>
          </ul>
        </div>
      </div>
     
      <p className='powered by'>Powered By FlavorFarry</p>
    </div>
  )
}

export default Footer;


