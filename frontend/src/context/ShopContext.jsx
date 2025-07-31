import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
export const ShopContext = createContext();
import axios from 'axios';



const ShopContextProvider = ({ children }) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [products,setProducts] = useState([]);
    const navigate=useNavigate();
    const [token,setToken]=useState('')

    const addToCart = async(itemId, size) => {

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
        if(token){
          
            try {
                 const response=await axios.post(backendUrl +'/api/cart/add',{itemId,size},{headers:{token}});
                 console.log(token)
               
            } catch (error) {
                toast.error(error.message,"idharhu")
            }
        }
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

    const getUserCart = async (req,res) =>{
        try {
            const response=await axios.post(backendUrl+'/api/cart/get' ,{},{headers:{token}});
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            toast.error(error.message,"hint:getUserCart")
        }
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

      const getProductsData=async()=>{
        try {
            const response=await axios.get(backendUrl+'/api/product/list');
            if(response.data.success){
                setProducts(response.data.AllProducts)
            }else{
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
      }

      useEffect(()=>{
        getProductsData()
      },[])

      useEffect(()=>{
         if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
         }
      },[])
    

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,addToCart,
        cartItems, setCartItems,getCartCount,updateQuantityfunction,
        getCartamount,navigate,backendUrl,getProductsData,token,setToken
    }
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
