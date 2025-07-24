import React ,{useState} from 'react'
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {

  const [image1 ,setImage1]=useState(false);
  const [image2 ,setImage2]=useState(false);
  const [image3 ,setImage3]=useState(false);
  const [image4 ,setImage4]=useState(false);
  
  const [name,setName]=useState('');
  const [description,setDescription]=useState('');
  const [category,setCategory]=useState('Men');
  const [subCategory,setSubCategory]=useState('Topwear');
  const [price,setPrice]=useState(0);
  const [size,setSize]=useState([]);
  const [bestSeller,setBestSeller]=useState(false);

  const onSubmitHandler=async(e)=>{
      e.preventDefault();
      try {
        const formData=new FormData()
        formData.append("name",name)
        formData.append("description",description)
        formData.append("category",category)
        formData.append("subCategory",subCategory)
        formData.append("price",price)
        formData.append("size",JSON.stringify(size))
        formData.append("bestSeller",bestSeller)

        image1 && formData.append("image1",image1)
        image2 && formData.append("image2",image2)
        image3 && formData.append("image3",image3)
        image4 && formData.append("image4",image4)

        const response=await axios.post(backendUrl+'/api/product/add',formData,{headers:{token:token}});
        if(response.data.success){
          toast.success(response.data.message);
          setName('')
          setDescription('')
         
          setPrice(0)
          setSize([])
          setBestSeller(false)
          setImage1('')
          setImage2('')
          setImage3('')
          setImage4('')
        }else{
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
  }

  return (
    <form>
       <p className='mb-2'>Upload Image</p>
       <div className='flex gap-2' >
          <label htmlFor="image1">
            <img src={!image1?assets.upload_area:URL.createObjectURL(image1)} alt="upload_area" className='w-20'/>
            <input type="file" name="" id="image1" className='hidden bg-white' onChange={(e)=>setImage1(e.target.files[0])} />
          </label>

          <label htmlFor="image2">
            <img src={!image2?assets.upload_area:URL.createObjectURL(image2)} alt="upload_area" className='w-20'/>
            <input type="file" name="" id="image2" className='hidden bg-white' onChange={(e)=>setImage2(e.target.files[0])}/>
          </label>

          <label htmlFor="image3">
            <img src={!image3?assets.upload_area:URL.createObjectURL(image3)} alt="upload_area" className='w-20'/>
            <input type="file" name="" id="image3" className='hidden bg-white'onChange={(e)=>setImage3(e.target.files[0])} />
          </label>

          <label htmlFor="image4">
            <img src={!image4?assets.upload_area:URL.createObjectURL(image4)} alt="upload_area" className='w-20'/>
            <input type="file" name="" id="image4" className='hidden bg-white' onChange={(e)=>setImage4(e.target.files[0])}/>
          </label>
       </div>

       <div className='w-full'>
           <p className='mb-2'>Product name</p>
           <input type="text" placeholder='Type here' className='px-3 py-2 w-full max-w-[500px] bg-white' required  onChange={(e)=>{setName(e.target.value)}} value={name}/>
       </div>

       <div className='w-full'>
           <p className='mb-2'>Product desciption</p>
           <textarea type="text" placeholder='Type here' className='px-3 py-2 w-full max-w-[500px] bg-white' required onChange={(e)=>{setDescription(e.target.value)}} value={description}/>
       </div>

       <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select className='px-3 py-2 w-full bg-white' required onChange={(e)=>{setCategory(e.target.value)}} value={category}>
            
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub category</p>
          <select className='px-3 py-2 w-full bg-white' required onChange={(e)=>{setSubCategory(e.target.value)}} value={subCategory}>
            
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input type="Number"  placeholder='Enter Price' className='px-3 py-2 w-full bg-white' required onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
        </div>
       </div>

       <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-2'>
            <div onClick={()=>setSize(prev=>prev.includes("S")? prev.filter((item)=>item!=="S"):[...prev,"S"])}>
              <p  className={`${size.includes('S')?'bg-pink-100':'bg-slate-200'}  px-3 py-1 cursor-pointer`}>S</p>
            </div>

            <div   onClick={()=>setSize(prev=>prev.includes("M")? prev.filter((item)=>item!=="M"):[...prev,"M"])}>
              <p className={`${size.includes('M')?'bg-pink-100':'bg-slate-200'}  px-3 py-1 cursor-pointer`}>M</p>
            </div>

            <div   onClick={()=>setSize(prev=>prev.includes("L")? prev.filter((item)=>item!=="L"):[...prev,"L"])}>
              <p className={`${size.includes('L')?'bg-pink-100':'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
            </div>

            <div   onClick={()=>setSize(prev=>prev.includes("XL")? prev.filter((item)=>item!=="XL"):[...prev,"XL"])}>
              <p className={`${size.includes('XL')?'bg-pink-100':'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
            </div>

            <div   onClick={()=>setSize(prev=>prev.includes("XXL")? prev.filter((item)=>item!=="XXL"):[...prev,"XXL"])}>
              <p className={`${size.includes('XXL')?'bg-pink-100':'bg-slate-200'}  px-3 py-1 cursor-pointer`}>XXL</p>
            </div>
        </div>
       </div>

       <div className='flex items-center gap-2 mt-2'>
        <input type="checkbox" name="bestSeller" id="bestSeller"  onChange={()=>{setBestSeller(prev=>!prev)}} checked={bestSeller}  value={bestSeller}/>
        <label htmlFor="bestSeller">Add to bestseller</label>
       </div>

       <button type='submit' className='bg-black text-white text-base px-8 py-3 mt-2' onClick={onSubmitHandler}>ADD</button>
      
    </form>
  )
}

export default Add
