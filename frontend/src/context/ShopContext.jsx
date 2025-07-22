import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
export const ShopContext = createContext();



const ShopContextProvider = ({ children }) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const navigate=useNavigate();

    const addToCart = (itemId, size) => {

        if(!size){
            toast.error('please select size first');
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1
        }
        console.log(cartData)
        setCartItems(cartData);  
    }

    const getCartCount=()=>{
        let totalCount=0;
        for(let items in cartItems){
            for(let item in cartItems[items]){
                try {
                    totalCount+=cartItems[items][item]
                } catch (error) {
                    toast.error('issue in getCartCount')
                }
               
            }
        }
        return totalCount;
    }

     function updateQuantityfunction(itemId,size,quantity){
          let cardDataCopy=structuredClone(cartItems);
          cardDataCopy[itemId][size]=quantity;
          setCartItems(cardDataCopy)
      }

      function getCartamount(){
        let totalAmount=0;
        for(const items in cartItems ){
            let itemInfo=products.find((product)=>product._id==items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalAmount+=cartItems[items][item]*itemInfo.price;

                    }
                } catch (error) {
                    toast.error('issue in getCartamount')
                }
            }
        }
        return totalAmount;

      }
    

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,addToCart,
        cartItems, setCartItems,getCartCount,updateQuantityfunction,
        getCartamount,navigate
    }
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
