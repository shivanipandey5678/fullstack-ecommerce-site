import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {

    const {currency,delivery_fee,getCartamount}=useContext(ShopContext)
  return (
    <div className='w-full'>
        <div className='text-2xl m-auto mb-2'>
            <Title text1={'CART'} text2={'TOTAL'}/>

        </div>
        <div className='flex flex-col gap-2 text-sm'>
            <div className='flex justify-between'>
                 <p>SubTotal</p>
                 <p>{currency}{getCartamount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p>{currency}{delivery_fee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
              <b>Total</b>
              <b>{currency}{getCartamount()===0?0:getCartamount()+delivery_fee}.00</b>
            </div>

        </div>
      
    </div>
  )
}

export default CartTotal
