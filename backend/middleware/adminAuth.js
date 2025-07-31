
import jwt from 'jsonwebtoken';

const adminAuth =async(req,res,next)=>{
    try {
        const {token}=req.headers;
        if(!token){
            return res.status(400).json({success:false,message:'Token missing, Login again'})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(decoded,"1");
        console.log(process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD,"2")
        console.log((decoded===process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD),"3")
        if(decoded===process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            console.log("4")
            next();
        }else{
            console.log("5")
            return res.status(400).json({success:false,message:'Unauthorized: Invalid token credentials.'})

        }
       
    } catch (error) {
        return res.status(500).json({success:false,message:error.message,"hint":'adminAuth' })
    }
}

export default adminAuth;