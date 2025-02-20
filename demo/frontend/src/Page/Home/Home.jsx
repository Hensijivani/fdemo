import React, { useState } from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'
import AboutUs from '../../Components/About-US/About'
import Footer from '../../Components/Footer/Footer'

function Home() {

  const[category,setCategory] = useState("All")
  return (
    <div>
      <Header/>
      <AboutUs/>
      <Menu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
    </div>
  )
}

export default Home
