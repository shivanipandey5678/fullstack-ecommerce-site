import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const { productId } = useParams();
  const [Image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductDetail = async () => {
    products.map((product) => {
      if (product._id == productId) {
        setProductData(product)
        setImage(product.image[0])
        return null
      }
    })
  }

  useEffect(() => {
    fetchProductDetail()
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, i) => (
                <img onClick={() => setImage(item)} src={item} alt="" key={i} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }

          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={Image} alt="" className='w-full h-auto' />
          </div>
        </div>
        {/* ----------------------Product info------------------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2 '>
            <img src={assets.star_icon} alt="" className='w-5' />
            <img src={assets.star_icon} alt="" className='w-5' />
            <img src={assets.star_icon} alt="" className='w-5' />
            <img src={assets.star_icon} alt="" className='w-5' />
            <img src={assets.star_dull_icon} alt="" className='w-5' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>
          <p className='mt-5 text-gray-500 md:4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8 '>
            <p>Select Size</p>
            <div className='flex gap-2 '>
              {productData.size.map((item, index) => (
                <button onClick={() => { setSize(item) }} key={index} className={`border py-2 px-4 bg-gray-100  cursor-pointer ${item === size ? 'border-orange-500' : ''}`}>{item}</button>
              ))}
            </div>
          </div>

          <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 ' onClick={()=>addToCart(productData._id,size)}>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/*--------------------- description and review section -----------------------*/}
      <div className='mt-20'>
        <div className='flex'>
          <p className='border px-5 py-3 text-sm'>Description</p>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='my-7 text-gray-400 text-sm flex flex-col gap-4 '>
          <p >
            This premium-quality product is crafted with precision to deliver the best in style, comfort, and durability. Perfect for everyday use or special occasions, it blends modern design with top-grade materials to ensure lasting performance. Whether you're upgrading your wardrobe or gifting someone special, this item is sure to impress. Experience the perfect balance of fashion and function.
          </p>
         
          <p> Designed for modern lifestyles, this product combines elegance with everyday functionality. Its sleek look makes it a standout piece, while its user-friendly features ensure you get the best value and comfort. Add a touch of sophistication to your collection today.</p>

        </div>

      </div>

      {/* display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (<div>hlo</div>)
}

export default Product
