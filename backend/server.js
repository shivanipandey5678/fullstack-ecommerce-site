import express, { urlencoded } from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js';
//appconfig 
const app=express();
const port=process.env.PORT;
connectDb();
connectCloudinary();


//middlewares
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cors())

//routes
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRoute);

//api end point 
app.get('/',(req,res)=>{
    res.send('healthy...............')
})
app.listen(port,()=>{
    console.log(`app listening at ${port}`)
})
