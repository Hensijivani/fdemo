import React from 'react'
import './Menu.css'
import { menu_list } from '../../img/assets'

function Menu({category,setCategory}) {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      {/* <p className='explore-menu-text'>Delight in every bite—explore our flavorful menu and discover your new favorite dish.Savor the flavors of Mexico! Explore our diverse menu and indulge in authentic dishes made with the finest ingredients.Taste the tradition, enjoy the experience—explore our menu and find your next favorite meal today!</p> */}
      <div className='explore-menu-list'>
        {menu_list.map((item,index)=>{
            return(
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                    <img className={category===item.menu_name?"active":"" }src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  )
}

export default Menu
