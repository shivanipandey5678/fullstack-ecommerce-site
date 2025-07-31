import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import axios from 'axios'



const Orders = () => {
  const {backendUrl,token,currency} =useContext(ShopContext);
  const [ordersData,setOrdersData]=useState([]);
 

  const loadOrderData=async(req,res)=>{
    try {
      if(!token){
        return null
      }

      const response=await axios.post(backendUrl+'/api/order/userOrder',{},{headers:{token}});
      if(response.data.success){
        let allOrdersItem=[];
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status
            item['payment']=order.payment
            item['paymentMethod']=order.paymentMethod
            item['date']=order.date
            allOrdersItem.push(item)

          })
        })

        setOrdersData(allOrdersItem.reverse());
      }
      console.log(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  useEffect(()=>{
    loadOrderData()
  },[])
  return (
    <div className='mt-14 '>
      <div className='text-center sm:text-3xl text-2xl my-6'>

      <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div className='flex flex-col gap-4'>
        {
          ordersData.map((item,index)=>(
             <div className='grid sm:grid-cols-[3fr_1fr_1fr]  gap-4  items-center border-t-1' key={index}> 
                <div className='flex sm:flex-row flex-col gap-2 justify-start  border-gray-300  py-2'>
                    <img src={item.image[0]} alt="" className='lg:h-[100px]  h-auto'/>
                    <div className='flex flex-col gap-3'>
                      <p className='font-medium text-gray-500  text-base '>{item.name}</p>
                      <div className='flex gap-2 text-gray-600 text-sm'>
                        <p>{currency}{item.price}</p>
                        <p> Quantity : {item.quantity}</p>
                        <p>Size : {item.size}</p>
                      </div>
                      <p className='text-sm text-gray-700'><b>Date : </b> {new Date(item.date).toDateString()}</p>
                      <p className='text-sm text-gray-700'><b>Payment : </b> {item.paymentMethod}</p>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                  <p className='w-2 h-2 rounded-full bg-green-400 text-xs text-gray-600 '></p>
                  <p>{item.status}</p>
                </div>
               

                <button onClick={loadOrderData}  className='border border-gray-500 px-4 py-2 cursor-pointer'>
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
