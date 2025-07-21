import React, { useContext, useState ,useEffect} from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products , search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct,setFilterProduct]=useState([]);
  const [Category,setCategory]=useState([]);
  const [subCategory,SetSubCategory]=useState([]);
  const [sortType,setSortType]=useState('relavent')
  




  useEffect(()=>{

    let filtered=[...products];
    
    if(Category.length>0){
      filtered=filtered.filter(item=>Category.includes(item.category));
    }

    if(subCategory.length>0){
      filtered=filtered.filter(item=>subCategory.includes(item.subCategory));
    }

    if(search.trim()){
      filtered=filtered.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase()))
    }

    switch (sortType){
      case 'high-low':
        (filtered.sort((a,b)=>b.price-a.price));
        break;
      case 'low-high':
        (filtered.sort((a,b)=>a.price-b.price));
        break;
    }

    setFilterProduct(filtered);
  },[products, Category, subCategory, sortType,showSearch,search]);

    
 
  function ToggleCategory(e) {
      const value=e.target.value;
      setCategory(prev=>prev.includes(value) ? prev.filter(item=>item!==value) :[...prev,value])
     
     
  }

  function ToggleSubCategory(e){
    if(subCategory.includes(e.target.value)){
      SetSubCategory(prev=>prev.filter(item=>item!==e.target.value))
   }else{
      SetSubCategory(prev=>[...prev,e.target.value])
   }
  }


 
  return (
    <div className='flex flex-cols sm:flex-row gap-1 sm:gap-10 pt-10 border-t '>

      {/* filter options */}
      <div className='min-w-60 '  >
        <p onClick={() => setShowFilter(prev => !prev)} className='my-2 text-xl flex items-center cursor-pointer gap-4'>FILTERS
          <img src={assets.dropdown_icon} alt="" className={`h-3  ${showFilter ? 'rotate-90' : ''}`} /></p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6   ${showFilter ? '' : 'hidden'} text-sm`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex  gap-2 text-sm font-light text-gray-700'>
            <input type="checkbox" className='w-3' value={'Men'} onChange={ToggleCategory}/>
            <p className='flex gap-2'>Men</p>
          </div>

          <div className='flex  gap-2 text-sm font-light text-gray-700'>
            <input type="checkbox" className='w-3' value={'Women'}  onChange={ToggleCategory}/>
            <p className='flex gap-2'>Women</p>
          </div>

          <div className='flex  gap-2 text-sm font-light text-gray-700'>
            <input type="checkbox" className='w-3' value={'Kids'}  onChange={ToggleCategory}/>
            <p className='flex gap-2'>Kids</p>
          </div>
        </div>

        {/* subcategory filter */}

        <div className={`border border-gray-300 pl-5 py-3 my-5   ${showFilter ? '' : 'hidden'} text-sm`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex  gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'}  onChange={ToggleSubCategory}/>
              Topwear</p>
          </div>

          <div className='flex  gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'}  onChange={ToggleSubCategory}/>
              Bottomwear</p>
          </div>

          <div className='flex  gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'}  onChange={ToggleSubCategory} />
              Winterwear</p>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE PRODUCT GRID */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* PRODUCT SORT */}
          <select className='border-2 border-gray-300 text-sm px-2' onChange={(e)=>setSortType(e.target.value)}>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 '>
            {
              filterProduct.map((product)=>(
                <ProductItem {...product} key={product._id}/>
              ))
            }
        </div>

      </div>

    </div>
  )
}

export default Collection
