import React from 'react'

const NewsLetterBox = () => {

    function onSubmitHandler(e){
       e.preventDefault();

    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-sm text-gray-500 mt-2'>Join our newsletter to stay updated on exclusive offers, new arrivals, and fashion tips—delivered straight to your inbox.</p>
         <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border ' onSubmit={onSubmitHandler}>
            <input type="email"  placeholder='Enter your email' className=' w-full sm:flex-1 outline-none px-2' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4 '>SUBSCRIBE</button>
         </form>
    </div>
  )
}

export default NewsLetterBox
