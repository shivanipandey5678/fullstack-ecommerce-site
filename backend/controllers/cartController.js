import User from '../models/userModel.js'
//add product to cart
const addToCart=async(req,res)=>{
   
    try {
        const {userId,itemId,size}=req.body;
        const user=await User.findById(userId);
        const cartItems=await user.cartData;
        if(cartItems[itemId]){
            if(cartItems[itemId][size]){
                cartItems[itemId][size]+=1
            }else{
                cartItems[itemId][size]=1
            }
        }else{
            cartItems[itemId]={}
            cartItems[itemId][size]=1
        }

        await User.findByIdAndUpdate(userId,{cartItems});
        res.json({success:true,message:'Add item to cart'})


    } catch (error) {
        return res.json({success:false,message:error.message,"hint":'addToCart'})
    }
}


//update cart

    const updateCart=async(req,res)=>{
        const {userId,itemId,size,quantity}=req.body;
    try {
        
        const user=await User.findById(userId);
        const cartItems=await user.cartData ;
        cartItems[itemId][size]=quantity;
        
        await User.findByIdAndUpdate(userId,{cartItems});
        res.json({success:true,essage:'Updated Cart Item'})
    } catch (error) {
         return res.json({success:false,message:error.message,"hint":'updateCart'})
    }
  
}


//get user cart
const getUserCart=async(req,res)=>{
    const {userId}=req.body;
    try {
        const user=await User.findById(userId);
        const cartItems=await user.cartData ;
        res.json({success:true,essage:'got user Cart Item',cartItems})
    } catch (error) {
        return res.json({success:false,message:error.message,"hint":'getUserCart'})
    }

}

export {addToCart,updateCart,getUserCart}

