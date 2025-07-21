import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img src={assets.logo} alt="logo" className='w-32 mb-5' />
                    <p className='text-gray-600 w-full sm:w-2/3 '>
                        Bringing you thoughtfully curated styles that blend comfort, quality, and elegance. Stay connected with us for the latest collections, offers, and fashion inspiration.
                    </p>

                </div>
                <div>
                    <p className='mb-5 font-medium text-xl '>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                          <li >Home</li>
                          <li >About us</li>
                          <li >Delivery</li>
                          <li >Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className='mb-5 font-medium text-xl'>GET IN TOUCH</p>
                    <ul  className='flex flex-col gap-1 text-gray-600'>
                        <li>+1-212-456-7890</li>
                        <li>shivanipandey0107@gmail.com</li>
                    </ul>
                </div>

            </div>

            <div>
                <hr />
                <p className='text-center text-sm py-4'>Copyright 2024 © - All Right Reserved.</p>
            </div>

        </div>
    )
}

export default Footer
