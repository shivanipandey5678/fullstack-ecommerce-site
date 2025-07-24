import React, { useState } from 'react';
import Navbar from './Navbar';
import {backendUrl} from '../App.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    const response=await axios.post(backendUrl+ '/api/user/admin',{email,password});
    if(response.data.success){
        setToken(response.data.token)
    }else{
        toast.error(response.data.message)
    }
  };

  return (
    < div className='min-h-screen bg-gray-50 p-4 sm:p-1'>
      
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-3 sm:w-1/3  mx-auto w-full items-center  mb-22 justify-center mt-40'>
        <h2 className='prata-regular text-3xl font-medium my-2'>Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="border border-gray-700 px-4 py-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-700 px-4 py-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

     

        <button
          type="submit"
          className="bg-black text-white text-sm px-4 py-2 w-1/3 my-2 min-h-12 cursor-pointer"
        >
          Login
        </button>
      </form>

      
    </div>
  );
};

export default Login;
