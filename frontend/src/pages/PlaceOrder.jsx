import React, { useState, useContext } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios'

const PlaceOrder = () => {
  const { navigate, backendUrl, token, cartItems, setCartItems, delivery_fee, getCartamount, products } = useContext(ShopContext);
  const [method, setMethod] = useState('cod');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
   


    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            console.log({ items })
            const itemInfo = structuredClone(products.find(p => p.id === items || p._id === items));
           
            if (itemInfo) {
              console.log({ itemInfo })
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData={
        address:form,
        items:orderItems,
        amount:getCartamount()+delivery_fee

      }
      switch (method){
        //api for cod
        case 'cod':
          const response=await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}})
          if(response.data.success){
            setCartItems({})
          
            navigate("/orders")
          }else{
            toast.error(response.data.message)
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log({ error })
      toast.error(error.message)
    }
  }

  return (
    <form className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t ' onSubmit={onSubmitHandler}>
      {/* ----------------left side ---------------*/}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3 '>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='Enter first name'
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='Enter last name'
          />
        </div>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChangeHandler}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          placeholder='Enter Email'
        />
        <input
          type="text"
          name="street"
          value={form.street}
          onChange={onChangeHandler}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          placeholder='Street'
        />
        <div className='flex gap-3'>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='City'
          />
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='State'
          />
        </div>
        <div className='flex gap-3'>
          <input
            type="number"
            name="zipcode"
            value={form.zipcode}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='Zipcode'
          />
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='Country'
          />
        </div>
        <input
          type="number"
          name="phone"
          value={form.phone}
          onChange={onChangeHandler}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          placeholder='Phone'
        />
      </div>

      {/* -----------------------------right side--------------------------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex sm:flex-row flex-col items-center gap-4'>
            <div className='flex items-center cursor-pointer' onClick={() => setMethod('stripe')}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} alt="stripe_logo" className='h-5 mx-4' />
            </div>

            <div className='flex items-center cursor-pointer' onClick={() => setMethod('razorpay')}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="razorpay_logo" className='h-5 mx-4' />
            </div>

            <div className='flex items-center cursor-pointer' onClick={() => setMethod('cod')}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='mx-4 font-medium text-sm text-gray-500'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end '>
            <button
              onClick={() => navigate('/orders')}
              className='bg-black text-white mt-5 text-sm my-8 px-9 py-4'
              type="submit"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
