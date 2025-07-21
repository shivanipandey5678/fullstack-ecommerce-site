import React from 'react'
import { assets } from '../assets/assets'

function Hero() {
    return (
        <div className='flex flex-col sm:flex-row  border border-gray-400  '>
            {/* Hero left side */}
            <div className='w-full sm:w-1/2 flex flex-col items-center gap-2 justify-center py-10 sm:py-0'>
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                        <p className='  text-gray-500 font-medium text-sm  md:text-base'>  OUR BESTSELLERS</p>
                    </div>
                    <h1 className=' prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivale</h1>
                    <div className='flex items-center gap-2'>
                        <p className='  text-gray-500 font-medium text-sm  md:text-base'>  SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    </div>
                </div>

            </div>
            {/* Hero Right side */}
            <div className='bg-pink-100 bg-cover w-full sm:w-1/2 '>
                <img src={assets.hero_img} alt="hero_img" />
            </div>

        </div>
    )
}

export default Hero
