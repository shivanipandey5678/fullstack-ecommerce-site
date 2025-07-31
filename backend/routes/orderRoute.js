import express from 'express';
const orderRoute =express.Router(); 
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/userAuth.js'

//admin features
orderRoute.post('/list',adminAuth,allOrders);
orderRoute.post('/status',adminAuth,updateStatus);


//payment features
orderRoute.post('/place',authUser,placeOrder);
orderRoute.post('/stripe',authUser,placeOrderStripe);
orderRoute.post('/razorpay',authUser,placeOrderRazorpay);

//user feature
orderRoute.post('/userOrder',authUser,userOrders);

export default orderRoute;

