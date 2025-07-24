import React,{useState} from 'react'
import NewsLetterBox from '../components/NewsLetterBox';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useEffect } from 'react';
import axios from 'axios'

const Login = () => {
  const [currentState,setCurrentState]=useState('Sign Up');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const {token,setToken,backendUrl,navigate}=useContext(ShopContext)

  const submitHandler=async(e)=>{
    e.preventDefault();
    try {
      if(currentState==='Sign Up'){
        const response=await axios.post(backendUrl+'/api/user/register',{name,email,password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token)
           
        }else{
          console.log(response.data.message)
        }
      }else{
        const response=await axios.post(backendUrl+'/api/user/login',{email,password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token)
           
        }else{
          console.log(response.data.message)
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=>{
     if(token){
      navigate("/")
     }
  },[token])
  return (
    <>
    <div className='flex flex-col gap-3 sm:w-1/2 mx-auto w-full items-center mt-14 mb-40'>
        <h2 className='prata-regular text-3xl font-medium my-2'>{currentState=='Sign Up'?'Sign Up':'Login'}</h2>
        <input type="text" placeholder='Name' className={`border border-gray-700 px-4 py-2 w-full ${currentState=='Sign Up'?'block':'hidden'}`} value={name} onChange={(e)=>{setName(e.target.value)}} required/>
        <input type="email" placeholder='Email'  className='border border-gray-700 px-4 py-2 w-full' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
        <input type="password" placeholder='Password'  className='border border-gray-700 px-4 py-2 w-full' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
        <div className='flex justify-between  w-full'>
          {currentState=='Login'?<span className='cursor-pointer  text-medium'>forget password ? </span>:null}

          {currentState=='Sign Up'?(<span className='cursor-pointer  text-medium' onClick={()=>{setCurrentState('Login')}}>Login here</span>):(<span className='cursor-pointer  text-medium' onClick={()=>{setCurrentState('Sign Up')}}>Create Account</span>)}
        </div>
         <button className='bg-black text-white text-sm px-4 py-2 w-1/3 my-2 min-h-12 cursor-pointer' onClick={submitHandler}>{currentState=='Sign Up'?'Sign Up':'Login'}</button>
    </div>
    <NewsLetterBox/>
    </>
  )
}

export default Login
