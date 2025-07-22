import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';



const Orders = () => {
  const {products,currency} =useContext(ShopContext);
  const order=products.slice(2,5);
  return (
    <div className='mt-14 '>
      <div className='text-center sm:text-3xl text-2xl my-6'>

      <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div className='flex flex-col gap-4'>
        {
          order.map((item,index)=>(
             <div className='grid sm:grid-cols-[3fr_1fr_1fr]  gap-4  items-center border-t-1' key={index}> 
                <div className='flex sm:flex-row flex-col gap-2 justify-start  border-gray-300  py-2'>
                    <img src={item.image[0]} alt="" className='lg:h-[100px]  h-auto'/>
                    <div className='flex flex-col gap-3'>
                      <p className='font-medium text-gray-500  text-base '>{item.name}</p>
                      <div className='flex gap-2 text-gray-600 text-sm'>
                        <p>{currency}{item.price}</p>
                        <p> Quantity: 1</p>
                        <p>Size: L</p>
                      </div>
                      <p className='text-sm text-gray-700'><b>Date:</b>{Date.now()}</p>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                  <p className='w-2 h-2 rounded-full bg-green-400 text-xs text-gray-600 '></p>
                  <p>Shipped</p>
                </div>
               

                <button className='border border-gray-500 px-4 py-2 cursor-pointer'>
                  Track Order
                </button>
             


              </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Orders
