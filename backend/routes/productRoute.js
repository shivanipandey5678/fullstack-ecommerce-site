import {singleProduct,removeProduct,listProduct,addProduct} from '../controllers/productController.js';
import express from 'express';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js'
const productRouter=express.Router();

productRouter.post('/single',singleProduct);

productRouter.delete('/delete',adminAuth,removeProduct);

productRouter.get('/list',listProduct);

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1},{name:'image5',maxCount:1}]),addProduct);

export default productRouter;
