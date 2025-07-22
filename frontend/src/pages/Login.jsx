import React,{useState} from 'react'
import NewsLetterBox from '../components/NewsLetterBox';

const Login = () => {
  const [currentState,setCurrentState]=useState('Sign Up');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  return (
    <>
    <div className='flex flex-col gap-3 sm:w-1/2 mx-auto w-full items-center mt-14 mb-40'>
        <h2 className='prata-regular text-3xl font-medium my-2'>{currentState=='Sign Up'?'Sign Up':'Login'}</h2>
        <input type="text" placeholder='Name' className={`border border-gray-700 px-4 py-2 w-full ${currentState=='Sign Up'?'block':'hidden'}`} value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <input type="email" placeholder='Email'  className='border border-gray-700 px-4 py-2 w-full' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="password" placeholder='Password'  className='border border-gray-700 px-4 py-2 w-full' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <div className='flex justify-between  w-full'>
          {currentState=='Login'?<span className='cursor-pointer  text-medium'>forget password ? </span>:null}

          {currentState=='Sign Up'?(<span className='cursor-pointer  text-medium' onClick={()=>{setCurrentState('Login')}}>Login here</span>):(<span className='cursor-pointer  text-medium' onClick={()=>{setCurrentState('Sign Up')}}>Create Account</span>)}
        </div>
         <button className='bg-black text-white text-sm px-4 py-2 w-1/3 my-2 min-h-12 cursor-pointer'>{currentState=='Sign Up'?'Sign Up':'Login'}</button>
    </div>
    <NewsLetterBox/>
    </>
  )
}

export default Login
