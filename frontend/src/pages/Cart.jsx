import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems ,updateQuantityfunction,getCartamount,navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

 

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {

      for (const item in cartItems[items]) {

        console.log(cartItems[items][item])
        if (cartItems[items][item] > 0) {

          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })

        }
      
      }
    }
    
    setCartData(tempData);
  }, [cartItems])
 
  return (
    <div className='border-t-2 pt-14 '>
      <div className='mb-3 text-center text-2xl'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div >
        {
          cartData.map((item, i) => {
            const productData = products.find((product) => product._id === item._id)
            return(
              <div className='py-4 boredr-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-2' key={item._id}>
                   <div className='flex items-start gap-6 '>
                       
                       <img src={productData.image[0]} alt=""className='sm:w-20 w-16' />
                        <div>
                          <p className='text-sm sm:text-lg font-normal'>{productData.name}</p>
                          <div className='flex items-center gap-5 mt-2'>
                            <p>{currency}{productData.price}</p>
                             <p className='font-medium w-8 h-8 p-2  bg-slate-100 flex justify-center items-center'>{item.size}</p>

                          </div>
                        </div>
                   </div>

                   <input type="Number"  min={1} defaultValue={item.quantity}  className='max-w-10 sm:max-w-20 px-1 sm:px-2 py-1   bg-slate-100 ' onChange={(e)=>e.target.value==''|| e.target.value=='0' ? null :updateQuantityfunction(item._id,item.size,Number(e.target.value))}/>
                   <img src={assets.bin_icon} alt="" className='cursor-pointer sm:w-5 mr-4 w-4' onClick={()=>{updateQuantityfunction(item._id,item.size,0)}}/>

               
              </div>
            )
          })


        }
      </div>
      <div className='flex justify-end my-20'>
            <div className='w-full sm:w-[450px] '>
                <CartTotal/>
                <div className='w-full text-end'>
                 <button onClick={()=>{navigate('/place-order')}} className='bg-black text-white p-4 mt-5 text-sm my-8'>PROCEED TO CHECKOUT</button>
                </div>
            </div>
      </div>

    </div>
  )
}

export default Cart
