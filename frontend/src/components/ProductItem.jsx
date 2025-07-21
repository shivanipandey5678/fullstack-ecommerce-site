import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({_id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    return (
        <Link to={`/product/${_id}`} className='cursor-pointer text-gray-700' key={_id}>
            <div className='overflow-hidden'>
                <img src={image[0]} alt="product_img" className='hover:scale-110 transition ease-in-out cursor-pointer' />
            </div>
            <p className='pt-3 pb-1 text-sm '>{name}</p>
            <p className='font-medium text-sm'>{currency}{price}</p>

        </Link>
    )
}

export default ProductItem
