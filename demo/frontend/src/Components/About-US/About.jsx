import React from 'react';
import './About.css';

function AboutUs() {
  return (
    <section className="about-us" id='about-us'>

      <div className="about-header">
        <h1>About <span>Us</span></h1>
        <p>
          Delivering happiness, one meal at a time. Discover the story behind your favorite bites.
        </p>
      </div>

    <div className="about-story" >
        <div className="story-image"></div>
        <div className="story-content">
          <h2>Our Journey</h2>
          <p>
            What started as a humble kitchen idea has grown into a food delivery revolution. With a passion for quality and a love for taste, we connect people to flavors from every corner of the world.What started as a dream to bring smiles to dining tables has blossomed into a culinary adventure that bridges the gap between cravings and convenience. From the humblest beginnings, we envisioned more than just a food delivery service—we aspired to craft a seamless experience that celebrates flavors, culture, and connection. Over the years, we’ve partnered with passionate chefs, embraced sustainable practices, and reached thousands of homes, one delightful dish at a time. Our journey is not just about food; it’s about creating moments that linger, stories that are savored, and bonds that are strengthened through the universal language of deliciousness. Whether it's breakfast, lunch, dinner, or a midnight snack, we're here to ensure that every bite feels like home. This is just the beginning.
          </p>
         
        </div>
      </div>

<div className="stand-for">
        <h2>What We Stand For</h2>
        <div className="stand-for-container">
          <div className="stand-for-item">
            <img src="https://cdn-icons-png.flaticon.com/512/2885/2885522.png" alt="Freshness Icon" />
            <h3>Freshness</h3>
            <p>
              We work directly with top-quality suppliers to ensure only the freshest ingredients are used.
            </p>
          </div>
          <div className="stand-for-item">
            <img src="https://cdn-icons-png.flaticon.com/512/1047/1047711.png" alt="Convenience Icon" />
            <h3>Convenience</h3>
            <p>
              Simple ordering, quick delivery, and unforgettable dining experiences—all just a click away.
            </p>
          </div>
          <div className="stand-for-item">
            <img src="https://cdn-icons-png.flaticon.com/512/2920/2920746.png" alt="Sustainability Icon" />
            <h3>Sustainability</h3>
            <p>
              Our eco-friendly packaging ensures that your meal is kind to both you and the planet.
            </p>
            
          </div>
        </div>
      </div>

      <div className="join-team">
        <h2>Join Our Food Family</h2>
        <p>Ready to explore a world of flavors? Dive in and taste the difference today.</p>
        
      </div>
    </section>
  );
}

export default AboutUs;
