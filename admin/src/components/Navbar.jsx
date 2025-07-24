import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex justify-between py-2 px-[4%] items-center'>
      <img src={assets.logo} alt="logo" className='w-[max(10%,25px)]' />
      <button className='bg-gray-600 rounded-full text-white px-5 py-2 sm:px-7 sm:py-2 text-xs sm:text-sm cursor-pointer' onClick={()=>{setToken('')}}>Logout</button>
    </div>
  )
}

export default Navbar
