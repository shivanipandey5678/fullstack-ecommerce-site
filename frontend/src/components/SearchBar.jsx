import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)

  return (
    <div className={`flex flex-1 justify-center gap-6 items-center p-4 ${showSearch?'block':'hidden'}`}>

    <div className='w-full sm:w-1/2 m-auto relative '>
      <input
        type='text'
        placeholder='Search here'
        className='w-full p-2 pl-8 border border-gray-300 rounded'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <img
        src={assets.search_icon}
        alt='search'
        className='w-4 absolute left-2 top-1/2 transform -translate-y-1/2 opacity-50'
      />
     
    </div>
     <img src={assets.cross_icon} alt=""  className='flex justify-center items-center bg-gray-300 w-7 h-5  p-1 rounded-full text-xs text-gray-700  cursor-pointer  ' onClick={()=>{setShowSearch(false)}}/>
    </div>
  )
}

export default SearchBar
