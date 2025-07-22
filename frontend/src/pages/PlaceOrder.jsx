import React,{useState} from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
  const [method,setMethod]=useState('cod');
  const {navigate}=useContext(ShopContext)

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t '>
      {/* ----------------left side ---------------*/}
      <div className='flex flex-col gap-4  w-full sm:max-w-[480px]'>
           <div className='text-xl sm:text-2xl my-3 '>
                <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
           </div>
           <div className='flex gap-3'>
              <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Enter first name'/>
              <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Enter last name'/>
           </div>
           <input type="email" name="" id="" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Enter Email'/>
           <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full'placeholder='Street' />
           <div className='flex gap-3'>
           <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City'/>
           <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State'/>
           </div>

           <div className='flex gap-3'>
           <input type="Number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zipcode'/>
           <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country'/>
           </div>
           <input type="Number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone'/>
           
      </div>

      {/* -----------------------------right side--------------------------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>

        </div>
        <div className='mt-12'>
           <Title text1={'PAYMENT'} text2={'METHOD'}/>
           {/* payment methods */}
           <div className='flex sm:flex-row flex-col items-center'>

           <div className='flex  flex-col lg:flex-row  justify-between'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method=='stripe'? 'bg-green-400':''}`}></p>
                <img src={assets.stripe_logo} alt="stripe_logo" className='h-5 mx-4' onClick={()=>setMethod('stripe')}/>
           </div>

           <div className='flex  flex-col lg:flex-row items-center'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method=='razorpay'? 'bg-green-400':''}`}></p>
                <img src={assets.razorpay_logo} alt="razorpay_logo" className={`h-5 mx-4`}  onClick={()=>setMethod('razorpay')}/>
           </div>

           <div className='flex  flex-col md:flex-row items-center'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method=='cod'? 'bg-green-400':''}`}></p>
                <p className={`mx-4 font-medium text-sm text-gray-500 `} onClick={()=>setMethod('cod')}>CASH ON DELIVERY</p>
           </div>
           </div>

           <div className='w-full text-end '>
                <button onClick={()=>{navigate('/orders')}} className='bg-black text-white  mt-5 text-sm my-8 px-9 py-4'>PLACE ORDER</button>
           </div>
        </div>
        
      </div>
    </div>
  )
}

export default PlaceOrder
