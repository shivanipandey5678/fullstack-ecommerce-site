//place orders using cod method

import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

const placeOrder=async(req,res) => {

    try {
        const {userId, items , amount ,address} = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment:false,
            date:Date.now(),

        }
        
        const newOrder = new Order(orderData);
        await newOrder.save();
        await User.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:'Order Placed'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message,"hint":'placeOrder'})
    }
}

//place orders using stripe method

const placeOrderStripe=async(req,res) => {
    
}

//place orders using razorpay method

const placeOrderRazorpay=async(req,res) => {
    
}

//all orders data for admin panel

const allOrders =async(req,res)=>{
    try {
        const orders=await Order.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message,"hint":'allOrders'})
    }
   
}


//user order data for frontend

const userOrders =async(req,res)=>{
    try {
        const {userId}=req.body;
        const orders=await Order.find({userId});
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message,"hint":'userOrders'})
    }
    
}

//uupdate oredr status from admin panel

const updateStatus =async(req,res)=>{
    try {
        const {orderId,status} = req.body;
        await Order.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:'status updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message,"hint":'updateStatus'})
    }
}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}