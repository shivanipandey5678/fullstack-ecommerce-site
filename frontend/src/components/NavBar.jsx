import React,{useContext, useState} from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const NavBar = () => {

    const [visible,setVisible] =useState(false);
     const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  return (
    <div className='flex justify-between p-5 font-medium items-center'>
      <Link to={'/'}><img src={assets.logo} alt="logo" className='w-36 cursor-pointer' /></Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700 '>
        <NavLink to="/"  className='flex flex-col gap-1 items-center '>
             <p>Home</p>
             <hr  className='border-none h-[1.5px] w-2/4 bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to="/collection"  className='flex flex-col gap-1 items-center '>
             <p>Collection</p>
             <hr  className='border-none h-[1.5px] w-2/4 bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to="/about"  className='flex flex-col gap-1 items-center '>
             <p>About</p>
             <hr  className='border-none h-[1.5px] w-2/4 bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to="/contact"  className='flex flex-col gap-1 items-center '>
             <p>Contact</p>
             <hr  className='border-none h-[1.5px] w-2/4 bg-gray-700 hidden'/>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
         <img src={assets.search_icon} alt="search_icon" className='w-5 cursor-pointer'onClick={()=>{setShowSearch(true)}}/>
         <div className='group relative'>
            <img src={assets.profile_icon} alt="profile_icon" className=' cursor-pointer  w-5' />
            <div className='absolute pt-4 right-0  hidden  group-hover:block  dropdown-menu '>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>

                    <p className='cursor-pointer hover:text-black'>My Profile</p>
                    <p className='cursor-pointer hover:text-black'>Orders</p>
                    <p className='cursor-pointer hover:text-black'>Logout</p>
                </div>
            </div>

         </div>

         <NavLink to='/cart' className='relative '>
              <img src={assets.cart_icon} alt="cart_icon" className='w-5 min-w-5 ' />
              <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center bg-black text-white aspect-square rounded-full text-xs'>10</p>
         </NavLink>
         <img src={assets.menu_icon} alt="menu_icon" className='w-5 cursor-pointer sm:hidden  ' onClick={()=>setVisible(true)}/>
      </div>

      {/* Slider menu for small screen*/}

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible?'w-full':'w-0'}`}>
           <div className='flex flex-col text-gray-600 '>
              <div className='flex items-center gap-3 p-3 cursor-pointer' onClick={()=>{setVisible(false)}}>
                   <img src={assets.dropdown_icon} alt="dropdown_icon" className='w-4'/>
                   <p>Back</p>
              </div>
              <NavLink onClick={()=>{setVisible(false)}}  className='py-2 pl-6 border'to='/'>HOME</NavLink>
              <NavLink onClick={()=>{setVisible(false)}}  className='py-2 pl-6 border'to='/collection'>COLLECTION</NavLink>
              <NavLink onClick={()=>{setVisible(false)}} className='py-2 pl-6 border'to='/about'>ABOUT</NavLink>
              <NavLink onClick={()=>{setVisible(false)}}  className='py-2 pl-6 border'to='/contact'>CONTACT</NavLink>
           </div>
      </div>


    </div>
  )
}

export default NavBar



