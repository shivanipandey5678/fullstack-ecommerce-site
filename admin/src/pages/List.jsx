import React,{useState ,useEffect} from 'react';
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { currency } from '../App';

const List = ({token}) => {
  const [list,setList]=useState([]);

  const fetchList=async()=>{
    try {
      const response=await axios.get(backendUrl+'/api/product/list');
      if(response.data.success){
        
        setList(response.data.AllProducts);
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const removeProduct =async(id)=>{
      try {
        const response=await axios.delete(backendUrl+'/api/product/delete',{
          data: { productId: id },
          headers: { token: token }
        });
        if(response.data.success){
          fetchList()
          toast.success(response.data.message)
        }else{
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }

  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2 '>
      {/* ---------------heading ----------------*/}
      <div className='px-2 py-2 hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center  border  border-gray-300   bg-gray-100  text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
      </div>

       {/* --------------------------product list ------------------*/}
       {list.map((item,index)=>{
        return (
          
          <div key={item._id} className='grid grid-cols-[1fr_3fr_1fr] items-center md:grid-cols-[1fr_3fr_1fr_1fr_1fr] border border-gray-300  bg-gray-100  text-sm gap-2 px-2 py-1' >
                <img src={item.image[0]} alt="" className='w-12'/>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{currency}{item.price}</p>
                <p className='cursor-pointer text-lg' onClick={()=>{removeProduct(item._id)}}>X</p>
              

          </div>
        )
       })}
      </div>
      
    </>
  )
}

export default List
