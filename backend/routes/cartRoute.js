import express from 'express';
const cartRouter=express.Router();
import {addToCart,updateCart,getUserCart} from '../controllers/cartController.js'
import userAuth from '../middleware/userAuth.js';
cartRouter.post('/add',userAuth,addToCart);
cartRouter.post('/update',userAuth,updateCart);
cartRouter.post('/get',userAuth,getUserCart);

export default  cartRouter;