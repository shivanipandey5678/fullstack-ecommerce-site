import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div  className=' min-h-screen border-r-2 w-[18%] '>
        <div className='flex flex-col gap-4 pl-[20%] text-[15px] pt-6'>
            <NavLink to='/add' className='flex border-r-0 border border-gray-300 items-center gap-3  px-3 py-2 rounded-l'>
                <img className='w-5 h-5' src={assets.add_icon} alt="add_icon" />
                <p className='md:block hidden '>Add Items</p>
            </NavLink>

            <NavLink to='/list' className='flex border-r-0 border border-gray-300 items-center gap-3  px-3 py-2 rounded-l'>
                <img src={assets.order_icon} alt="order_icon" className='w-5 h-5 '/>
                <p className='md:block hidden '>List Items</p>
            </NavLink>

            <NavLink to='/orders' className='flex border-r-0 border border-gray-300 items-center gap-3  px-3 py-2 rounded-l'>
            <img src={assets.order_icon} alt="order_icon" className='w-5 h-5 '/>
                <p className='md:block hidden '>Orders</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
