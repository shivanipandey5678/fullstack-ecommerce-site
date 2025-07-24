import {v2 as cloudinary} from 'cloudinary'
import Product from "../models/productModel.js";
//add product
const addProduct =async(req,res) =>{
    try {
        let { name, description, price, category,size, subCategory, bestSeller } = req.body;
      
        const image1= req.files.image1 &&  req.files.image1[0] 
        const image2= req.files.image2  && req.files.image2[0] 
        const image3=  req.files.image3 &&  req.files.image3[0] 
        const image4= req.files.image4 && req.files.image4[0] 
        const image5= req.files.image5  &&  req.files.image5[0] 
        const images=[image1,image2,image3,image4,image5].filter((item)=>item!==undefined)
        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )
        
       const productDetail={
        name, description, price, category, subCategory, bestSeller :bestSeller==="true"?true:false,
        size:JSON.parse(size),
        image:imagesUrl,
        date:Date.now()

       }
       const product=new Product(productDetail);
       await product.save();
       res.status(200).json({success:true,message:'product Added!'})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
    


}

//route for list product
const listProduct =async(req,res) =>{
   try {
    const AllProducts=await Product.find({});
    if(AllProducts.length===0){
        return res.status(400).json({success:false,message:'No products found!'})
    };
    if(AllProducts.length>0){

        res.status(200).json({success:true,message:'Products fetched successfully ',AllProducts})
    }
   } catch (error) {
    return res.status(500).json({success:false,message:error.message})
   }
}


//route for remove product
const removeProduct =async(req,res) =>{
    const {productId}=req.body;
    try {
        const productInfo=await Product.findByIdAndDelete(productId);
        if(!productInfo){
            return res.status(404).json({success:false,message:'Product not found!'})
        };
        res.status(200).json({success:true,message:'Product Deleted successfully ',productInfo})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}


//route for single product
const singleProduct =async(req,res) =>{
    const {productId}=req.body;
    try {
        const productInfo=await Product.findById(productId);
        if(!productInfo){
            return res.status(404).json({success:false,message:'Product not found!'})
        };
        res.status(200).json({success:true,message:'Product Info fetched ',productInfo})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
    
}

export {singleProduct,removeProduct,listProduct,addProduct}